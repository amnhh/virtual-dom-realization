module.exports = VNode

const _ = require('./util')

/**
 * virtual node 构造函数
 */
function VNode (tagName, properties = {}, children = [], key) {
    // 五个入参全部挂到实例下
    this.tagName = tagName
    this.properties = properties
    this.children = children
    this.key = key

    // 计算所有子节点中，VNode 实例的个数
    let count = children.length

    _.each(this.children, (child, i) => {
        if (_.isVNode(child)) {
            count += child.count
        } else {
            this.children[i] = String(child)
        }
    })

    // 把这个个数挂载到实例下
    this.count = count
}


VNode.prototype = {
    type : 'VNode'
}