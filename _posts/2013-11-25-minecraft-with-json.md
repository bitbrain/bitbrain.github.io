---
layout: post
title: Minecraft with JSON
excerpt: JSON is a nice alternative to XML. I wrote a plugin to display Minecraft data in realtime.
---

I was working on a website for our Minecraft server when I realized that it would be pretty nice to display current server information like number of players, if the server is reacheable at the moment and which players are on the server. I found a [server plugin on Github](https://github.com/vexsoftware/minequery) which is deprecated though (supports only 1.5.x versions of Bukkit). Thereafter I decided to write my own plugin, based on [JSON](http://de.wikipedia.org/wiki/JavaScript_Object_Notation).

### About the plugin

The idea is to have a plugin which acts like a server. The server listens to a given port (which can be set by the user of the plugin) and sends actual server data to each connected client. Sent data contains:

* current number of players
* supported number of players
* list of online and offline players

### The Java part

The important part is to deliver the information above via JSON. To do so you have to sent the data in JSON notation like:

{% highlight json %}
{
    "key1" : "value1",
    "key2" : "value2"
}
{% endhighlight %}

The problem is: it's not possible to read the JSON code above with jQuery. It should be possible, because jQuery has an interface to interpret JSON/JSONP at runtime. Unfortunately that doesn't work with Java here. The problem: each browser needs to understand what to do with the received data. Therefore we have to send a header first:

{% highlight text %}
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 383984
{% endhighlight %}

Now we are able to manage the data in our browser. 

### The browser part

It is now very easy to fetch the data on our website:

{% highlight javascript %}
$.ajax({
    type: "GET",
    url: "proxy.php?url=http://" + content.ip + ":" + content.port,
    dataType: "json",
    crossDomain: true,
    async: true,
    timeout: 1000,
    success: function(data) {
        // data contains our JSON from Minecraft
        setStatus('online');
    },
    error: function(req, err) {
        setStatus('offline');
    }
});
{% endhighlight %}

### Working with Bukkit

Bukkit provides [a fancy server interface](http://jd.bukkit.org/rb/apidocs/org/bukkit/Server.html) which provides all information for our plugin. For instance, to fetch all online players, we can write:

{% highlight javascript %}
Player[] players = server.getOnlinePlayers();
{% endhighlight %}

Afterwards we can iterate through the list and put needed player information into a JSON array. We can send the array to our clients then.

### Conclusion

JSON can be actually very funny in combination with games like Minecraft. I'm thinking about a more abstract library in the far future, but that has to wait.

You can visit the current development page of my plugin [here](https://github.com/MyRealityCoding/mineweb).
