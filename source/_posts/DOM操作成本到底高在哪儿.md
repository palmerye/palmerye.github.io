---
title: DOM操作成本到底高在哪儿？
date: 2018-03-22 21:22:13
tags: [DOM]
---

> 从我接触前端到现在，一直听到的一句话：操作DOM的成本很高，不要轻易去操作DOM。尤其是React、vue等MV*框架的出现，数据驱动视图的模式越发深入人心，jQuery时代提供的强大便利地操作DOM的API在前端工程里用的越来越少。刨根问底，这里说的成本，到底高在哪儿呢？

<!--more-->

## 什么是DOM

> Document Object Model 文档对象模型

什么是DOM？可能很多人第一反应就是div、p、span等html标签（至少我是），但要知道，DOM是Model，是Object Model，对象模型，是为HTML（and XML）提供的API。HTML(Hyper Text Markup Language)是一种标记语言，HTML在DOM的模型标准中被视为对象，DOM只提供编程接口，却无法实际操作HTML里面的内容。但在浏览器端，前端们可以用脚本语言（JavaScript）通过DOM去操作HTML内容。

那么问题来了，只有JavaScript才能调用DOM这个API吗？

答案是**NO**。

Python也可以访问DOM。所以DOM不是提供给Javascript的API，也不是Javascript里的API。

**PS: 实质上还存在[CSSOM](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/constructing-the-object-model)：CSS Object Model，浏览器将CSS代码解析成树形的数据结构，与DOM是两个独立的数据结构**。

## 浏览器渲染过程

> 讨论DOM操作成本，肯定要先了解该成本的来源，那么就离不开浏览器渲染。

这里暂只讨论浏览器拿到HTML之后开始解析、渲染。（怎么拿到HTML资源的可能后续另开篇总结吧，什么握握握手啊挥挥挥挥手啊，万恶的flag...）

 1. 解析HTML，构建DOM树（这里遇到外链，此时会发起请求）

 2. 解析CSS，生成CSS规则树

 3. 合并DOM树和CSS规则，生成render树

 4. 布局render树（Layout/reflow），负责各元素尺寸、位置的计算

 5. 绘制render树（paint），绘制页面像素信息

 6. 浏览器会将各层的信息发送给GPU，GPU将各层合成（composite），显示在屏幕上

### 1.构建DOM树

```
<html>
  <head>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link href="style.css" rel="stylesheet">
    <title>Critical Path</title>
  </head>
  <body>
    <p>Hello <span>web performance</span> students!</p>
    <div><img src="awesome-photo.jpg"></div>
  </body>
</html>
```

> 无论是DOM还是CSSOM，都是要经过`Bytes → characters → tokens → nodes → object model`这个过程。

![](https://github.com/palmerye/pictureBed/raw/master/blog/bV6yUy.png?fromMac)

> DOM树构建过程：当前节点的所有子节点都构建好后才会去构建当前节点的下一个兄弟节点。

### 2.构建CSSOM树

上述也提到了CSSOM的构建过程，也是树的结构，在最终计算各个节点的样式时，浏览器都会先从该节点的普遍属性（比如body里设置的全局样式）开始，再去应用该节点的具体属性。还有要注意的是，每个浏览器都有自己默认的样式表，因此很多时候这棵CSSOM树只是对这张默认样式表的部分替换。

### 3.生成render树

> DOM树和CSSOM树合并生成render树

![](https://github.com/palmerye/pictureBed/raw/master/blog/bV6yUI.png?fromMac)

简单描述这个过程：

DOM树从根节点开始遍历**可见**节点，这里之所以强调了“可见”，是因为如果遇到设置了类似`display: none;`的不可见节点，在render过程中是会被跳过的（但`visibility: hidden; opacity: 0`这种仍旧占据空间的节点不会被跳过render），保存各个节点的样式信息及其余节点的从属关系。

### 4.Layout 布局

有了各个节点的样式信息和属性，但不知道各个节点的确切位置和大小，所以要通过布局将样式信息和属性转换为实际可视窗口的相对大小和位置。

### 5.Paint 绘制

万事俱备，最后只要将确定好位置大小的各节点，通过GPU渲染到屏幕的实际像素。


### **Tips**

- 在上述渲染过程中，前3点可能要多次执行，比如js脚本去操作dom、更改css样式时，浏览器又要重新构建DOM、CSSOM树，重新render，重新layout、paint；
- Layout在Paint之前，因此每次Layout重新布局（reflow 回流）后都要重新出发Paint渲染，这时又要去消耗GPU；
- Paint不一定会触发Layout，比如改个颜色改个背景；（repaint 重绘）
- 图片下载完也会重新出发Layout和Paint；

![](https://github.com/palmerye/pictureBed/raw/master/blog/2193277599-5aaa2e14da341_articlex.png?fromMac)

## 何时触发reflow和repaint

> reflow(回流): 根据Render Tree布局(几何属性)，意味着元素的内容、结构、位置或尺寸发生了变化，需要重新计算样式和渲染树；
repaint(重绘): 意味着元素发生的改变只影响了节点的一些样式（背景色，边框颜色，文字颜色等），只需要应用新样式绘制这个元素就可以了；
reflow回流的成本开销要高于repaint重绘，一个节点的回流往往回导致子节点以及同级节点的回流；

[GoogleChromeLabs](https://github.com/GoogleChromeLabs) 里面有一个[csstriggers](https://csstriggers.com/)，列出了各个CSS属性对浏览器执行Layout、Paint、Composite的影响。

### 引起reflow回流

> 现代浏览器会对回流做优化，它会等到足够数量的变化发生，再做一次批处理回流。

1. 页面第一次渲染（初始化）
2. DOM树变化（如：增删节点）
3. Render树变化（如：padding改变）
4. 浏览器窗口resize
5. 获取元素的某些属性：
    浏览器为了获得正确的值也会**提前触发回流**，这样就使得浏览器的优化失效了，这些属性包括offsetLeft、offsetTop、offsetWidth、offsetHeight、 scrollTop/Left/Width/Height、clientTop/Left/Width/Height、调用了getComputedStyle()或者IE的currentStyle

### 引起repaint重绘

1. reflow回流必定引起repaint重绘，重绘可以单独触发
2. 背景色、颜色、字体改变（注意：字体大小发生变化时，会触发回流）

### 优化reflow、repaint触发次数

- 避免逐个修改节点样式，尽量一次性修改
- 使用DocumentFragment将需要多次修改的DOM元素缓存，最后一次性append到真实DOM中渲染
- 可以将需要多次修改的DOM元素设置`display: none`，操作完再显示。（因为隐藏元素不在render树内，因此修改隐藏元素不会触发回流重绘）
- 避免多次读取某些属性（见上）
- 将复杂的节点元素脱离文档流，降低回流成本

## 为什么一再强调将css放在头部，将js文件放在尾部

### DOMContentLoaded 和 load

- DOMContentLoaded 事件触发时，仅当DOM加载完成，不包括样式表，图片...
- load 事件触发时，页面上所有的DOM，样式表，脚本，图片都已加载完成

### CSS 资源阻塞渲染

构建Render树需要DOM和CSSOM，所以HTML和CSS都会阻塞渲染。所以需要让CSS尽早加载（如：放在头部），以缩短首次渲染的时间。

### JS 资源

- 阻塞浏览器的解析，也就是说发现一个外链脚本时，需等待脚本下载完成并执行后才会继续解析HTML
    - 这和之前文章提到的浏览器线程有关，浏览器中js引擎线程和渲染线程是互斥的，详见[《从setTimeout-setInterval看JS线程》](https://segmentfault.com/a/1190000013702430#articleHeader2)
- 普通的脚本会阻塞浏览器解析，加上defer或async属性，脚本就变成异步，可等到解析完毕再执行
    - async异步执行，异步下载完毕后就会执行，不确保执行顺序，一定在onload前，但不确定在DOMContentLoaded事件的前后
    - defer延迟执行，相对于放在body最后（理论上在DOMContentLoaded事件前）

### 举个栗子

```
<html>
  <head>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link href="style.css" rel="stylesheet">
  </head>
  <body>
    <p>Hello <span>web performance</span> students!</p>
    <div><img src="awesome-photo.jpg"></div>
    <script src="app.js"></script>
  </body>
</html>
```

![](https://github.com/palmerye/pictureBed/raw/master/blog/517718454-5aaa988a999bb_articlex.png?fromMac)

- 浏览器拿到HTML后，从上到下顺序解析文档
- 此时遇到css、js外链，则同时发起请求
- 开始构建DOM树
- 这里要特别注意，由于有CSS资源，CSSOM还未构建前，会阻塞js（如果有的话）
- 无论JavaScript是内联还是外链，只要浏览器遇到 `script` 标记，唤醒`JavaScript解析器`，就会进行暂停 `blocked` 浏览器解析HTML，并等到 `CSSOM` 构建完毕，才执行js脚本
- 渲染首屏（DOMContentLoaded 触发，其实不一定是首屏，可能在js脚本执行前DOM树和CSSOM已经构建完render树，已经paint）

## 首屏优化Tips

> 说了这么多，其实可以总结几点浏览器首屏渲染优化的方向

- 减少资源请求数量（内联亦或是延迟动态加载）
- 使CSS样式表尽早加载，减少@import的使用，因为需要解析完样式表中所有import的资源才会算CSS资源下载完
- 异步js：阻塞解析器的 JavaScript 会强制浏览器等待 CSSOM 并暂停 DOM 的构建，导致首次渲染的时间延迟
- so on...

## 知道操作DOM成本多高了吗?

> 其实写了这么多，感觉偏题了，大量的资料参考的是chrome开发者文档。感觉js脚本资源那块还是有点乱，包括和DOMContentLoaded的关系，希望大家能多多指点，多多批评，谢谢大佬们。 

操作DOM具体的成本，说到底是造成浏览器回流reflow和重绘reflow，从而消耗GPU资源。

## 参考文献:

[https://developers.google.com/web/fundamentals/performance/critical-rendering-path/](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/)

> 已同步至个人博客-[软硬皆施](palmer.arkstack.cn/2018/03/DOM操作成本到底高在哪儿/)
[Github](https://github.com/palmerye/palmerye.github.io) 欢迎star :)
