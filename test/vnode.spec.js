const test = require('ava')
const VNode = require('./../src/vnode')
const _ = require('./../src/util')

test('VNode 函数应返回一个 VNode 实例', t => {
    t.plan(1)
    const node = new VNode('span')
    t.true(_.isVNode(node))
})

test('VNode 函数传入的参数，将会被保存在 VNode 实例上', t => {
    t.plan(4)
    let params = [
        // tag
        'span',
        // properties
        {
            id: 'amnhh'
        },
        // children
        [
            '1',
            '2'
        ],
        // key
        'anning',
    ]

    const node = new VNode(...params)

    t.is(node.tagName, params[0])
    t.is(node.properties, params[1])
    t.is(node.children, params[2])
    t.is(node.key, params[3])
})

test('VNode 的 count 属性会统计所有 children 下的 VNode 个数', t => {
    const node1 = new VNode('span', {id: 'span1'}, [], 'span1')
    const node2 = new VNode('span', {id: 'span2'}, [], 'span2')
    const node3 = new VNode('span', {id: 'span3'}, [], 'span3')
    const node4 = new VNode('span', {id: 'span4'}, [node3], 'span4')

    const node = new VNode(
        'div',
        {
            id : 'span'
        },
        [
            node1,
            node2,
            node4
        ],
        'span'
    )

    t.is(node.count, 4)
})