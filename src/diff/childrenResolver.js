/**
 * 处理 children
 *
 * 有 key 的 child 归类到 keysMap 中
 * 没有 key 的 child 归类到 freeList 中
 * @param children
 */
module.exports = function childrenResolver (children) {
    let keysMap = {},
        freeList = []

    for (let i = 0; i < children.length; i ++) {
        let child = children[i]
        if (child.key) {
            // keysMap 里存储的是，这个 key 的元素，对应的节点在 children 中存储的位置
            keysMap[child.key] = i
        } else {
            // freeList 中存储的也是索引
            freeList.push(i)
        }
    }

    return {
        keysMap,
        freeList
    }
}