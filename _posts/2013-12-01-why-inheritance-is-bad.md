---
title: Why inheritance is bad
layout: post
excerpt: Inheritance is a nice feature of object oriented programming languages. I tell you, why it is not a life preserver.
---

The first thing that we all learned, when starting with a modern programming language like Java, C# or C++ is **inheritance**. Perhaps you guys know the ```Car``` example from a lecture: A car can have wheels, an engine and a *Mercedes* is some kind of car. As a result you could write:

{% highlight java %}
// Java example of a Mercedes
public class Mercedes extends Car {

   public Mercedes() {
      super("Mercedes Benz");
   }
}
{% endhighlight %}

You saved a lot of time, because you don't need to write a car for each type. Just inherit it from super type ```Car``` and you're done. So, why this post? Inheritance is awesome, isn't it? No, not really. When you move to larger projects with very common depenency changes, you get a problem: *Extending a class means, extending a dependency!*

### Composition over inheritance

To get rid of the inheritance problem, we can use a powerful mechanism, called [composition](http://en.wikipedia.org/wiki/Composition_over_inheritance). Additionally you can use a [various set of software patterns](http://en.wikipedia.org/wiki/Software_design_pattern).

A good example is a game which uses physics. A first approach looks like this:

{% highlight java %}
public class Entity extends Body {
   // Here it goes
}
{% endhighlight %}

The problem is, that the ```Entity``` class which represents a core element in a game is now depending on ```Body```, which may be a class from an extern physics library such as [Box2D](http://box2d.org/).

A better approach whould be to have 2 different classes:
{% highlight java %}
public class Entity {
   // here comes the entity logic
}

public class Body {
   // here comes the physics logic
}
{% endhighlight %}

That looks a little bit weird, because now we have another problem: we need to keep this two classes in synchronization. Therefore we could implement listeners to update them respectively. Furthermore, you get a huge advantage: You are able to exchange ```Body``` with another physics implementation without modifiying your ```Entity``` code. I've done it the same way in my game. I first used [Phys2D](https://code.google.com/p/phys2d/) and moved on to [box2dlights](https://code.google.com/p/box2dlights/) in order to provide lighting properly. Moving from one dependency to another just took me about 10 minutes. With inheritance I'd to modify all my code to keep free of errors. By using composition the whole system contains more classes, but has a better structure though:

 * each class has only one single responsibility
 * Smaller code parts which is easier to test
 * Easier to extend
 * Less dependencies

There are much more advantages but that's enough reading for a day.


