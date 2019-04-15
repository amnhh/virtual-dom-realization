module.exports = h

const VNode = require('./vnode')

/**
 * h 函数
 */
function h (tagName, properties = {}, children = []) {
    // 两个 properties 的保留字段
    // 其他不做任何操作
    // 只为说明这个函数是为了创建 VNode 实例的语法糖
    // 直接使用 VNode 来构造实例也没任何问题
    let key = properties.key || void 0

    return new VNode(tagName, properties, children, key)
}