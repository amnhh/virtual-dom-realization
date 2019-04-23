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
            keysMap[child.key] = i
        } else {
            freeList.push(child)
        }
    }

    return {
        keysMap,
        freeList
    }
}