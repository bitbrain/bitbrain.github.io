---
layout: post
title: Level Generation in Mindmazer
description: This article shows how I generated levels for my libgdx game and how I applied seeding to generate them.
published: true
---
Today I want to talk about my project [mindmazer](https://github.com/bitbrain/mindmazer). In this simple 2D puzzle game the player has to remember a certain path to progress to the next stage. When starting this project I had to decide if I give the player a static list of predefined levels. After some time I decided against it and went for a procedural generation approach. In this article I am going to explain how these levels are generated.

# The Level

Typical ingame level look like this:

![mindmazer-level-simple](/public/media/mindmazer-level-simple.jpg)

You notice that the shapes are quite simple and the path is easy to remember. Therefore, as more you progress in the game as more complex the level become:

![mindmazer-level-complex](/public/media/mindmazer-level-complex.jpg)

How to generate those levels? Well, first of all I am using [libgdx](https://libgdx.badlogicgames.com) for [all my games](/2017/08/17/why-I-still-use-java-for-gamedev). This Java library allows me to draw things on the screen and to define a framework to run my game with. Unfortunately, this library does not give me an "out-of-the-box" level generator. Thus, I had to write an algorithm myself.

# Biom Data

Let us first describe how a level should get defined. I did not want to have a "random" algorithm which just appends more cells into random directions. The result would be a randomly formed snake where I wouldn't have any control over. At least I wanted **control** about various level aspects. Each level is composed out of multiple parts, so called **biomes**. A biom is defined Java code. Let us take a look at a typical L-Shape:
```text
x
x
x x
```
This L-Shape can be represented by a `byte` array:
```java
byte[] L_SHAPE = {
   1, 0,
   1, 0,
   1, 1, 2
};
```
You might notice that there is an extra entry in the array:
```java
byte numberOfColumns = L_SHAPE[L_SHAPE.length - 1];
```
Basically we are telling our level generation to always consider the last entry in a byte array as information about the number of columns in this specific biom. This is all we need as input. We now have full control over which parts should get used to compose a level.

# Biom Conversion

We need to prepare the input data (byte arrays) into a format the algorithm understands. This format is a so called `Biom` class with the following properties:

* `byte[][] data` the biom as a 2-dimensional byte array (without metadata)
* `int startX` the x index on the biom where the player could possibly start
* `int startY` the y index on the biom where the player could possibly start
* `int endX` the x index on the biom where the player could leave
* `int endY` the y index on the biom where the player could leave
* `int length` the number of cells inside a biom
* `int width` the width of a biom (number of cells)
* `int height` the height of a biom (number of cells)

We now call a so called `BiomFactory` which creates a Biom object for us:
```java
Biom biom = biomFactory.create(L_SHAPE);
```
If you are interested in how this factory works internally [check out the code on Github](https://github.com/bitbrain/mindmazer/blob/master/core/src/de/bitbrain/mindmazer/levelgen/BiomFactory.java).
