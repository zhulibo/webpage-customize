// 添加样式
function addStyle(css) {
    let style = document.createElement('style');
    let head = document.head || document.getElementsByTagName('head')[0];
    style.appendChild(document.createTextNode(css));
    head.appendChild(style);
}

// 遍历筛选节点
function getNodeIterator(filterNode) {
    return document.createNodeIterator(document.body, NodeFilter.SHOW_ELEMENT, {
        acceptNode(node) {
            return filterNode(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
    });
}

// 节流
function throttle(fn, delay = 200, immediate = false) {
    let canRun = true;
    let count = 0; // 外部函数调用次数
    return function () {
        count++;
        if (immediate && count === 1) { // 立即执行条件下的第一次调用
            // @ts-ignore
            fn.apply(this, arguments);
        }
        if (canRun) {
            canRun = false;
            setTimeout(() => {
                // @ts-ignore
                (count > 1 || !immediate) && fn.apply(this, arguments); // 立即执行条件下多次调用，或非立即执行条件下，执行fn
                canRun = true;
            }, delay);
        }
    };
}

function gamersky () {

  // DOM结构加载完毕
  document.addEventListener('DOMContentLoaded',function(){
    if(location.href.match('://wap.gamersky.com/news/')){

      {
        // 新闻页去除一些页面元素
        let items = [
          '#gsTgWapTop', // 列表页、详情页顶部广告
          '.ymw-header2018', // 详情页head
          '.ymw-header2019', // 列表页顶部引导下载
          '.ymw-header2021', // 详情页顶部引导下载
          '.gsTgWapConBdshareTop', // 详情页打开游民APP，查看更多精彩内容
          '.gameCard', // 详情页gameCard
          '.ymw-rel-list', // 详情页app精彩推荐、相关内容
          '.ymw-hot-h5-game', // 详情页热门h5手游
          '.ymw-footer', // 详情页footer
        ];
        for (let i = 0; i < items.length; i++) {
          let node = document.querySelectorAll(items[i]);
          if(node && node.length > 0) {
            console.log('已触发 ' + items[i]);
            for (let i = 0; i < node.length; i++) {
              node[i].remove();
            }
          }
        }
      }

      {
        // 触底自动加载更多
        let handle = throttle(loadData, 100);
        window.addEventListener('scroll', handle);
        function loadData() {
          let clientHeight = document.documentElement.clientHeight;
          let scrollHeight = document.documentElement.scrollHeight;
          let scrollTop = document.documentElement.scrollTop;
          if (scrollTop + clientHeight >= scrollHeight) {
            let node = document.querySelector('.ymw-more');
            let event = new Event('touchend');
            console.log('已触发 ' + '.ymw-more');
            if(node) node.dispatchEvent(event);
          }
        }
      }

      {
        // 新闻详情页文章自动展开
        let node = document.querySelector('#gsAreaContextOpen');
        if(node) {
          console.log('已触发 ' + '#gsAreaContextOpen');
          node.click();
        }
      }

      {
        // 新闻详情页修改内容上边距
        let node = document.querySelector('.ymwContxt');
        if(node) {
          console.log('已触发 ' + '.ymwContxt');
          node.style.paddingTop = '.4rem';
        }
      }

    }
  });

  // 网页加载完毕
  window.addEventListener('load',function(){

    if (location.href.match('://wap.gamersky.com/news/')) {
      // 去除详情页打开游民APP，查看xx条精彩评论
      let node = document.querySelector('#SOHUCS > a');
      if (node) {
        console.log('已触发 ' + '#SOHUCS > a');
        node.remove();
      }

    }

  });
}

function ithome () {

  // DOM结构加载完毕
  document.addEventListener('DOMContentLoaded',function(){

    if(location.href.match('://m.ithome.com/')){

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
            console.log('已触发 ' + items[i]);
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
            console.log('已触发 ' + '.tip-gray');
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

    else if (location.href.match('://www.ithome.com/')){
      // 减小首页头条字体
      let node = document.querySelectorAll('#tt a');
      if (node) {
        console.log('已触发 ' + '#tt a');
        for (let i = 0; i < node.length; i++) {
          node[i].style.fontSize = '14px';
        }
      }
    }

  });

  // 网页加载完毕
  window.addEventListener('load',function(){
    if (location.href.match('://m.ithome.com/')) {
      // 首页去除底部banner
      let node = document.querySelector('.open-app-banner');
      if (node) {
        console.log('已触发 ' + '.open-app-banner');
        node.remove();
      }
    }
  });

}

function zhangxinxu () {
  // DOM结构加载完毕
  document.addEventListener('DOMContentLoaded',function(){
    if(location.href.match('://www.zhangxinxu.com/')){

      {
        // 前端技术页去掉中间广告
        let nodeIterator = getNodeIterator(function (node){
          return node.nodeName.match(/^[a-zA-Z]{4}-[a-zA-Z]{2}$/)
        });
        let currentNode;
        while (currentNode = nodeIterator.nextNode()) {
          console.log('已触发 ' + '/^[a-zA-Z]{4}-[a-zA-Z]{2}$/');
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
          console.log('已触发 ' + '/^col-left-[a-zA-Z]{4}$/');
          currentNode.remove();
        }
      }

    }
  });
}

function zhihu () {
  // 网页加载完毕
  window.addEventListener('load',function(){
    if (location.href.match('://www.zhihu.com/')) {
      // 文章详情页隐藏顶部标题
      let node = document.querySelector('.PageHeader');
      if (node) {
        console.log('已触发 ' + '.PageHeader');
        node.style.display = 'none';
      }
    }
    // 解除站内拦截
    if (location.href.match('://link.zhihu.com/')) {
      let target = location.href.split('?target=')[1];
      console.log('已触发 ' + target);
      location.href = decodeURIComponent(target);
    }
  });
}

function aliyundrive () {
  // DOM结构加载完毕
  document.addEventListener('DOMContentLoaded',function(){
    if(location.href.match('://www.aliyundrive.com/drive')){

      // 全屏观看视频时背景设置为黑色
      {
        addStyle('.video-previewer-container--3N0eI {background: #000}');
      }

    }
  });
}

// ==UserScript==
// @name         优化网站浏览体验、去广告、自动展开、解除跳转拦截等
// @namespace    http://tampermonkey.net/
// @version      1.05
// @description  张鑫旭博客、it之家、游民星空H5新闻页、知乎文章详情页(repository: https://github.com/zhulibo/webpage-customize)
// @author       zhu
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

gamersky();
ithome();
zhangxinxu();
zhihu();
aliyundrive();
