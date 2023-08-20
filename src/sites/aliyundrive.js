import {loadStyle} from "js-fragment";

// 阿里云盘
export default function () {
  if(location.href.match('://www.aliyundrive.com/drive')){
    document.addEventListener('DOMContentLoaded',function(){
      // 关闭屏幕中间开通会员提示
      {
        loadStyle('.business-tip--1SI5w {display: none!important}')
      }

    })
  }
}
