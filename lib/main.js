
// ==UserScript==
// @name         优化网站浏览体验、去广告、自动展开、解除跳转拦截等
// @namespace    http://tampermonkey.net/
// @version      1.11
// @description  优化网站浏览体验(repository: https://github.com/zhulibo/webpage-customize)
// @author       zhu
// @match        *://www.aliyundrive.com/drive*
// @match        *.baidu.com/*
// @match        *://www.bilibili.com/*
// @match        *://wap.gamersky.com/news/*
// @match        *.ithome.com/*
// @match        *.juejin.cn/*
// @match        *://www.zhangxinxu.com/*
// @match        *.zhihu.com/*
// @icon         https://www.w3.org/2008/site/images/favicon.ico
// @grant        none
// @run-at       document-start
// @license      MIT
// ==/UserScript==

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

// 阿里云盘
function aliyundrive () {
  if(location.href.match('://www.aliyundrive.com/drive')){
    document.addEventListener('DOMContentLoaded',function(){
      // 关闭屏幕中间开通会员提示
      {
        addStyle('.business-tip--1SI5w {display: none!important}');
      }

    });
  }
}

// 哔哩哔哩

function bilibili () {
  if(location.href.match('://www.bilibili.com/')){
    document.addEventListener('DOMContentLoaded',function(){
      {
        // 关闭adblock插件检测提示窗口
        addStyle('.adblock-tips{max-height: 0}');
        console.log('关闭adblock插件检测提示窗口');
      }

    });
  }
}

// 游民星空
function gamersky () {

  let isNewsList = location.href.match(/:\/\/wap.gamersky.com\/news\/$/);
  let isNewsDetail = location.href.match(/:\/\/wap.gamersky.com\/news\/.+$/);

  if(isNewsList){
    document.addEventListener('DOMContentLoaded',function(){
      {
        // 去除一些页面元素
        let items = [
          '.ymw-header2019', // 顶部下载App
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
          if (scrollTop + clientHeight >= scrollHeight - 100) {
            let node = document.querySelector('.ymw-more');
            let event = new Event('touchend');
            console.log('已触发 ' + '.ymw-more');
            if(node) node.dispatchEvent(event);
          }
        }
      }

    });
  }

  if(isNewsDetail) {
    document.addEventListener('DOMContentLoaded',function() {
      {
        // 新闻页去除一些页面元素
        let items = [
          '.ymwBootDownload', // 顶部顶部下载App
          '.BaiduAdvertising', // 顶部百度广告
          '.gsTgWapConBdshareTopBox', // 打开游民APP，查看更多精彩内容
          '.ymw-rel-list', // app精彩推荐
          '._0vyin34jlngb', // 底部百度广告
          '.ymw-hot-h5-game', // 热门h5手游
        ];
        for (let i = 0; i < items.length; i++) {
          let node = document.querySelectorAll(items[i]);
          if (node && node.length > 0) {
            console.log('已触发 ' + items[i]);
            for (let i = 0; i < node.length; i++) {
              node[i].remove();
            }
          }
        }
      }

      {
        // 修改内容上边距
        let node = document.querySelector('.ymwContxt');
        if (node) {
          console.log('已触发 ' + '.ymwContxt');
          node.style.paddingTop = '.4rem';
        }
      }

      {
        // 文章自动展开
        let node = document.querySelector('#gsAreaContextOpen');
        if (node) {
          console.log('已触发 ' + '#gsAreaContextOpen');
          node.click();
        }
      }

      {
        // 防止查找.ymw-rel-mgame报错
        const element = document.createElement('div');
        element.className = 'ymw-rel-mgame';
        document.body.append(element);
      }

      {
        // 去除打开App阅读体验更佳，攻略、资讯实时更新
        let node = document.querySelector('.ymw-footer');
        if (node) {
          console.log('已触发 ' + '.ymw-footer');
          node.remove();
        }
      }

    });
  }

  if (isNewsDetail) {
    window.addEventListener('load',function(){
      {
        // 去除打开游民APP，查看xx条精彩评论
        let node = document.querySelector('#SOHUCS > a');
        if (node) {
          console.log('已触发 ' + '#SOHUCS > a');
          node.remove();
        }
      }

    });
  }

}

// it之家
function ithome () {

  let isNewsList = location.href.match(/:\/\/m.ithome.com\/$/);
  let isNewsDetail = location.href.match(/:\/\/m.ithome.com\/.+$/);
  let isPC = location.href.match(/:\/\/www.ithome.com\//);

  if(isNewsList){
    document.addEventListener('DOMContentLoaded',function(){
      {
        // 去除一些页面元素
        let items = [
          '.fixed-btn', // 打开app按钮
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

    });

    window.addEventListener('load',function(){
      {
        // 首页去除底部banner
        let node = document.querySelector('.open-app-banner');
        if (node) {
          console.log('已触发 ' + '.open-app-banner');
          node.remove();
        }
      }

    });
  }
  else if(isNewsDetail){
    document.addEventListener('DOMContentLoaded',function() {
      {
        // 去除一些页面元素
        let items = [
          '.open-app', // 打开app按钮
          '.hot-app', // 底部软媒旗下人气应用
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

    });
  }
  else if (isPC){
    document.addEventListener('DOMContentLoaded',function() {
      {
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
  }

}

// 掘金
function juejin () {
  if (location.href.match('://link.juejin.cn/')) {
    document.addEventListener('DOMContentLoaded', function () {
      {
        // 解除跳转拦截
        let target = new URL(location.href).searchParams.get('target');
        console.log('已触发 ' + target);
        location.href = decodeURIComponent(target);
      }

    });
  }
}

// 张鑫旭博客
function zhangxinxu () {
  if(location.href.match('://www.zhangxinxu.com/')){
    document.addEventListener('DOMContentLoaded',function(){
      {
        // 前端技术页去掉中间广告
        let nodeIterator = getNodeIterator(function (node){
          return node.nodeName.match(/^[a-zA-Z]{4}-[a-zA-Z]{2}$/)
        });
        let currentNode;
        while (currentNode = nodeIterator.nextNode()) {
          console.log('已触发', currentNode);
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
          console.log('已触发', currentNode);
          currentNode.remove();
        }
      }

    });
  }
}

// 知乎

function zhihu () {
  if (location.href.match('://link.zhihu.com/')) {
    document.addEventListener('DOMContentLoaded',function(){
      {
        // 解除跳转拦截
        let target = new URL(location.href).searchParams.get('target');
        console.log('已触发 ' + target);
        location.href = decodeURIComponent(target);
      }

    });
  }
  else if(location.href.match('://www.zhihu.com/')) {
    document.addEventListener('DOMContentLoaded',function(){
      {
        // 隐藏顶部banner
        addStyle('.Pc-Business-Card-PcTopFeedBanner{display:none}');
        // 文章详情页隐藏顶部标题
        addStyle('.PageHeader{display:none}');
      }

    });
  }
}

// baidu

function baidu () {
  if(location.href.match('://tieba.baidu.com/')) {
    window.addEventListener('load',function(){
      {
        // 关闭列表中的广告
        addStyle('#thread_list > div{display: none}');
        // 关闭侧边广告
        addStyle('.tbui_aside_float_bar + div, #aside-ad, #fc-wrap{display: none}');
      }

    });
  }
  else if(location.href.match('://map.baidu.com/')) {
    window.addEventListener('load',function(){
      {
        // 关闭地图右侧弹窗
        let node = document.querySelector('.close-btn-indexpage');
        if (node) {
          console.log('已触发 ' + '.close-btn-indexpage');
          node.click();
        }
      }

    });
  }
}

const href = location.href;

// 不用if else防止跳转跳转误判
if(href.match('://www.aliyundrive.com/drive')) {
  aliyundrive();
}
if(href.match('.baidu.com/')) {
  baidu();
}
if(href.match('://www.bilibili.com/')) {
  bilibili();
}
if(href.match('://wap.gamersky.com/news/')) {
  gamersky();
}
if(href.match('.ithome.com/')) {
  ithome();
}
if(href.match('.juejin.cn/')) {
  juejin();
}
if(href.match('://www.zhangxinxu.com/')) {
  zhangxinxu();
}
if(href.match('.zhihu.com/')) {
  zhihu();
}
