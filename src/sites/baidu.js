import {loadStyle} from "js-fragment";

// baidu
export default function () {
  if(location.href.match('://tieba.baidu.com/')) {
    document.addEventListener('DOMContentLoaded',function(){
      {
      }

    })
  }
  else if(location.href.match('://map.baidu.com/')) {
    window.addEventListener('load',function(){
      {
        loadStyle('#message-panel.message-panel-open{display: none}')
      }

    })
  }
}
