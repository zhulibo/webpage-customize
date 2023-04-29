// baidu
import {addStyle} from "js-fragment";

export default function () {
  if(location.href.match('://tieba.baidu.com/')) {
    window.addEventListener('load',function(){
      {
        // 关闭列表中的广告
        addStyle('#thread_list > div{display: none}')
        // 关闭侧边广告
        addStyle('.tbui_aside_float_bar + div, #aside-ad, #fc-wrap{display: none}')
      }

    })
  }
  else if(location.href.match('://map.baidu.com/')) {
    window.addEventListener('load',function(){
      {
        // 关闭地图右侧弹窗
        let node = document.querySelector('.close-btn-indexpage')
        if (node) {
          console.log('已触发 ' + '.close-btn-indexpage')
          node.click()
        }
      }

    })
  }
}
