import {loadStyle} from "js-fragment";

export default function () {
  if(location.href.match('://outlook.live.com/')){
    document.addEventListener('DOMContentLoaded',function(){
      // 关闭左侧栏
      {
        loadStyle('.QVF0n {display: none!important}')
      }

    })
  }
}
