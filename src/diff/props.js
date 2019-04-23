const _ = require('./../util')

module.exports = function propsDiff (left, right) {
    // 最终的 diff 结果
    const diff = {}

    // 先看左边有的，如果右边没有
    // 则说明是要删除的，这里我们赋值为 undefined
    // 然后 patch props diff 的时候只需要过滤掉 undefined 的值就好了
    for (let leftKey in left) {
        if (!right[leftKey]) {
            diff[leftKey] = void 0
            continue
        }

        // 左值右值全部拿出来
        let leftValue = left[leftKey]
        let rightValue = right[leftKey]

        // 全等的情况，则说明无需 patch，完全相同
        if (leftValue === rightValue) {
            continue
            // 如果左右都是对象
        } else if (_.isObject(leftValue) && _.isObject(rightValue)) {
            // 如果说左右的原型不一致
            // 则根本就是不同的构造函数的实例
            // 则 diff 结果直接为 rightValue
            if (_.getPrototype(leftValue) !== _.getPrototype(rightValue)) {
                diff[leftKey] = rightValue
            } else {
                // 否则则按照 property name 都为对象，diff 对象的形式来
                let objDiff = diffProps(leftValue, rightValue)
                // 如果 objDiff 不为空，则 diff 结果为 objDiff
                if (!_.isEmptyObject(objDiff)) {
                    diff[leftKey] = objDiff
                }
            }
            // 如果两者一个是基本类型值，一个是引用类型值
            // 或者两者都是基本类型值时，都按照 right 的来
        } else {
            diff[leftKey] = rightValue
        }
    }

    // 最后处理存在于 right 但是不存在于 left 的值
    for (let rightKey in right) {
        // 满足这个条件，则全部为新树需要新增的
        // 直接赋值到 diff 中
        if (!left[rightKey]) {
            diff[rightKey] = right[rightKey]
        }
    }

    // 最后 return diff 回去
    return diff
}