---
layout: post
title: Galacticum&#58; Retrospective September
excerpt: Development has started again. Featuring a new core and introducing a brand new API for java developers.
---
It's been a long time since I started with the game project [Galacticum](http://galacticum.my-reality.de). The idea was to create a space game with an infinite universe, everything just in 2D graphics. After a break I started development again and now I present you the newest development progress.

### Current progress

As mentioned [in another post](/2013/09/16/galacticum-and-libgdx.html) I tried to move from **Slick2D** to **LibGDX** for a bunch of reasons. In the [current branch](https://github.com/MyRealityCoding/galacticum/tree/0.1) I'm working on the new creation core. The old code was terribly written and therefore I had to improve it a lot - literally speaking I just created code including software patterns such as factories, observers and mediators. The old code required a lot of parameters to load an universe. The new system provides a ```Context``` class which contains all subsystems of the current universe:

{% highlight java %}
// Get a new configuration from disk
ContextConfiguration config = SharedConfigurationManager.getInstance().load("my_universe_id");

// Create a new factory to create contexts
ContextFactory factory = new SimpleContextFactory();

// Let us create a new context
Context context = factory.createContext(config);
{% endhighlight %}

That's it! Now it is possible to use the same code for both, universe creation and loading. The ```SharedConfigurationManager``` class provides much more functionality like deletion and storation of context data. I tried to keep it simple. As a result I want to create meta data for each created universe (context):

* **name**: the name of the current context
* **id**: unique id of the context
* **seed**: seed of this context
* **root**: root path of this context (directory)
* **chunk path**: path to the chunks of this context
* **player path**: path to the players file

As you can see it is now very easy to extend the game by extending meta data.

### New API

It's not implemented yet, but I think about an API to extend and modify [Galacticum](http://galacticum.my-reality.de) pretty easily. The idea is (like in [Bukkit](http://bukkit.org) for Minecraft) to provide plugin development in order to modify the game code. Here is an example how a small plugin could look like:

{% highlight java %}
public class GalacticumPlugin extends Plugin {

   @Override
   public void onChunkCreate(Chunk chunk) {
   
      Seed seed = getSeed();
      
      SpaceshipFactory factory = new SpaceshipFactory(seed);
      Entity mothership = factory.create(chunk.getX(), chunk.getY(), ShipType.MOTHERSHIP);
      chunk.addEntity(mothership);
   }
   
}
{% endhighlight %}

By enabling this simple plugin it is possible to add an additional mothership to each chunk. There are much more possibilities such as destructions and explosions. I need to think about it much more to provide an extendable plugin API.

### Look into the future

As you can see I'm really busy with all this kind of functionality. The first version [0.1](https://github.com/MyRealityCoding/galacticum/issues?milestone=1) will be released this year. It will consists the following features:

* Infinite generated space
* universe loading
* destruction system
* graphics
* shaders
* physics
* plugin API

After creating the first version I'm going to implement first spaceship generation and the battle system. I think the game will be playable at version 0.2! Stay tuned.


