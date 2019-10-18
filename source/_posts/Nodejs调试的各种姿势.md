---
title: Nodejs调试的各种姿势
date: 2019-05-22 21:22:13
tags: [Nodejs]
---

## Node.js 调试的痛点

对于绝大部分前端人员，对`JavaScript`的调试更多停留在浏览器中，类似`console.log`和`debugger`，但这种方式对代码侵入性较高，甚至需要刷新页面或重启编译器。转向服务端后，没有浏览器界面，如果仅停留在原来的调试方式，开发效率想必是较低的。因此，前端人员转向服务端开发时，要习惯于命令行及 IDE 等调试手段，走出舒适区，才能准确定位问题，提高开发效率。

<!--more-->

## Node.js 调试的手段

> 下文中涉及到的依赖库及软件版本

- Node.js - v10.15.3
- Chrome - v72.0.3626
- VS Code - v1.13.0

> 以下代码段为例，用`koa`起一个简单的`http server`

```javascript
const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
    const time = new Date();
    ctx.body = `hello, hiker! ${time}`;
});

app.listen(3000, () => {
    console.log('nodejs listening 3000.');
});
```
### 1. console.log()

对前端人员非常友好，与浏览器中调试一样，`console.log()`、`console.error()`、`console.time()`等各种`console`形式，在代码中需要调试的地方直接写上，只是展示形式有所不同，在`Node.js`中是在终端命令行中打印。这是最简单快速的调试手段，**缺点**也很明显，对原有代码入侵较大，在特定场景中使用较局限。

#### 举例

```javascript
app.use(async ctx => {
    const time = new Date();

    console.time('TIME_TAKE');
    console.log('this is time', time);

    ctx.body = `hello, hiker! ${time}`;
    console.timeEnd('TIME_TAKE');
});

app.listen(3000, () => {
    console.log('nodejs listening 3000.');
});
```

#### 结果

> 终端起服务：`node index.js`，并浏览器访问`localhost:3000`, 即可在终端命令行中看到相应打印的日志。


![](https://user-gold-cdn.xitu.io/2019/8/27/16cd25265f9ad78d?w=673&h=256&f=png&s=34924)

### 2. Debugger Protocol (node-inspector)

> `Nodejs v6.3+` 的版本提供了两个用于调试的协议：`v8 Debugger Protocol` 和 `v8 Inspector Protocol` 可以使用第三方的 Client/IDE 等监测和介入 Node(v8) 运行过程，进行调试。

[node-inspector](https://github.com/node-inspector/node-inspector)是早期可以基于Chrome，有可视化调试界面的调试工具，用的是`v8 Debugger Protocol`协议，通过 TCP 端口与 Client/IDE 交互通信。但由于`v8 Inspector Protocol`的推出，这个工具逐渐被替代，后文会介绍相应替代方案。

#### 使用方式

```
$ npm install -g node-inspector

通过浏览器连接到node-inspector，启动inspector服务：
$ node-inspector

以debug模式运行node.js应用：
$ node --debug=5858 index.js

浏览器打开 http://127.0.0.1:8080/debug?port=5858，后台会提供一个类似于 chrome devtools 的 UI 调试界面。
```

### 3. Inspector Protocol + Chrome DevTools

> `v8 Inspector Protocol` 是 `nodejs v6.3` 新加入的调试协议，通过 `websocket`与 Client/IDE 交互，同时基于 Chrome/Chromium 浏览器的 devtools 提供了图形化的调试界面。

``` javascript
$ node --inspect=9222 index.js
```

> 如果程序执行完会直接结束进程的，那么`--inspect`会一闪而过，断点信号还没发送出去前就结束了，断点根本不起作用，这种情况可以用`--inspect-brk`启动调试器，使得脚本可以代码执行之前`break`。

#### 结果


![](https://user-gold-cdn.xitu.io/2019/8/27/16cd253452dfafe6?w=674&h=257&f=png&s=36144)

`ws://127.0.0.1:9222/a45dc332-2c8c-4614-bf01-1dbf212ae28a`这个不是提供给我们在Chrome浏览器中访问的地址，而是Node.js和Chrome之间进行通信的的地址，通过websocket进行通信，从而将调试结果实时展示在Chrome浏览器中。


![](https://user-gold-cdn.xitu.io/2019/8/27/16cd25375cf0f310?w=1188&h=378&f=png&s=41820)

那么如何获取在chrome浏览器中的调试地址？我们可以访问`http://localhost:9222/json/list`，可以看到相应信息。其中id为UUID，是一个特定的标识，每一个进程都会分配一个uuid，因此每一次调用会有出现不同的结果。`devtoolsFrontendUrl`则为我们要访问的chrome地址，新窗口打开这个地址即可调试。


![](https://user-gold-cdn.xitu.io/2019/8/27/16cd2539f2338697?w=888&h=466&f=png&s=70320)

#### 更便捷的调试入口

> 上述步骤是不是有点麻烦，不要紧，强大的Chrome提供了更方便的调试入口。

`node --inspect=9222 index.js`起服务后，打开浏览器访问http监听端口页面，并打开调试窗口，可以看到一个绿色的按钮，点开即可下断点调试，是不是很方便？


![](https://user-gold-cdn.xitu.io/2019/8/27/16cd253da54e566e?w=436&h=295&f=png&s=21560)

> 这个绿油油的按钮究竟打开了什么呢？我们可以继续看。访问`chrome://inspect/#devices`，可以看到当前浏览器监听的所有`inspect`


![](https://user-gold-cdn.xitu.io/2019/8/27/16cd2541c7f92416?w=690&h=437&f=png&s=51805)

到这里，我们就可以利用Chrome DevTools的各类功能，`Sources Panel`查看脚本、`Profile Panel`监测性能等，文中不具体展开。

### 4. Inspector Protocol + VS Code

> 对服务端开发来讲，浏览器的使用反而不那么频繁，因此在IDE中调试`Nodejs`显得格外重要。值得高兴的是，市面上各类IDE对`Nodejs`的调试还算友好，尤其是VS Code。它内置了`Node debugger`，支持`v8 Debugger Protocol`和`v8 Inspector Protocol`两种协议。

#### launch

> 

在VS Code中，打开`调试`/`添加配置`/，如下图，添加launch配置，点击开始调试即可。

```
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "program": "${workspaceFolder}\\index.js"
        }
    ]
}
```


![](https://user-gold-cdn.xitu.io/2019/8/27/16cd25474fd14abd?w=802&h=311&f=png&s=57632)

下图展示了调试窗口，可以看到，我们可以直接在IDE中下断点，左侧小窗口中可以看到当前作用域的变量（可展开树），调用堆栈，所有断点等，右上方亦可逐步调试函数、重启等功能，非常强大。


![](https://user-gold-cdn.xitu.io/2019/8/27/16cd254e6ded40d6?w=948&h=783&f=png&s=136426)

#### Auto Attach

> 同样VS Code提供了自动附加的功能：Auto Attach。不用配置即可快速调试。

`Ctrl+Shift+p`打开Auto Attach功能，然后同样的方式在终端命令行中：`node --inspect=9222 .\index.js`


![](https://user-gold-cdn.xitu.io/2019/8/27/16cd25512aecf597?w=609&h=309&f=png&s=31760)


![](https://user-gold-cdn.xitu.io/2019/8/27/16cd255462c0dc83?w=948&h=783&f=png&s=140285)

## 醉后

本文总结了`Nodejs`的调试方法，基本涵盖了所有的调试手段，包括了命令行调试，Chrome浏览器调试，VS Code编辑器调试，并深入部分调试协议，图文结合，可供其他的`Nodejs`开发者参考，降低开发人员的学习成本，在项目工程应用中，准确定位问题，提高开发效率。

## 参考文献：

[http://nodejs.cn/api/inspector.html](http://nodejs.cn/api/inspector.html)

[http://nodejs.cn/api/debugger.html](http://nodejs.cn/api/debugger.html)

[http://i5ting.github.io/vsc/#1](http://i5ting.github.io/vsc/#1)
