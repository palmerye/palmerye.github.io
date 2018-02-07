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

### 影响布局的因素

1. 盒的尺寸和类型
2. 定位体系 `Positioning Scheme` （常规流，浮动和绝对定位）
3. 文档树中元素之间的关系
4. 外部信息（如：视口大小，图片的固有尺寸等）

### 




## FC -- Formatting Context

> FC...是谁在说脏话？！ Formatting Context -- 格式化上下文



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

[CSS2.1规范](https://www.w3.org/TR/CSS22/visuren.html#normal-flow)

[视觉格式化模型](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Visual_formatting_model)

[BFC 神奇背后的原理](https://www.cnblogs.com/lhb25/p/inside-block-formatting-ontext.html)
