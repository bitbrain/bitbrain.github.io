---
title: "Goodbye, Jekyll."
tags: ['jekyll', 'goodbye', 'zola']
date: "2025-08-07T18:00:00+00:00"
---
[Jekyll](https://jekyllrb.com) is a [Ruby](https://www.ruby-lang.org) based static site generator created by **Github** that I have been using for many many years. It pains me to say goodbye but today is the day where I moved my blog off Jekyll for good. It was a fun ride and most notably, I created [jekyll-dash](https://github.com/bitbrain/jekyll-dash), a custom theme for Jekyll that had all the fancy features one would love to see from an SSG generator: tags, fontawesome, cool animations... and all that jazz. I did maintain that for many years but eventually, the fun turned into annoyance.

# Too many caveats

Working with Jekyll can be rather annoying, especially when trying to get it running on Github Pages. Yes, Github automatically deploys your Jekyll page without you having to worry about anything, **unless** you are trying to use anything [other than these versions](https://pages.github.com/versions). Oh, you want to use Jekyll 4? Tough luck, you gotta roll your own workflow to deploy + build things.

To make matters worse, you cannot just "install" Jekyll and get started. You need to setup Ruby first, which [itself has different versions](https://www.reddit.com/r/ruby/comments/wovmt1/difference_between_ruby_2_and_ruby_3), should you install Ruby 2? Should you install Ruby 3? [People in the past stumbled on issues](https://talk.jekyllrb.com/t/incompatible-with-the-current-version-ruby-3-0/5821) where using Ruby 3 did not work with Jekyll. 

Then, there is the [gem system](https://rubygems.org/): this is not a Jekyll concept but comes from Ruby. The idea sounds neat: you can build a theme for Ruby and then bundle it into a "gem". Then, you can publish the gem and others can download it and use your Jekyll theme, without having to worry about checking out dubious git repositories or running some dodgy commands. Instead, in your `Gemfile` you can define dependencies like so:
```gemfile
source 'https://rubygems.org'

gem 'jekyll-dash', '~> 2'
gem 'jekyll-sass-converter', '~> 2.0'
gem 'liquid-md5'
gem 'jekyll-tagging'
```
The `jekyll-dash` there is my own theme I created. You may notice something, though: it has a `~> 2`, meaning that the version is 2.0—no, this is not because it is so advanced! I wanted to upgrade my blog to latest Jekyll features (Jekyll 4) and unfortunately, **all jekyll gems** stopped working and had to be upgraded, too. This was quite a pain to maintain and keeping track of which gems I can use under which circumstances made this whole setup rather cumbersome. The whole point of using Static Site Generation to me is to have a _clean_ and _elegant_ and _minimal_ setup without any databases, without any annoyances. Just some files hosted in a repository and Bob's your uncle.

# Zola!

I went and researched what is trendy in 2025 and discovered some interesting alternatives:
- [Hugo](https://gohugo.io) seemed great but it is quite advanced and not a great fit for super-minimal blog setups
- [Publii](https://getpublii.com/) is another interesting approach to SSG. It seems very minimal and light-weight but again, too "enterprisey" for my liking. I NEED LESS!
- [Zola](https://www.getzola.org/) surprised me. It reminded me of the "good old days" and it seems to be _extremely_ light-weight, **and** built in [Rust](https://www.rust-lang.org/)

I browsed their themes and was impressed. The [boring theme](https://www.getzola.org/themes/boring/) was **exactly** what I was looking for. Also, the way it works is rather brilliant: you just use a binary to generate the page and that's it. Heck, it even comes with its own Github action!

I'm excited to use this light-weight technology.

