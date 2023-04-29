// 掘金
export default function () {
  if (location.href.match('://link.juejin.cn/')) {
    document.addEventListener('DOMContentLoaded', function () {
      {
        // 解除跳转拦截
        let target = new URL(location.href).searchParams.get('target')
        console.log('已触发 ' + target)
        location.href = decodeURIComponent(target)
      }

    })
  }
}
