import {addStyle} from "js-fragment";

// 阿里云盘
export default function () {
  // DOM结构加载完毕
  document.addEventListener('DOMContentLoaded',function(){
    if(location.href.match('://www.aliyundrive.com/drive')){

      // 关闭屏幕中间开通会员提示
      {
        addStyle('.business-tip--1SI5w {opacity: 0!important}')
      }

    }
  })
}
