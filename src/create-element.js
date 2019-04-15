module.exports = createElement

const _ = require('./util')

function createElement (node, document) {
    // 创建一个这个 vnode 的顶层标签
    let rootEl = document.createElement(node.tagName)

    // 为元素添加 attributes
    let props = node.properties
    for (var i in props) {
        if (props[i] !== void 0) {
            rootEl.setAttribute(i, props[i])
        }
    }

    // 处理 childrens
    _.each(node.children, (child) => {
        if (_.isVNode(child)) {
            rootEl.append(createElement(child, document))
        } else {
            rootEl.append(document.createTextNode(child))
        }
    })

    // 把最终生成的 element 返回
    return rootEl
}