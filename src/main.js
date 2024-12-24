import aliyundrive from "./sites/aliyundrive";
import bilibili from "./sites/bilibili";
import gamersky from "./sites/gamersky";
import ithome from "./sites/ithome";
import juejin from "./sites/juejin";
import zhangxinxu from "./sites/zhangxinxu";
import zhihu from "./sites/zhihu";
import baidu from "./sites/baidu";

const href = location.href

// 不用if else防止跳转误判
// if(href.match('://www.aliyundrive.com/drive')) {
//   aliyundrive()
// }
// if(href.match('.baidu.com/')) {
//   baidu()
// }
if(href.match('.bilibili.com/')) {
  bilibili()
}
if(href.match('://wap.gamersky.com/news/')) {
  gamersky()
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
