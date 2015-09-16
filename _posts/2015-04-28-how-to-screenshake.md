---
layout: post
title: How to screenshake with<br/>Universal Tween Engine
excerpt: When it comes to game feel make use of screen shakes. How to implement that awesome feature? I'll show you my way!
---
# Prequisites

To get the examples work in this guide, you need:

- [libGDX](http://libgdx.badlogicgames.com)
- [Universal Tween Engine](https://code.google.com/p/java-universal-tween-engine/)

# Introduction

During the development on Craft I worked on a custom screen shake implementation. Screen shakes are a great tool to make that you game feels more "guicy". A very good example of a nice implementation is [Nuclear Throne](http://nuclearthrone.com):

They use it a lot to create the feeling that you actually do something brutal.

# Theory

In theory we do 3 things:

- shrinking a circle from its maximum radius to down to 0
- on each iteration, select a random point on the current circle
- move the camera between the points

Visually it looks something like this:

![camera-scaling](/blog/img/camera-scaling.png)

# Code example

Here is an example how I did the screen shake in Java:

{% highlight java %}
public class ScreenShake {

  // Interval in miliseconds between each movement
  public static final float STEP_INTERVAL = 0.05f;

  // the camera we actually want to shake
  private Camera camera;

  // our tween manager provided by Universal Tween Engine
  private TweenManager tweenManager;

  // We use a random to select an angle at random
  private SecureRandom random = new SecureRandom();

  static {
    // it is important to tell Universal Tween Engine how
    // to translate the camera movement
    Tween.registerAccessor(Camera.class, new CameraTween());
  }

  // Here we're getting our dependencies
  public ScreenShake(TweenManager tweenManager, Camera camera) {
    this.tweenManager = tweenManager;
    this.camera = camera;
  }

  // strength is the maximum radius
  // duration is the time in miliseconds
  public void shake(float strength, final float duration) {
    // Calculate the number of steps to take until radius is 0
    final int STEPS = Math.round(duration / STEP_INTERVAL);
    // Radius reduction on each iteration
    final float STRENGTH_STEP = strength / STEPS;
    // Do not forget to kill previous animations!
    tweenManager.killTarget(camera);
    for (int step = 0; step < STEPS; ++step) {
      // Step 1: Let's find a random angle
      double angle = Math.toRadians(random.nextFloat() * 360f);
      float x = (float) Math.floor(Sizes.worldWidth() / 2f + strength * Math.cos(angle));
      float y = (float) Math.floor(Sizes.worldHeight() / 2f + strength * Math.sin(angle));

      // Step 2: ease to the calculated point. Do not forget to set
      //         delay!
      Tween.to(camera, CameraTween.X, STEP_INTERVAL).delay(step * STEP_INTERVAL).target(x).ease(TweenEquations.easeInOutCubic).start(tweenManager);
      Tween.to(camera, CameraTween.Y, STEP_INTERVAL).delay(step * STEP_INTERVAL).target(y).ease(TweenEquations.easeInOutCubic).start(tweenManager);

      // Step 3: reduce the radius of the screen shake circle
      strength -= STRENGTH_STEP;
    }
  }
}
{% endhighlight %}
