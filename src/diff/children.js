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

    // 新的子节点列表
    let newChildList = []
    
    // free 节点的起始 idx
    // 用于左树中的节点没有 key 的时候
    // 向 newChildList 中按顺序添加右树中的 free 节点
    let freeIdx = 0
    
    // free 节点的总个数
    let freeCount = rightFree.length
    
    // 删除的 items 的个数
    let deletedItems = 0

    for (let i = 0; i < left.length; i ++) {
        // 把左树中当前循环的 item 索引取出来
        let leftItem = left[i]
        let itemIdx

        // 如果说这个节点，是一个有 key 的节点
        if (leftItem.key) {
            // 如果说在右树中，也含有相同的 key
            // 则这个节点，是需要的
            // 则从右树中，把这个节点的引用拿到
            // push 到新的子节点列表中
            if (rightKeys.hasOwnProperty(leftItem.key)) {
                itemIdx = rightKeys[leftItem.key]
                newChildList.push(right[itemIdx])
            } else {
                // 如果没有在右树中，则这个节点是需要丢弃的节点
                // 我们首先让 deletedItems 自增
                // 然后向 newChildList 中 push null
                deletedItems ++
                newChildList.push(null)
            }
        } else {
            // 如果说没有 key 的话，则向 newChildList 中 push 的是 free 节点
            // 如果说当前右树中的 free 节点没有超过右树中的 free 节点的总数
            // 则按顺序往里面放
            if (freeIdx < freeCount) {
                itemIdx = rightFree[freeIdx ++]
                newChildList.push(right[itemIdx])
            } else {
                // 如果说右树中的 free 节点已经全部填放完毕
                // 则不会继续向里面继续放节点了
                // 对左树里面的这次循环的 child
                // 做删除处理
                deletedItems ++
                newChildList.push(null)
            }
        }
    }

    // 记录下当前的剩下的 freeIdx 的位置
    // 如果已经全部填充进 newChildList 了，则赋值为 right.length
    // 如果没有，则赋值为剩下的 free item 的第一个节点的索引
    let lastFreeIdx = freeIdx < freeCount
        ? rightFree[freeIdx]
        : right.length


    // 遍历右树
    for (let i = 0; i < right.length; i ++) {
        var newItem = right[i]

        // 如果说右树中的这个节点有 key, 且不在左树中存在同名 key
        // 则我们将其 push 到 newChildList 中
        if (newItem.key) {
            if (!leftKeys.hasOwnProperty(newItem.key)) {
                newChildList.push(newItem)
            }
        } else {
            // 在之前循环中，所有没用到的 free item
            // 全部都 push 进来
            // 现在在 newChildList 中存在的节点分别为：
            //     1. 左树中，与右树中有同名 key 的节点
            //     2. 右树中的 free item (左树中遍历无 key 节点时，填充的右树的 free item)
            //     3. 右树中的有 key 节点，且在左树中没有同 key 节点
            //     4. 右树中的其他 free item(保证 newChildList 中的 free item 个数，一定和右树相同)
            if (i >= lastFreeIdx) {
                newChildList.push(newItem)
            }
        }
    }
}