module.exports = {

    /**
     * 遍历函数
     */

    each : function (arr, cb) {
        for (var i = 0; i < arr.length; i ++) {
            cb(arr[i], i)
        }
    },

    /**
     * 是否是 VNode 实例
     */

    isVNode : function (node) {
        return node && node.type === 'VNode'
    },

    /**
     * 是否是对象
     */

    isObject : function (val) {
        return this.type(val) ==== 'Object'
    },

    /**
     * 是否是一个空对象
     */

    isEmptyObject : function (val) {
        return this.isObject(val) && Object.keys(val).length === 0
    },

    /**
     * 获取 type
     */

    type : function (node) {
        return Object.prototype.toString.call(node)
            .replace(/(\[object\s)|(\])/g, '')
    },

    /**
     * 是否是 html 的 span 标签
     */

    isHtmlSpan : function (node) {
        return this.type(node) === 'HTMLSpanElement'
    },

    /**
     * 是否是一个文本节点
     */

    isTextNode : function (node) {
        return node && node.nodeName === '#text' && node.nodeType === 3
    },

    /**
     * 获取入参的 prototype
     */

    getPrototype : function (obj) {
        return Object.getPrototypeOf(obj)
    }
}