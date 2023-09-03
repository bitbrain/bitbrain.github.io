---
layout: post
title: "Godot Version Compatibility: A Guide for Addon Developers"
tags: godot addon gamedev
---

**Godot addons offer a powerful way to extend the engine's functionality without having to modify its core.** This flexibility empowers the community to create custom solutions without burdening the engine itself. However, as addon developers, we must strike a balance between compatibility and functionality. This article explores the trade-offs involved, focusing primarily on Godot Engine 4.x.

## The Antonomy of a Godot Release

Godot currently has two **major** versions in circulation:

- **Godot 3.x**: This older version is known for its stability and backward compatibility. It's particularly useful for projects that require lighter hardware capabilities, such as mobile games.
- **Godot 4.x**: This is the newer, more advanced version, boasting superior graphics capabilities through Vulkan and significant reworks of various systems.

Each major version consists of **minor** versions (e.g., Godot 4.0, 4.1, etc.) that mainly introduce new features and bug fixes. These are followed by **maintenance** versions (e.g., 4.0.1, 4.1.2) focusing on bug fixes, compatibility improvements, and minor UX enhancements. Typically, maintenance releases are non-API-breaking.

## Crafting a Compatibility Matrix

When developing addons, it's crucial to consider which Godot features you'll be using from the outset. Suppose you have an addon compatible with all minor versions of Godot 4.x. Your initial compatibility matrix might look like this:

| Godot Version | Addon Version |
|---------------|---------------|
| 4.0.x         | 1.0.x         |
| 4.1.x         | 1.0.x         |

Let's say Godot 4.1 introduces a [new feature](https://github.com/godotengine/godot/pull/76264) called **static variables**:
```gdscript
class_name CustomClass extends RefCounted

# shared between instances of this class
static var my_var:int
```
Using this feature would make your addon incompatible with Godot 4.0.x. You now have three options:

### Option 1: Maintain Support for Godot 4.0

> ✅ Maximum flexibility  
> ⛔️ High administrative overhead

| Godot Version | Addon Version |
|---------------|---------------|
| 4.0.x         | 1.0.x         |
| 4.1.x         | 1.1.x         |

You could maintain a separate `1.0` branch for Godot 4.0.x compatibility, cherry-picking bug fixes as needed. This approach increases administrative overhead, especially if you're using Continuous Integration.

### Option 2: Drop Support for Godot 4.0

> ✅ Access to all new features  
> ⛔️ Risk of alienating some users

| Godot Version | Addon Version |
|---------------|---------------|
| 4.1.x         | 1.1.x         |

By dropping support for older versions, you can fully utilize the new features but may lose users who are still on Godot 4.0.x.

### Option 3: Maintain Broad Compatibility

> ✅ Broad user base  
> ⛔️ Limited access to new features

| Godot Version | Addon Version |
|---------------|---------------|
| 4.x           | 1.x           |

This approach minimizes administrative work but restricts you from using newer features.

## Which Option to Pick?

The best approach depends on various factors:

- **User Base**: Check [issue stats](https://godotengine.github.io/issue-stats/) to gauge the popularity of different Godot versions.
- **Feature Importance**: Assess how critical new Godot features are for your addon's functionality.
- **Administrative Overhead**: Be realistic about the time and effort you can invest in maintaining multiple branches.
- **Backporting**: Consider whether a feature could be backported to older versions, especially if it's a game-changer.

## Supporting Godot 3.x

If you wish to support both Godot 3 and 4, you can maintain separate branches for each. For example, my addon [beehave](https://bitbra.in/beehave/#/?id=%f0%9f%93%a6-installation) has two branches: **godot-4.x** and **godot-3.x**, each tailored to its respective Godot version.