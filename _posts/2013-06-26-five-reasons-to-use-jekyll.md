---
layout: post
title: 5 reasons to use Jekyll
excerpt: Annoyed by your slow website? Jekyll can solve all your problems.
---
Do you wonder about why this blog loads incredibly fast? Reason: I'm using [Jekyll](http://jekyllrb.com)! It's a static content generator, written in [Ruby](http://jekyllrb.com). Jekyll allows you to generate a full website with content and stuff in a few miliseconds by using an algorithm due to generate \*.html files from, for example, [Markdown](http://daringfireball.net/projects/markdown/syntax). In this article, I'm gonna give you five reasons, why you should avoid Wordpress (and other [CMS](http://en.wikipedia.org/wiki/Content_management_system) like [Joomla](http://www.joomla.org) for your blog.

### Reason 1: Jekyll is fast as hell

Jekyll generates content from static files (like Markdown). Therefore it doesn't require any database which allows you to build very fast websites. Furthermore it reduces the traffic on your own server by simply loading local .html files instead of querying to the database all the time.

### Reason 2: Jekyll is really smart

To increase power of your site, Jekyll allows you to use ruby plugins and other smart web toolkits like [Sass](http://sass-lang.com), [Liquid](http://liquidmarkup.org/) or [Bootstrap](http://twitter.github.io/bootstrap). Moreover you can write posts and give them a title and assign a custom layout to them, which you can simply pre-define on your own.

### Reason 3: Jekyll is secure

When using a CMS like Wordpress your server has to deal with thousand of files (and a big database as well). In Jekyll you deal with only one configuration file. Foreign access doesn't make sense anymore due to static files. There is no database which can be attacked by bad guys.

### Reason 4: Jekyll loves Git

Jekyll has been created by [Tom Preston-Werner](http://tom.preston-werner.com) and [Nick Quaranto](http://quaran.to), two awesome guys from [GitHub](https://github.com). You can post articles by writing a markdown file (name pattern: ```YYY-MM-DD-name-of-your-post.md```) and commit it afterwards. You can write [hooks](http://alphanodes.de/arbeiten-git-hooks) for Git to generate your site after successfully committing a new article on your blog.

### Reason 5: Jekyll is fun

I love it to work with Jekyll. It is so much fun! It is pretty easy to extend and to apply new themes. Checkout my own theme for Jekyll: [Bambus](http://bambus.my-reality.de). There is a guide on GitHub, how to install under 2 minutes. Have fun!


 
