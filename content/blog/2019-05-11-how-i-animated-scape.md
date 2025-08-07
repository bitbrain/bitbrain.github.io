---
title: "How I animated scape"
published: "false"
tags: ['gamedev', 'devlog', 'scape', 'pixelart', 'pyxel', 'tiled']
date: "2019-05-11T10:00:00+00:00"
---

In a [previous blog post](/2019/05/10/one-finger-to-rule-them-all.html) I talked about game design decisions I made in my most recent game project called [scape](https://github.com/bitbrain/scape). You might notice that I have a particular animation style. At the current stage of development scape looks like this:

![scape-animation-style](/images/scape-animation-style.webp)

The game did not always look like that! I started creating initial mockups back in 2018. Back then all I knew was the following:

* since I binged [Mr. Robot](https://en.wikipedia.org/wiki/Mr._Robot) during that time I really wanted to craft a "hacker" themed game
* I love the neon aspect of synthwave and cyberpunk - the game should have vibrant colours as well
* you should be able to play the game like [Yoo Ninja](https://apkpure.com/yoo-ninja-free/com.RunnerGames.game.YooNinja_Lite) which is one of my favourite smartphone games ever created
* I thought it'd be pretty cool to play as a little virus, infecting a computer system

After I thought about the initial design elements of the game I used Pyxel to create a first mockup. Keep in mind, this mockup is from 2018:

![scape-initial-mockup](/images/scape-initial-mockup-from-2018.webp)

Right after creating this mockup [I pushed my first commit](https://github.com/bitbrain/scape/commit/3fb3170379aec277f9dc39dc556f1b9e7cb61a51) to Github. Within a couple of hours a prototype has been created with all game mechanics implemented: **jumping** and **flipping gravity**:

<video autoplay controls loop preload="auto">
<source src="https://video.twimg.com/tweet_video/Dk5G0cIWsAAK_Mu.mp4" type="video/mp4" />
</video>

Next I am going to explain how I approached the player animation.

# Animating the player

The player is animated by using a 8x3 spritesheet with a sprite size of 8x8 pixel. All in all, spritesheets in scape are really tiny and I use a virtual camera ingame to zoom into the szene in order to magnify the pixel effect.

This is how the spritesheet looks like:

![player-animation](/images/scape-animation-character-spritesheet.webp)

The first row is used for basic movement animation. The second row is animating wall climbing. When the player is climbing a wall and moves just vertically, that animation is activated. Also, when a player is cornered or blocked, the third row is used as an animation.
The animation itself is looping in a so called [LOOP_PINGPONG](https://libgdx.badlogicgames.com/ci/nightlies/docs/api/com/badlogic/gdx/graphics/g2d/Animation.PlayMode.html#LOOP_PINGPONG) fashion. All animation ingame is done by [libgdx](https://libgdx.badlogicgames.com). When the player is jumping though, I am pausing the animation and resetting it to the initial index to achieve some kind of idle effect.

# Level animation

More complex to animate are the level animations themselves. Each frame is handdrawn by me within [Pyxel](https://pyxeledit.com). This is really time-consuming but it is also fun to see a sprite coming "to live".

I have created several spritesheets, each of them has a particular style or purpose:

* **vertical spritesheet** contains sprites which are vertically aligned. Animation frames are created from left to right of the spritesheet
* **horizontal spritesheet** contains sprites which are horizontally aligned. Animation frames are created from top to bottom of the spritesheet
* **block spritesheet** contains square sprites. Animation frames are created from left to right of the spritesheet.

After a while I realised that it probably was a mistake creating horizontal spritesheets at all. The simple reason is extendability. In order to build my levels I use the famous [Tiled Editor](https://www.mapeditor.org). In there you can import spritesheets and define animations. Unfortunately, Tiled is counting sprite indices from left to right, row by row. When I want to add more animations to my spritesheet, I have to increase the image size of it, which has an impact on all indices since Tiled requires to recompute those. That can lead to visual glitches and it is not clear what Tiled is doing behind the scenes. Be careful animating sprites vertically!

> Within spritesheets, always animate frames from left to right and grow your spritesheet vertically in order to avoid glitches in editors such as Tiled!

Within a spritesheet itself an animation is structured as follows:

![spritesheet-animation](/images/scape-animation-vertical-tileset.webp)

In order to achieve an affect of energy lines cycling through the wires, I carefully picked a pattern with decreasing colour vibrancy which travels through the tile itself. This is how the tile looks animated in Tiled:

![spritesheet-animation-animated](/images/scape-animation-tile-animation.webp)

Then I simply have to create hundreds of these handdrawn animations, sounds simple, doesn't it? Well, I realised after a while that it breaks the immersion when the animations are not in sync. This made things far more complicated since it means that I not only have to animate each tile but also I have to consider sibling tiles to fluidly integrate with eachother.

# Animating bytes

When playing scape, the player has to collect so called **bytes**. Animating those bytes was much simpler than taking care of individual level tiles:

![byte-spritesheet](/images/scape-animation-byte-spritesheet.webp)

In-game I then used [Universal Tween Engine](https://github.com/AurelienRibon/universal-tween-engine) to animate slight scaling. To improve visual fidelity I also added particle effects which I had created by using [the 2D particle editor of libgdx](https://github.com/libgdx/libgdx/wiki/2D-Particle-Editor):

![particle-editor](/images/particle2d-editor.webp)

Within my game code I then rendered these particle effects over the animated and scaled sprites. Later on I also implemented lighting to my game. At that point, I purposfully attached pink lights onto the byte objects so they are visible from the far!

I really enjoy doing manual animation since you have more control over each individual pixel on the screen! The game will release later this year. In the meantime you can already download a pre-release version. Feel free to give me feedback either here or on [twitter](https://twitter.com/bitbrain_)! If you are especially interested in further development on this project, make sure to [checkout this Moment page](https://twitter.com/i/moments/1127137651549667328) I created.

<iframe src="https://itch.io/embed/357509?bg_color=15171A&amp;fg_color=05fecf&amp;link_color=f20179&amp;border_color=15171A" width="100%" height="167" frameborder="0"></iframe>
