import {getNodeIterator} from "../utils/utils";

export default function () {
  // DOM结构加载完毕
  document.addEventListener('DOMContentLoaded',function(){
    if(location.href.match('://www.zhangxinxu.com/')){

      {
        // 前端技术页去掉中间广告
        let nodeIterator = getNodeIterator(function (node){
          return node.nodeName.match(/^[a-zA-Z]{4}-[a-zA-Z]{2}$/)
        })
        let currentNode
        while (currentNode = nodeIterator.nextNode()) {
          console.log('已触发 ' + '/^[a-zA-Z]{4}-[a-zA-Z]{2}$/')
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
          console.log('已触发 ' + '/^col-left-[a-zA-Z]{4}$/')
          currentNode.remove()
        }
      }

    }
  })
}
