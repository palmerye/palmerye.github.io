---
title: 从setTimeout/setInterval看JS线程
date: 2017-12-20 22:53:12
tags:
---

> 未完待续

> 最近项目中遇到了一个场景，其实很常见，就是定时获取接口刷新数据。那么问题来了，假设我设置的定时时间为1s，而数据接口返回大于1s，应该用同步阻塞还是异步？我们先整理下js中定时器的相关知识，再来看这个问题。

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
- 有些房间只能容纳部分的人，意味着部分内存只能给

## setTimeout(function, 0) 发生了什么


----------

参考:

[进程与线程的一个简单解释--阮大大](http://www.ruanyifeng.com/blog/2013/04/processes_and_threads.html)
