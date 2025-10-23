---
title: "Godot Types: The Good, The Bad, The Ugly"
tags: ['godot', 'gdscript', 'coding']
date: "2025-10-23T12:00:00+00:00"
---
I have seen a lot of confusion about how types work in [Godot Engine](https://godotengine.org). Specifically, the difference between [RefCounted](https://docs.godotengine.org/en/stable/classes/class_refcounted.html), [Object](https://docs.godotengine.org/en/stable/classes/class_object.html#class-object) and built-in types like [String](https://docs.godotengine.org/en/stable/classes/class_string.html) or [Color](https://docs.godotengine.org/en/stable/classes/class_color.html). At the end of this post, you will understand the exact differences between them.

![clint-eastwood](/images/clint-eastwood.webp)

# The Good: RefCounted and Built-in Types

Many types in Godot such as [AStar3D](https://docs.godotengine.org/en/stable/classes/class_astar3d.html#class-astar3d) are of type [RefCounted](https://docs.godotengine.org/en/stable/classes/class_refcounted.html#class-refcounted). Godot will keep track of how many references you have for a given instance. If the reference count becomes 0, the instance will be freed:
```gd
extends Node

func fun_with_refs() -> void:
   var my_ref = AStar3D.new() # AStar3D is of type RefCounted

func _ready() -> void:
   fun_with_refs()
   # the AStar3D instance will be gone! Nothing is referencing it!
```
This can be extremely handy: you don't actually have to worry about freeing objects or any sort of memory management. Godot will take care of it automatically. Prefer `RefCounted` if you don't want to worry about freeing instances and you have mostly short-lived objects anyways.

For in-built types like `Color` or `String`, Godot utilizes **value semantics**, this means that when you assign a color or string, it will create always an independent copy.
```gd
var a = Vector2(5, 10) # Vector2 is an inbuilt-type
var b = a
b.x = 99

print(a) # (5, 10)
print(b) # (99, 10)
```

# The Bad: Object

Well... not really bad. Just bad for beginners. `Object` type can bite you if you don't actually understand how it works! Godot will **not** free objects for you. When you are not careful, it can lead to a [memory leak](https://en.wikipedia.org/wiki/Memory_leak):

```gd
extends Node

func memory_leak() -> void:
   var node = Node.new() # Node is of type Object

func _ready() -> void:
   memory_leak()
   # oops, memory for the node instance is still reserved!
```
In order to free `Object` you have to call `.free()` on it. You are in luck, though: most `Object` instances that Godot creates (like nodes) it will free for you! So while technically, `Object` requires manual memory management, Godot will do a lot for you. However, when rolling your own `Object` types you need to be careful!

# The Ugly: Invisible Side-Effects

I have been recently contributing again to the [FMOD GDExtension](https://github.com/utopia-rise/fmod-gdextension) by [utopia-rise](https://github.com/utopia-rise) because I was trying to investigate an issue in my game where no sound was playing. I won't go into too much technical detail here, but [FMOD](https://www.fmod.com/) basically is an audo engine that I am using for [my game](https://bitbrain.itch.io/cave). FMOD has the concept of "audio banks" that you gotta load at runtime, and those banks contain the audio to play. The code usually looks like this:
```gd
# init.gd autoload script
extends Node

func _init() -> void:
    FmodServer.load_bank("res://fmod/main.bank", FmodServer.FMOD_STUDIO_LOAD_BANK_NORMAL)
```
This used to work fine but at some point, it stopped working. After a long time of debugging, it turned out that the signature of `load_bank` had been changed. `FmodBank` no longer was of type `Object` but of type `RefCounted`!

![worried-kermit](/images/worried-kermit.webp)

If you have paid attention before, you should already know what the problem is: the GDExtension correctly loads the `main.bank` file into memory but we are actually not referencing it! Godot will then go ahead and free the instance again (because it is a `RefCounted` and its reference count reaches `0`). So the correct fix is this:

```gd
# init.gd autoload script
extends Node

var banks = []

func _init() -> void:
    banks.append(FmodServer.load_bank("res://fmod/main.bank", FmodServer.FMOD_STUDIO_LOAD_BANK_NORMAL))
```
since `banks` itself is a reference that will stay around as long the `init.gd` autoload is around (for the entire duration of the game's runtime). We are saved!

# Confusion about valid instances

Before we finish, I wanted to say a few more words about [is_instance_valid](https://docs.godotengine.org/en/stable/classes/class_%40globalscope.html#class-globalscope-method-is-instance-valid). Code like this may seem confusing at first:
```gd
var my_color = Color(255, 255, 255)
print(is_instance_valid(my_color)) # returns false
```
but this is intended behaviour: `Color` is an in-built type and won't have an **instance id**. `is_instance_valid` only operates on **instance ids** so Godot cannot know if it is valid or not -> it will always be `false`.

I hope this was somewhat useful. If you have follow up questions, you can always reach me on 🐘[Mastodon](https://mastodon.gamedev.place/@bitbraindev) or over at ⛅[BlueSky](https://bsky.app/profile/bitbra.in).