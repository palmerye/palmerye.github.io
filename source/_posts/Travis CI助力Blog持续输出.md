---
title: Travis CI助力Blog持续输出
date: 2018-01-29 00:00:13
tags: [CI]
---

> 之前更新blog要这样：本地安装hexo环境，还需要敲几个命令：`hexo clean && hexo g && hexo d`，构建部署还有点浪费时间。其实每次更新blog的时候，只需要增删改几个Markdown文件。懒~干脆上CI吧。

<!--more-->

## Travis CI -- Github好基友

> CI（Continuous Integration）—— 持续集成。

其实光从名字其实能大致知道CI做了什么事情。硬件领域有集成模块、集成电路，软件领域也有集成概念：项目构建、自动化测试、部署等等。我的理解，每个成熟的产品从零散到成型到出品（上线）的过程，就是集成。那么CI做的事情，就是让这个工程自动化，持续进行。
