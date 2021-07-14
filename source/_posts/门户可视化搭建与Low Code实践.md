---
title: 门户可视化搭建与Low Code实践
date: 2021-07-13 21:22:13
tags: [LowCode]
---

## 项目背景

偏中后台管理系统或者集成平台的应用入口，经常需要在应用入口进行**个性化的展示**。从用户角度来看，支持个性化的定制，可以有效提升用户的幸福感，提升使用或工作效率；从产品提供商来看，提供个性化定制服务的能力，也是提升产品力的一种方式。

![image001.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ffca8d1d514a42bcacbf5f1bb1716016~tplv-k3u1fbpfcp-watermark.image)

<!--more-->

### 如何提供个性化定制能力

- 定制开发（也就是一直被开发者诟病的二次开发）
   - 优：快速响应个性需求
   - 劣：
      - 开发成本高，说明自身产品力有限
      - 源码管控上的风险
- 开放配置项
   - 优：无需二次开发，节约成本
   - 劣：
      - 配置项难抽象，粒度难掌握，经常有配置项无法覆盖需求的地方
      - Do everything then do nothing.

### 解决方案

> 有没有一种方式，既能快速响应个性需求，也能控制开发成本？这里抛出两个词儿：**可视化搭建**，**Low Code低代码**。

- 可视化搭建：通过在指定配置平台，进行拖拉拽页面模块，**过程可视化**，输出个性化页面或模块。
- Low Code 低代码：开发人员通过**少量编码**或No Code，即可快速满足个性需求，并将coding成果物应用于配置中。

其实这两个概念比不是新鲜词，远在 Dreamwaver 时代就有影子（返祖现象？），且Low Code方案很难离开可视化搭建，相辅相成。在门户“千人千面”的需求中，就采用了以上的方案。

### 目标受众
> 这套方案给谁用？职责怎么划分？

| | 可视化搭建 | Coding开发 |
| --- | --- | --- |
| 受众 | 技术支持/项目经理/... | 基线开发人员/项目开发人员 |
| 职责 | 拖拉拽页面/个性化配置 | 快速模块开发/定制化开发 |

## 门户实践方案
> 在实践落地中，门户采用的是：将整个页面拆分成各个模块（**部件**），就像积木搭建一样，可通过不同的排列组合、布局方式，搭建个性化页面。

### 部件 widget - 可视化搭建最小单元
> 部件(widget)其实就是在这套方案里的“积木”，可灵活摆放，也可个性开发。

  当我们去思考如何拆分整个页面的时候，我们自然会发现，与前端**组件化**的思想不谋而合。任意一个拆分后的模块单元，都有自己的**视图HTML，交互逻辑JavaScript，样式CSS**。
  一个最基本的部件，就是由HTML/Javascript/CSS组成，再加上一些静态资源（如图片/语言文件/...)。

![image003.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0da227e65c8c48f7ab79ea091653b14c~tplv-k3u1fbpfcp-watermark.image)

当然，我们希望这个部件有一下特点：

- **独立开发**：开发者可以在宿主环境（门户）以外进行Coding开发
- **独立部署**：即可以在任意地方部署，只要能通过地址访问到该部件资源，即可加载
- **动态加载**：用到的时候加载，不用不加载。

### 如何实现

现代的前端框架（React/Vue/Angular）基本上能做到组件化思想开发，但理想的方案是**framework free**，即不受框架约束。
出于开发成本考虑，结合内部前端统一技术栈，门户的部件采用的是**Vue.js 动态组件**的方案。即一个部件，就是一个SFC单文件组件（Single File Component），通过**Webpack**模块化打包工具，将部件源码打包，输出一个资源包。
在宿主环境，通过接口获取部件资源地址，动态解析和执行字符串，再通过Vue动态组件的方式进行动态加载（`<component>` 的 `is` attribute）。

```javascript
<component v-bind:is="widgetActiveComponent"></component>
```

### 可视化搭建布局设计
> 目前门户采用**xy坐标系**，作为前端页面布局的规则。
> 如图所示，部件容器左上角的顶点坐标作为该部件定位点。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ddf471c043f2454fb00c73afc0b5dcf8~tplv-k3u1fbpfcp-zoom-1.image)

PS：这里的布局设计其实我们考虑过**栅格布局**，但各有优劣。坐标布局颗粒度更细，适用于个性化更强的场景。但栅格布局搭建成本较小，效率较高。最终我们通过加上“**网格吸附**”的功能来**优化坐标布局的体验**。~~这价值一个亿的代码有需要我可以无偿提供。~~

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/89bd9b4daef043ff93ad7d1d59efc9ec~tplv-k3u1fbpfcp-zoom-1.image)

### 方案整体流程
> 如下图所示，从页面模块抽象，通过打包构建部署，最终加载渲染，形成闭环。:)

![wdg_process.aa2802e2.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cb0f0d65066942dd9ea1802b0375b63a~tplv-k3u1fbpfcp-zoom-1.image)

#### 小结

通过部件拖拉拽配置（**可视化搭建**）和**Low Code**低代码开发（利用提供的脚手架快速开发部件，可独立开发，独立部署，动态加载），实现门户的个性化需求。

## 技术沉淀 - 可视化搭建
> 这块在门户中的实现不在难，在繁琐。列几个可能会踩坑的点。

![image012.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/12dfbd78f8b243c1a0a344d28feb4a88~tplv-k3u1fbpfcp-watermark.image)

### 1. 画布内拖拉拽drag

这里的难点，除了要考虑到原生`onmousedown`/`onmousemove`/`onmouseup`等鼠标事件，阻止事件冒泡，以及一些边界问题，特别是鼠标在不同画布**缩放比例**的情况下的**漂移现象**。下面的伪代码中，都会提到。

```vue
// 伪代码
<div class="dragItemBox">
  <div class="dragCover" @mousemove="drag($event)" @click.stop></div>
</div>

<script>
  drag(e) {
		e.onmousedown = e => {
      // 记录鼠标按下时的坐标
    	document.onmousemove = e => {
        // 记录鼠标移动时的xy坐标差
        // 重点来了，这里差值要考虑画布的缩放比例，不然在不同的缩放比例下，会造成鼠标漂移哦
        // 边界问题，这里可以约束拖拽的范围
      	document.onmouseup = e => {
        	// 将坐标差赋给目标元素，改变其布局样式
        }
      }
      document.onmouseup = e => {
        // 按下不移动鼠标，对事件状态进行重置
      }
    }
	}
</script>
```

### 2. 画布内拖拉拽resize
> 以及对部件进行resize的时候，每一个锚点（共8个锚点）的逻辑都需要严格抽象。举个栗子就懂了。

部件有**width/height/top/left**这四个布局属性，先看锚点1和锚点8，当拖拽**锚点8**的时候，改变的只是**width/height**两个属性，而当拖拽**锚点1**的时候，改变的却是**width/height/top/left四个属性**，所以每个锚点的逻辑是不同的，怎么抽象，怎么封装，看自己发挥，这里要特别留心，不然会出现各种莫名其妙的**漂移问题。**
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/588c9c1b8b9642038c7727fff92bbee4~tplv-k3u1fbpfcp-zoom-1.image)

### 3. 纯CSS实现虚点线网格
> 不是虚线，也不是点线，而是**虚点线**。这名字我自己想的，看下图，在纵横线的**交叉点**会比其余地方要大一点！
> ~~看到这个视觉稿，差点掏出了桌子下40米的砍刀。~~这里不是作死，为啥不用图片？主要是考虑到这里的方格大小和颜色可调节，所以应该只能用纯CSS实现，吧。
> 感兴趣可以先自己尝试实现下。这里的代码，真的，没500块我不卖 :(

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bafdd4b98bda4ffd99922bbb0fe42441~tplv-k3u1fbpfcp-zoom-1.image)

涉及到的CSS API：
- [**linear-gradient()**](https://developer.mozilla.org/zh-CN/docs/Web/CSS/linear-gradient())：线性渐变
- [**radial-gradient()**](https://developer.mozilla.org/zh-CN/docs/Web/CSS/radial-gradient())：径向渐变
- background-size 属性规定背景图像的尺寸。
- background-position 属性设置背景图像的起始位置。

#### 实现分解

- **Step.1** 条纹
- **Step.2** 实线网格
- **Step.3** 虚线网格
- **Step.4** 虚点线网格

如下为下文图例的DOM结构及前置样式。
```html
<style>
.bg {
  width: 100px;
  height: 100px;
  background-color: black;
}
.basegrid {
  width: 100%;
  height: 100%;
}
</style>
<div class="bg">
  <div class="grid basegrid"></div>
</div>
```

1. **Step.1** 先利用`linear-gradient()`画出条纹。重点：边界明显（正常情况下linear-gradient是会产生渐变效果的，但这里的条纹需要边界明显，那么就需要前一个渐变色在后一个渐变色位置之后，具体可以参考[这篇文章](https://www.jianshu.com/p/1a9a8a2acf43)）


![image017.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/225e744875c44896a353ac196c5db276~tplv-k3u1fbpfcp-watermark.image)

2. **Step.2** 网格可以理解为横竖条纹组合而成。重点：background-image可以设置多个渐变叠加，横竖条纹可以各自实现后叠加。

![image019.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a2fe58c5b2464ac287280b8e93f90d0f~tplv-k3u1fbpfcp-watermark.image)

网格线的粗细问题：可以控制`background-size`和`linear-gradient`渐变色的差值，来控制网格线的粗细。

![image021.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/31b07e655c5c4f609e58cfab7716e28c~tplv-k3u1fbpfcp-watermark.image)

3. **Step.3** 虚线的实现可以继续叠加与背景色一致的条纹来叠加。可以用两个渐变叠加（横竖条纹）。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0fb4af9cbfa7400791c42285a02755d9~tplv-k3u1fbpfcp-zoom-1.image)
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0976543b45ce4e03b31d4badb03695cf~tplv-k3u1fbpfcp-zoom-1.image)

这里我想到的是可以用斜条纹来实现虚线，可以节约一个渐变叠加。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/50b7476df68e4355b70d1f4ebd2e0a09~tplv-k3u1fbpfcp-zoom-1.image)

4. **Step.4** 虚线网格已经实现了，那么**虚点线**网格怎么搞？拆分！拆分为**点阵**和**虚线网格**，使其两者重合。点阵就用到了[**radial-gradient()**](https://developer.mozilla.org/zh-CN/docs/Web/CSS/radial-gradient())径向渐变。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/597a35434ae546f6b96def97c4b122d2~tplv-k3u1fbpfcp-zoom-1.image)

两者叠加，Finally !

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f140abd02e244e4395a965cd1821e8d9~tplv-k3u1fbpfcp-zoom-1.image)


## Low Code 实践
> 下面会介绍low code及微前端的相关内容，过程中会插入门户部件的落地方案（**标题前带***）。从结果来看，**low-code低代码**是结果，条条大道通罗马，但总离不开一些关键点，如上述提到的可视化搭建、模块隔离等；而微前端在模块隔离方面，提供了一些很多值得借鉴的方案。相辅相成，技术的诞生就是为了解决**具体问题**。

### Low-Code 介绍
> A low-code development platform (LCDP) is software that provides a development environment used to create application software through graphical user interfaces and configuration instead of traditional hand-coded computer programming. A low-code model enables developers of varied experience levels to create applications using a visual user interface in combination with model-driven logic.

一句话概括就是：实现低代码平台的关键要素是**模型驱动设计**、**代码自动生成**和**可视化编程**。

#### 场景
从最早的通过模块化搭建解决营销活动领域的问题，发展到现在，可以通过 low-code来解决内部复杂的中后台业务需求，既适用于面向C侧用户的产品运营，也贴合B侧用户的数据管理需求。

#### 核心能力

- 基础物料的搭建和接入
   - 定制化组件接入
   - 自定义组件
- 编排能力：页面排版/逻辑编排
   - 实时可视化
   - 多端适配
   - 多场景适配
- Pro-code和low-code的代码转换能力
   - 对输出的编程产物进行二次开发的能力
- 协作能力
- 数据分析能力

#### 二八原则

- 通过low-code平台实现对80%业务场景的覆盖
- 20%的能力通过pro-code自定义实现



### 与微前端的交集
> 为什么会提到微前端？因为在微前端架构中，前端应用可以**独立运行、独立开发、独立部署**。与门户的部件方案**不谋而合**，当然，我们在模块隔离的方案中，也参考了[Single-SPA](https://github.com/CanopyTax/single-spa)和[qiankun](https://qiankun.umijs.org/zh)等微前端框架。

#### 微前端方案
> 微前端架构是一种类似于微服务的架构，它将微服务的理念应用于浏览器端，即将 Web 应用由单一的单体应用转变为多个小型前端应用聚合为一的应用。

| 方式 | 开发成本 | 维护成本 | 可行性 | 同一框架要求 | 实现难度 |
| --- | --- | --- | --- | --- | --- |
| 路由分发 | 低 | 低 | 高 | 否 | ★ |
| iFrame | 低 | 低 | 高 | 否 | ★ |
| 应用微服务化 | 高 | 低 | 中 | 否 | ★★★★ |
| 微件化 | 高 | 中 | 低 | 是 | ★★★★★ |
| 微应用化 | 中 | 中 | 高 | 是 | ★★★ |
| 纯 Web Components | 高 | 低 | 高 | 否 | ★★ |
| 结合 Web Components | 高 | 低 | 高 | 否 | ★★ |

#### 微件化 - 组合式集成
在前端组件（或应用）集成方案中，有以下几种方式：

1. 独立构建组件和应用，生成 chunk 文件，在构建后使用脚本合并。
2. 开发时独立开发组件或应用，集成时合并组件和应用，最后生成单体的应用。
3. **在运行时，加载应用的 Runtime，随后加载对应的应用代码和模板。**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/10b0167cf93a4228b13945c8dacec6f5~tplv-k3u1fbpfcp-zoom-1.image)

#### * 门户部件组合集成方案

门户的部件集成方案类似方式二和三，基于**脚手架工具**独立开发部件，打包构建后输出静态成果物，在宿主环境可以根据静态资源路径，动态加载Vue组件。如果把首页理解成一个应用，那么通过首页主题包整个导出，将部件成果物集成在整个主题中，就和上述提到的方式二很接近了。

![cli.cbedc959.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7edc4e0a29cf4e46a08d4f7f422c7f17~tplv-k3u1fbpfcp-zoom-1.image)

### 模块隔离
> 多个模块（部件）在同一个页面集成，就必须要考虑到模块隔离，包括子模块与宿主环境的隔离，以及子模块之间的隔离。

#### 可能导致的问题

- 子模块可能会修改宿主环境的逻辑，从而影响整个系统的运行，xss安全问题；
- 子模块之间可以相互访问且修改，难以定位问题；
- 模块间的样式污染；

#### 应用集成
在微前端的应用集成中，如果要做到应用的独立部署及与技术栈解耦，就不得不考虑子应用的**运行时加载**。

| App Entry | 说明 | 优点 | 缺点 |
| --- | --- | --- | --- |
| JS Entry | 子应用将资源打成一个 entry script，子应用的所有资源打包到一个 js bundler 里。 | 主应用和子应用共同构建，方便做bundler优化。 | 1. 子应用更新会造成整个主应用更新，更新成本较高 2. 子应用的静态资源需要打成bundler，加载效率较低|
| HTML Entry | 将子应用打出来 HTML 作为入口，主框架可以通过 fetch html 的方式获取子应用的静态资源，同时将 HTML document 作为子节点塞到主框架的容器中。 | 子应用独立开发，独立部署发布； | 1. 网络请求开销较大 2. bundler 构建优化难度较大，如公共依赖抽取|

#### js隔离
##### JavaScript 沙箱
    沙箱机制的核心是让局部的JavaScript运行时，对外部对象的访问和修改处在可控的范围内，即无论内部怎么运行，都不会影响外部的对象。通常在Node.js端可以采用`vm`模块，而对于浏览器，则需要结合`with`关键字和`window.Proxy`对象来实现浏览器端的沙箱。以下为简易的实现：
```javascript
function sandbox(code) {
    code = 'with (sandbox) {' + code + '}';
    const fn = new Function('sandbox', code);
    return (sandbox) => {
        const proxy = new Proxy(sandbox, {
            has(target, key) {
                return true;
            },
            get(target, key, receiver) {
                if (key === Symbol.unscopables) {
                    return undefined;
                }
            }
        });
        return fn(proxy);
    }
}
let str = 'let a = 10;console.log(a)'
sandbox(str)({})
```

##### Web Worker
> 具体内容可参考文章 [浅探 Web Worker 与 JavaScript 沙箱](https://juejin.cn/post/6948752328715403300#heading-2)

Web Worker 子线程的形式也是一种天然的沙箱隔离，借鉴了 [Browser-VM](https://github.com/aliyun/alibabacloud-alfa/tree/master/packages/core/browser-vm) 思路，在编译阶段通过 Webpack 插件为每个子应用包裹一层创建 Worker 对象的代码，让子应用运行在其对应的单个 Worker 实例中，比如：
```javascript
__WRAP_WORKER__(`/* 打包代码 */ }`);

function __WRAP_WORKER__(appCode) {
    var blob = new Blob([appCode]);
    var appWorker = new Worker(window.URL.createObjectURL(blob));
} 
```
但有几个缺陷:

- 不支持`DOM`操作，必须通过`postMessage`通知UI主线程来实现
- 无法访问`window`、`document`之类的浏览器全局对象
- 无法访问页面全局变量和函数、无法调用`alert`、`confirm`等`BOM API`

#### Module Federation - Webpack 5
> [webpack5 - Module Federation 中文文档](https://webpack.docschina.org/concepts/module-federation/) 中是这么定义的：多个独立的构建可以形成一个应用程序。这些独立的构建不会相互依赖，因此可以单独开发和部署它们。这通常被称为微前端，但并不仅限于此。

事实上，MF基于模块，本质上就是JS代码片段，也就是chunk。为了解决依赖问题，webpack5的实现方式是重写了加载chunk的webpack_require.e，从而前置加载依赖；为了解决modules的共享问题，使用了全局变量来hook。但有利有弊：

- 优点：做到运行时加载，shared代码无需自己手动打包构建
- 缺点：可能会对页面运行时的性能造成影响；需要考虑模块的版本控制；旧项目改造成本较大；

#### css隔离
    当主应用和子应用同屏渲染时，就可能会有一些样式会相互污染，如果要彻底隔离CSS污染，可以采用**CSS Module** 或者**命名空间**的方式，给每个子应用模块以特定前缀，即可保证不会互相干扰，可以采用webpack的postcss插件，在打包时**添加特定的前缀**。
    而对于子应用与子应用之间的CSS隔离，采用**动态加载**，即在每次子应用加载时，将该应用所有的`link`和`style`内容进行标记，在应用卸载后，同步卸载页面上对应的`link`和`style`即可。
    另一种推荐的方式是 **shadow DOM**，是可以彻底隔离 css 的一个思路。可将子应用包裹在 Shadow DOM 节点中，只需要将 [shadowRoot ](https://developer.mozilla.org/zh-CN/docs/Web/API/ShadowRoot)的 API 设置为 true。但**存在一些问题**，比如 Shadow DOM 的 css 隔离、dom 事件冒泡终止在 Shadow DOM 父节点的问题，会导致子应用内部在调用一些UI组件库的时候显示异常。

#### * 门户部件模块隔离方案
> 简单描述就是利用vue组件的隔离，包括样式scoped、组件实例隔离，算不上特别完备的考虑。

  由于门户将UI组件库、vue.js等公共依赖从部件脚手架中排除（webpack externals），因此所有的部件都用同一套UI组件库，一方面为了**控制开发成本和规范**，另一方面也是尽可能的将部件的**逻辑简单化**，每个部件的**逻辑功能尽可能单一**。
  
  但子模块拥有宿主环境依赖的引用权限，并不符合隔离要求。除此之外，子模块和宿主环境共享一个window对象，能发挥的空间就更大了，但之所以开放，是由于真实情况下确实有这样的需求，比如子模块需要访问宿主环境的变量（门户登录的userName？等）。我们尽可能将数据通过动态组件的prop来传递通信 `<component :prop="widget.option" ... />`，尽可能通过规范、lint等手段去限制部件内部对宿主的访问。
  
  在CSS样式方面就相对简单，利用vue组件`<style scoped></style>`，给该组件生成一个唯一data值。如果想要改变宿主UI组件库的样式，可以利用`::v-deep`**样式穿透**来设置，这样不会影响其他模块的UI组件样式。

### 模块通信

对于分离的模块来说，消息订阅（pub/sub）模式的通信机制是非常适用的，在基座应用中定义事件中心Event，每个微应用分别来注册事件，当被触发事件时再由事件中心统一分发，这就构成了基本的通信机制。
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/00ac8f6c01a34ee2a38c107bb5633d13~tplv-k3u1fbpfcp-zoom-1.image)
可以引入基于Flux的状态管理机，Redux/Vuex，使每个子应用维护自己的store。

#### qiankun 应用间通信方案
qiankun官方提供的应用间通信方式 - Actions 通信，如下图所示，先注册观察者到**观察者池**中，然后通过修改 globalState 可以触发所有的观察者函数，从而达到组件间通信的效果。
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0c75277b476044d98b6fb6ad6aebadcd~tplv-k3u1fbpfcp-zoom-1.image)

#### * 门户部件通信
门户的部件基于Vue.js组件，因此通信机制也依赖于Vue组件自己的通信机制，即利用宿主环境`this.$root.$widgetEventBus`空Vue实例作为消息总线，部件之间通过`$emit/$on`进行事件发送及监听。

## 总结
上述介绍了门户portal应用在可视化搭建及Low Code方面的实践，也介绍了社区中微前端的相关内容，站在巨人的肩膀上，会看到目前门户基于Vue组件实现的部件化依然存在许多可改善的地方，如部件隔离、集成能力、运行时加载性能等。当然，所有方案的选择需要结合实际场景和实际需求，综合考虑，平衡利弊，没有银弹！

---

【参考】

- [Low-code_development_platform](https://en.wikipedia.org/wiki/Low-code_development_platform)
- [「可视化搭建系统」——从设计到架构，探索前端领域技术和业务价值](https://zhuanlan.zhihu.com/p/164558106)
- [2020年大前端技术趋势解读 ](https://www.sohu.com/a/439625532_495695)
- [low-code 与 20 年前的 Dreamweaver 有什么区别？](https://zhuanlan.zhihu.com/p/183691258)
- [实施前端微服务化的六七种方式 - phodal](https://www.phodal.com/blog/implement-microfrontend-apply-route-change/)
- [浅探 Web Worker 与 JavaScript 沙箱](https://juejin.cn/post/6948752328715403300)
- [可能是你见过最完善的微前端解决方案](https://zhuanlan.zhihu.com/p/78362028)​
