---
title: 从setTimeout/setInterval看JS线程
date: 2017-12-20 22:53:12
tags:
---

> 未完待续

> 最近项目中遇到了一个场景，其实很常见，就是定时获取接口刷新数据。那么问题来了，假设我设置的定时时间为1s，而数据接口返回大于1s，应该用同步阻塞还是异步？我们先整理下js中定时器的相关知识，再来看这个问题。

<!--more-->

## 初识setTimeout 与 setInterval

> 先来简单认识，后面我们试试用setTimeout 实现 setInterval 的功能

- setTimeout 延迟一段时间执行一次 **(Only one)**

``` JavaScript
setTimeout(function, milliseconds, param1, param2, ...)
clearTimeout() // 阻止定时器运行

e.g.
setTimeout(function(){ alert("Hello"); }, 3000); // 3s后弹出
```

- setInterval 每隔一段时间执行一次 **(Many times)**

``` JavaScript
setInterval(function, milliseconds, param1, param2, ...)

e.g.
setInterval(function(){ alert("Hello"); }, 3000); // 每隔3s弹出
```

> setTimeout和setInterval的延时最小间隔是4ms（W3C在HTML标准中规定）；在JavaScript中没有任何代码是立刻执行的，但一旦进程空闲就尽快执行。这意味着无论是setTimeout还是setInterval，所设置的时间都只是n毫秒被添加到队列中，而不是过n毫秒后立即执行。

## 进程与线程，傻傻分不清楚

为了讲清楚这两个抽象的概念，我们借用阮大大借用的比喻，先来模拟一个场景:
- 这里有一个大型工厂
- 工厂里有若干车间，每次只能有一个车间在作业
- 每个车间里有若干房间，有若干工人在流水线作业

那么：
- 一个工厂对应的就是计算机的一个CPU，平时讲的多核就代表多个工厂
- 每个工厂里的车间，就是**进程**，意味着同一时刻一个CPU只运行一个**进程**，其余**进程**在怠工
- 这个运行的车间（**进程**）里的工人，就是**线程**，可以有多个工人（**线程**）协同完成一个任务
- 车间（**进程**）里的房间，代表内存。

再深入点：
- 车间（**进程**）里工人可以随意在多个房间（内存）之间走动，意味着一个**进程**里，多个**线程**可以共享内存
- 部分房间（内存）有限，只允许一个工人（**线程**）使用，此时其他工人（**线程**）要等待
- 房间里有工人进去后上锁，其他工人需要等房间（内存）里的工人（**线程**）开锁出来后，才能才进去，这就是**互斥锁**（Mutual exclusion，缩写 Mutex）
- 有些房间只能容纳部分的人，意味着部分内存只能给有限的**线程**

再再深入:
- 如果同时有多个车间作业，就是**多进程**
- 如果一个车间里有多个工人协同作业，就是**多线程**
- 当然不同车间之间的工人也可以有相互协作，就需要协调机制

## JavaScript 单线程

总所周知，JavaScript 这门语言的核心特征，就是单线程。这和 JavaScript 最初设计是作为一门 GUI 编程语言有关，最初用于浏览器端，单一线程控制 GUI 是很普遍的做法。但这里特别要划个重点，虽然JavaScript是单线程，但**浏览器是多线程的！！！**例如Webkit或是Gecko引擎，可能有javascript引擎线程、界面渲染线程、浏览器事件触发线程、Http请求线程。ps：可能要总结一篇浏览器渲染的文章了。

> HTML5提出Web Worker标准，允许JavaScript脚本创建多个线程，但是子线程完全受主线程控制，且不得操作DOM。所以，这个新标准并没有改变JavaScript单线程的本质。

## 同步与异步，傻傻分不清楚

> 之前阮大大写了一篇[《JavaScript 运行机制详解：再谈Event Loop》](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)，然后被[朴灵评注](https://app.yinxiang.com/shard/s8/sh/b72fe246-a89d-434b-85f0-a36420849b84/59bad790bdcf6b0a66b8b93d5eacbead)了，特别是同步异步的理解上，两位大牛有很大的歧义。



## 

## Event Loop



## setTimeout(function, 0) 发生了什么


----------

参考:

[进程与线程的一个简单解释 -- 阮大大](http://www.ruanyifeng.com/blog/2013/04/processes_and_threads.html)

[【译】JavaScript 如何工作的: 事件循环和异步编程的崛起 + 5 个关于如何使用 async/await 编写更好的技巧](https://juejin.im/post/5a221d35f265da43356291cc)
