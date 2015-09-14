---
layout: post
title: Making plans for summer
excerpt: How to spend my summer vacation? It's not just about making games. I have some ideas in mind.
---
It's almost july and I'm just sitting around, watching [Community](http://www.imdb.com/title/tt1439629/) (it's funny, isn't it?) and studying things on my own. Two weeks ago I had no idea how to spend my summer vacation, until now. Then, I had an idea: 6 weeks for three different projects!

### Chronos needs to be done

My resource management toolkit [Chronos](http://chronos.my-reality.de) needs to be done, especially the scripting and updating part. Find an example how the updater should work in the code below.
{% highlight java linenos %}
DataProvider provider = new SVNProvider("repository", "username", "password");
GameUpdater updater = new BasicGameUpdater(provider);
updater.addListener(new GameUpdateListener() {

	@Override
	public void onStart(UpdateEvent event) {

	}

	@Override
	public void onProgress(UpdateEvent event) {

	}

	@Override
	public void onAbort(UpdateEvent event) {

	}

	@Override
	public void onSuccess(UpdateEvent event) {

	}
});

updater.execute();
{% endhighlight %}
As you can see it should be pretty easy to update your game. This updater implementation is single-threaded but I'm planning to add a decorated game updater which is able to update your game immediately in a seperated thread. Something like that:
{% highlight java %}
GameUpdater updater = new MultiThreadedGameUpdater(new BasicGameUpdater(provider));
{% endhighlight %}

### Progress on Galacticum

My current game project [Galacticum](http://galacticum.my-reality.de) is far away from being playable, caused by missing game logic combined with a lack of time in the past, but I'm planning to move on during vacation. Getting all things done is propably a tiny bottleneck. A more convinient way would be to move some tasks of version 0.1 to a later version. Therefore I want to complete the following tasks:

* Custom physics paired with [JBox2D](http://www.jbox2d.org)
* explosion system
* bug fixes

After that I can go on with version 0.2 which will contain first game logic (ships and battles). Moreover I plan to collaborate with some guys like [Reinier Klarenberg](https://github.com/Defragler) and [Dennis Pawlik](https://github.com/ksidpen) (for AI stuff).

### Secret gamejam collaboration

I plan to collaborate with another dude as well. Our aim is not only to celebrate game development, moreover creating a new experience, indipendent of which device you're currently using. I wanna post news in the next weeks.

Feel free to ask for further questions regarding my project (except the secret stuff).




