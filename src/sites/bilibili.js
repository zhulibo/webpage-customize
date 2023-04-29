// 哔哩哔哩
import {addStyle} from "js-fragment";

export default function () {
  if(location.href.match('://www.bilibili.com/')){
    document.addEventListener('DOMContentLoaded',function(){
      {
        // 关闭adblock插件检测提示窗口
        addStyle('.adblock-tips{display:none}')
      }

    })
  }
}
