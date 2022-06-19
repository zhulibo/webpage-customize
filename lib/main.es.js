function throttle(fn, delay = 200, immediate = false) {
  let canRun = true;
  let count = 0;
  return function() {
    count++;
    if (immediate && count === 1) {
      fn.apply(this, arguments);
    }
    if (canRun) {
      canRun = false;
      setTimeout(() => {
        (count > 1 || !immediate) && fn.apply(this, arguments);
        canRun = true;
      }, delay);
    }
  };
}
const url = location.href;
function getNodeIterator(filterNode) {
  return document.createNodeIterator(document.body, NodeFilter.SHOW_ELEMENT, {
    acceptNode(node) {
      return filterNode(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });
}
document.addEventListener("DOMContentLoaded", function() {
  if (url.match("://www.zhangxinxu.com/")) {
    {
      let nodeIterator = getNodeIterator(function(node) {
        return node.nodeName.match(/^[a-zA-Z]{4}-[a-zA-Z]{2}$/);
      });
      let currentNode;
      while (currentNode = nodeIterator.nextNode()) {
        currentNode.remove();
      }
    }
    {
      let nodeIterator = getNodeIterator(function(node) {
        return typeof node.className === "string" && node.className.match(/^col-left-[a-zA-Z]{4}$/);
      });
      let currentNode;
      while (currentNode = nodeIterator.nextNode()) {
        currentNode.remove();
      }
    }
  } else if (url.match("://wap.gamersky.com/news/")) {
    {
      let items = [
        "#gsTgWapTop",
        ".ymw-header2018",
        ".ymw-header2019",
        ".ymw-header2021",
        ".gsTgWapConBdshareTopBox",
        ".gameCard",
        ".ymw-rel-list",
        ".ymw-hot-h5-game",
        ".ymw-footer"
      ];
      for (let i = 0; i < items.length; i++) {
        let node = document.querySelectorAll(items[i]);
        if (node && node.length > 0) {
          for (let i2 = 0; i2 < node.length; i2++) {
            node[i2].remove();
          }
        }
      }
    }
    {
      let node = document.querySelector("#gsAreaContextOpen");
      if (node)
        node.click();
    }
    {
      let node = document.querySelector(".ymwContxt");
      if (node)
        node.style.paddingTop = ".4rem";
    }
  } else if (url.match("://m.ithome.com/")) {
    {
      let items = [
        ".fixed-btn",
        ".open-app",
        ".hot-app"
      ];
      for (let i = 0; i < items.length; i++) {
        let node = document.querySelectorAll(items[i]);
        if (node && node.length > 0) {
          for (let i2 = 0; i2 < node.length; i2++) {
            node[i2].remove();
          }
        }
      }
    }
    {
      let removeAD2 = function() {
        let node = document.querySelectorAll(".tip-gray");
        if (node && node.length > 0) {
          for (let i = 0; i < node.length; i++) {
            node[i].parentNode.parentNode.parentNode.parentNode.remove();
          }
        }
      }, findNewAd2 = function() {
        let list = document.querySelectorAll(".content>.placeholder");
        if (list.length > length) {
          removeAD2();
          length = document.querySelectorAll(".content>.placeholder").length;
        }
      };
      var removeAD = removeAD2, findNewAd = findNewAd2;
      removeAD2();
      let handle = throttle(findNewAd2);
      let length = 0;
      window.addEventListener("scroll", handle);
    }
  }
});
window.addEventListener("load", function() {
  if (url.match("://wap.gamersky.com/news/")) {
    let node = document.querySelector("#SOHUCS > a");
    if (node)
      node.remove();
  } else if (url.match("://www.zhihu.com/")) {
    let node = document.querySelector(".PageHeader");
    if (node)
      node.style.display = "none";
  } else if (url.match("://m.ithome.com/")) {
    {
      let node = document.querySelector(".open-app-banner");
      if (node)
        node.remove();
    }
  }
});
