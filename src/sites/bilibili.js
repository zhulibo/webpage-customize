// 哔哩哔哩
export default function () {
  if(location.href.match('://www.bilibili.com/')){
    document.addEventListener('DOMContentLoaded',function(){
      {
        // 关闭adblock插件检测提示窗口
        let node = document.querySelector('.adblock-tips')
        if (node) {
          console.log('已触发 ' + '.adblock-tips')
          node.remove()
        }
      }

    })
  }
}
