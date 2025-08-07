---
title: "Continuous Delivery with Travis and Github"
description: "I have released a new library on Maven central. Let me explain how I did that."
tags: ['deployment', 'travisci', 'git']
date: "2018-07-15T10:00:00+00:00"
---

Some years ago I started working on a project called [braingdx](https://github.com/bitbrain/braingdx). It is a gamejam framework based on [libgdx](https://libgdx.badlogicgames.com/), fully written in **Java**. At some point I decided to make the artifact available for a broader audience. As a result I required a deployment flow to automatically upload the **.jar** files to an artifactory of my choice.

# The silly approach

I just wanted to publish artifacts, but not on each commit. Instead, I decided to go for a multi-[branch](https://git-scm.com/docs/git-branch) configuration like this:

![silly-git-flow](/images/silly-git-flow.svg)

We have a `master` branch where we commit on. When we decide to release an artifact, we manually (locally) merge into `deploy`, push the changes and [Travis CI](https://travis-ci.org/) will pickup the build, thanks to the `.travis.yml` file configured:
```yml
language: java

services:
  - docker

jdk:
  - openjdk7

cache:
    directories:
        - $HOME/.m2

branches:
  only:
  - deploy

env:
  global:
    - COMMIT=${TRAVIS_COMMIT::8}

before_install:
  - export CH_VERSION=$(docker run -v $(pwd):/chime bitbrain/chime:latest CHANGELOG.md version)
  - export CH_TEXT=$(docker run -v $(pwd):/chime bitbrain/chime:latest CHANGELOG.md text)
  - mvn versions:set -DnewVersion=$CH_VERSION
  - chmod +x deployment/deploy.sh

install:
  - ./deployment/deploy.sh
```
The configuration file has a `before_install` section. In there we use a tool written by me called [chime](https://github.com/bitbrain/chime). We run this tool as a Docker container to extract version and changelog information from a `CHANGELOG.md` provided. For example, we have a file like this:
```markdown
# Version 1.1

This is version 1.1 description.

* some patchnotes
* more patchnotes

# Version 1.0

This is version 1.0 description.

* some patchnotes
* more patchnotes
```
The resulting environment variables would look like this (after `before_install` execution):
```bash
> echo $CH_VERSION
Version 1.1
> echo $CH_TEXT
This is version 1.0 description.\n* some patchnotes\n* more patchnotes
```
Using this approach we can define versions within a `CHANGELOG.md` file and it should automatically pick up the latest version from the file. We update the version of the library temporarily via `mvn versions:set` with the latest version extracted from the changelog file.

Afterwards we run a `deploy.sh` script during the `install` stage:
```bash
mvn deploy \
    -DskipTests \
    --settings deployment/settings.xml
```
I configured a custom Nexus inside my `settings.xml` to push my artifacts to. Users of my library then would need to add the repository via repository statement in their configuration.

# Silly approach, lots of problems

The approach worked fine, however it was not as refined as I hoped it to be:

- my custom Nexus caused SSL Certificate issues on some Windows and Mac machines when trying to download dependencies
- it is truly cumbersome to manually switch between `master` and `deploy` locally and merge all the time
- the current multi-branch approach causes lots of merge commits (if we are not able to fast-forward)
- sometimes you would forget to switch from `deploy` back to `master` locally and suddenly commiting on a wrong branch
- not easy to have a mapping from version to commit history (missing [tagging](https://git-scm.com/book/en/v2/Git-Basics-Tagging) functionality)
- Travis only builds the `deploy` branch, not the master branch. We never truly compile each commit on `master` nor run any tests

After putting some thought into it I came up with a much better, more light-weighted approach.

# One branch to rule them all

I eventually decided to get rid of the `deploy` branch after all. All commits should go to `master` and should be tested and/or deployed on Travis. I would keep the `CHANGELOG.md` version extraction and do additional checks to avoid deploying already deployed versions twice:

![simple-branch-flow](/images/simple-branch-flow.svg)

The new flow is executed whenever a new commit is pushed onto `master`:

1. checkout from SCM
2. extract version and changelog from `CHANGELOG.md`
3. Sign artifacts - this is required in order to push artifacts to [Maven Central](https://search.maven.org/)
4. Install/Deployment
   * verify if the latest git tag is different than version extracted. Run deployment when extracted version from `CHANGELOG.md` is newer
   * when there is no difference in version, the version had been deployed already. Instead, run unit tests and generate code coverage reports
5. Upload additional artifacts
   * happens on **after_install** stage
   * when the new version is different than the latest tag create a new [Github Release](https://help.github.com/articles/creating-releases/) which will automatically create a new tag with the current version
   * upload [latest Javadoc](http://bitbrain.github.io/braingdx/docs/latest/) to Github

In the rest of this article I will explain how some of these steps work in detail.

# Sign your Artifacts

In order to upload your artifacts to Central you require to sign your artifacts with a GPG signature. I recommend [reading this tutorial](http://www.debonair.io/post/maven-cd/) to learn how to do that.

In the tutorial the author explains that we want to encrypt our `codesigning.asc` file to prevent strangers from stealing it. We do that by installing and using the **travis** CLI:
```bash
gem install travis
travis login
travis encrypt-file codesigning.asc
```
When running this I discovered that Travis would fail the build:
```
bad decrypt
gpg: invalid radix64 character AE skipped
gpg: invalid radix64 character 13 skipped
gpg: invalid radix64 character F5 skipped
gpg: invalid radix64 character BE skipped
gpg: invalid radix64 character C5 skipped
gpg: invalid radix64 character AF skipped
gpg: invalid radix64 character C8 skipped
gpg: invalid radix64 character 14 skipped
gpg: invalid radix64 character 82 skipped
gpg: invalid radix64 character DF skipped
...
```
What is going on?! I followed the tutorial step by step and for me it did not want to work. After hours of desperation and crying on the floor I found [something on Github](https://github.com/travis-ci/travis-ci/issues/6936). Apparently, on my Windows 10 machine the `travis encrypt-file` operation is broken and produces a corrupted encryption. WOW! Thanks for that. How did I fix it? A little bit of Docker 🐳 for the win. Let's create a `Dockerfile`:
```dockerfile
FROM ubuntu
RUN apt-get update && apt-get install ruby ruby-dev gcc g++ make && gem install travis
VOLUME /test
COPY codesigning.asc /test/codesigning.asc
ENV GITHUB_TOKEN=""
CMD ["bash", "travis login --github-token $GITHUB_TOKEN && travis-encrypt codesigning.asc && echo codesigning.asc.enc"]
```
And then:
```bash
# Build our image
docker build -t encrypt-asc .
# Encrypt the file and produce it
docker run -e GITHUB_TOKEN=xxx encrypt-asc > codesigning.asc.enc
# Clean up the dirty mess!
docker rm encrypt-asc -f
```
After committing the **codesigning.asc.enc** file Travis was able to decrypt the GPG private key which is required to sign the artifacts.

# Check if version is changed

In order to check if the version has changed I did the following during the `before_install` stage:
```bash
export LATEST_TAG=$(git describe --abbrev=0 --tags)
```
After that we can deploy or just run the tests, depending of the version:
```bash
if [ "$LATEST_TAG" != "$CH_VERSION" ]; then
echo "Latest deployed version=$LATEST_TAG not equal new version=$CH_VERSION. Deploying..."
mvn deploy \
    -Psign \
    --settings deployment/settings.xml
else
echo "Skipping release! $LATEST_TAG already released to Nexus! Running tests..."
mvn clean test -T4
fi
```
# Pushing new release to Github

In order to push the new release automatically to Github, we do the following on the `after_install` stage:
```bash
cd $HOME
git config --global user.email "sirlancelbot@gmail.com"
git config --global user.name "Sir Lancelbot"
git clone --quiet --branch=master https://${GITHUB_TOKEN}@github.com/bitbrain/braingdx

# Replacing line endings in body
body=$(sed -E ':a;N;$!ba;s/\r{0,1}\n/\\n/g' <(echo "$CH_TEXT"))
json='{"tag_name":"'$CH_VERSION'","target_commitish":"'$TRAVIS_BRANCH'","name":"Version '$CH_VERSION'","body":"'$body'","draft":false,"prerelease":false}'

curl -X POST \
-u bitbrain:$GITHUB_TOKEN \
-d "$json" https://api.github.com/repos/bitbrain/braingdx/releases
```
This will ensure that a latest release has been pushed (including latest changelog content from `CHANGELOG.md` and Github will automatically create a tag for us. Next time we run the pipeline, it won't deploy again since the tag has been updated.

# Uploading Javadoc to Github pages

Uploading Javadoc to Github pages is a little bit more tricky. I want to have the following requirements fullfilled:

* each version is persisted in Github pages, e.g. `/docs/1.0.0`
* the latest docs should be available via `/docs/latest`

```bash
# Create temporary directory
mkdir cd $HOME/docs
cd $HOME/braingdx
mvn versions:set -DskipTests -DnewVersion=$CH_VERSION -T4 && mvn javadoc:javadoc -DskipTests -T4
cd $HOME/docs
# Copy generated Javadocs into a temporary directory
cp -r $HOME/braingdx/core/target/site/apidocs/* $HOME/docs

# Cleanup
rm -rf $HOME/braingdx/*
cd $HOME/braingdx

# Checkout Jekyll branch and create new folder with new version
git checkout gh-pages
mkdir -p $HOME/braingdx/docs/$CH_VERSION
cp -r $HOME/docs/* $HOME/braingdx/docs/$CH_VERSION

# Copy also into "latest" docs
rm -rf $HOME/braingdx/docs/latest
mkdir -p $HOME/braingdx/docs/latest
cp -r $HOME/docs/* $HOME/braingdx/docs/latest

# Add everything and push!
git add -f *
git commit -m "Travis build $TRAVIS_BUILD_NUMBER - update Javadoc"
git push -fq origin gh-pages && echo "Successfully deployed Javadoc to /docs"
```

[Click here](http://bitbrain.github.io/braingdx/docs/latest/) to see an example of the generated page created.

# Conclusion

The new flow allows me to have:
- single branch
- every commit is tested in Travis
- I control deployments via `CHANGELOG.md`
- Github releases and tags are automatically created
- Javadoc is automatically created
- on release, artifacts are signed and pushed to Maven Central

Do you have feedback? Make sure to follow me [@bitbrain_](https://twitter.com/bitbrain_) on **Twitter** and [@bitbrain](https://github.com/bitbrain) on **Github**.
