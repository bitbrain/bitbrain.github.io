---
layout: post
title: Creating 3D worlds with Java and libGDX
excerpt: All about libGDX and its awesome 3D features
---
In November 2015 I started together with a friend a new project for our university, called [scope](https://github.com/MyRealityCoding/scope). Basically it is a space game where you as a player have to collect so called "energy". After you collected enough energy you can deliver it at the center of the map in order to gain points. After a certain amount of points has been reached you win the game. (Un)fortunately there is an opponent who tries the same thing. So be careful when gathering collectibles because an opponent could possibly shoot at you to steal all your stuff!

Since I am very used to [libGDX](https://libgdx.badlogicgames.com/) in general we decided to use it as a major technology. In my recent projects this library was only used to display 2D graphics and managing game states but now we had to use its 3D features. Sadly it is only a library, not an engine like [Unity](https://unity3d.com/), so there are no inbuilt physics, editor, model view features.

# Loading and displaying 3D models

The first thing we did was creating a test model in [Blender](https://www.blender.org/) in order to display it with libGDX. In fact it is very easy to load for instance *.obj type models:

{% highlight java %}
// Loader to load 3D objects
ModelLoader loader = new ObjLoader();
// Model object which contains all vertex data
Model model = loader.loadModel(Gdx.files.internal("data/ship.obj"));
// Independent model instance which can be transformed
ModelInstance instance = new ModelInstance(model);
{% endhighlight %}

In order to display the model we just need to add the following:

{% highlight java %}
// Setting up the camera
cam = new PerspectiveCamera(75, Gdx.graphics.getWidth(), Gdx.graphics.getHeight());
cam.position.set(1f, 1f, 1f);
cam.lookAt(0,0,0);
cam.near = 1f;
cam.far = 200f;
cam.update();

// Creating a new batch
ModelBatch modelBatch = new ModelBatch();

// Start rendering the instance
modelBatch.begin(cam);
modelBatch.render(instance, null);
modelBatch.end();
{% endhighlight %}

That's it! The model will be displayed properly. We now had to add behavior to camera movement (camera tracking and rotation by considering yaw, pitch and roll of the related game object).

# Standard OpenGL lighting

The library also provides standard OpenGL lighting. Since OpenGL only supports 8 light sources at maximum things go crazy when adding more lights than supported. To avoid such things you need to write your own lighting shader or make use of an already written shader and apply it properly to your codebase.

To enable lighting for your objects you need a so called `Environment`:

{% highlight java %}
Environment environment = new Environment();
environment.set(new ColorAttribute(ColorAttribute.AmbientLight, 0.4f, 0.4f, 0.4f, 1f));
environment.add(new DirectionalLight().set(0.8f, 0.8f, 0.8f, -1f, -0.8f, -0.2f));

/* later in the render code */
modelBatch.begin(cam);
// Consider the environment for lighting
modelBatch.render(instance, environment);
modelBatch.end();
{% endhighlight %}

This enabled you to use dynamic lighting very easily without writing fancy lighting shaders!

# Shader support

libGDX has no own shaders provided but supports [GLSL shaders](https://en.wikipedia.org/wiki/OpenGL_Shading_Language) in general. I recommend to use [libgdx-contribs](https://github.com/manuelbua/libgdx-contribs) by [dudez](https://github.com/manuelbua) to use shaders in your game. He already created a lot of shaders like motion blurring, vignette, anti-aliasing and radial zoom.

Here is a small example how to use the shaders:

{% highlight java %}
ShaderLoader.BasePath = "postprocessing/shaders/";
PostProcessor processor = new PostProcessor(true, true, true);
Zoomer zoomer = new Zoomer(Gdx.graphics.getWidth(), Gdx.graphics.getHeight(), RadialBlur.Quality.High);
zoomer.setBlurStrength(0f);
zoomer.setZoom(1f);
processor.addEffect(zoomer);
Vignette vignette = new Vignette(Gdx.graphics.getWidth(), Gdx.graphics.getHeight(), false);
processor.addEffect(vignette);

/* later in the render code */
processor.begin();
// Here comes the render code from the previous example
modelBatch.begin(cam);
modelBatch.render(instance, environment);
modelBatch.end();

processor.render();
{% endhighlight %}
There are far more options to enable shaders. They are very useful to create beautiful graphics because pixels on the screen are directly manipulated by them. Also they are very fast, too!

# Putting everything together

Now it is up to you to make use of the awesomeness of libGDX. For each game state you create an own screen state. After that define routes thorough the screens and which state should be achieved when. For my next project I will use Unity (because an engine becomes very useful when having a huge code and asset base), but for smaller 3D games and gamejams libGDX is just perfect!
