## webpage-customize [![tampermonkey](https://img.shields.io/badge/greasyfork-js--fragment-670000)](https://greasyfork.org/zh-CN/scripts/445289)

A tampermonkey plugin which customize some webpage to make it more accessible

## usage

1、install tampermonkey

2、open [greasyfork script](https://greasyfork.org/zh-CN/scripts/445289) > install

## 本地开发测试

1、打开浏览器扩展程序 > tampermonkey详情 > 允许访问文件网址

2、打开Tampermonkey插件 > 通用-配置模式：选择高级 > 安全-允许脚本访问本地文件：选择所有本地文件

3、复制UserScript头 > 新建Tampermonkey脚本 > 粘贴 > 修改@require地址

```
// ==UserScript==
// @name         dev
// @namespace    http://tampermonkey.net/
// @version      1.00
// @description  require本地文件
// @author       zhu
// @match        *://www.zhangxinxu.com/*
// @match        *://wap.gamersky.com/news/*
// @match        *.zhihu.com/*
// @match        *://m.ithome.com/*
// @match        *://www.ithome.com/*
// @icon         https://www.w3.org/2008/site/images/favicon.ico
// @grant        none
// @run-at       document-start
// @license      MIT
// @require      file:///Users/libozhu/Desktop/webpage-customize/lib/main.js
// ==/UserScript==
```
