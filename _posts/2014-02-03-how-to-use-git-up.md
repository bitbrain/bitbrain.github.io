---
title: "How to use 'git up'"
layout: post
excerpt: Git is fun. Nevertheless there exist some problems which you can avoid very easily.
---
Keeping all your branches up to date can be a tricky manner. To avoid such problems, simply use my favorite [Ruby](https://www.ruby-lang.org) gem, called [git-up](https://github.com/aanand/git-up). 

### How to install

Here is a small bash snippet to install *git-up* properly:

{% highlight bash %}
sudo apt-get install ruby rubygems
sudo gem install git-up
{% endhighlight %}

### How to use it

To use *git-up*, just switch to a local git repository and type:

{% highlight bash %}
git up
{% endhighlight %}

That's it!
