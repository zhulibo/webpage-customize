// 节流
function throttle(fn, delay = 200, immediate = false) {
  let canRun = true;
  let count = 0; // 外部函数调用次数
  return function () {
    count++;
    if (immediate && count === 1) { // 立即执行条件下的第一次调用
      fn.apply(this, arguments);
    }
    if (canRun) {
      canRun = false;
      setTimeout(() => {
        (count > 1 || !immediate) && fn.apply(this, arguments); // 立即执行条件下多次调用，或非立即执行条件下，执行fn
        canRun = true;
      }, delay);
    }
  }
}

// ==UserScript==
// @name         优化浏览体验、去广告，张鑫旭博客、游民星空H5新闻页、知乎文章详情页、it之家
// @namespace    http://tampermonkey.net/
// @version      1.02
// @description  优化一些网站的浏览体验，问题反馈773520054@qq.com
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

// 浏览器地址
const url = location.href;

// 遍历筛选节点
function getNodeIterator(filterNode) {
  return document.createNodeIterator(
    document.body,
    NodeFilter.SHOW_ELEMENT,
    {
      acceptNode(node) {
        return filterNode(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    }
  )
}

// DOM结构加载完毕
document.addEventListener('DOMContentLoaded',function(){

  if(url.match('://www.zhangxinxu.com/')){ // 张鑫旭博客

    {
      // 前端技术页去掉中间广告
      let nodeIterator = getNodeIterator(function (node){
        return node.nodeName.match(/^[a-zA-Z]{4}-[a-zA-Z]{2}$/)
      });
      let currentNode;
      while (currentNode = nodeIterator.nextNode()) {
        currentNode.remove();
      }
    }

    {
      // 首页去掉左侧广告
      let nodeIterator = getNodeIterator(function (node){
        return typeof(node.className) === 'string' && node.className.match(/^col-left-[a-zA-Z]{4}$/)
      });
      let currentNode;
      while (currentNode = nodeIterator.nextNode()) {
        currentNode.remove();
      }
    }

  }

  else if(url.match('://wap.gamersky.com/news/')){ // 游民星空H5

    {
      // 新闻页去除一些页面元素
      let items = [
        '#gsTgWapTop', // 列表页、详情页顶部广告
        '.ymw-header2018', // 详情页head
        '.ymw-header2019', // 列表页顶部引导下载
        '.ymw-header2021', // 详情页顶部引导下载
        '.gsTgWapConBdshareTopBox', // 详情页打开游民APP，查看更多精彩内容
        '.gameCard', // 详情页gameCard
        '.ymw-rel-list', // 详情页app精彩推荐、相关内容
        '.ymw-hot-h5-game', // 详情页热门h5手游
        '.ymw-footer', // 详情页footer
      ];
      for (let i = 0; i < items.length; i++) {
        let node = document.querySelectorAll(items[i]);
        if(node && node.length > 0) {
          for (let i = 0; i < node.length; i++) {
            node[i].remove();
          }
        }
      }
    }

    // // todo 未知原因 click事件不生效
    // {
    //   // 触底自动加载更多
    //   window.addEventListener('scroll', loadData)
    //   function loadData() {
    //     let clientHeight = document.documentElement.clientHeight
    //     let scrollHeight = document.documentElement.scrollHeight
    //     let scrollTop = document.documentElement.scrollTop
    //     if (scrollTop + clientHeight >= scrollHeight) {
    //       let node = document.querySelector('.ymw-more')
    //       if(node) node.click()
    //     }
    //   }
    // }

    {
      // 新闻详情页文章自动展开
      let node = document.querySelector('#gsAreaContextOpen');
      if(node) node.click();
    }

    {
      // 新闻详情页修改内容上边距
      let node = document.querySelector('.ymwContxt');
      if(node) node.style.paddingTop = '.4rem';
    }
  }

  else if(url.match('://m.ithome.com/')){ // it之家H5

    {
      // 去除一些页面元素
      let items = [
        '.fixed-btn', // 首页悬浮打开app按钮
        '.open-app', // 资讯详情页悬浮打开app按钮
        '.hot-app', // 资讯详情页底部软媒旗下人气应用
      ];
      for (let i = 0; i < items.length; i++) {
        let node = document.querySelectorAll(items[i]);
        if(node && node.length > 0) {
          for (let i = 0; i < node.length; i++) {
            node[i].remove();
          }
        }
      }
    }

    {
      // 首页去除文章list中的广告
      function removeAD() {
        let node = document.querySelectorAll('.tip-gray');
        if(node && node.length > 0) {
          for (let i = 0; i < node.length; i++) {
            node[i].parentNode.parentNode.parentNode.parentNode.remove();
          }
        }
      }
      removeAD();
      // 处理异步加载的资讯
      let handle = throttle(findNewAd);
      let length = 0; // 资讯总条数
      function findNewAd() {
        let list = document.querySelectorAll('.content>.placeholder');
        if (list.length > length) {
          removeAD();
          length = document.querySelectorAll('.content>.placeholder').length;
        }
      }
      window.addEventListener('scroll', handle);
    }

  }

});

// 网页加载完毕
window.addEventListener('load',function(){

  if (url.match('://wap.gamersky.com/news/')) { // 游民星空H5
    // 去除详情页打开游民APP，查看xx条精彩评论
    let node = document.querySelector('#SOHUCS > a');
    if (node) node.remove();
  }

  else if (url.match('://www.zhihu.com/')) { // 知乎
    // 文章详情页隐藏顶部标题
    let node = document.querySelector('.PageHeader');
    if (node) node.style.display = 'none';
  }

  else if (url.match('://m.ithome.com/')) { // it之家
    {
      // 首页去除底部banner
      let node = document.querySelector('.open-app-banner');
      if(node) node.remove();
    }
  }

});
