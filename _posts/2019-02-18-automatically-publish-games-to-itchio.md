---
layout: post
title: How to automatically publish your game to itch.io
description: This tutorial explains how you can very easily deploy your game to itch.io
---
# Motivation

> why should I even upload my games automatically?

This is a good question. Simple answer is, that during a gamejam you can fully concentrate on building your game. Especially, when the deadline is coming closer, you simply have to commit and push your changes, in order to trigger an automatic deployment of your game to itch.io:

1. make a code or asset change change locally
2. commit your change via Git and push it to Github
3. TravisCI automatically picks up your change and builds your game
4. TravisCI automatically pushes the new build to itch.io

This tutorial shows you how to do that!


# Prequisites

For this tutorial, we use the following technologies:

- [Github](https://github.com/) to version control our game code
- [TravisCI](https://travis-ci.org) as a build agent to build our game
- [itch.io](https://itch.io) to host our game
- [Butler](https://itch.io/docs/butler/pushing.html) to upload our game builds to itch.io

# Setup Github repository

If not already done, create a Github repository to host our source code:

![create-new-github-repo](/public/media/create-new-github-repo.png)

# Setup itch.io

Before we can start uploading our first game, we need to create an itch.io game project:

![create-new-game-project](/public/media/create-new-game-project.png)

After your project is created, head over to your account settings to generate a new API key. This key is required so other services such as TravisCI are able to communicate with itch.io.

![create-new-api-key](/public/media/create-new-api-key.png)

# Prepare TravisCI deployment

Once the repository exists and itch.io is prepared, we need to prepare TravisCI. This consists of the following steps:

1. create deployment script
2. commit and push travis.yml
3. prepare TravisCI project
4. setup `BUTLER_API_KEY`

# Create deployment script

This script will take your artifacts and push it to itch.io. Create a new file, called `deploy.sh`:
```bash
#!/bin/bash

set -e
set -o pipefail

if [[ -z "${BUTLER_API_KEY}" ]]; then
  echo "Unable to deploy! No BUTLER_API_KEY environment variable specified!"
  exit 1
fi

prepare_butler() {
    echo "Preparing butler..."
    download_if_not_exist http://dl.itch.ovh/butler/linux-amd64/head/butler butler
    chmod +x butler
}

prepare_and_push() {
    echo "Push $3 build to itch.io..."
    ./butler push $2 $1:$3
}

download_if_not_exist() {
    if [ ! -f $2 ]; then
        curl -L -O $1 > $2
    fi
}


project="bitbrain/mygame"
artifact="mygame.jar"
platform="windows-linux-mac"

prepare_butler

prepare_and_push $project $artifact $platform

echo "Done."
exit 0
```
This script first checks, if the environment variable `BUTLER_API_KEY` is defined. This variable can be setup within Travis and is required for itch.io to authenticate your game upload.
Afterwards we define a bunch of helper functions. Then we download the latest version of **butler** and upload the game with it. Please ensure to configure the correct `project`.

# Setup .travis.yml

This file is required by TravisCI to understand how to build your game. For example, you can setup a Java environment (for Java games) or Objective-C environment (for Unity games). TravisCI ensures that this environment is set up and it will build your game:

```yml
language: objective-c
osx_image: xcode8.1
rvm:
- 2.2

script:
   echo "this is my game" > mygame.jar

after_script:
  chmod +x deploy.sh && ./deploy.sh
```
Feel free to create a different .yml for Java, C++ or even Android! Read more about that [in the official docs](https://docs.travis-ci.com/user/reference/overview/).

# Prepare TravisCI project

Now we have to configure our TravisCI project. Head over to https://travis-ci.org, authenticate with your Github account and you should be able to import your Github project from there. Once imported, head over to the settings to configure environment variables:

![travis-ci-head-to-settings](/public/media/travis-ci-head-to-settings.png)
![travis-ci-add-butler-api-key](/public/media/travis-ci-add-butler-api-key.png)

# Run the build

Congratulations! You successfully set up the pipeline. Let's run the build to see how your game automatically publishes:
```
Preparing butler...
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 19.6M  100 19.6M    0     0  31.6M      0 --:--:-- --:--:-- --:--:-- 31.6M
Push windows-linux-mac build to itch.io...
• For channel `windows-linux-mac`: pushing first build
• Pushing 16 B (1 files, 0 dirs, 0 symlinks)
✓ Added 16 B fresh data
✓ 86 B patch (no savings)
• Build is now processing, should be up in a bit.
Use the `butler status bitbrain/mygame:windows-linux-mac` for more information.
Done.
```
Your latest game version is now available on itch.io:

![itch-io-my-game-upload](/public/media/itch-io-my-game-upload.png)
