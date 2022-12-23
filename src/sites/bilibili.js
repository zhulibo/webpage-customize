// 哔哩哔哩
export default function () {
  // DOM结构加载完毕
  document.addEventListener('DOMContentLoaded',function(){
    if(location.href.match('://www.bilibili.com/')){

      {
        // 关闭adblock插件检测提示窗口
        let node = document.querySelector('.adblock-tips')
        if (node) {
          console.log('已触发 ' + '.adblock-tips')
          node.remove()
        }
      }

    }
  })
}
