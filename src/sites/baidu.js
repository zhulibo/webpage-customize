// baidu
import {addStyle} from "js-fragment";

export default function () {
  if(location.href.match('://tieba.baidu.com/')) {
    document.addEventListener('DOMContentLoaded',function(){
      {
        // 隐藏帖子列表中的广告
        addStyle('#thread_list > div{display: none}')
        // 隐藏右侧侧广告
        addStyle('#aside-ad{display: none}')
        // 隐藏左侧广告
        addStyle('body > div:has( > .label_text){display: none}')
        // 隐藏评论中的广告
        addStyle('#j_p_postlist > div[data-field="{}"]{display: none}')
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
