---
layout: post
title: Generating infinite worlds
excerpt: Static content is not the only way. Infinite worlds like in Minecraft can be a big experience.
---

### Why infinite worlds?

In the most games you play the game with pre-defined content like some levels, maps or stages. After you have finished the game, the content still being the same. As a result, the game becomes boring after playing it a long time. What if you could generate the content, e.g. the world where you play in. Here comes the infinite part: by variying the content, based on the players position, it's almost garanteed that the player is fully entertained.

### Infinite is not exactly infinite

If you ever have played Minecraft, you can walk in any direction as long as you want. In early versions, the world was limited. When arriving at some point on the world, large mountains with deep caves appeared. Nowadays, Minecraft has a seamless, infinite world - but this isn't the exact case: Every time a chunk has been stored to disk, it takes space. In fact, the size of your generated, chunk based world depends on the disk space of your hardware, because every visited chunk is saved to disk.

A simple reason for this is to saving progress - you can generate an infinite world without limitation, but then you have to live without saved content.

### First approach

Before you can create your world, you have to think about, how to set the content. At first, give the player the decision, how the content should be: by defining him a seed:

{% highlight java %}
// Seed, set by the user
String seed = "jndksjndkjnd9238r-293rhh";

// Number which indicates the content
long hash = seed.hashCode();
{% endhighlight %}

Now you're able to define content, based on the hash number. Simply create functions which depend on the hash to define positions, colors and so on. It's a big deal to write a framework - maybe I'm going deeper into it later on.

### Using libraries

I highly recommend to use libraries. I've written [a chunk system](https://github.com/MyRealityCoding/chunx) API which provides basic behavior in order to generate "infinite" worlds. I'm currently improving this library and releasing a first version (1.0) in two weeks.
