---
layout: post
title: Why I still use Java for gamedev
---

There is an technology, running on billions of devices every single day: Java.
Many developers (beardy hipsters) claim this technology belongs to the past, game engines like [Unity](https://unity3d.com/) and [Unreal Engine](https://www.unrealengine.com/en-US/what-is-unreal-engine-4) are the future! Still, there is one man who hasn't lost hope. Every single day he is building real games, not written in C# or Javascript. Not even Python or scientific C++. He is just using [Java](https://www.java.com/en/). And this person is me.

![unreal-engine](/public/media/unreal-engine-room.jpg)

This picture isn't showing my living room. This is Unreal Engine. Playable in VR. With 60fps at 4K resolution! Awesome, right?

## The simple alternative

Unfortunately I didn't create this. But hey, I can show you something amazing I did back then, in Java:

![example-game](/public/media/example-game.jpg)

Okay, I get you. Why am I doing this to myself? Why not just using a game engine like everyone else? It would have so many advantages to use any game engine of my choice compared to this ancient crap I am doing:

* complete 2D/3D editors for modeling
* inbuilt physics, lighting and rainbow machine 🌈
* amazing graphics, shader editors
* almost no programming skillz required! Just drag and drop all your stuff!
* and much more...

Well, the answer is quite simple: I like to remind myself everyday where I started. My first game was written in [Delphi Pascal](https://en.wikipedia.org/wiki/Delphi_(programming_language)). Back then I even didn't know much about [OOP](http://searchmicroservices.techtarget.com/definition/object-oriented-programming-OOP) or [Design Patterns](https://sourcemaking.com/design_patterns). The only thing I cared about was moving pixels on the screen. It was truly inspiring and it didn't change, even eight years later.

## Getting started with gamedev

Many games have been completed by now and the majority of those games is written in "pure" Java. Not exactly pure Java, I am using libraries to access [OpenGL](https://www.opengl.org/) but generally I can say that most games are 100% written by hand, without an actual game engine or predefined templating.

How do I do this? To make a game in Java you basically need three things:

1. Java skills
2. Basic understanding of math (ideally vectors, functions and matrices)
3. Know how to set/move pixels on the screen and how to handle input

Point 1 and 2 are straight-forward: if you know basically how Java works you can write programms which do stuff for you:
```java
public class HelloWorld {
  public static void main(String[] args) {
    if (args.length > 0 && args[0].equals("hey")) {
      System.out.println("Hello World!");
    } else {
      System.out.println("You didn't greet me! WOW!")
    }
  }
}
```
In addition you need to know math. For example you could write an immutable [vector](http://www.bbc.co.uk/education/guides/zxd26sg/revision) in Java with basic addition and subtraction functionality:
```java
public class Vector {

  private final float x, y;

  public Vector(float x, float y) {
    this.x = x;
    this.y = y;
  }

  public Vector plus(Vector other) {
    return new Vector(x + other.x, y + other.y);
  }

  public Vector minus(Vector other) {
    return new Vector(x - other.x, y - other.y);
  }
}
```
You can do that with many different concepts and in the end you have a small library to implement math into your game. For example, turning around a player or calculating the distance between two game objects can be simply done by using vectors.

## Giving birth to your game

What about moving pixels on the screen? Java already has libraries like [Swing](https://en.wikipedia.org/wiki/Swing_(Java)) or [JavaFX](https://en.wikipedia.org/wiki/JavaFX) and I could have easily used that to write games. It seems crazy to go down the Java path for game development but I am not completely stupid. All gamers have powerful graphics cards and it would be absolutely mental not to use them. These GUI libraries rely on Software Rendering by default, which means the CPU does all the work. So we need a better solution if we want to make a highly performing 3D shooter or the next WoW.

> Miguel, why not using an Engine then?

Beeep, wrong question! Why bothering with a complex game engine when you can just include a small library which provides all those features for you?

* complete 2D/3D editors for modeling
* inbuilt physics, lighting and rainbow machine 🌈
* amazing graphics, shaders
* and much more...

Sounds familiar? I'll present to you [libgdx](https://libgdx.badlogicgames.com/):

![libgdx-icon](/public/media/libgdx-icon.png)

Yes, this library let me do all this fancy game engine stuff, but in Java! Everything rendered on my **GTX 93849 Extreme Ultra HD Power 5000** Graphics Card (without FPS limit an initial empty game gets ~15000fps, whoops). Nowadays I takes me 30 minutes to create a simple 3D Snake game in Java. In under 200 lines of code. Without touching any game engine. You're not believing me? Then you have to wait for a next blog article.

## Why libgdx?

This library allows me to combine it with my Java knowledge to write games the same way as you would write a small Swing application. Furthermore it is cross-plattform compatible, so the Java game runs [on Windows, MacOS, Linux, Android and even iOS](http://libgdx.badlogicgames.com/features.html)!

Moreover I really love Java. During the past years I worked with several programming languages, frameworks and libraries, however Java always was the easiest and simplest to work with. For example, C# is great as well. It even has features like [Delegates](https://msdn.microsoft.com/en-gb/library/aa288459(v=vs.71).aspx) and [Properties](https://msdn.microsoft.com/en-us/library/x9fsa0sw(v=vs.100).aspx) which I really miss in Java. Also C++ is great to work with. Compile natively and have very low overhead, compared to Java. A simple SDL game written in C++ (proc-gen, without assets) can be around ~40kb, while the same game in Java is easily 8MB in size (all required .jar libraries need to get packed in the fat-jar). That's an increase of 2000%. Still, we're living in 2017 and file size doesn't matter anymore (mostly). In terms of resource management [Java doesn't do that well compared to C++](https://benchmarksgame.alioth.debian.org/u64q/compare.php?lang=java&lang2=gpp) but as I said, our computers are monster machines, we just don't care anymore.

## Conservative and old-fashioned?

Do I enjoy Java too much? Probably yes. Could I save lot of time when writing larger games by using an actual game engine? Maybe. Do I want to learn various game engines by heart? Definitely. I am not saying that I blindly refuse to do something different than Java. Regardless, it's the most fun way to do what I love.

> Do what you want independent of technology, library or game engine. It does't matter how you do it. It doesn't matter how long it takes to get there. The only thing which matters is that you are doing what you love.

\- Miguel
