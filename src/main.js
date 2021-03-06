import gamersky from "./site/gamersky";
import ithome from "./site/ithome";
import zhangxinxu from "./site/zhangxinxu";
import zhihu from "./site/zhihu";

// ==UserScript==
// @name         优化网站浏览体验、去广告、自动展开折叠内容等
// @namespace    http://tampermonkey.net/
// @version      1.03
// @description  张鑫旭博客、it之家、游民星空H5新闻页、知乎文章详情页(repository: https://github.com/zhulibo/webpage-customize)
// @author       zhu
// @match        *://www.zhangxinxu.com/*
// @match        *://wap.gamersky.com/news/*
// @match        *://www.zhihu.com/*
// @match        *://m.ithome.com/*
// @icon         https://www.w3.org/2008/site/images/favicon.ico
// @grant        none
// @run-at       document-start
// @license      MIT
// ==/UserScript==

gamersky()
ithome()
zhangxinxu()
zhihu()
