---
title: "Gamejam Tips"
tags: ['gamejam', 'gamedev']
date: "2026-08-27T12:00:00+00:00"
---
I recently participated in [ARD Game Jam 2026](https://itch.io/jam/-ard-game-jam-2026) and I noticed a few best practices that I want to share with you here.

# What is a game jam?

Similar to hackathons, a game jam is an event where for a limited time (e.g. 48 hours) people come together and build games, often with limitations applied: in my case, I did handwrite all code myself and did not use any auto-complete or LLM to guide me. Then I [live-streamed it all](https://twitch.tv/bitbraindev). Most gamejams are very beginner friendly, so if you are thinking about joining a jam, I recommend checking out the [itch.io jam calendar](https://itch.io/jams)!

![ard-jam](/images/ard-gamejam.webp)

# Tip 1: Limit scope

The gamejam start and the theme is announced. The ideas come to you and you get super excited. You can think of so many cool directions you can take the idea and in your head you can literally see the game infront of you. Now, this is in my opinion the most challenging part of any gamejam, especially the ones that are only 48 hours: you need to have a reality check with yourself and ask some uncomfortable questions:

- how much will I be actually be able to complete by tomorrow?
- will I still have time for polish, music, animations?
- what if I wanna add more content to my game but run out of time?
- how do I know which ideas are easy to implement vs. the ones that will take time?

Now, many of those questions can only be answered with experience but my advise is to rather build a game that is almost stupidly simple and then use the remaining time to polish it and add more content to the game, rather than some crazy game concept that you won't finish and then it is unplayable. Having an unplayable, unfinished game at the end of a jam feels very disheartening, because it feels like all this effort was for nothing. I have been in that exact situation a couple of times myself and I can tell you that I regretted overcomplicating my game idea and letting myself go to feature creep. But well, perhaps it is okay for you to just go for it and make the mistakes yourself. It certainly is an experience :)

# Tip 2: Manage time wisely

Now that we limited our scope and focused on a simple idea, let's see how we can best implement things. For a 48h gamejam, I usually divide my time as follows:

- Day 1: finding the idea, writing down constraints (what not to do), writing down some basic tasks somewhere on a Kanban board, setting up the Godot project with automatic deployment to itch.io. Then proceeding implementing a basic game mechanic with 100% placeholder assets
- Day 2: building out the game, finishing the full gameplay loop (can the game be finished? Can the game be restarted?) and already initial polish for sound effects and music
- Day 3: moar content!111 and animations, more polish (title screen, intro screen etc.)

This structure allows me to not stress myself about perfecting anything but I can tackle on issue at a time. 

# Tip 3: Good final touches

Over the years I found myself doing the same things on every single gamejam and I want to share some of these things with you: in terms of game polish, I like to add: spawn particles whenever two bodies touch/something happens. Particles should move into the direction of the action. You can also use particles as background atmosphere. 

Another thing I recommend is to style your itch.io page. Nowadays this is fairly easy and just requires a few clicks by selecting colours and uploading a banner image. Talking of colours, I **strongly** recommend always choosing a colour palette when building your game. I recommend lospec which has some amazing palettes. It will help you to keep your game thematically consistent and it will make it easier for you to add a sense of polish to the game even with very little effort. People playing your game will automatically feel like it is polished just because colours are consistent everywhere.

![itchio-fullscreen](/images/itchio-fullscreen.webp)

Talking of itch.io, I also do recommend to always enable **fullscreen button** in the project settings. During gamejams, I notice a ton of people forget to toggle this on but it is important especially to allow people to properly enjoy the game when played in web. Lastly, a few things that you should always add regardless of the game you are building: always include play instructions/controls both on the itch.io page and somewhere in your game as well (title screen or controls menu). When controls are not clear people have to spend time figuring it out instead of playing your game. Another crucial point is explaining your game mechanic somehow via a tutorial: this can be either a gif/showcase of how to play your game, or an intro scene that visualises what the player is going to do when playing the game. Either way, showing how to play your game straight away allows the player to play your game as you intended, without having to worry that they don't know how to play!

My last point here is **audio**: it usually is a good idea not to default your audio to 100% volume but perhaps aim for around 50% volume. Then, provide an ingame volume slider so players can tweak the audio to their needs. Now, all this can be annoying to set up and you probably don't want to spend too much time on those technical things. That's why **many** gamejams allow the usage of so called "Gamejam Templates" that do that heavy lifting for you. I myself [built a gamejam template for Godot](https://github.com/bitbrain/godot-gamejam) that I use most of the time. Check it out here!

# Tip 4: Enjoy yourself!

Now to the most important part: when starting with gamejams it can be daunting and you kinda feel you have to "prove yourself". Especially when there are prizes to win or certain categories to conquer it can be tempting to put yourself under extreme pressure. The worst thing is to work your ass off to win a gamejam and then not to win. It feels demotivating and makes the whole process not worth it. Instead, I recommend doing it for the process itself: challenging yourself, hand-crafting a game from scratch, artisan coding, just you and the keyboard, building a game. Entering that flow state where you are one with the game and the game is one with you. That's what we should all aim for and especially in times like today it is so important that you stay connected with your creativity through activities like gamejams. So, don't stress yourself, enjoy yourself, drink enough water and share your passion with the world!
