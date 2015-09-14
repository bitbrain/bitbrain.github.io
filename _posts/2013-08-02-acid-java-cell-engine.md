---
layout: post
title: acid - java cell engine
excerpt: How about a framework to draw cells? Games made out of cells are wonderful.
---

### The idea

I had experimented with several mechanics to create great 2D graphics. When I started with [LibGDX](http://libgdx.badlogicgames.com/), I had no idea how powerful this framework could be. Although I've written 2D graphics with [Slick2D](http://slick.ninjacave.com/), but deploying stuff on browser and android as well can be pretty amazing.

I had the idea to create a simple snake game. Years before I created [SnakeDOS](http://dev.my-reality.de/snakedos/), a very basic version of snake (collecting greeny things), everything in Windows console. There was one problem: it worked only on Windows (OS dependency, omg). Additionally it looked differently on some windows versions, which was in fact, pretty annoying. This week I thought about a framework which is able to provide those kind of console graphics, only OS independent. As a result, I decided to make it with Java. Another problem were graphics: How to write a graphics framework, independent of other libraries? I started to implement some nice interfaces to avoid dependency problems and finally, I proudly present you: [acid](https://github.com/MyRealityCoding/acid), a java cell engine for everyone.

It natively supports the following libraries/frameworks:

* Slick2D
* LibGDX
* JavaFX
* Java2D

I'm currently working on the javaFX stuff. Additionally there are some coloring problems in LibGDX, but I will solve that later on.

### How to use it

On [the official example page](https://github.com/MyRealityCoding/acid#example) is a short example how simple **acid** works. Acid works state based. Here is a small snippet how to create the acid logo:

{% highlight java %}
acid = new Acid(new SlickBufferedRenderer());
acid.backgroundColor(0.2f, 0.2f, 0.2f);
acid.setIndexX(8);
acid.setIndexY(6);
acid.setCellSize(50);

acid.color(0.2f, 1f, 0f);
acid.set(1, 1);
acid.color(0.4f, 0f, 0.6f);
acid.set(2, 2);

// Set the element to the middle
acid.setPosition(gc.getWidth() / 2f - acid.getWidth() / 2f, 
                 gc.getHeight() / 2f - acid.getHeight() / 2f);
{% endhighlight %}

The main aim was to create a very fast cell engine without any complex types or objects. Furthermore acid is only a framework to draw stuff. You can't ask acid advanced stuff - use it to draw cells, complete games can be made with, e.g. LibGDX.

### Back to the roots

I wrote acid in a couple of hours (I had the framework completely in mind before) and I'm working on a new snake version now. I call it *AcidSnake*, because it is made with acid, and it's some kind of *Snake* as well. The game will be available soon on Android Market and downloadable from the web. Stay tuned, I've to code like a drunken monkey.
