---
title: Git工作流之一(集中式工作流)
date: 2017-02-17 00:08:54
tags: [git, workflow, gitflow]
---
# 引言

## 一言不合讲个小故事
<!--more-->
> 一个和尚有水喝，两个和尚挑水喝，三个和尚没水喝。

故事暴露了团队协作的问题，但接下来的故事与和尚无关，只是讲讲团队协作的事儿。

## 贯穿全文的角色

- 老A：技术Leader
- 阿B：工程师
- 小C：实习生

![image](https://github.com/palmerye/pictureBed/raw/master/git/men.png)

## Git工作流

> Git是Linux老爹的强大发明之一，用C语言编写。强大的工具也因使用情景、使用对象的不同，衍生出不同的Git工作流。

- 情景一：集中式工作流
- 情景二：功能分支工作流
- 情景三：Gitflow工作流
- 情景四：Forking工作流

# 情景一：集中式工作流

## 1. 老A初始化工程

> 老A在服务器上新建了一个repository（下文均以本人的[github/git-workflow-story](https://github.com/palmerye/git-workflow-story)为例子）

```
mkdir git-workflow-story && cd "$_"
// 当然你也可以在bash里自定义 mkdir&cd 等快捷命令
git init

git remote add origin https://github.com/palmerye/git-workflow-story.git
```

## 2. 阿B开始写故事

> 阿B的任务是在repo里写Readme(Markdown)

```
mkdir story-B && cd "$_"

git clone https://github.com/palmerye/git-workflow-story.git

vi readme.md
```
于是阿B在readme里面写了一点东西，打算push到老A建的repo里。
```
git add readme.md

git commit -m "这是阿B的第一次提交"

git push -u origin master
// -u 参数用来初次push的时候指定默认upstream上游分支
```

## 3. 小C来啦

> 有一天，老A觉得阿B一个人忙不过来，找来小C来帮忙

上班第一天，小C就开始忙活，也打算在老A的repo里写点东西。


```
mkdir story-C && cd "$_"

git clone https://github.com/palmerye/git-workflow-story.git

```
这个时候repo里已经有了阿B的第一次push的文件，小C突然发现有个错别字，就顺便改了。

```
git add readme.md

git commit -m "修改了一个错别字"

git push -u origin master
```

## 4. 冲突

阿B下午又写了点东西，和之前一样，暂存/提交/推送，突然git push失败了（错误提示本地仓库落后于远端）。于是机智的阿B有了如下操作：

```
git pull --rebase origin master
```
再次push的时候发现有冲突，于是去解决冲突。发现和小C改了同一个地方，于是自己修改完继续push。

> git merge的冲突判定机制如下：先寻找两个commit的公共祖先，比较同一个文件分别在ours和theirs下对于公共祖先的差异，然后合并这两组差异。如果双方同时修改了一处地方且修改内容不同，就判定为合并冲突，依次输出双方修改的内容。

```
git add . 

git rebase --continue

git push origin master
```
## 故事完结

> 从此他们在一起过上了幸福的Coder生活。

由上面的故事我们可以看到，集中式工作流只有一条master分支，而且维护得干净一点，永远只有一条分支。多人协作的时候，推送前要确保自己本地状态和远端保持同步，因此要记得rebase。但局限就是，一条分支很难去管理多个开发状态，因此在集中式工作流的基础上，有了后文的功能分支工作流。 

## 补充点东西

> git pull 时，--rebase参数可以让分支更整洁

git pull前
```
      B1---B2 master
     /
A---B---C origin/master
```
不加--rebase/相当于merge
```
      B1---B2 master
     /      \
A---B--------C origin/master
```
加上--rebase，告别合并点，让分支更整洁
```
A---B---C---B1---B2 master, origin/master
```

