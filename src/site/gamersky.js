export default function () {

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
        if(node) {
          console.log('已触发 ' + '#gsAreaContextOpen')
          node.click()
        }
      }

      {
        // 新闻详情页修改内容上边距
        let node = document.querySelector('.ymwContxt')
        if(node) {
          console.log('已触发 ' + '.ymwContxt')
          node.style.paddingTop = '.4rem'
        }
      }

    }
  })

  // 网页加载完毕
  window.addEventListener('load',function(){

    if (location.href.match('://wap.gamersky.com/news/')) {
      // 去除详情页打开游民APP，查看xx条精彩评论
      let node = document.querySelector('#SOHUCS > a')
      if (node) {
        console.log('已触发 ' + '#SOHUCS > a')
        node.remove()
      }

    }

  })
}
