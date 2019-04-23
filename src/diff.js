const VPatch = require('./patch')
const propsDiff = require('./diff/props')
const childrenDiff = require('./diff/children')
const _ = require('./util')

/**
 * diff 函数
 */
function diff (left, right) {
    const patch = {}
    diffExecute(left, right, 0, patch)
    return patch
}

/**
 * 真实的 diff 函数
 * @param left
 * @param right
 * @param idx
 * @param patch
 */
function diffExecute (left, right, idx, patch) {
    let currentPatchs = []

    // 左右引用相同，则说明完全不需要 diff
    if (left === right) {
        return
    }

    // 如果 target 为 null
    if (right == null) {
        currentPatchs.push(VPatch.REMOVE, left, right)
        // 连个都是 text node, 则 patch TEXT
    } else if (_.isTextNode(left) && _.isTextNode(right)) {
        currentPatchs.push(VPatch.TEXT, left, right)
        // 左右都是 VNode，且 key，tagName 都相同，才会进入到 props diff、children diff 的阶段
        // 这个阶段，其实也是diff、patch过程最复杂的阶段，但是是性能最高的阶段
        // 其他的基本都要重建节点，而这个阶段是尽可能的使用已有的节点，尽可能的减少重建
    } else if (
        (_.isVNode(left) && _.isVNode(right)) &&
        (left.key === right.key  && left.tagName === right.tagName)
    ) {
        // props diff
        let propsDiffResult = propsDiff(left.properties, right.properties)
        if (_.isEmptyObject(propsDiffResult)) {
            currentPatchs.push(VPatch.PROPS, left, propsDiffResult)
        }
        // children diff
    } else {
        // 否则完全重建 + 替换 patch replace
        currentPatchs.push(VPatch.REPLACE, left, right)
    }

    if (currentPatchs.length) {
        patch[idx] = currentPatchs
    }
}
