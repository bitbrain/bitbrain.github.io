---
layout: post
title: How to design a smart progress bar
excerpt: Progress bars are very common. Showing your progress dynamically can be a great thing.
---
As mentioned in [this article](/2013/07/09/how-to-implement-a-design.html), I'm currently working on the new design of [ShapeLoggers](http://shapeloggers.de). I've built many progress bars in the past, mostly to show progress on my games. It was implemented with PHP and a little bit of CSS.

### How it works

The first idea was to have a look over your current development status. Therefore you need to know how the progress of your game is so far. As a result, you need a data source in your game folder (in the repository). I've decided to use a simple XML file to store data like:

* Game title
* Game author
* Current game version
* Current game phase (dev, alpha, beta, release)
* Current phase status (given percentage)
* URL to the repository (source code)

Afterwards I wrote a PHP script which fetched the data above and then [generated a progress bar](http://galacticum.my-reality.de) afterwards. This system was pretty nice but now it's time for a new way of thinking. Designing plugin wise and share the code with other people.

### Make it dynamic

The system above is pretty nice but using new technologies (HTML5, jQuery, Ajax) can improve the process. Instead of writing PHP code, you can use the plugin in a simple HTML file by writing the following code:

{% highlight html %}
<div class="progress"></div>
<script type="text/javascript">
	$('.progress').progress('path-to-your-xml-file');
</script>
{% endhighlight %}

That should be everything. Afterwards it is possible to style your element in CSS:

{% highlight css %}

/* Colorize the main object */
.progress {
   background-color:#333;
   border:1px solid #111;
}

/* Colorize the progress */
.progress .value {
   background-color:green;
}

/* Colorize the percentage */
.progress .percentage {
   color:white;
}
{% endhighlight %}

As you can see, it should be pretty easy to use the progress bar.

### Be social

The whole thing is just a simple idea in my head. To make it real, I've to create a repository first on GitHub. Afterwards [you can join me](https://github.com/MyRealityCoding) to make that thing!

