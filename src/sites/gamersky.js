import {addStyle, throttle} from "js-fragment";

// 游民星空
export default function () {

  let isNewsList = location.href.match(/:\/\/wap.gamersky.com\/news\/$/)
  let isNewsDetail = location.href.match(/:\/\/wap.gamersky.com\/news\/.+$/)

  if(isNewsList){
    document.addEventListener('DOMContentLoaded',function(){
      {
        // 去除一些页面元素
        let items = [
          '.ymw-header2019', // 顶部下载App
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
        // 触底自动加载更多
        let handle = throttle(loadData, 100)
        window.addEventListener('scroll', handle)
        function loadData() {
          let clientHeight = document.documentElement.clientHeight
          let scrollHeight = document.documentElement.scrollHeight
          let scrollTop = document.documentElement.scrollTop
          if (scrollTop + clientHeight >= scrollHeight - 100) {
            let node = document.querySelector('.ymw-more')
            let event = new Event('touchend')
            console.log('已触发 ' + '.ymw-more')
            if(node) node.dispatchEvent(event)
          }
        }
      }

    })
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
        ]
        for (let i = 0; i < items.length; i++) {
          let node = document.querySelectorAll(items[i])
          if (node && node.length > 0) {
            console.log('已触发 ' + items[i])
            for (let i = 0; i < node.length; i++) {
              node[i].remove()
            }
          }
        }
      }

      {
        // 修改内容上边距
        let node = document.querySelector('.ymwContxt')
        if (node) {
          console.log('已触发 ' + '.ymwContxt')
          node.style.paddingTop = '.4rem'
        }
      }

      {
        // 文章自动展开
        let node = document.querySelector('#gsAreaContextOpen')
        if (node) {
          console.log('已触发 ' + '#gsAreaContextOpen')
          node.click()
        }
      }

      {
        // 防止查找.ymw-rel-mgame报错
        const element = document.createElement('div')
        element.className = 'ymw-rel-mgame'
        document.body.append(element)
      }

      {
        // 去除打开App阅读体验更佳，攻略、资讯实时更新
        let node = document.querySelector('.ymw-footer')
        if (node) {
          console.log('已触发 ' + '.ymw-footer')
          node.remove()
        }
      }

    })
  }

  if (isNewsDetail) {
    window.addEventListener('load',function(){
      {
        // 去除打开游民APP，查看xx条精彩评论
        let node = document.querySelector('#SOHUCS > a')
        if (node) {
          console.log('已触发 ' + '#SOHUCS > a')
          node.remove()
        }
      }

    })
  }

}
