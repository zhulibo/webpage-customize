import bilibili from "./sites/bilibili";
import gamersky from "./sites/gamersky";
import outlook from "./sites/outlook.js";

const href = location.href

// 不用if else防止跳转误判
if(href.match('.bilibili.com/')) {
  bilibili()
}
if(href.match('://wap.gamersky.com/news/')) {
  gamersky()
}
if(href.match('://outlook.live.com/')) {
  outlook()
}
