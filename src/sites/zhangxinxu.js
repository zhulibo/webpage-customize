import {getNodeIterator} from "js-fragment";

// 张鑫旭博客
export default function () {
  if(location.href.match('://www.zhangxinxu.com/')){
    document.addEventListener('DOMContentLoaded',function(){
      {
        // 前端技术页去掉中间广告
        let nodeIterator = getNodeIterator(function (node){
          return node.nodeName.match(/^[a-zA-Z]{4}-[a-zA-Z]{2}$/)
        })
        let currentNode
        while (currentNode = nodeIterator.nextNode()) {
          console.log('已触发', currentNode)
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
          console.log('已触发', currentNode)
          currentNode.remove()
        }
      }

    })
  }
}
