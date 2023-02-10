// 掘金
export default function () {
  // 网页加载完毕
  window.addEventListener('load', function(){
    // 解除站内拦截
    if (location.href.match('://link.juejin.cn/')) {
      let target = location.href.split('?target=')[1]
      console.log('已触发 ' + target)
      location.href = decodeURIComponent(target)
    }
  })
}