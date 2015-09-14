---
layout: post
title: How to implement a design
excerpt: CSS is a great tool for web design. Especially with Sass and Bootstrap.
---

It's time for a new post. All studying is done and I can feel free to work on projects. One of these projects is such a great web thing, called [ShapeLoggers](http://shapeloggers.de), a social network for bodybuilders and nutrition addicts. You can make calculations and interact with others, to share dreams, to share success.

### Creating a design

My job was to implement a smart design which is responsive to large screens and small smartphones. My thought was to write CSS code once and have access to all responsible features. To do so, you can use things like [Sass](http://sass-lang.com/) and [Bootstrap](http://twitter.github.io/bootstrap/), for providing nice tooling due to make your application much smarter.

We focused on a very colorful and responsible design. The old layout had dark colors (gray, red and black), so we've tried to avoid these kind of "dark" feeling. We've decided to use bright colors as white and orange. Furthermore ShapeLoggers is not only for fitness, it's for hard and strong people with visions. In fact, using dark gray (#333333) can be very helpful.

At first, I've created a design scheme with [Gimp](http://gimp.org) (I'm using Ubuntu, therefore Photoshop isn't really an option). Afterwards I created a new style.css file and deleted the old deprecated one (it belonged to the old design). Then, I did something special: Dividing the CSS into sections to have a better overview later on:

* Main Menu
* Header Box
* Content
* Footer
* Forms
* Tables
* General styles

By doing so it's pretty easy to find regarding style definitions in the CSS file. 

### Make your CSS smarter

CSS is a very powerful tool, but very limited in logical terms. It would be nice to have control over colors, defining variables and nested statements would be a nice option to have. Therefore I'm using [Sass](http://sass-lang.com/). It provides variables, calculations and functions inside of CSS. The Sass interpeter creates a new *.css file from the target (*.scss file).

### Don't repeat yourself (DRY)

As a programmer you haven't that much time. Additionally we are pretty lazy and even a CSS coder can avoid repetition by using tools like Sass. The system is based on PHP/HTML (no particular framework has been used). The old design used something like this:
{% highlight html %}
<div class="element"><img class="icon" src="my-icon.png" alt="icon"/> Some text</div>
{% endhighlight %}
to display icons and graphics. There is one problem: by doing so, you have to mix design with implementation code. That should not be the case! There lies a wonderful solution benearth us:
{% highlight html %}
<div class="element icon">Some text</div>
{% endhighlight %}
{% highlight css %}
.icon {
   background-image: url(my-icon.png) left center no-repeat;
   padding-left:30px;
}
{% endhighlight %}
Our new solution has some advantages:

* We can change the appeareance of the icon without modifying any source files
* Seperated implementation code (PHP/HTML) from design (CSS)
* Easy to extend
* Avoiding repetitive errors by using only one CSS definition

### It is time to work 

Now, I have to implement all the stuff. I've passed all exams, so I can focus now directly on the upcoming work. Please visit [ShapeLoggers](http://shapeloggers.de). If you have further questions, you can read the most on their website. 




