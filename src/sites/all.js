import {getNodeIterator, wait} from "js-fragment";

export default function() {
  document.addEventListener('DOMContentLoaded',function(){
    {
      // 暗夜模式测试
      console.time()
      let nodeIterator = getNodeIterator(node => {
        return true
      })

      let currentNode
      // eslint-disable-next-line no-cond-assign
      while (currentNode = nodeIterator.nextNode()) {
        const color = getComputedStyle(currentNode, null).color
        const backgroundColor = getComputedStyle(currentNode, null).backgroundColor

        {
          let [r, g, b, a] = color.match(/\d+(\.\d+)?/g)
          if(a) {
            currentNode.style.color = `rgba(${255 - r}, ${255 - g}, ${255 - b}, ${1 - a})`
          }
          else {
            currentNode.style.color = `rgb(${255 - r}, ${255 - g}, ${255 - b})`
          }
        }

        {
          let [r, g, b, a] = backgroundColor.match(/\d+(\.\d+)?/g)
          if([r, g, b, a].toString().includes('0,0,0,')) {
            currentNode.style.backgroundColor = `rgba(0, 0, 0, 1)`
          }
          else if(a) {
            currentNode.style.backgroundColor = `rgba(${255 - r}, ${255 - g}, ${255 - b}, ${1 - a})`
          }
          else {
            currentNode.style.backgroundColor = `rgb(${255 - r}, ${255 - g}, ${255 - b})`
          }
        }

      }

      console.timeEnd()
    }

  })
}

