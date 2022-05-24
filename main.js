// ==UserScript==
// @name         张鑫旭博客去广告、游民星空H5新闻页浏览体验优化、知乎文章详情页隐藏标题
// @namespace    http://tampermonkey.net/
// @version      1.01
// @description  优化一些网站的浏览体验，问题反馈773520054@qq.com
// @author       zhu
// @match        *://www.zhangxinxu.com/*
// @match        *://wap.gamersky.com/news/*
// @match        *://www.zhihu.com/*
// @icon         https://www.w3.org/2008/site/images/favicon.ico
// @grant        none
// @run-at       document-start
// @license      MIT
// ==/UserScript==

// 浏览器地址
const url = location.href

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
      })
      let currentNode
      while (currentNode = nodeIterator.nextNode()) {
        console.log(currentNode)
        currentNode.remove()
      }
    }
    {
      // 首页去掉左侧广告
      let nodeIterator = getNodeIterator(function (node){
        return typeof(node.className) === 'string' && node.className.match(/^col-left-[a-zA-Z]{4}$/)
      })
      let currentNode
      while (currentNode = nodeIterator.nextNode()) {
        console.log(currentNode)
        currentNode.remove()
      }
    }
  }

  else if(url.match('://wap.gamersky.com/news/')){ // 游民星空H5
    {
      // 去除一些新闻页面元素
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
      ]
      for (let i = 0; i < items.length; i++) {
        let node = document.querySelectorAll(items[i])
        if(node && node.length > 0) {
          for (let i = 0; i < node.length; i++) {
            node[i].remove()
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
      let node = document.querySelector('#gsAreaContextOpen')
      if(node) node.click()
    }
    {
      // 新闻详情页修改内容上边距
      let node = document.querySelector('.ymwContxt')
      if(node) node.style.paddingTop = '.4rem'
    }
  }

})

// 网页加载完毕
window.addEventListener('load',function(){

  if(url.match('://www.zhihu.com/')) { // 知乎
    // 文章详情页隐藏顶部标题
    let node = document.querySelector('.PageHeader')
    if (node) node.style.display = 'none'
  }

})
