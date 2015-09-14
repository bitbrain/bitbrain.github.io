---
layout: post
title: Craft - the game
excerpt: A game where you can craft (almost) everything. Be an engineer, an alchemist or a jeweler. It's your choice!
---
After a long summer I decided to move on with game development. I ended up with a game idea while playing [Wildstar](http://www.wildstar-online.com/en/). The crafting system there is quite good, nevertheless it gets boring over time. I always wanted to create a game where you can craft everything just by using basic materials like water, mercury or coal. If you ever have played [Alchemy](https://play.google.com/store/apps/details?id=me.zed_0xff.android.alchemy&hl=en) on Android you get it.

### Technology

The game is developed with [LibGDX](http://libgdx.badlogicgames.com/), my favorite game development library for [Java](https://www.java.com). Furthermore I'm using more technologies to improve the workflow:

* [Google Guice](https://github.com/google/guice) is a DI (Dependency Injection) framework for better code scaling
* [MBassador](https://github.com/bennidi/mbassador) for fast event bus handling
* [jpersis](https://github.com/MyRealityCoding/jpersis) provides easy data mapping for game data
* [Google Play Services](https://developer.android.com/google/play-services/index.html) for achievements and online leaderboards

It is much easier to implement new features by using the technologies above.

### Professions

There are currently three professions planned:

* **Jeweler**: The jeweler is capable of creating... yeah.. jewels! (how obvious)
* **Engineer**: the engineer creates complex machines and systems, mainly focused on micro platines
* **Alchemist**: the alchemist is focused on alchemy stuff. Awesome alchemy stuff

### Game mechanics

There will be a lot of items. To create such item you have to craft them (as expected, duh). By default each player has a set of basic items which are infinite. I made that decision to avoid that a player runs out of materials. New items can be crafted by using recipes. Each recipe has a cooldown and needs a set of items as materials. Now comes the interesting part: you don't just click on a button and your item has been crafted. Haha. Hell no. You have to follow steps (like swiping over the screen) to fullfill the requirements. If all requirements (working steps) are fullfilled, the resulting item is received. Sounds simple, doesn't it?

### Future plans

Now I'm mainly focused on game architecture and UI/Sound stuff. Deeper mechanics will be implemented soon. Sounds interesting? [Contact me on twitter](https://twitter.com/tweetmyreality) for more information!
