import {loadStyle} from "js-fragment";

// 哔哩哔哩
export default function () {
  if(location.href.match('://www.bilibili.com/')){
    document.addEventListener('DOMContentLoaded',function(){
      {
        // 关闭检测adblock警告
        loadStyle('.adblock-tips{max-height: 0}')
        console.log('关闭检测adblock警告')
      }

      {
        // 监听键盘a键，切换网页全屏
        document.addEventListener('keydown',(e)=>{
          // 排除文字输入状态
          if(e.target.tagName === 'INPUT' || e.target.tagName=== 'TEXTAREA'){
            return
          }
          if(e.keyCode === 65){
            document.querySelector('.bpx-player-ctrl-web').click()
          }
        })
      }

    })
  }
}
