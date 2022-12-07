import {throttle} from "js-fragment";

// it之家
export default function () {

  // DOM结构加载完毕
  document.addEventListener('DOMContentLoaded',function(){

    if(location.href.match('://m.ithome.com/')){

      {
        // 去除一些页面元素
        let items = [
          '.fixed-btn', // 首页悬浮打开app按钮
          '.open-app', // 资讯详情页悬浮打开app按钮
          '.hot-app', // 资讯详情页底部软媒旗下人气应用
        ]
        for (let i = 0; i < items.length; i++) {
          let node = document.querySelectorAll(items[i])
          if(node && node.length > 0) {
            console.log('已触发 ' + items[i])
            for (let i = 0; i < node.length; i++) {
              node[i].remove()
            }
          }
        }
      }

      {
        // 首页去除文章list中的广告
        function removeAD() {
          let node = document.querySelectorAll('.tip-gray')
          if(node && node.length > 0) {
            console.log('已触发 ' + '.tip-gray')
            for (let i = 0; i < node.length; i++) {
              node[i].parentNode.parentNode.parentNode.parentNode.remove()
            }
          }
        }
        removeAD()
        // 处理异步加载的资讯
        let handle = throttle(findNewAd)
        let length = 0 // 资讯总条数
        function findNewAd() {
          let list = document.querySelectorAll('.content>.placeholder')
          if (list.length > length) {
            removeAD()
            length = document.querySelectorAll('.content>.placeholder').length
          }
        }
        window.addEventListener('scroll', handle)
      }

    }

    else if (location.href.match('://www.ithome.com/')){
      // 减小首页头条字体
      let node = document.querySelectorAll('#tt a')
      if (node) {
        console.log('已触发 ' + '#tt a')
        for (let i = 0; i < node.length; i++) {
          node[i].style.fontSize = '14px'
        }
      }
    }

  })

  // 网页加载完毕
  window.addEventListener('load',function(){
    if (location.href.match('://m.ithome.com/')) {
      // 首页去除底部banner
      let node = document.querySelector('.open-app-banner')
      if (node) {
        console.log('已触发 ' + '.open-app-banner')
        node.remove()
      }
    }
  })

}
