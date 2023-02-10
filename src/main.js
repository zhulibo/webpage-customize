
import aliyundrive from "./sites/aliyundrive";
import bilibili from "./sites/bilibili";
import gamersky from "./sites/gamersky";
import ithome from "./sites/ithome";
import juejin from "./sites/juejin";
import zhangxinxu from "./sites/zhangxinxu";
import zhihu from "./sites/zhihu";

// ==UserScript==
// @name         优化网站浏览体验、去广告、自动展开、解除跳转拦截等
// @namespace    http://tampermonkey.net/
// @version      1.08
// @description  张鑫旭博客、it之家、游民星空H5新闻页、知乎文章详情页(repository: https://github.com/zhulibo/webpage-customize)
// @author       zhu
// @match        *://www.aliyundrive.com/drive*
// @match        *://www.bilibili.com/*
// @match        *://wap.gamersky.com/news/*
// @match        *://www.ithome.com/*
// @match        *://m.ithome.com/*
// @match        *://juejin.cn/*
// @match        *://link.juejin.cn/*
// @match        *://www.zhangxinxu.com/*
// @match        *.zhihu.com/*
// @icon         https://www.w3.org/2008/site/images/favicon.ico
// @grant        none
// @run-at       document-start
// @license      MIT
// ==/UserScript==

aliyundrive()
bilibili()
gamersky()
ithome()
juejin()
zhangxinxu()
zhihu()
