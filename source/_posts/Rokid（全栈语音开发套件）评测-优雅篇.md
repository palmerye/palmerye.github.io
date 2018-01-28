---
title: Rokid（全栈语音开发套件）评测---优雅篇
date: 2018-01-03 23:10:54
tags: [rokid, 硬件]
---

> 元旦宅在家chuang里shang，刚好收到了Rokid寄来的开发板，激动的去公司拿回快递，动手拆拆拆。

<!--more-->

首先感谢SF和Rokid平台，想想自己申请的时候脸皮真的是厚，现在看评论真的不堪入目。看了几篇其他人的评测，感觉需要从另一个角度来看Rokid这块开发板，那就先从优duo雅tu的角度看吧。

## 全家桶

![](http://ohce3yxd6.bkt.clouddn.com/rokid/WechatIMG3841514985737_.pic_hd.jpg)

从左至右依次为：

 - 开发板外盒
 - Type-C数据线（供电: 应该是正常1.5A~3A都能带动，还没仔细去看电源模块）
 - Debug板
 - 核心板

如果想正常体验Rokid的功能，其实只需要核心板就可以，USB Type-C供电，结合Rokid App。

## 拆拆拆

> 作为一名曾经的硬件工程师，看到螺丝这种东西，都想不自觉地拧一拧

![](http://ohce3yxd6.bkt.clouddn.com/rokid/WechatIMG3831514985731_.pic_hd.jpg)

拆下所有螺丝螺母，铜制，Rokid还是良心呀。

![](http://ohce3yxd6.bkt.clouddn.com/rokid/WechatIMG3821514985724_.pic_hd.jpg)

很快就将能拆的都拆了，两块圆形透明塑料板子让开发板线路很直观，很极客。但如果需要把debug板子集成进去的话，还需要再加三根铜柱来支撑。

## 套件细节

> 从工程角度看这块开发板的做工，无论是焊锡点，还是PCB布线材质，都很漂亮，想起了自己以前手焊电路板的日子，尤其是那种芝麻大的电容，想想还是。。。快忘了很多硬件的工艺知识了，跑工厂的时候，解决现场问题尤其头疼。

### 核心板

![](http://ohce3yxd6.bkt.clouddn.com/rokid/WechatIMG3801514985704_.pic_hd.jpg)

![](http://ohce3yxd6.bkt.clouddn.com/rokid/WechatIMG3791514985666_.pic_hd.jpg)

![](http://ohce3yxd6.bkt.clouddn.com/rokid/WechatIMG3811514985715_.pic_hd.jpg)

### Debug板

![](http://ohce3yxd6.bkt.clouddn.com/rokid/WechatIMG3771514985640_.pic_hd.jpg)

![](http://ohce3yxd6.bkt.clouddn.com/rokid/WechatIMG3761514985619_.pic_hd.jpg)

![](http://ohce3yxd6.bkt.clouddn.com/rokid/WechatIMG3751514985603_.pic_hd.jpg)

躺在盒子是这个样子的。

### PCB收尾

![](http://ohce3yxd6.bkt.clouddn.com/rokid/WechatIMG3781514985655_.pic_hd.jpg)

## 一言不合开个机看看

USB口接上普通手机电源，我是直接插到笔记本边上了，也能带得动。

![](http://ohce3yxd6.bkt.clouddn.com/rokid/WechatIMG3741514985594_.pic_hd.jpg)

刚开机的时候，外圈交替闪烁四盏LED（白）。3.5mm接口插上耳机（开发套件默认不配备扬声器），可以听到开发套件的语音反馈。

![](http://ohce3yxd6.bkt.clouddn.com/rokid/WechatIMG3711514985578_.pic_hd.jpg)

![](http://ohce3yxd6.bkt.clouddn.com/rokid/WechatIMG3731514985589_.pic_hd.jpg)

![](http://ohce3yxd6.bkt.clouddn.com/rokid/WechatIMG3721514985584_.pic_hd.jpg)

![](http://ohce3yxd6.bkt.clouddn.com/rokid/WechatIMG370.jpeg)

这里我就跳过了App网络蓝牙配置阶段了。
- 配置成功后亮起一圈LED（绿）
- 对它说“若琪”，在你声音的方向会亮起一盏LED（白）
- “明天天气如何？”,识别语音，亮起若干LED（白）转圈显示
- ”xxxx“耳机可以听到相应的语音反馈，期间整圈LED（白）同时闪烁

## 最后

还没怎么去折腾开发功能，不过目前想解决的问题是，让套件连接蓝牙音箱，代替它的麦克风输出。有时间再玩耍吧。

生命不息，折腾不止。


> 本文参与了 SegmentFault[「Rokid 开发板试用，开启你的嵌入式开发之旅」](https://segmentfault.com/a/1190000012425295)活动，欢迎正在阅读的你申请试用，一起交流开发心得。