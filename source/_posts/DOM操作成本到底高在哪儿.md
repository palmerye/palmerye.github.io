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

### 构建DOM树

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

![图片描述][1]

> DOM树构建过程：当前节点的所有子节点都构建好后才会去构建当前节点的下一个兄弟节点。

### 生成render树

> DOM树和CSSOM树合并生成render树

![图片描述][2]


![图片描述][3]


## 何时触发reflow和repaint

> reflow(回流): 根据Render Tree布局(几何属性);
repaint(重绘): 在reflow之后，渲染像素点到屏幕(颜色、背景...)；


[GoogleChromeLabs](https://github.com/GoogleChromeLabs) 里面有一个[csstriggers](https://csstriggers.com/)，列出了各个CSS属性对浏览器执行Layout、Paint、Composite的影响。

## loaded和domcontentloaded


## 参考文献:

[https://developers.google.com/web/fundamentals/performance/critical-rendering-path/](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/)


  [1]: /img/bV6yUy
  [2]: /img/bV6yUI
  [3]: /img/bV5TvO
