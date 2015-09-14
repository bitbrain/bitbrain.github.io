---
layout: post
title: Work on icebearjs
excerpt: You need information about your current development status? I have something for you!
---
It's been a long time since I worked with technologies like [JQuery](http://jquery.com/). Some of you may have recognized that I'm currently working on a plugin, called **icebearjs**. The idea was to create UI components which display information about your project you're currently working on. Those information can include the current development phase (alpha, beta, release), your software version, team members and/or patchnotes. 

A long time ago, I started to create chunky PHP code to generate those things. I realized that it's pretty annoying to copy&paste all the time, whenever I want to have a new project time. Therefore I developed **icebearjs**, with only one line of javascript (per component).

### Getting started

At first you have to include the latest version of **icebearjs** in your HTML head:

{% highlight html %}
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"> </script>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"> </script>
<script type="text/javascript" src="http://dev.my-reality.de/jquery/icebearjs/1.0.1/jquery.icebearjs.min.js"> </script>
{% endhighlight %}

Afterwards you need a meta file. I've chosen a .json format in order to use jsonp properly (to handle domain crossing). The meta file can look like this:

{% highlight json %}
{
    "name" : "name-of-your-app",
    "author" : "name-of-the-author",
    "url" : "url-of-your-app",
    "version" : "0.8",
    "phase" : "beta",
    "progress" : "73",
    "phaselist" : [
        "dev", "alpha", "beta", "release"
    ]
}
{% endhighlight %}

This meta file has to be inside of your repository where your software/game is stored (it has to be public in order to access it!). Finally, you can write some HTML to create a progress bar which displays the current development status:

{% highlight html %}
<!-- Inside of your <body> tag -->
<div class="progress"> </div>

<!-- Here comes the magic -->
<script type="text/javascript">

$('.progress').icebearProgress({
    datasource : 'location-of-your-metafile/meta.json'  
});
</script>
{% endhighlight %}

That's it! JQuery will do the magic for us and we can focus on much more important things (like gamedev).

### Issues with Browsers

During development I had to realize that working with web stuff can be pretty annoying. The first problem was to fetch the data correctly. One big problem is the following error:

{% highlight text %}
Origin http://your-server is not allowed by Access-Control-Allow-Origin.
{% endhighlight %}

To avoid this kind of error, simply write a small proxy script:

{% highlight php %}
<?php
if (!isset($_GET['url'])) die();
$url = urldecode($_GET['url']);
$protocol = parse_url($url);
$url = $protocol['scheme'] . '://' . str_replace($protocol['scheme'] . '://', '', $url);
echo file_get_contents($url);
?>
{% endhighlight %}

Then after you must change the datasource URL in your HTML code:

{% highlight javascript %}
$('.progress').icebearProgress({
    datasource : 'proxy.php?url=http://location-of-your-metafile/meta.json'  
});
{% endhighlight %}

Furthermore there are some styling errors. JQuery isn't browser independent at all. That's a huge drawback. Here is a small example what I mean:

{% highlight javascript %}
// returns 30 on Chrome
// returns 32 on Firefox
('.someDiv').height();
{% endhighlight %}

I'm working on that problem to solve the wrong appeareance on different browsers. 

### What comes next

First, I've to fix bugs. Then I want to implement more components to **icebearJS**, like a team view (to show who's on board) and a patchnotes generator (to show all new updates). All information shall be stored in the meta file above. 

### Where to contribute

You can [fork the project on GitHub](https://github.com/MyRealityCoding/icebearjs) to make hints or improvements. You're welcome!
