---
layout: post
title: "Creating braingdx: orthogonal tilemaps"
description: Fist part of a blog-series about my gamejam framework called braingdx.
tags: braingdx libgdx java gamedev tiled tmx
---
Welcome to my new blog series where I talk in more detail about a personal project of mine called [braingdx](https://github.com/bitbrain/braingdx). It builds upon [libgdx](https://libgdx.badlogicgames.com) and extends it [with game engine features](https://github.com/bitbrain/braingdx#features) to avoid writing boilerplate-code.

In this part I will present how the tiledmap integration works in **braingdx** compared to **libgdx** itself. As mentioned before, this framework uses **libgdx** and its APIs in order to integrate tiled maps.

## Why extending already existing tiledmap support?

Before I started writing my own framework, I would use something like this to get tiledmaps drawn onto screen:
```java
/* somewhere in your create() method */
this.camera = new OrthographicCamera();
camera.setToOrtho(false, Gdx.graphics.getWidth(), Gdx.graphics.getHeight());
camera.update();

this.tiledMap = new TmxMapLoader().load("orthogonal-map.tmx");
this.tiledMapRenderer = new OrthogonalTiledMapRenderer(tiledMap);

/* somewhere in your render() method */
camera.update();
tiledMapRenderer.setView(camera);
tiledMapRenderer.render();
```
This will render your multi-layered map onto the screen. Job is done then. Or  is it? Before I even started thinking about writing a tiledmap integration, I had to know the challenges ahead of me. I realised that using a simple `OrthogonalTiledMapRenderer` does not do the trick at all: the problem are game objects itself.

> a game object is a stateful, dynamic object within a game world which represents anything the player can interact with: characters, items, events, etc.

Given a multi-layered map like this in [Tiled](https://www.mapeditor.org/):

[![los-screenshot](/public/media/legend-of-studentenfutter-screenshot.jpg)](https://bitbrain.itch.io/the-legend-of-studentenfutter)

Do you note the bridge? How can I achieve that the player gets either rendered below the bridge (when walking beneath it) or is walking on the bridge? What about automatic collision detection? How can I prevent that the player is able to fall off the bridge, but can walk beneath it without problems? All these challenges can not be solved by using `OrthogonalTiledMapRenderer`.
Instead, you have to write your own z-index ordering logic. Don't worry though, these challenges have been solved within **braingdx**:
```java
/* within braingdx you simply have this */
@Override
public void onCreate(GameContext2D context) {
   TiledMap map = context.getAssetLoader().get(
         "orthogonal-map.tmx",
         TiledMap.class
   );
   // Obtain the tiledmap manager from the game context
   TiledMapManager tiledMapManager = context.getTiledMapManager();
   TiledMapContext tiledMapContext = tiledMapManager.load(
         // the map we want to load
         map,
         // passing the internal Camera object
         context.getGameCamera().getInternal()
   );
}
```
That's all you need! In this blog series I am going to show you how I achieved that.

## How braingdx renders stuff onto the screen

Before we get to the meat, let us talk a bit about how my framework actually displays stuff and why it does it that way. This is important to know so it becomes easier to integrate tiled maps directly into the framework:

![pipeline](/public/media/braingdx-render-pipeline.png)

The framework renders different layers onto each other which result in the final frame:

1. First, it renders the **background** layer, this is mostly something like a parallax layer or a static background image.
2. Onto the background, we can now render the **game world**. Simply put, the game world contains dynamic **game objects** which can change attributes like position, shape, rotation etc. dynamically
3. The lighting is rendered onto all previous layers.
4. At last, we can now render the UI onto the screen

Since this order is static, where do we render our tiled map? Rendering it as part of the background layer does not allow us to render game objects behind particular layers. So, we have to render the tiledmap somehow as part of the game world.

## Bringing everything together

Initially, I never wanted to write my own framework. Reinventing the wheel should be avoided whenever possible. We can save a ton of time by just using what already exists. However, in case of tiled maps I could not find a single solution which satisfies my requirements.

When creating this framework, I did not want to force new APIs onto the user - many parts are just re-using existing [libgdx](https://libgdx.badlogicgames.com) APIs. In case of tiled maps, I found a very simple solution to my problem:

> **braingdx** treats each tiledmap layer as an individual **game object** and renders them as part of the **world layer**.

Each **game object** has its own z-index, which defines the order in which game objects are rendered. When drawing tiledmap layers as part of the gameworld render process, it allows us to have dynamic ordering. However, this begs a question:

**What should be the z-index of a particular tiledmap layer?**

The formular looks as follows:
```
zIndex = (layerIndex + 1) * rows - yIndex
```
The `layerIndex` is the number of the layer, counting from `0` upwards. The `rows` attribute is the number of total rows as part of the tiled map. Finally, the `yIndex` is the vertical index of the cell, the particular game object is currently on.

As a concrete example, let's imagine the following setup:

* a `10x10` orthogonal tiledmap with a tile resolution of `32x32` pixels
* the map consists of `2` tiled layers and a single object layer in between those
* a player object is located on the object layer at position `x = 60, y = 110`

**braingdx** will automatically compute the z-index according to the given properties.

At first, the framework calculates the so called `yIndex` as follows:

```
yIndex = floor(110 / 32) = 3
```
So the game object is positioned at a `yIndex` of **3**. The framework does not have a concept of object layers, since each game object is rendered separately, depending on their position. Instead, **braingdx** only keeps tiledmap layers. A game object is always translated onto the layer underneath. So, a tiledmap layer above the game object will always be rendered above the game object. As a result, the `layerIndex` of the assigned tiledmap layer is **0**.

This results to the following computation:
```
zIndex = (0 + 1) * 10 - 3 = 7
```
So the player at its current position will have a `zIndex` of **7**. This is all done by **braingdx** internally. Since game objects are rendered in the order of their `zIndex` attribute, it is ensured that game objects can be dynamically drawn before or after a particular tiledmap layer.

## What about tiledmap layers then?

We have learned how **braingdx** computes `zIndex` of game objects and that all game objects are drawn in the order of that index value. However, what about the layers itself? You might remember, that **braingdx** treats an entire tiledmap layer as a single game object. This means that **braingdx** does the following when loading tiled maps:

1. iterate over all layers of the tiledMap
2. in case of a object layer, add a new game object to the game world and assign all the properties such as dimensions, position, type etc. to the game object
3. in case of a tiledmap layer, add a new game object to the game at position `x = 0, y = 0` and set the game object to `active = false`. This ensures that the layer itself is excluded from collision detection

Since the framework separates the rendering of game objects, we have to define an own `GameObject2DRenderer` for our tiledmap objects:
```java
class OrthogonalMapLayerRenderer extends GameObject2DRenderer {

   private final TiledMapTileLayer layer;
   private final OrthographicCamera camera;
   private final TiledMap map;
   private OrthogonalTiledMapRenderer renderer;

   OrthogonalMapLayerRenderer(
         TiledMapTileLayer layer,
         TiledMap map,
         OrthographicCamera camera) {
      this.layer = layer;
      this.camera = camera;
      this.map = map;
   }

   @Override
   public void render(GameObject object, Batch batch, float delta) {
      // we dynamically create the renderer for performance/testing reasons
      if (renderer == null) {
         renderer = new OrthogonalTiledMapRenderer(map, batch);
      }
      AnimatedTiledMapTile.updateAnimationBaseTime();
      renderer.setView(camera);
      renderer.renderTileLayer(layer);
   }
}
```
The `render` method will be called whenever our tiledmap layer object gets drawn. Since we want to ensure that each layer has its own renderer, we have to generate the game object type for the tiledmap layer and register it to the **RenderManager**:
```java
String id = UUID.randomUUID().toString();
context.getRenderManager().register(id, renderer);
```

## Conclusion

A lot of time is wasted during gamejams sorting out render issues with tiledmaps. Modern game engines like **Unity** or **Unreal Engine** will do that for you - however for us Java folks there is not a simple way. Most of the time, we copy-paste together config from gamedev forums or Github, but we always had to re-invent the wheel each time. With **braingdx** this changes everything!

[Checkout braingdx](https://github.com/bitbrain/braingdx) and see for yourself: it can save you a lot of time when participating in gamejams!
