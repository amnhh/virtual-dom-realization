/**
 * VPatch 构造函数
 * @constructor
 */

function VPatch () {}

/**
 * VPatch 的 type 定义
 * @type {number}
 */

// 文字替换
VPatch.TEXT = 1
// 节点替换
VPatch.REPLACE = 2
// props 修改
VPatch.PROPS = 3
// 改顺序
VPatch.ORDER = 4
// 插入
VPatch.INSERT = 5
// 删除
VPatch.REMOVE = 7

VPatch.patch = function () {

}

module.exports = VPatch