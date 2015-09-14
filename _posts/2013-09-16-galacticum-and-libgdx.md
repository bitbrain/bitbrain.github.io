---
layout: post
title: Galacticum and LibGDX
excerpt: Slick2D is a good graphics library but LibGDX is much better. That's the reason why I'd to rewrite something.
---
Basically, [Galacticum](http://galacticum.my-reality.de) is written in Java and [Slick2D](http://slick.ninjacave.com/). A big problem was the library itself, because some nice methods didn't work as expected. For instance I wrote a small lighting system (vector based distance calculation). Therefore I needed to manipulate the color of each edge of a texture. Unfortunately, Slick doesn't support this directly. As a result, I had to write my own method for that purpose.

After moving many things around, I got stuck in the ocean of code. I've moved the game code to [GitHub](http://github.com) and left it there. After focusing on other work I decided to give the game another try. 

### Moving to LibGDX

[LibGDX](http://libgdx.badlogicgames.com/) is an awesome game library for everyone. You can easily deploy your games on many plattforms (Android, Browser, Desktop, iOS) without caring about how each deployment has to work. Therefore I decided to rewrite the entire game in order to deploy Galacticum on Android as well.

### Infinite space

The core of Galacticum is an infinite space which can be discovered. I had written a small chunk system inside of the game code which was pretty messy. Furthermore I would need the chunk system for other games as well. I created a whole new library, called [chunx](https://github.com/MyRealityCoding/chunx), to provide chunk generation in order to provide infinitely generated game content.

After almost finishing the library, I moved back to Galacticum, initialized LibGDX and now I'm back: I'll continue the work on Galacticum right now!

### New website

Moreover I'm working on a completely new defined web design for Galacticum as well as a new design for the game itself. No more pixels to come!
