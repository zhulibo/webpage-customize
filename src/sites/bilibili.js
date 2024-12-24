import {loadStyle} from "js-fragment";

// 哔哩哔哩
export default function () {
  function fn1() {
    {
      // 隐藏检测adblock警告
      loadStyle('.adblock-tips{max-height: 0}')
    }

    {
      // 首页样式调整
      loadStyle(
        '.container .recommended-swipe{' +
        'display: none !important;' +
        '}' +
        '.container> div{' +
        'margin-top: 0px !important;' +
        '}'
      )
    }
  }

  function fn2() {
    {
      // 监听键盘a键，切换网页全屏
      document.addEventListener('keydown', (e) => {
        // 排除文字输入状态
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
          return
        }
        if (e.keyCode === 65) {
          document.querySelector('.bpx-player-ctrl-web').click()
        }
      })
    }
  }

  if (location.href.match('://www.bilibili.com/')){
    document.addEventListener('DOMContentLoaded',function(){
      fn1();
    })

    // 未监听到DOMContentLoaded降级处理
    window.addEventListener('load',function(){
      fn1();
      fn2();
    })
  }

  // 禁止直播页面p2p上传
  if (location.href.match('://live.bilibili.com/')){
    delete window.RTCPeerConnection;
    delete window.mozRTCPeerConnection;
    delete window.webkitRTCPeerConnection;
  }
}
