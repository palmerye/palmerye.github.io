---
title: 除了BFC，你知道IFC、FFC、GFC吗？
date: 2018-02-02 10:00:12
tags: [BFC]
---

> 未完待续

<!--more-->
CSS2.1 中只有 BFC 和 IFC, CSS3 中还增加了 FFC 和 GFC。

## 盒模型(Box Model)

![imgage](https://developer.mozilla.org/files/72/boxmodel%20(1).png)

> 上图为W3C标准盒模型，另外还有一种IE盒模型（IE6以下），唯一的区别就是：前者`width = content`，后者`width = content + padding + border`

> 若要将IE盒模型转换为标准盒模型，需要在文档顶部加上`<!DOCTYPE html>`声明；很有意思的是，后来CSS3 中也增加了`box-sizing`属性，`box-sizing: content-box`即标准盒模型，`box-sizing: border-box`即IE盒模型（width包含内边距和边框），W3C反过来又承认了微软，也是有意思。

## 视觉格式化模型(Visual Formatting Model)

> 视觉格式化模型(visual formatting model)是用来处理文档并将它显示在视觉媒体上的机制，根据上述的盒模型，为文档元素生成盒（Box）。通俗的说，视觉格式化模型就是文档里的盒子布局呈现的一种规则。

### FC -- Formatting Context

> FC...是谁在说脏话？！ Formatting Context -- 格式化上下文，*FC就是视觉格式化模型，用来描述盒子布局规则。

### 前方大波概念来袭！

> 块级元素、块级盒、块容器盒、块盒、匿名块盒、行内级元素、行内盒、原子行内级盒、原子行内盒、行盒、匿名行内盒、~~插入盒~~......要报警了！！！这些真的不是我YY出来的，[W3C](https://www.w3.org/TR/CSS22/visuren.html) 里真的有这么多概念好吗！！！感觉进坑了啊！！！headache...来吧，一个个捋清楚... -_-|||

- **块级元素(Block-level elements)**：当元素的 CSS 属性 `display:block / list-item / table` 时，它就是是块级元素 block-level ，视觉上呈现为块，竖直排列。每个块级元素生成一个主要的块级盒 (Principal Block-level Box) 来包含其后代盒和生成的内容，同时参与定位体系 (Positioning Scheme) 。某些块级元素还会在主要盒之外产生额外的盒： list-item 元素。这些额外的盒会相对于主要盒来摆放。

- **块级盒(Block-level boxes)**
- **块容器盒(Block container box)**
- **块盒(Block boxes)**
- **匿名块盒(Block container box)**

- **行内级元素(Inline-level elements)**
- **行内盒(Inline-level boxes)**
- **原子行内级盒(atomic inline-level boxes)**
- **原子行内盒(atomic inline boxes)**
- **行盒(Line boxes)**
- **匿名行内盒(Anonymous inline boxes)**
- ~~插入盒(Run-in boxes)~~




### 影响布局的因素

1. 盒的尺寸和类型
2. 定位体系 `Positioning Scheme` （常规流，浮动和绝对定位）
3. 文档树中元素之间的关系
4. 外部信息（如：视口大小，图片的固有尺寸等）

### 








## BFC -- Block Formatting Context

### 布局规则

1. 内部的Box会在垂直方向，一个接一个地放置。
2. Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠。
3. 每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
4. BFC的区域不会与float box重叠。
5. BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
6. 计算BFC的高度时，浮动元素也参与计算


## IFC -- Inline Formatting Contexts


## FFC -- Flex Formatting Contexts


## GFC -- GridLayout Formatting Contexts



--- 

参考：

[Visual formatting model](https://www.w3.org/TR/CSS22/visuren.html)

[视觉格式化模型](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Visual_formatting_model)

[BFC 神奇背后的原理](https://www.cnblogs.com/lhb25/p/inside-block-formatting-ontext.html)
