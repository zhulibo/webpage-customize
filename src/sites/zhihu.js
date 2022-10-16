export default function () {
  // 网页加载完毕
  window.addEventListener('load',function(){
    if (location.href.match('://www.zhihu.com/')) {

      {
        // 文章详情页隐藏顶部标题
        let node = document.querySelector('.PageHeader')
        if (node) {
          console.log('已触发 ' + '.PageHeader')
          node.style.display = 'none'
        }
      }

      {
        // 关闭顶部banner
        let node = document.querySelector('.Topstory>div:first-child')
        if (node) {
          console.log('已触发 ' + '.Topstory>div:first-child')
          node.style.display = 'none'
        }
      }

    }
    // 解除站内拦截
    if (location.href.match('://link.zhihu.com/')) {
      let target = location.href.split('?target=')[1]
      console.log('已触发 ' + target)
      location.href = decodeURIComponent(target)
    }
  })
}
