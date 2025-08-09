---
title: "Useful gdscript patterns"
tags: ['godot', 'gdscript', 'coding']
date: "2025-08-09T12:00:00+00:00"
---
On [my gamedev journey](https://youtube.com/@bitbraindev) I have found some specific patterns quite useful when working with [GDScript](https://gdscript.com). In this post, I'd like to show you some of them (Godot 4) and maybe you can make use of it, too. 

# Combine setters with signals

You might find yourself wanting to do something in case a specific variable changes. Now, you could check it either every `_tick()` or keep track of places where you might change the variable but a much better way is using a setter:
```gd
signal direction_changed(new_direction: Vector2)

@onready var direction: Vector2:
   set(v):
      direction = v
      direction_changed.emit(v)
```
This then allows anybody outside of that component to react to variable changes by simply connecting to the signal:
```gd
func _ready():
   player.direction_changed.connect(_player_direction_changed)

func _player_direction_changed(direction: Vector2):
   pass # do something here
```
This can be extremely powerful to separate your **concerns** and **responsibilities**. Often, we tent to combine everything inside a single node/script but this makes it more difficult to reuse things across the board.

# Reusable configurations

One challenge is to define configuration for your game. You want to tweak for example the color of your player. This can be done via simple `@export` variable:
```gd
@export var player_color:Color
```
and a corresponding color picker will show up in the Godot UI. However, there are cases where you want to make these configurations _reusable_. For example, in my game I have a procedural cave generation system where I can control the kinds of ores that should spawn and how they should spawn. I could hardcode this into some form of "cavegen" script but what if I want to reuse certain ore spawns for different caves? How do I "remember" the configuration without having to duplicate nodes? Resources are the answer:
```gd
class_name OreSpawn extends Resource

@export var ore:OreItem
@export var noise:FastNoiseLite = FastNoiseLite.new()
@export_range(-1.0, 1.0) var lower_threshold:float = 0.0
@export_range(-1.0, 1.0) var upper_threshold:float = 0.0

func is_spawnable(seed_number:int, x:float, y:float) -> bool:
	if ore == null:
		return false
	if noise == null:
		return false
	noise.seed = seed_number
	var value = noise.get_noise_2d(x, y)
	return value > lower_threshold and value < upper_threshold
```
This pattern then allows me to accept a list of possible ore spawns in my cave generator like so:
```gd
@export var spawns:Array[OreSpawn]
```
The generator basically won't care about how the spawn is configured. All it needs to do is call the `is_spawnable` function for a given seed and x/y position to determine what should be spawned where.

# Torch flickering

One challenge I found for my game is to make torches flicker. There is a [Light2D](https://docs.godotengine.org/en/stable/classes/class_light2d.html) those `energy` I modified over time like so:
```gd
@onready var light:Light2D

var time:float = 0.0

func _process(delta:float):
   light.energy = _calculate_energy(time)
   time += delta

func _calculate_energy(time:float) -> float:
   return 0.8+((sin(time*time/10)+(cos(time*time/10)+sin(time))) /30)
```
Do not ask me how I came up with this abomination of a calculation! It took many hours of tweaking and adjustments. Well, until I realised that this is a silly approach and there is a **much better** solution by utilizing [FastNoiseLite](https://docs.godotengine.org/en/stable/classes/class_fastnoiselite.html):
```gd
@onready var light:Light2D
@export var noise:FastNoiseLite = FastNoiseLite.new()

var time:float = 0.0

func _process(delta:float):
   light.energy = _calculate_energy(time)
   time += delta

func _calculate_energy(time:float) -> float:
   return flicker_noise.get_noise_1d(time)
```
The way it works is that we can basically "scroll" from left to right over an infinite noise texture and the current value of the noise texture dictates the intensity of the light. This makes the torch flickering much more smooth and hyper-consistent.

# Day & Night cycle (2D)

A cheap trick to do a day&night cycle is by using [CanvasModulate](https://docs.godotengine.org/en/stable/classes/class_canvasmodulate.html) and working with `lerp` on [Color](https://docs.godotengine.org/en/stable/classes/class_color.html) class:
```gd
extends CanvasModulate

const NIGHT_COLOR = Color("#091d3a")
const DAY_COLOR = Color("#ffffff")
const EVENING_COLOR = Color("#ff3300")

const TIME_SCALE = 0.1

var time = 0

func _process(delta:float) -> void:
	self.time += delta * TIME_SCALE
	var value = (sin(time) + 1) / 2
	self.color = get_source_colour(value).lerp(get_target_colour(value), value)
	
func get_source_colour(value):
	return NIGHT_COLOR.lerp(EVENING_COLOR, value)

func get_target_colour(value):
	return EVENING_COLOR.lerp(DAY_COLOR, value)
```
This code interpolates the modulate color smoothly between the day, night and evening color. Modifying colors at runtime via `lerp` is rather powerful!

# Inner classes

Classes in gdscript can be quite powerful and make your life much easier. Often, you see classes mentioned together with [inheritance](https://en.wikipedia.org/wiki/Inheritance_(object-oriented_programming)) but this is not at all what this is about. I'd rather discourage inheritance as much as possible (I rarely ever use it).
Instead, classes can help you to make your code more organized and readable. Let me show you.

Let's say you have to store some information about your game state. You might utilise a dictionary for that:
```gd
var data = {
	"waves": [
		{"spawn": {"pos": Vector2(100, 200)},
		 "enemy": {"type": "slime", "hp": 10}}
	]
}

print(data["waves"][0]["spawn"]["pos"])
print(data["waves"][0]["enemy"]["type"])
```
While this can work, it is very difficult to understand at a glance what e.g. `data["waves"][0]` contains. Yes, with the recent addition of types to dictionaries and arrays, gdscript can tell us the type, but the type itself will be just another dictionary. You end up in a jungle of dictionaries and arrays and it becomes much more difficult to wrap your head around things, especially when you need to debug an issue.

Classes come to the rescue and they can make things much more readable and organized:
```gd
class Spawn: var pos := Vector2()
class Enemy: var type := ""; var hp := 0
class Wave: var spawn := Spawn.new(); var enemy := Enemy.new()

var wave = Wave.new()
wave.spawn.pos = Vector2(100, 200)
wave.enemy.type = "slime"
wave.enemy.hp = 10

print(wave.spawn.pos)
print(wave.enemy.type)
```
The beauty of this is that these classes are purely internal to your script and do not need to be exposed. There is also no inheritance or any other complex concept. This pattern uses classes purely as **named data container**.

# Unique ids

Sometimes, you might need unique ids. Using a counter could work but it brings its own problems: it is **state dependent** and therefore you need to "remember" the counter somehow. There are various algorithms that generate a random strings, such as the [UUID spec](https://en.wikipedia.org/wiki/Universally_unique_identifier) however, in gdscript you can create something much simpler: [Nano ID](https://alex7kom.github.io/nano-nanoid-cc/). I am using this exact script in my RPG data management plugin called [Pandora](https://github.com/bitbrain/pandora) to generate entity ids:
```gd
# nanoid.gd
extends RefCounted

const ALPHABET := "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict"
const DEFAULT_LENGTH := 21

var default_length := DEFAULT_LENGTH

func _init(length := DEFAULT_LENGTH) -> void:
	default_length = length

func generate(length := default_length) -> String:
	var id: String
	for i in range(length):
		id += ALPHABET[randi() % ALPHABET.length()]
	return id
```
Then you can use it as such:
```gd
const NanoID = preload('nanoid.gd')
print(NanoID.generate())
```
