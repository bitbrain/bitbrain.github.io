---
title: "Godot File Compression"
tags: ['godot', 'addon', 'gamedev']
date: "2024-07-10T10:00:00+00:00"
---


I am maintaining a [Godot Engine](https://godotengine.org) addon called [Pandora](https://github.com/bitbrain/pandora) and maintainers reported a very strange bug that I solved in [this pull request](https://github.com/bitbrain/pandora/pull/185):

The compression of the `data.pandora` file was not working and in this blog article I want to explain how compression in Godot works, how I solved it and maybe you can learn a thing or two!

[![pandora-logo](/images/pandora-logo.svg)](https://github.com/bitbrain/pandora)

# Why compression?

Compression is by no means a way to encrypt your data. Someone with malicious intent **can** decompress the contents and modify it to their needs. However, compression is still useful to reduce the size of the final `.pck` file that gets shipped with your Godot game. Also, as an added bonus, it will be much harder for someone without technical knowledge to modify e.g. raw json files.

# Storing JSON

Imagine you have some json like so:

```json
{
  "item": "Golden Axe"
}
```

and you want to store that to a file. Usually, in Godot you can do this:

```gd
var file = FileAccess.open('item.json', FileAccess.WRITE)
```

This then allows you to write to the file our item like so:

```gd
var data:Dictionary = { item: "Golden Axe" }
file.store_string(JSON.stringify(data))
file.close()
```

# Storing compressed files

So far, so good. Now, how would we actually store compressed files? The code looks surprisingly similar!

```gd
var file = FileAccess.open_compressed('item.json', FileAccess.WRITE)
var data:Dictionary = { item: "Golden Axe" }
file.store_string(JSON.stringify(data))
file.close()
```

So, what is the problem here if this code works fine? It has to do with exporting your game in Godot!

# Exporting addon files

When someone uses a Godot addon that relies on specific files (such as `data.pandora` files for storing state), those files will **not** be automatically exported.

> Pandora does not use a `.json` but rather `.pandora` extension on purpose to discourage people from modifying it manually.

When exporting the game, one would need to define the exported files explicitly in the export settings:

![godot-export](/images/godot-export.webp)

However, this is not sustainable and having to remember to register random files whenever you want to export your game does not scale. This is why Godot introduced the `EditorExportPlugin`:

```gd
@tool
extends EditorPlugin

func _enter_tree() -> void:
   add_export_plugin(MyExportPlugin.new())

class MyExportPlugin extends EditorExportPlugin:

	func _export_begin(features: PackedStringArray, is_debug: bool, path: String, flags: int):
    # add_file("some-file.json", data, false)
    pass

	func _get_name() -> String:
		return "MyExportPlugin"
```

As you can see, this plugin gets shipped with the addon and it allows the addon creator to specify additional files that should be auto-exported when someone uses the addon. In Pandora, the `data.pandora` file should not be compressed by default when being used in the editor but only for **release builds**. Reason being is that it is much more friendly for version control systems like [git](https://git-scm.com) and it also makes debugging things easier within Pandora itself.

The `is_debug` flag tells us if someone intents to export a game as debug or release build, so we can use the flag to conditionally add the file.

> Note: the `path` argument of the `_export_begin` method is the path where the game will be exported to.

The `add_file` signature requires a `PackedByteArray` as a 2nd argument, which effectively is the bytes of the file that should be stored away:

```
func _export_begin(features: PackedStringArray, is_debug: bool, path: String, flags: int):
    var pandora_path = "res://data.pandora"
    # open the uncompressed normal file from the project folder
    var file = FileAccess.open(pandora_path, FileAccess.READ)
    # let's get the bytes from the file
    var data:PackedByteArray = file.get_buffer(file.get_length())
    add_file(pandora_path, data, false)
    # always remember to close the file
    file.close()
```

so, how do we store the file compressed? We cannot use `open_compressed` here because the file we are trying to store compressed is uncompressed:

```gd
var pandora_path = "res://data.pandora"
  # This will fail! `data.pandora` file is not compressed!
  var file = FileAccess.open_compressed(pandora_path, FileAccess.READ)
```

A first idea I had was to [compress](https://docs.godotengine.org/en/stable/classes/class_packedbytearray.html#class-packedbytearray-method-compress) the `PackedByteArray` itself:

```
var data:PackedByteArray = file.get_buffer(file.get_length())
add_file(pandora_path, data.compress(), false)
```

the assumption is that the exported file can be opened like this when running your **release** build of your game at runtime:

```
var data = FileAccess.open_compressed("res://data.pandora", FileAccess.READ)
```

However, that fails with error code `15`. What on earth is that error? I highly recommend bookmarking the [official Godot docs](https://docs.godotengine.org), because they are extremely useful, especially for situations like this: we find our answer in the ancient archives under the `Error` section ([link](https://docs.godotengine.org/en/stable/classes/class_%40globalscope.html#enum-globalscope-error)):

> Error ERR_FILE_UNRECOGNIZED = 15
>
> File: Unrecognized error.

Ah, so Godot itself does not recognize the file as compressed!

# Solving the mystery

I reached out on the official **Godot Contributor chat** and [contributor bruvzg kindly provided me](https://chat.godotengine.org/channel/editor?msg=n8yvre5oNTSg8n4Rg) with this information:

> [...] you can replicate compressed file format if you want it to be readable with open_compressed, it's not complex, the mine difference compressing is done in blocks, format is:

```
magic
    char[4] "GCPF"

header
    uint32_t compression_mode (Compression::MODE_ZSTD by default)
    uint32_t block_size (4096 by default)
    uint32_t uncompressed_size

block compressed sizes, number of blocks = (uncompressed_size / block_size) + 1
    uint32_t block_sizes[]

followed by compressed block data, same as calling `compress` for each source `block_size`
```

In case you are confused now, stay with me - this all will make sense in a bit. The format you are seeing there is **not code** but it describes **bytes** that need to be present in the compressed file for Godot to understand it. Picture it like a recipe or instruction manual that is stored at the beginning of your file and Godot will read that to understand what to do with your compressed content.

# What are bytes anyway?

To decompress for a bit (pun intended), let us take a step back and understand how our exported file actually looks like. Remember, we previously attempted to export our file like so:

```gd
var data:PackedByteArray = file.get_buffer(file.get_length())
add_file(pandora_path, data.compress(), false)
```

We can use a nifty tool like [GodotPCKExplorer](https://github.com/DmitriySalnikov/GodotPCKExplorer) to inspect + unpack exported Godot builds. This becomes especially useful to investigate the export logic of our `EditorExportPlugin`. Opening the `pck` file to our exported **release** build of our game indeed shows the file:

![godot-pck-explorer](/images/godot-pck-explorer.webp)

We then can click `Extract > Extract Selected` and save the file to a location of our choice. This then allows us to inspect the file furter. Opening that file in a text editor shows us an odd character:

```
{
  "item": "Golden Pickaxe"
}
```

This is because the file is compressed - there is a much better way at looking at the file itself, which is by using a hex editor, such as [hexed.it](https://hexed.it/):
![data-pandora-bytes](/images/data-pandora-bytes.webp)

A `char` is precisely 1 byte, and looking at our compression spec again, Godot expects the first 4 bytes to consist of the following characters: `GCPF`, which would look like this:

```
47 43 50 46
```

In case a file does not start with these exact bytes, Godot will not be able to open it correctly. The same goes for the next byte headers: `uint32_t` is precisely 4 bytes, meaning the next 12 bytes should contain the `compression_mode`, `block_size` and `uncompressed_size`:

```
47 43 50 46 00 00 00 00 00 10 00 00 1E 00 00 00
```

- `00 00 00 00` is the compression mode - we pick the default which is MODE_ZSTD (0)
- `00 10 00 00` represents 4096 as the block size
- `1E 00 00 00` is the uncompressed size of our file = 30 bytes

The remaining bytes will be the compressed data that gets produced by compressing our `PackedByteArray`.

# Applying the knowledge

With our gained knowledge, let us create a new script that is able to compress any text into Godot compatible `PackedByteArray` format!

```gd
# The block size which we hardcode
const BLOCK_SIZE = 4096
# Godot Compression magic keyword
const MAGIC = "GCPF"


## magic
##     char[4] "GCPF"
##
## header
##     uint32_t compression_mode (Compression::MODE_ZSTD by default)
##     uint32_t block_size (4096 by default)
##     uint32_t uncompressed_size
##
## block compressed sizes, number of blocks = (uncompressed_size / block_size) + 1
##     uint32_t block_sizes[]
##
## followed by compressed block data, same as calling `compress` for each source `block_size`
static func compress(text: String, compression_mode:FileAccess.CompressionMode = FileAccess.COMPRESSION_FASTLZ) -> PackedByteArray:
	var data = _encode_string(text)
	var uncompressed_size = data.size()

	var num_blocks = int(ceil(float(uncompressed_size) / BLOCK_SIZE))

	var buffer = PackedByteArray()

	buffer.append_array(_encode_string(MAGIC))

	buffer.append_array(_encode_uint32(compression_mode))
	buffer.append_array(_encode_uint32(BLOCK_SIZE))
	buffer.append_array(_encode_uint32(uncompressed_size))

	var block_sizes = PackedByteArray()
	var compressed_blocks = []

	for i in range(num_blocks):
		var start = i * BLOCK_SIZE
		var end = min((i + 1) * BLOCK_SIZE, uncompressed_size)
		var block_data = PackedByteArray()
		var block_index = start
		while block_index < end:
			block_data.append(data[block_index])
			block_index += 1

		var compressed_block = block_data.compress(compression_mode)
		block_sizes.append_array(_encode_uint32(compressed_block.size()))
		compressed_blocks.append(compressed_block)

	buffer.append_array(block_sizes)

	for block in compressed_blocks:
		buffer.append_array(block)

	return buffer

# Godot is Little Endian by default, so the order here is crucial!
static func _encode_uint32(value: int) -> PackedByteArray:
	var arr = PackedByteArray()
	arr.append(value & 0xFF)
	arr.append((value >> 8) & 0xFF)
	arr.append((value >> 16) & 0xFF)
	arr.append((value >> 24) & 0xFF)
	return arr


static func _encode_string(value: String) -> PackedByteArray:
	var arr = PackedByteArray()
	for char in value:
		arr.append_array(char.to_ascii_buffer())
	return arr
```

With this component, we can now easily adjust our previous code:

```gd
const Compression = preload('compression.gd')

func _export_begin(features: PackedStringArray, is_debug: bool, path: String, flags: int):
    var pandora_path = "res://data.pandora"
    # open the uncompressed normal file from the project folder
    var file = FileAccess.open(pandora_path, FileAccess.READ)
    var text:String = file.get_as_text()
    # compress the file into the correct format so Godot can load it again
    var compressed:PackedByteArray = Compression.compress(text)
    add_file(pandora_path, compressed, false)
    file.close()
```

With the above trick, you can now open the file via `open_compressed` without problems!

I hope you enjoyed this little sneakpeak into the development of my addon. Feel free to checkout [pandora](https://github.com/bitbrain/pandora) for yourself. I also have [a Youtube channel](https://youtube.com/@bitbraindev) where I document my gamedev journey - check it out!
