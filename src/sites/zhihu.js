// 知乎
import {addStyle} from "js-fragment";

export default function () {
  if (location.href.match('://link.zhihu.com/')) {
    document.addEventListener('DOMContentLoaded',function(){
      {
        // 解除跳转拦截
        let target = new URL(location.href).searchParams.get('target')
        console.log('已触发 ' + target)
        location.href = decodeURIComponent(target)
      }

    })
  }
  else if(location.href.match('://www.zhihu.com/')) {
    document.addEventListener('DOMContentLoaded',function(){
      {
        // 隐藏顶部banner
        addStyle('.Pc-Business-Card-PcTopFeedBanner{display:none}')
        // 文章详情页隐藏顶部标题
        addStyle('.PageHeader{display:none}')
      }

    })
  }
}
