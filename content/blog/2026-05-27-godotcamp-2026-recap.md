---
title: "GodotCamp 2026"
tags: ['godot', 'godotcamp', 'barcamp', 'community', 'event']
date: "2026-05-27T12:00:00+00:00"
---

I love [Godot Engine](https://godotengine.org), especially its community and events. Last year [Joachim](https://bsky.app/profile/yeoldone.bsky.social) from the [Godot Stammtisch Karlsruhe](https://godot-karlsruhe.de/) approached me and told me about a thing they tried called **GodotCamp**. At first I was a bit confused what that one is: a gamejam? another Godot conference with speakers? Actually, it is none of that... it's a [BarCamp](https://en.wikipedia.org/wiki/BarCamp)!

# What is a BarCamp?

> BarCamp is an international network of user-generated conferences primarily focused on technology and the web. They are open, participatory workshop-events, the content of which is provided by participants, sometimes called unconferences.

The idea behind **BarCamp** is straightforward: a bunch of people meet at an agreed time and then decide together what they wanna do. That's it. No prior plan, no speaker list, no prep needed. This has a massive advantage because the organisers do not have to worry about the exact content of the event but only about **facilitating** the event itself (venue, food, tech etc.) which in itself is already a massive undertaking. BarCamps are extremely spontaneous and things happen organically. When you come to a conference you are mentally prepared to be a "listener" with certain **expectations**: there will be speakers.

![godotcamp-gameforge](/images/godotcamp-2026/godotcamp-gameforge.webp)

There will be large rooms where people have to sit down and be quiet while speaker presents something. This is inherently not bad, quite the opposite. However, it restricts certain aspects of creativity and exchange of ideas. At BarCamps, every participant decides what they want to talk about do: maybe a gamejam, maybe a show&tell about a specific thing they discovered, or a discussion round about a topic they need clarification on. Anything is possible at a BarCamp! Such an event is GodotCamp and I visited it this year in **May 2026**.

# Travelling to GodotCamp

I am currently based in London, UK, so to get to the camp I flew by plane. Connections between London and Karlsruhe are usually great so this was not an issue at all. I wanted to get from the airport to my hotel. You have to know that the airport is actually **not** in Karlsruhe but around 20km further south. Effectively, I had two options: book a Uber or get the bus (there are no trains). The thing about Germany is though that only drivers with a valid taxi license are allowed to use Uber, so a single trip can cost up to 90 Euros. So bus it was. Usually you can book your bus ticket online via an app but for some reason the app crashed for me constantly. Luckily, I had some cash with me and the bus station right outside the airport offers tickets to the city. Keep an eye out for those "H" signs as they denote the bus stop!

![miguel-bus](/images/godotcamp-2026/godotcamp-bussign.webp)

The journey was quite smooth and I eventually arrived at my hotel an hour later.

# GodotCamp: Day 1

GodotCamp 2026 was hosted at FZI House of Living Labs, the lab site of the **F**orschungs-**Z**entrum **I**nformatik Karlsruhe (research center of informatics). It is honestly the perfect venue for such an event, as it comes with rooms, a large hall and lots of powersockets. (yes, power sockets are the life blood of gamedevelopers). After a tasty breakfast of German bread ("Butterbrot") the event was kicked off!

![godotcamp-keynote](/images/godotcamp-2026/godotcamp-keynote.webp)

The organizers prepared an app where you can submit any topic you want to talk about. Afterwards, the entire room would raise their hands in case they were interested in joining a certain activity. I personally submitted two ideas on the first day:

- **Optimising PBR assets**: I recently started dabbling with 3D in Godot and found it incredebly difficult to keep VRAM usage low when using lots of different PBR textures
- **3D Inverse Kinematics Rigging in Godot**: for my horror game FPS I wanted to understand how I could do bone rigging in Godot to have a character that can walk around

Overall, the first day was **packed** which lots of activities:
![schedule](/images/godotcamp-2026/godotcamp-plan.webp)

I first attended the **How to Godette** session. Yes, we had an actual Godette cosplayer on site who showed us how she made the outfit and the challenges faced. It was genuinly fascinating.

![godette](/images/godotcamp-2026/godotcamp-godette.webp)

Afterwards I attended the **Procedural Generation** talk by Tyrix where amazing procgen tips were shared. The audience also chimed in and we all collaborated on cool procgen concepts and ideas.

The color grading discussion was useful as I learned new tricks by using `ColorRect` and shaders as it gives much more control over the actual colour grading compared to `WorldEnvironment`. For example, a shader can colour-grade different parts of the screen based on depth buffer.
As a final session, I attended the **Scene Transitions** discussion of Jan who wanted to learn how to do them. Luckily, I already implemented my own scene transitioning system for [cave](https://bitbrain.itch.io/cave) so sharing that knowledge was super useful.

In the evening, we all headed to the [Gameforge HQ](https://gameforge.com) who kindly sponsored the location for us to have an afterparty. I met really cool people there and together we did some collaborative art:

![collab-art](/images/godotcamp-2026/godotcamp-artjam.webp)

All of us were drawing and creating together. It was truly wholesome and I will never forget that evening.

# GodotCamp: Day 2

The second day started similar to the first one: we started proposing new topics to talk about (since most topics from the previous day were already covered). My topics were:

- **Favourite Nodes**: Godot has over 200+ inbuilt nodes but what are our favourite ones?
- **Pixelart for Absolute Beginners**: before I went to the camp I had in mind showing some pixelart basics to absolute beginners. On the first day was already a pixelart workshop (so I didn't wanna overlap with that) so I decided to do a little session on pixelart the 2nd day.

I attended many sessions again, which all were equally interesting. My highlight was us designing Godot merch and we came up with some pretty wild ideas that hopefully will see the light of day at some point :)

On the previous day, some folks held a 90 minute gamejam and on the 2nd day they showed those games off. It was truly inspiring to see what is possible in such a short amount of time. We had quite a laugh about some of the ideas. My highlight was a game where a mouse is on drugs and the camera is shaking intentionally like crazy. It was hilarious!

# 10/10 Event

I will **definitely** attend **GodotCamp 2027** again. I had such a blast and I highly recommend it to anyone who is either interested in game developent as a whole or Godot.



