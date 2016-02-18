---
layout: post
title: Planting your behavior tree
excerpt: All about how to build easy behavior trees
---
Behavior trees are a nice way to build your own AI. The advantage compared to state machines: it is easy to extend and does not require such decision logic as in state machines. A behavior tree basically consists of nodes which can occur in 2 different ways:

* **decision nodes**: decision nodes iterate over their children in a certain way. **Selectors** are equal to a logical **OR** and return a true status when at least one of their children has a successful run. **Sequences** return only a successful status when all of their children had a successful run.
* **leaf nodes**: leaf nodes contain basic AI logic for movement and other actions.

Furthermore you need to exchange information between all nodes to manipulate the game state. Many behavior tree libraries already offer a possibility to register an object which represents the actual game state.

# Restaurant example

Imagine a restaurant where a waiter has different tasks. When no customer is in the room the waiter has to go into the kitchen in order to wash dirty plates. When all plates are clean the waiter should look for customers to receive orders. When no customer is there and all plates are clean, the room needs to be cleaned as well. A behavior tree could look like this:

<img alt="ai-sample" src="{{ "/img/behavior-tree-sample.png" | prepend: site.baseurl }}" />

The selector first executes the left sequence node. By doing so, the sequence then iterates over all its children and only returns true when all children had a successful run. As a result when at least on child had a not successful run (grabbing a plate or washing a plate) the sequence will report a failure state to the parent selector. The selector only executes the next child when the first child reports a failure. The selector then executes its next child (the right selector child) which then executes its children in the same way and so on.

# Adding artificial intelligence

The example above is very simple and is not a real AI. When executing the tree only conditions are checked and certain branches with their respective leafs are executed. To implement AI like behavior you could extend the tree dynamically, depending on certain conditions. For example the application could detect bottlenecks or slow parts in the tree and rebuild the tree to improve the performance depending on the current situation. This mechanism could also be extended by applying machine learning to provide dynamic tree structures, depending on the decision of the machine.

# Conclusion

Implementing a behavior tree is mostly not necessary since there are a lot of libraries available (such as [libGDX-ai](https://github.com/libgdx/gdx-ai/wiki/Behavior-Trees)).
