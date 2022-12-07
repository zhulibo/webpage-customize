import {addStyle} from "js-fragment";

// 阿里云盘
export default function () {
  // DOM结构加载完毕
  document.addEventListener('DOMContentLoaded',function(){
    if(location.href.match('://www.aliyundrive.com/drive')){

      // 全屏观看视频时背景设置为黑色
      {
        addStyle('.video-previewer-container--3N0eI {background: #000}')
      }

    }
  })
}
