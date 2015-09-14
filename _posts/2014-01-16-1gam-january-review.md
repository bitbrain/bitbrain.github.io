---
title: One Game A Month (January review)
layout: post
excerpt: My first game for One Game A Month 2014 is done. It only took me 20 hours to make it!
---

![plox-image](/data/plox-wallpaper.png)

Well, that escalated very quickly. My first intention was to try to write at least one or two games this year, because I initially thought I would fail. I couldn't imagine that I have nailed it! One week ago I bought some energy drinks, beer and nice food due to make a small gamedev weekend. It was awesome to see how fast I could produce playable code. I'm now pretty familiar with [LibGDX](http://libgdx.badlogicgames.com/) and its features.

### Concept

The theme for January is *respawn*. I wanted some kind of space game. You have to defend your planet with a high-end spaceship. Thousands of aliens try to invade your home. If you fail, you loose everything! That's it. Simple, isn't it? The initial idea was taken from last year's [Mojam](https://mojang.com/2012/02/humble-bundle-mojam-2/) event.

![plox-image](/data/plox-ingame.png)

As you can see I created a simple setup without complex game mechanics like physics or lighting. That is one of the main reasons why I was able to write this game in a short time period. I also created a simple color design, by mixing ocean blue with neon space colors. The whole game looks very flashy, what is very awesome.

### Features

The game features the following:

* 2 enemy types: slow green aliens, fast kamikaze aliens
* powerups: protectors, imortality, power boost, heals, speed boost
* Multi platforming: PC, MacOS, Android, Browser (problematic)
* Different controls: I created different controls for individual devices
* Google PlayService integration: Achievements and online ladder

You may notice that I wrote a "problematic" after the Browser feature. I'll explain shortly what I mean by that.

### Issues

There were almost no issues during the problem, except during the process of deployment. Exporting the game is very easy with [Eclipse](http://www.eclipse.org/), because LibGDX provides such methods to improve your workflow. The biggest issue rose when I tried to build the HTML project. How does that exactly work with Java? Well, LibGDX uses [GWT](https://de.wikipedia.org/wiki/Google_Web_Toolkit) in order to generate plain javascript code. That javascript code can be executed by browsers. The problem is, that GWT requires all source files to build the project properly. That worked well until I decided to use classes like ```CopyOnWriteArrayList``` or ```ConcurrentHashMap``` in my game. I use them, because I remove entities from the game while I'm iterating though them. To get rid of those ```ConcurrentModificationException``` it's highly recommended to use such implementations. It makes life easier! The problem is: javascript doesn't really like concurrency. During the compiling process it complains about some missing classes. When I define them manually in my code, it whines again. It's a complete mess!

Another big problem is handling input on my **Nexus7** device, precisely spoken: the back button. In [LibGDX](http://libgdx.badlogicgames.com/), you have to "register" the usage of the back button:

{% highlight java %}
Gdx.input.setCatchBackKey(true);
{% endhighlight %}

The problem is, it doesn't seem to work properly on my device. I think I have to investigate the problem later on.

### What's next?

You can grab the newest version of the game, called "Plox" [here](https://play.google.com/store/apps/details?id=de.myreality.plox). Next week starts [Global Game Jam](http://globalgamejam.org/), I'm so excited! 


