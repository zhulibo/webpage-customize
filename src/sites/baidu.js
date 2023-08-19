import {loadCss} from "js-fragment";

// baidu
export default function () {
  if(location.href.match('://tieba.baidu.com/')) {
    document.addEventListener('DOMContentLoaded',function(){
      {
        // 隐藏帖子列表中的广告
        loadCss('#thread_list > div{display: none}')
        // 隐藏右侧侧广告
        loadCss('#aside-ad{display: none}')
        // 隐藏左侧广告
        loadCss('body > div:has( > .label_text){display: none}')
        // 隐藏评论中的广告
        loadCss('#j_p_postlist > div[data-field="{}"]{display: none}')
      }

    })
  }
  else if(location.href.match('://map.baidu.com/')) {
    window.addEventListener('load',function(){
      {
        loadCss('#message-panel.message-panel-open{display: none}')
      }

    })
  }
}
