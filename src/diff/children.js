const childrenResolver = require('./childrenResolver')

/**
 * children diff 算法
 * O(n) 复杂度对比两个 list
 */
module.exports = function childrenDiff (left, right, currentPatch, patch, idx) {
    let listDiff = reorder(left.children, right.children)
}

function reorder (left, right) {
    // 检测 right 里面是否都是无 key 节点
    let rightChildIdx = childrenResolver(right)
    let rightKeys = rightChildIdx.keysMap
    let rightFree = rightChildIdx.freeList

    // 如果说target树全是无 key 的节点，则没必要 reorder 了，完全重建就好了。。
    if (rightFree.length === right.length) {
        return {
            children : right,
            moves : null
        }
    }

    // 检测 left 里是否都是无 key 节点
    let leftChildIdx = childrenResolver(left)
    let leftKeys = leftChildIdx.keysMap
    let leftFree = leftChildIdx.freeList

    // 如果说old树里全都是无 key 节点的话
    // 则原来的那棵树没有利用价值，全部依据 target 树重建
    if (leftFree.length === left.length) {
        return {
            children : right,
            moves : null
        }
    }

    
}