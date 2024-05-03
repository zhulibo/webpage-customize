// ==UserScript==
// @name         B站点击A键网页全屏，关闭adblock检测警告；游民星空手机新闻页去广告。
// @namespace    http://tampermonkey.net/
// @version      1.16
// @description  repository: https://github.com/zhulibo/webpage-customize
// @author       zhu
// @match        *://www.bilibili.com/*
// @match        *://wap.gamersky.com/news/*
// @icon         https://www.w3.org/2008/site/images/favicon.ico
// @grant        none
// @run-at       document-start
// @license      MIT
// ==/UserScript==

// js-fragment


/**
 * Load style by code or url
 *
 * @param css - The style code or url.
 */
function loadStyle(css) {
    if (css.indexOf('http') === 0) {
        const link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = css;
        document.head.appendChild(link);
    }
    else {
        const style = document.createElement('style');
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);
    }
}

/**
 * Throttle a function.
 *
 * @param {Function} fn The function to throttle.
 * @param {number} [delay=200] The number of milliseconds to delay.
 * @param {boolean} [immediate=true] Invoke immediately.
 * @returns {Function} The new throttled function.
 * @returns {Function.cancel} Cancel throttle.
 */
function throttle(fn, delay = 200, immediate = true) {
    let lastCallTime = null;
    // 追加fn调用的定时器
    let addedCallTimeout = null;
    const _throttle = function (...args) {
        const now = Date.now();
        // 立即执行
        if (immediate) {
            if (!lastCallTime) {
                fn.apply(this, args);
                lastCallTime = now;
            }
            else if (now - lastCallTime >= delay) {
                fn.apply(this, args);
                lastCallTime = now;
            }
        }
        // 非立即执行
        else {
            if (!lastCallTime) {
                lastCallTime = now;
                // 用定时器追加一次fn调用，防止未达到最小时间间隔fn未被调起
                addedCallTimeout = setTimeout(() => {
                    fn.apply(this, args);
                    lastCallTime = Date.now();
                }, delay);
            }
            else if (now - lastCallTime >= delay) {
                fn.apply(this, args);
                lastCallTime = now;
                // 达到最小时间间隔fn调用成功，则清除追加的fn调用
                if (addedCallTimeout) {
                    clearTimeout(addedCallTimeout);
                }
            }
        }
    };
    // 取消节流
    _throttle.cancel = () => {
        if (addedCallTimeout)
            clearTimeout(addedCallTimeout);
        lastCallTime = null;
    };
    return _throttle;
}

// 哔哩哔哩
function bilibili () {
  if(location.href.match('://www.bilibili.com/')){
    document.addEventListener('DOMContentLoaded',function(){
      {
        // 关闭检测adblock警告
        loadStyle('.adblock-tips{max-height: 0}');
        console.log('关闭检测adblock警告');
      }
      {
        // 关闭检测adblock警告
        loadStyle(
          '.container .recommended-swipe{' +
          'display: none !important;' +
          '--cover-radio: 40% !important;' +
          'position: inherit;' +
          'overflow: initial;' +
          'grid-column: initial;' +
          'grid-column: initial;' +
          'grid-row: initial;' +
          '}' +
          '.container> div{' +
          'margin-top: 0px !important;' +
          '}' +
          '.container .feed-card{' +
          'display: block !important;' +
          '}'
        );
        console.log('关闭检测adblock警告');
      }
      {
        // 监听键盘a键，切换网页全屏
        document.addEventListener('keydown',(e)=>{
          // 排除文字输入状态
          if(e.target.tagName === 'INPUT' || e.target.tagName=== 'TEXTAREA'){
            return
          }
          if(e.keyCode === 65){
            document.querySelector('.bpx-player-ctrl-web').click();
          }
        });
      }

    });
  }
}

// 游民星空
function gamersky () {

  // 新闻列表页
  if(location.href.match(/:\/\/wap.gamersky.com\/news\/$/)){
    document.addEventListener('DOMContentLoaded',function(){
      {
        // 去除一些页面元素
        let items = [
          '.ymw-header2019', // 顶部下载App
        ];
        for (let i = 0; i < items.length; i++) {
          let node = document.querySelectorAll(items[i]);
          if(node && node.length > 0) {
            console.log('已触发 ' + items[i]);
            for (let i = 0; i < node.length; i++) {
              node[i].remove();
            }
          }
        }
      }

      {
        // 触底自动加载更多
        let handle = throttle(loadData, 100);
        window.addEventListener('scroll', handle);
        function loadData() {
          let clientHeight = document.documentElement.clientHeight;
          let scrollHeight = document.documentElement.scrollHeight;
          let scrollTop = document.documentElement.scrollTop;
          if (scrollTop + clientHeight >= scrollHeight - 100) {
            let node = document.querySelector('.ymw-more');
            let event = new Event('touchend');
            console.log('已触发 ' + '.ymw-more');
            if(node) node.dispatchEvent(event);
          }
        }
      }

    });
  }

  // 新闻详情页
  if(location.href.match(/:\/\/wap.gamersky.com\/news\/.+$/)) {
    document.addEventListener('DOMContentLoaded',function() {
      {
        // 新闻页去除一些页面元素
        let items = [
          '.ymwBootDownload', // 顶部顶部下载App
          '.gsTgWapConBdshareTopBox', // 打开游民APP，查看更多精彩内容
          '.ymw-rel-list', // app精彩推荐
          '.ymw-hot-h5-game', // 热门h5手游
        ];
        for (let i = 0; i < items.length; i++) {
          let node = document.querySelectorAll(items[i]);
          if (node && node.length > 0) {
            console.log('已触发 ' + items[i]);
            for (let i = 0; i < node.length; i++) {
              node[i].remove();
            }
          }
        }
      }

      {
        // 修改内容上边距
        let node = document.querySelector('.ymwContxt');
        if (node) {
          console.log('已触发 ' + '.ymwContxt');
          node.style.paddingTop = '.4rem';
        }
      }

      {
        // 文章自动展开
        let node = document.querySelector('#gsAreaContextOpen');
        if (node) {
          console.log('已触发 ' + '#gsAreaContextOpen');
          node.click();
        }
      }

      {
        // 防止查找.ymw-rel-mgame报错
        const element = document.createElement('div');
        element.className = 'ymw-rel-mgame';
        document.body.append(element);
      }

      {
        // 去除打开App阅读体验更佳，攻略、资讯实时更新
        let node = document.querySelector('.ymw-footer');
        if (node) {
          console.log('已触发 ' + '.ymw-footer');
          node.remove();
        }
      }

    });

    window.addEventListener('load',function(){
      {
        // 去除打开游民APP，查看xx条精彩评论
        let node = document.querySelector('#SOHUCS > a');
        if (node) {
          console.log('已触发 ' + '#SOHUCS > a');
          node.remove();
        }
      }

      {
        // 去除评论上方的广告
        let node = document.querySelector('#gsTgWapConBdshareTop + div');
        if (node) {
          console.log('已触发 ' + '#gsTgWapConBdshareTop + div');
          node.remove();
        }
      }

    });

  }

}

const href = location.href;

// 不用if else防止跳转误判
// if(href.match('://www.aliyundrive.com/drive')) {
//   aliyundrive()
// }
// if(href.match('.baidu.com/')) {
//   baidu()
// }
if(href.match('://www.bilibili.com/')) {
  bilibili();
}
if(href.match('://wap.gamersky.com/news/')) {
  gamersky();
}
// if(href.match('.ithome.com/')) {
//   ithome()
// }
// if(href.match('.juejin.cn/')) {
//   juejin()
// }
// if(href.match('://www.zhangxinxu.com/')) {
//   zhangxinxu()
// }
// if(href.match('.zhihu.com/')) {
//   zhihu()
// }
