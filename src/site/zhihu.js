export default function () {
  // 网页加载完毕
  window.addEventListener('load',function(){
    if (location.href.match('://www.zhihu.com/')) {
      // 文章详情页隐藏顶部标题
      let node = document.querySelector('.PageHeader')
      if (node) {
        console.log('已触发 ' + '.PageHeader')
        node.style.display = 'none'
      }
    }
  })
}
