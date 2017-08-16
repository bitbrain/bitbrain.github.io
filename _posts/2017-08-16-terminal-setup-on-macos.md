---
layout: post
title: Terminal Setup on MacOS
---

![terminal-example](/public/media/macos-terminal-example.png)

Today I would like to share with you my current terminal setup. It basically consists of the following parts:

* [iTerm2](https://www.iterm2.com)
* [zsh](http://www.zsh.org)
* [oh-my-zsh](http://ohmyz.sh)
* [sorin zsh theme](https://cloud.githubusercontent.com/assets/2618447/6316762/51f34624-ba00-11e4-948a-6ac65a49f8c5.png)
* [Monokai Soda](https://github.com/deepsweet/Monokai-Soda-iTerm) (modified)

## The Terminal

The default terminal app on MacOS is definitely lacking of functionality. As [xanderdunn](https://medium.com/@xanderdunn) has [written on Medium](https://medium.com/@xanderdunn/iterm2-vs-terminal-c06976f106ef), iTerm2 has huge advantages compared to the default terminal:

> It’s a lot more customizable. For example, I can tell it to shut up and never show me warning dialogues when I’m closing a tab or quitting the app when there’s a running process. Customizability ends up being pretty important for serious developers who are always in the terminal.

Apart from customisation, iTerm2 allows me to split tabs vertically or horizontally on a native basis (different from [tmux](https://gist.github.com/simme/1297707) where it is virtually implemented). With tmux we could achieve similar behavior, however it would take much longer to set it up and even then it would still not be natively implemented. As a Mac user I always strived for fast and easy setup. When I change my machine I do not want to spend weeks on customising my Terminal. iTerm2 has lots of inbuilt features which could only be added to the default terminal by using plugins.

## The Shell

I used many shells such as [fish](https://fishshell.com/) or [tmux](https://gist.github.com/MohamedAlaa/2961058). After all this time I eventually sticked to zsh for different reasons:

* [amazing community](http://ohmyz.sh/community)
* lots of customizations
* syntax highlighting
* lots of available plugins
* inline auto-suggestions
* paginated completion

To just list some of the great features.

## The Theme

When I started programming I never thought about customising my terminal or favourite IDE. After many years of trying different things I started to like dark themes. It's 2017 and there are thousands of different themes out there. My favourite is still [Monokai](https://atom.io/themes/monokai), presumably known from the [legendary RAM eating machine](https://josephg.com/blog/electron-is-flash-for-the-desktop), called [Atom](https://atom.io). Monokai has vibrant colours which help me to see things, even at night. It's just preference but I really love vibrant colours (and Tron).

I use two different things for the appearance: the [Monokai Soda](https://github.com/deepsweet/Monokai-Soda-iTerm) theme for colours and the [sorin zsh theme](https://cloud.githubusercontent.com/assets/2618447/6316762/51f34624-ba00-11e4-948a-6ac65a49f8c5.png) theme for the terminal layout. Note that I made the colours of the Soda theme slightly brighter to have an increase in contrast.

## Conclusion

I hope you like my setup. Happy coding!
