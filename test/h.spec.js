const h = require('./../src/h')
const test = require('ava')

test('h 函数最终返回一个 VNode 实例', t => {
    t.plan(1)
    const node1 = h('span')
    t.is(node1.type, 'VNode')
})