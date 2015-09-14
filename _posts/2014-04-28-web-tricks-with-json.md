---
layout: post
title: Web tricks with JSON and jQuery
excerpt: Asynchronous communication is a big thing in Web 2.0. I'll show you some fancy tricks!
---
Years ago I wrote web applications only with PHP, because I thought it would be the only way to do so. Now I got a little bit smarter and I want to share my knowledge with you all, guys! You need 2 things to do fancy stuff: A so called *data source* (JSON) and a service which transforms this data and displays it properly (jQuery). In the upcoming tutorial I want to show you, how to write a simple jQuery plugin and how to use it in combination with JSON.

### Motivation

The good thing about loading data with jQuery (or, precicely spoken: Ajax) is asynchronicity. You can display the rest of the website, while some special data (which needs a long preperation time) is loaded "in the background". This speeds up your website and also allows you to load new data without refreshing the current page (which saves computation time and is more user-friendly). 

### Defining the data

In this example we want to load different sorts of fruits from an external server. These fruits are defined in the file *fruits.json* as follows:

{% highlight json %}
{
	"fruits" : [
		{
			"name" : "Apple",
			"color" : "#00ff00"
		},
		{
			"name" : "Cherry",
			"color" : "#ff0000"
		},
		{
			"name" : "Blueberry",
			"color" : "#0000ff"
		}
	]
}
{% endhighlight %}

These are just 3 delicous fruits with a name and a color. Now we want to do some javascript "voodoo" to display the fruits in the jQuery way of life!

### Writing a plugin

In jQuery you have to be aware of namespaces. Because there are so many plugins outside, you have to "secure" your plugin. Our basic plugin structure looks like this:

{% highlight javascript %}
(function($) { 
    $.fn.fruits = function(datasource) {
        return this;
    }; 
}(jQuery));
{% endhighlight %}

By doing so we are able to call the .fruits(datasource) method on each valid DOM object. Now we have to make an asynchronous Ajax call. Additionally we want to ensure to things:

* Displaying loaded fruits in their color
* If data not reachable, show error message

As a result, we can write the plugin as follows:

{% highlight javascript %}
(function($) {
 
    $.fn.fruits = function(datasource) {
        
        var fruits = $(this);

        $.ajax({
                type: "GET",
                url: datasource,
                dataType: "json",
                crossDomain: true,
                async: true,
                jsonp: false,
                success: function(data) {
                     
                    fruits.html('<h2>Fruits</h2>');

                    for (var i = 0; i < data.fruits.length; ++i) {
                        var elem = data.fruits[i];
                        fruits.append('<div style="color:' 
                        + elem.color + '">' + elem.name + '</div>');
                    }
                },
                error: function(error, msg) {
                    fruits.html("Couldn't load fruits!");
                }
            });
            return this;
        };
 
}(jQuery));
{% endhighlight %}

We iterate through the data and append colored divs to the element on which .fruits() gets called. It's important to understand, that the the Ajax code is executed in parallel. Therefore you can do other operations after this plugin call without waiting!

### Creating the view

We have to use our plugin properly. We don't need more like a simple *index.html* page without any PHP stuff. 

{% highlight html %}
<html>
<head>
	<title>Fruit Plugin</title>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
	<script src="jquery.fruits.js"></script>
</head>
<body>
	<div class="fruitContainer">Loading fruits...</div>

	<script type="text/javascript">
		$('.fruitContainer').fruits('fruits.json');
	</script>
</body>
{% endhighlight %}

As you can see the outcome is pretty minimal and without much boiler plate code. Notice, that this code is executed on client side (even the jQuery plugin).

### Conclusion

The good thing about this way of working is that you pass the work of displaying content to each client separately instead of let the server do all the stuff. This leads to a clean way of dividing work. You reduce workload and increase speed, performance and usability at the same time. The time is over where you have to call: ```echo "This is hard work for the server"```. 

Also think a little bit further: instead of using a local *.json* file you could do an operation on an external server and provide json output (like [json_encode](http://www.php.net/manual/de/function.json-encode.php) in PHP). Enjoy!
