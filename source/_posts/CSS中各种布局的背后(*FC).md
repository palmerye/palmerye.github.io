---
title: CSS中各种布局的背后(*FC)
date: 2018-02-25 10:00:12
tags: [BFC, IFC, FFC, GFC]
---

> CSS中各种布局的背后，实质上是各种*FC的组合。CSS2.1 中只有 BFC 和 IFC, CSS3 中还增加了 FFC 和 GFC。

<!--more-->

## 盒模型(Box Model)

![imgage](https://developer.mozilla.org/files/72/boxmodel%20(1).png)

> 上图为W3C标准盒模型，另外还有一种IE盒模型（IE6以下），唯一的区别就是：前者`width = content`，后者`width = content + padding + border`

> 若要将IE盒模型转换为标准盒模型，需要在文档顶部加上`<!DOCTYPE html>`声明；很有意思的是，后来CSS3 中也增加了`box-sizing`属性，`box-sizing: content-box`即标准盒模型，`box-sizing: border-box`即IE盒模型（width包含内边距和边框），W3C反过来又承认了微软，也是有意思。

## 视觉格式化模型(Visual Formatting Model)

> 视觉格式化模型(visual formatting model)是用来处理文档并将它显示在视觉媒体上的机制，根据上述的盒模型，为文档元素生成盒（Box）。通俗的说，视觉格式化模型就是文档里的盒子布局呈现的一种规则。

影响布局的因素

1. 盒的尺寸和类型
2. 定位方案 `Positioning Scheme` （常规流，浮动和绝对定位）
3. 文档树中元素之间的关系
4. 外部信息（如：视口大小，图片的固有尺寸等）

### FC -- Formatting Context

> FC...是谁在说脏话？！ Formatting Context -- 格式化上下文，*FC就是视觉格式化模型，用来描述盒子布局规则。

### 前方大波概念来袭！

> 块级元素、块级盒、块容器盒、块盒、匿名块盒、行内级元素、行内级盒、原子行内级盒、原子行内盒、行盒、匿名行内盒、~~插入盒~~......要报警了！！！这些真的不是我YY出来的，[W3C](https://www.w3.org/TR/CSS22/visuren.html) 里真的有这么多概念好吗！！！感觉进坑了啊！！！headache...来吧，一个个捋清楚... -_-|||

- **块级元素(Block-level elements)**：当元素的 CSS 属性 `display:block / list-item / table` 时，它就是是块级元素 block-level ，视觉上呈现为块，竖直排列。每个块级元素生成一个主要的块级盒 (Principal Block-level Box) 来包含其后代盒和生成的内容，同时参与定位体系 (Positioning Scheme) 。某些块级元素还会在主要盒之外产生额外的盒： list-item 元素。这些额外的盒会相对于主要盒来摆放。

- **块级盒(Block-level boxes)**：由块级元素生成，参与块级格式化上下文(BFC)。**描述元素跟它的父元素与兄弟元素之间的表现。**
- **块容器盒(Block container box)**：只包含其它块级盒，或生成一个行内格式化上下文(inline formatting context)，只包含行内盒。有些块级盒，比如表格，不是块容器盒。相反，一些块容器盒，比如非替换行内块及非替换表格单元格，不是块级盒。**描述元素跟它的后代之间的影响。**
- **块盒(Block boxes)**：同时是块容器盒的块级盒。

![img](https://mdn.mozillademos.org/files/3559/venn_blocks.png)

- **匿名块盒(Anonymous block boxes)**：没有名字，不能被 CSS 选择符选中。块容器盒要么只包含行内级盒，要么只包含块级盒，但通常文档会同时包含两者，在这种情况下，将创建匿名块盒来包含毗邻的行内级盒。

``` html
<div>
   I am Block container box
   <p>I'm Inline-level boxes</p>
   I am Block container box
</div>
```

- **行内级元素(Inline-level elements)**：当元素的 CSS 属性 `display：inline, inline-block 或 inline-table` 时，称它为行内级元素。行内级元素生成行内级盒(inline-level boxes)，参与行内格式化上下文(IFC)。
- **行内级盒(Inline-level boxes)**：所有 `display:inline` 的非替换元素生成的盒是行内盒。
- **原子行内级盒(atomic inline-level boxes)**：不参与生成行内格式化上下文的行内级盒称为原子行内级盒(atomic inline-level boxes)。
- **原子行内盒(atomic inline boxes)**：注意：起初原子行内级盒(atomic inline-level boxes)被称为原子行内盒(atomic inline boxes)。很不幸，它们并非行内盒。规范的勘误表修正了这个错误。不管怎样，当再看到原子行内盒时可以放心的当成原子行内级盒，因为只是改了名字。原子行内盒在行内格式化上下文里不能分成多行。
- **行盒(Line boxes)**：行盒由行内格式化上下文(IFC)产生的盒，用于表示一行。在块盒里面，行盒从块盒一边排版到另一边。 当有浮动时, 行盒从左浮动的最右边排版到右浮动的最左边。

![img](https://developer.mozilla.org/@api/deki/files/6008/=venn_inlines.png)

- **匿名行内盒(Anonymous inline boxes)**：匿名行内盒最常见的例子是块盒直接包含文本。
- ~~插入盒(Run-in boxes)~~：插入盒(Run-in boxes)从 CSS 2.1 标准中移除了，因为可操作的实现定义不足。 可能 CSS3 会引入，但是这是实验性质，不能用于生产环境。 

### 定位方案(Positioning schemes)

#### - 常规流(Normal flow)

> CSS2.1中，常规流包括块级盒的块格式化，行内盒的行内格式化，以及块级盒和行内级盒的相对定位。

#### - 浮动(Floats)

> 在浮动模型中，盒首先根据常规流布局，然后从常规流中脱离并尽可能地向左或向右位移。内容可以布局在浮动周围。

#### - 绝对定位(Absolute positioning)

> 在绝对定位模型中，盒完全从常规流中脱离（对后面的同胞元素无影响）并根据包含块来分配位置。


## BFC -- Block Formatting Context

### 触发条件

1. 根元素或其它包含它的元素
2. 浮动 `float: left/right/inherit`
3. 绝对定位元素 `position: absolute/fixed`
4. 行内块 `display: inline-block`
5. 表格单元格 `display: table-cell`
6. 表格标题 `display: table-caption`
7. 溢出元素 `overflow: hidden/scroll/auto/inherit`
8. 弹性盒子 `display: flex/inline-flex`

### 布局规则

1. 内部的Box会在垂直方向，一个接一个地放置。
2. Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠。
3. 每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
4. BFC的区域不会与float box重叠。
5. BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
6. 计算BFC的高度时，浮动元素也参与计算

### 应用场景

- 闭合浮动：浮动区域不叠加到BFC区域上
- 防止与浮动元素重叠
- 防止margin collapse
- float 元素高度塌陷
- ...

## IFC -- Inline Formatting Contexts

### 触发条件

一个块级元素中**仅**包含内联级别元素

### 布局规则

- 内部的盒子会在水平方向，一个接一个地放置。

- 这些盒子垂直方向的起点从包含块盒子的顶部开始。

- 摆放这些盒子的时候，它们在水平方向上的 padding、border、margin 所占用的空间都会被考虑在内。

- 在垂直方向上，这些框可能会以不同形式来对齐（vertical-align）：它们可能会使用底部或顶部对齐，也可能通过其内部的文本基线（baseline）对齐。

- 能把在一行上的框都完全包含进去的一个矩形区域，被称为该行的行框（line box）。行框的宽度是由包含块（containing box）和存在的浮动来决定。

- IFC中的 line box 一般左右边都贴紧其包含块，但是会因为float元素的存在发生变化。float 元素会位于IFC与与 line box 之间，使得 line box 宽度缩短。

- IFC 中的 line box 高度由 CSS 行高计算规则来确定，同个 IFC 下的多个 line box 高度可能会不同（比如一行包含了较高的图片，而另一行只有文本）

- 当 inline-level boxes 的总宽度少于包含它们的 line box 时，其水平渲染规则由 text-align 属性来确定，如果取值为 justify，那么浏览器会对 inline-boxes（注意不是inline-table 和 inline-block boxes）中的文字和空格做出拉伸。

- 当一个 inline box 超过 line box 的宽度时，它会被分割成多个boxes，这些 boxes 被分布在多个 line box 里。如果一个 inline box 不能被分割（比如只包含单个字符，或 word-breaking 机制被禁用，或该行内框受 white-space 属性值为 nowrap 或 pre 的影响），那么这个 inline box 将溢出这个 line box。

### 应用场景

- 水平居中：当一个块要在环境中水平居中时，设置其为 inline-block 则会在外层产生 IFC，通过设置父容器 text-align:center 则可以使其水平居中。

- 垂直居中：创建一个IFC，用其中一个元素撑开父元素的高度，然后设置其 vertical-align:middle，其他行内元素则可以在此父元素下垂直居中。

## FFC -- Flex Formatting Contexts

### 触发条件

当 `display` 的值为 `flex` 或 `inline-flex` 时，将生成弹性容器（Flex Containers）, 一个弹性容器为其内容建立了一个新的弹性格式化上下文环境（FFC）

### 布局规则

- 设置为 `flex` 的容器被渲染为一个块级元素
- 设置为 `inline-flex` 的容器则渲染为一个行内元素
- 弹性容器中的每一个子元素都是一个弹性项目。弹性项目可以是任意数量的。弹性容器外和弹性项目内的一切元素都不受影响。简单地说，Flexbox 定义了弹性容器内弹性项目该如何布局

## GFC -- GridLayout Formatting Contexts

### 触发条件

当为一个元素设置`display`值为`grid`的时候，此元素将会获得一个独立的渲染区域

### 布局规则

通过在网格容器（grid container）上定义网格定义行（grid definition rows）和网格定义列（grid definition columns）属性各在网格项目（grid item）上定义网格行（grid row）和网格列（grid columns）为每一个网格项目（grid item）定义位置和空间

--- 

参考：

[Visual formatting model](https://www.w3.org/TR/CSS22/visuren.html)

[视觉格式化模型](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Visual_formatting_model)

[BFC 神奇背后的原理](https://www.cnblogs.com/lhb25/p/inside-block-formatting-ontext.html)
