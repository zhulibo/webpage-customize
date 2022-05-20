// ==UserScript==
// @name         张鑫旭博客去广告、游民星空H5新闻页优化、知乎文章详情页隐藏标题
// @namespace    http://tampermonkey.net/
// @version      1.00
// @description  张鑫旭博客去广告、游民星空H5新闻页优化、知乎文章详情页隐藏标题，问题反馈773520054@qq.com
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
    // 新闻详情页文章自动展开
    let node = document.querySelector('#gsAreaContextOpen')
    if(node) node.click()
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
