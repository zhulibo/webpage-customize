import bilibili from "./sites/bilibili";
import gamersky from "./sites/gamersky";
import ithome from "./sites/ithome";
import zhangxinxu from "./sites/zhangxinxu";
import zhihu from "./sites/zhihu";
import aliyundrive from "./sites/aliyundrive";

// ==UserScript==
// @name         优化网站浏览体验、去广告、自动展开、解除跳转拦截等
// @namespace    http://tampermonkey.net/
// @version      1.06
// @description  张鑫旭博客、it之家、游民星空H5新闻页、知乎文章详情页(repository: https://github.com/zhulibo/webpage-customize)
// @author       zhu
// @match        *://www.bilibili.com/*
// @match        *://www.zhangxinxu.com/*
// @match        *://wap.gamersky.com/news/*
// @match        *.zhihu.com/*
// @match        *://m.ithome.com/*
// @match        *://www.ithome.com/*
// @match        *://www.aliyundrive.com/drive*
// @icon         https://www.w3.org/2008/site/images/favicon.ico
// @grant        none
// @run-at       document-start
// @license      MIT
// ==/UserScript==

bilibili()
gamersky()
ithome()
zhangxinxu()
zhihu()
aliyundrive()
