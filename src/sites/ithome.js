import {throttle} from "js-fragment";

// it之家
export default function () {

  let isNewsList = location.href.match(/:\/\/m.ithome.com\/$/)
  let isNewsDetail = location.href.match(/:\/\/m.ithome.com\/.+$/)
  let isPC = location.href.match(/:\/\/www.ithome.com\//)

  if(isNewsList){
    document.addEventListener('DOMContentLoaded',function(){
      {
        // 去除一些页面元素
        let items = [
          '.fixed-btn', // 打开app按钮
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

    })

    window.addEventListener('load',function(){
      {
        // 首页去除底部banner
        let node = document.querySelector('.open-app-banner')
        if (node) {
          console.log('已触发 ' + '.open-app-banner')
          node.remove()
        }
      }

    })
  }
  else if(isNewsDetail){
    document.addEventListener('DOMContentLoaded',function() {
      {
        // 去除一些页面元素
        let items = [
          '.open-app', // 打开app按钮
          '.hot-app', // 底部软媒旗下人气应用
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

    })
  }
  else if (isPC){
    document.addEventListener('DOMContentLoaded',function() {
      {
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
  }

}
