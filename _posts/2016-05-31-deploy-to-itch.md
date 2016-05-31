---
layout: post
title: Deploy your games to itch.io
excerpt: This guide shows you how to easily upload your games automatically to itch.io
---
Before we start I have to tell you what you need to continue:

* an active [Github account](https://github.com/join)
* an active [itch.io account](https://itch.io/register)
* connected [TravisCI](https://travis-ci.org) with your Github Account
* a finished game which you want to upload to itch.io

After this guide you are able to:

* build and upload your game automatically to itch.io on a git push
* use [Butler](https://github.com/itchio/butler)

The basic goal of this guide is to auto-deploy your games just by using a single git push command locally. You do not need to build your game or upload it anywhere. The toolchain does it for you. This is very useful and saves a lot of time, since time always has been a limited resource!

The basic toolchain works like follows:

1. git push to your Github repository
2. TravisCI gets notified and starts a new build of your game
3. After the game has been built on the TravisCI server it starts a deployment script
4. The previously built game is pushed to itch.io
5. Your game is now updated officially on itch.io

Let's get started.

# 1. Create a new game entry on itch.io

Follow [the official guide on itch.io](https://itch.io/docs/creators/getting-started#the_dashboard) to setup your game. For this guide we use a fake game with the following data:

**account name:** gamedeveloper<br/>
**game name:** Mega Awesome Turtles<br/>
**game id on itch.io:** mega-awesome-turtles<br/>

# 2. Generate your API key

In order to let TravisCI actually talk to itch.io you need to generate an API key on the itch.io page.

<span style="color:#ff7070;">Note: do not share the API key with anyone. Keep it safe and secret! Be careful!</span>

To generate a new API key go to itch.io and navigate to *Account Settings->API keys->Generate new API key*. Remember the key or copy it because we will need it on a later step.

# 3. The deployment script

This is the most crucial step. The "heart" of the toolchain will upload your game to itch.io. It uses [Butler](https://github.com/itchio/butler) under the hood, a commandline helper for itch.io, written by [Amos Wenger](https://amos.me). The following script will build your game and deploy it automatically to itch.io:
{% highlight bash %}
!#/bin/bash

# 3.0 Build game here
# Generate your game like game.exe or game.zip
# e.g. for Java libGDX apps:
gradlew desktop:dist
mkdir game
mv desktop/build/libs/desktop-1.0.jar game/mega-awesome-turtles.jar
zip -r game.zip game
rm -rf game/

echo "Deploying to itch.io.."
# 3.1 Download and setup butler
wget http://dl.itch.ovh/butler/linux-amd64/head/butler
chmod +x butler
touch butler_creds
# Read the itch.io API key from the environment
# and store it temporarily into a local file
echo -n $ITCH_API_KEY > butler_creds

# 3.2 Upload game
# Note to set the correct account and game information here
# Check https://itch.io/docs/butler/pushing.html for more information
./butler push game.zip gamedeveloper/mega-awesome-turtles:windows-linux-mac -i butler_creds

# 3.3 Cleanup
echo "Cleanup.."
./butler logout -i butler_creds --assume-yes
rm butler
{% endhighlight %}

Make sure to generate a valid *game.zip* or *game.exe* file which can be passed to the push command of butler. Save this file as *deploy-desktop.sh* in your root folder of your repository.

# 4. Setting up TravisCI

In order to let TravisCI build your game after a git push you need a *.travis.yml* file in your root folder of your Github repository which looks like this:
{% highlight yaml %}
language: java
jdk:
  - openjdk7

before_cache:
  - rm -f $HOME/.gradle/caches/modules-2/modules-2.lock
cache:
  directories:
    - $HOME/.gradle/caches/
    - $HOME/.gradle/wrapper/

script: ./deploy-desktop.sh  

branches:
  only:
    - master
{% endhighlight %}

TravisCI will execute our bash script and execute the game whenever we make a push to the *master* branch.

# 5. Setting the itch.io API key

In order to make the deployment script working, TravisCI needs to know a environment variable, called **ITCH_API_KEY**. This needs to be done in the [repository settings as described here](https://docs.travis-ci.com/user/environment-variables/#Defining-Variables-in-Repository-Settings).

<span style="color:#ff7070;">Note: Do not set the API in the deployment script directly! Others will use it to communicate with itch.io on your behalf. Keep the key secret!</span>

# 6. Finishing up

Commit all your setup and let the magic happen. Go to the [TravisCI dashboard](https://travis-ci.org) and take a look at your build. If you see something like this, you are settled!

{% highlight text %}
Deploying to itch.io..
--2016-05-29 18:14:01--  http://dl.itch.ovh/butler/linux-amd64/head/butler
Resolving dl.itch.ovh (dl.itch.ovh)... 104.27.134.141, 104.27.135.141
Connecting to dl.itch.ovh (dl.itch.ovh)|104.27.134.141|:80... connected.
HTTP request sent, awaiting response... 200 OK
Length: 18471644 (18M) [application/octet-stream]
Saving to: `butler'
100%[======================================>] 18,471,644  62.7M/s   in 0.3s    
2016-05-29 18:14:02 (62.7 MB/s) - `butler' saved [18471644/18471644]
• For channel `windows-linux-mac`: last build is 1286, downloading its signature
• Pushing 42 MB (59 files, 7 dirs, 0 symlinks)
✓ Re-used 95.02% of old, added 2.1 MB fresh data
✓ 2.0 MB patch (95.34% savings)
Cleanup..
+--------------------------------------------------------------+
|                        IMPORTANT NOTE                        |
+--------------------------------------------------------------+
| Note: this command will not invalidate the API key itself.   |
| If you wish to revoke it (for example, because it's been     |
| compromised), you should do so in your user settings:        |
|                                                              |
| https://itch.io/user/settings                                |
+--------------------------------------------------------------+
:: Do you want to erase your saved API key? [y/N] y (--assume-yes)
You've successfully erased the API key that was saved on your computer.
Done.
{% endhighlight %}

You've got questions or remarks? Let me know if I could help you out!
