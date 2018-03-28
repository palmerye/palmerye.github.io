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

 1. 解析HTML，构建DOM树

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

![](http://ohce3yxd6.bkt.clouddn.com/blog/bV6yUI.png?fromMac)

> DOM树构建过程：当前节点的所有子节点都构建好后才会去构建当前节点的下一个兄弟节点。

### 2.构建CSSOM树

上述也提到了CSSOM的构建过程，也是树的结构，在最终计算各个节点的样式时，浏览器都会先从该节点的普遍属性（比如body里设置的全局样式）开始，再去应用该节点的具体属性。还有要注意的是，每个浏览器都有自己默认的样式表，因此很多时候这棵CSSOM树只是对这张默认样式表的部分替换。

### 3.生成render树

> DOM树和CSSOM树合并生成render树

![](http://ohce3yxd6.bkt.clouddn.com/blog/bV6yUy.png?fromMac)

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

![](http://ohce3yxd6.bkt.clouddn.com/blog/bV6yUy.png?fromMac)

## 何时触发reflow和repaint

> reflow(回流): 根据Render Tree布局(几何属性)，意味着元素的内容、结构、位置或尺寸发生了变化，需要重新计算样式和渲染树；
repaint(重绘): 意味着元素发生的改变只影响了节点的一些样式（背景色，边框颜色，文字颜色等），只需要应用新样式绘制这个元素就可以了；
reflow回流的成本开销要高于repaint重绘，一个节点的回流往往回导致子节点以及同级节点的回流；

[GoogleChromeLabs](https://github.com/GoogleChromeLabs) 里面有一个[csstriggers](https://csstriggers.com/)，列出了各个CSS属性对浏览器执行Layout、Paint、Composite的影响。

### 引起reflow回流

1. 页面第一次渲染（初始化）
2. DOM树变化（如：增删节点）
3. Render树变化（如：padding改变）
4. 浏览器窗口resize
5. 。。。

### 引起repaint重绘

1. reflow回流必定引起repaint重绘
2. 

## 为什么一再强调将css放在头部，将js文件放在尾部

### CSS 资源阻塞渲染

### DOMContentLoaded 和 load


## 参考文献:

[https://developers.google.com/web/fundamentals/performance/critical-rendering-path/](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/)
