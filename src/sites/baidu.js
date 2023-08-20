import {loadStyle} from "js-fragment";

// baidu
export default function () {
  if(location.href.match('://tieba.baidu.com/')) {
    document.addEventListener('DOMContentLoaded',function(){
      {
        // 隐藏帖子列表中的广告
        loadStyle('#thread_list > div{display: none}')
        // 隐藏右侧侧广告
        loadStyle('#aside-ad{display: none}')
        // 隐藏左侧广告
        loadStyle('body > div:has( > .label_text){display: none}')
        // 隐藏评论中的广告
        loadStyle('#j_p_postlist > div[data-field="{}"]{display: none}')
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
