---
title: Travis CI助力Blog持续输出
date: 2018-01-29 00:00:13
tags: [CI]
---

> 之前更新blog要这样：本地安装hexo环境，还需要敲几个命令：`hexo clean && hexo g && hexo d`，构建部署还有点浪费时间。其实每次更新blog的时候，只需要增删改几个Markdown文件。懒~干脆上CI吧。

<!--more-->

## CI 为何物

> CI（Continuous Integration）—— 持续集成。

其实光从名字其实能大致知道CI做了什么事情。硬件领域有集成模块、集成电路，软件领域也有集成概念：项目构建、自动化测试、部署等等。我的理解，每个成熟的产品从零散到成型到出品（上线）的过程，就是集成（Integration）。那么CI做的事情，就是让这个工程自动化，持续进行（Continuous）。

### 好处：
- 快速发现错误
- 保持分支与主干相对集中

> "持续集成并不能消除Bug，而是让它们非常容易发现和改正。" -- Martin Fowler

### 流程：

> 其实应该将这几个概念揉在一起：持续集成、持续部署、持续交付、持续发布。

![image](https://pic2.zhimg.com/80/386dcf92f1c7070d3f84473057829ea2_hd.jpg)

1.代码提交：commit
2.测试（第一轮）：hook相应的commit动作，自动化测试
3.构建：build，相当于是编译可用的代码
4.测试（第二轮）：包含单元测试和集成测试
5.部署：打包至生产环境
6.回滚：若最新版本发生异常，则回滚到上一版本

## Travis CI 又为何物

![image](https://segmentfault.com/img/remote/1460000011218415)

> Travis CI: 在线托管的CI服务，最重要的事情，它对开源项目是免费的！！！（重要的感叹号加三个！！！）

[Travis CI](https://travis-ci.org/) 官网上醒目的大字：Test and Deploy with Confidence
Easily sync your GitHub projects with Travis CI and you’ll be testing your code in minutes!

> 赤裸裸的表白，果然和Github是一对好基友。

这意味着，我们在Github的 Public Repository都可以利用Travis CI 进行免费的持续集成，当然，Personal Repository也可以用它，不过挺贵的。之前用Github Pages 搭的[Blog](http://palmer.arkstack.cn/)刚好可以用Travis CI来持续构建，将偷懒进行到底吧！

## 只需几步，快速体验CI

### 1.GitHub账号直接登录

打开[Travis CI](https://travis-ci.org/) ,使用 GitHub 第三方授权登录，不要问为什么，好丽友，好基友。

### 2.打开Repo CI配置

![image](http://ohce3yxd6.bkt.clouddn.com/travisCI/index.png)

勾上你的blog repo (这里我勾上了`palmerye.github.io`)，点击小齿轮，进入配置页。

![image](http://ohce3yxd6.bkt.clouddn.com/travisCI/index2.png)

打开最上方两个开关，其它默认就行了：
`Build only if .travis.yml is present`
`Build pushed branches`

其实官方也有教程，只要三步：

![image](https://segmentfault.com/img/remote/1460000011218417)

### 3.添加 .travis.yml

> 划重点了!

1.新建一个source分支，将原来本地的Hexo工程，gitignore外的那些目录，切到source分支。（最终我们只需要推这个分支到origin）

``` javascript
// .gitignore

.DS_Store
Thumbs.db
db.json
*.log
node_modules/
public/
.deploy*/
```

![image](http://ohce3yxd6.bkt.clouddn.com/travisCI/index3.png)

2.为Travis CI 新建Token

这一步很关键，为什么Travis有权限帮你推GitHub？所以你要给它钥匙，就是Token。

在GitHub个人账户 `Setting/ Developer settings/ Personal access tokens`下，新建一个Token，然后在Travis CI配置中，Environment Variables，添加生成的Token。

![image](http://ohce3yxd6.bkt.clouddn.com/travisCI/index4.png)

3.source分支下新建.travis.yml

``` javascript
language: node_js
node_js: stable
cache:
  directories:
    - node_modules

# S: Build Lifecycle
install:
  - npm install


#before_script:
 # - npm install -g gulp

script:
  - hexo clean && hexo g

after_script:
  - cd ./public
  - git init
  - git config user.name "palmerye"
  - git config user.email "palmerye@gmail.com"
  - git add .
  - git commit -m ":memo:\ Update docs by CI"
  - git push --force --quiet "https://${CI_TOKEN}@${GH_REF}" master:master // CI_TOKEN为上一步在github上生成的Token。
# E: Build LifeCycle

branches:
  only:
    - source
env:
 global:
   - GH_REF: github.com/palmerye/palmerye.github.io.git
```

其实看这个配置文件就大致能知道这个流程，在Travis 服务器上`install`相应的依赖，然后执行`hexo clean && hexo g`等一系列之前需要在本地跑的命令，最后将生成的静态资源blog（在`./public`目录下），推到master分支。

4.将source分支推到远端，Travis 监听到有动作就会跑上面我们配置的脚本。

## 可以愉快写Blog了

现在，我们可以把本地那些hexo臃肿的依赖删了（这意味着，你在任意的电脑上都能快速更新blog了，不需要安装hexo依赖），每次只需要增删改`/source/_posts/`下的markdown文件就可以了，轻轻push一下，其他交给Travis CI吧，你可以在Travis / Current
看到实时的构建状态，包括构建时间和成功与否。

最后，为了提高Blog的档bi次ge，在readme加个build passing 标签吧。

![image](http://ohce3yxd6.bkt.clouddn.com/travisCI/index5.png)

## 最后的最后

其实前面只是最简单粗暴的用了Travis CI，它还有很多强大的功能，比如一些 Cron Jobs，都是比较傻瓜式的，有时间继续搞吧。干巴爹💪！继续写blog了。


PS：
Blog in Github：[https://github.com/palmerye/palmerye.github.io/](https://github.com/palmerye/palmerye.github.io/)