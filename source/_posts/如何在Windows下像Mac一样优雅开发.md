---
title: 如何在Windows下像Mac一样优雅开发
date: 2017-04-18 00:03:08
tags: [iterm2, oh-my-zsh, Cmder, Homebrew, Chocolatey, spotlight, Listary, Clover]
---

> 起因：之前一直用Mac开发，换了家公司，只许用Windows下开发，说实话，一开始我是拒绝的，可自从看到了这几个工具以后......

> 下文大标题说明：（Mac下的工具）VS（Windows下的工具），Mac下的工具说明会简要点，毕竟看文章的基本上都是实在受不了Windows的重度Mac开发者。

## 1. item2 VS Cmder

> 终端工具

<!--more-->

### - iterm2

[iterm2](http://www.iterm2.com/documentation.html)是Mac下最好用的终端工具，听说没有之一。配合[oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh),你的终端居然可以这样！震惊！！（UC震惊部）
![image](http://ohce3yxd6.bkt.clouddn.com/win-mac/iterm.png)

> 池建强大大有一篇文章[《终极 Shell》](http://macshuo.com/?p=676)讲mac下的终端，讲的比较好，贴这。大家可以做取舍。

### - Cmder

> 如果你用过Windows自带的cmd，简直想shi有没有！页面丑就算了！没有tab！窗口不能缩放！不能用鼠标复制文本！！@#￥%&*￥%…%￥

[Cmder](https://github.com/cmderdev/cmder)绝对是一款Windows环境下的cmd替代者，支持了大部分的Linux命令。
- 支持tab标签
- 集成git
- 支持绝大Unix/Linux命令
- 但是安装之后一般都会有以下几个问题：
    - 中文乱码问题
    - 文字重叠问题
    - λ其实可以替换成$

![image](http://ohce3yxd6.bkt.clouddn.com/win-mac/cmder.png)

## 2. Homebrew VS Chocolatey

> 包管理工具

### - Homebrew

为什么要用Homebrew？[官网](https://brew.sh/index_zh-cn.html)讲得很露骨，一款macOS缺失的软件包管理器

#### 安装Homebrew：命令行输入

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

#### 举个栗子，如果你要安装sublimeText，你可以这样：

```
brew install sublime-text
```

#### 再优雅点，你可以安装Homebrew的命令行工具homebrew-cask

```
brew tap phinze/homebrew-cask && brew install brew-cask

然后你可以这样愉快地安装一堆软件

brew cask install sublime-text skitch dropbox google-chrome
```

#### 用Homebrew安装软件有什么好处么？

- 将软件包安装到**独立**目录，并将其文件软链接至 /usr/local
- 不会将文件安装到它本身目录之外，所以您可将 Homebrew 安装到任意位置
- 完全基于git和ruby，所以自由修改的同时你仍可以轻松撤销你的变更或与上游**更新**合并

### - Chocolatey

Chocolatey[官网](https://chocolatey.org/)是这么介绍自己的，The package manager for Windows.

#### 安装

嘿嘿，这个时候打开上面提到的cmder命令行工具，输入:

```
@powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
```

#### 这个时候如果你也要装sublimeText3，你也可以这样！

```
choco install SublimeText3
```
是不是很酷！好处同上，具体的配置自行琢磨，这个时候已经和Mac下的体验很接近了。让我们再近一步！~

## 3. Spotlight VS Listary

> 文件浏览增强工具

### - Spotlight

自从升级到macOS Sierra后，其实mac自带的Spotlight已经很强大了，至于类似Alfred的神器，我倒觉得一般用户没必要折腾了，当然你想更Geek点，可以折腾下[Alfred](https://www.alfredapp.com/)，毕竟那样看起来很酷！

#### 安利VueJs时刻！

![image](http://ohce3yxd6.bkt.clouddn.com/win-mac/spotlight.png)

### - Listary

> [Listary](http://www.listary.com/)的出现，让突然从Mac转向Windows开发的我产生的强烈排斥心理得到了一定的缓解！

#### 先说说效果

经过我的配置，我想要打开某一软件或者文件，双击Ctrl，弹出Listary小窗，输入几个模糊关键字，回车！仿佛置身于Mac有没有！！

#### 下载安装

[官网](http://www.listary.com/)有free版和Pro版，至于破解还是支持正版...

#### 界面举栗

![image](http://ohce3yxd6.bkt.clouddn.com/win-mac/listary1.png)

![image](http://ohce3yxd6.bkt.clouddn.com/win-mac/listary2.png)

如果你是Mac用户，我想是无缝衔接的，配置快捷键后，效率也是极高的！

## 4. Clover

> 给Windows资源管理器加上Tab标签

- 不知道Windows用户有没有注意到，每次打开我的电脑，会弹出一个新的窗口，再打开，再弹！再打开！再弹！循环个几次，桌面上会有一堆“我的电脑”窗口，是的，一堆......一堆......堆......
- 所以你需要一个类似chrome标签一样的工具，帮你窗口整合。这就是[Clover]**唯一**的作用。
- Clover[下载地址](http://cn.ejie.me/)
- 同样的，你可以将常用的地址存为标签，类似浏览器收藏夹，方便下次打开。

![image](http://ohce3yxd6.bkt.clouddn.com/win-mac/clover.jpg)

## 继续寻觅中......

对我来说，应该是对于绝大部分开发者来说，开发环境的舒适是很重要的，想方设法提高效率，我倒觉得折腾这些工具也是挺有必要的。

> 应该会持续更新吧，毕竟Windows下坑还很多。