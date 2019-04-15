const test = require('ava')
const createElement = require('./../src/create-element')
const h = require('./../src/h')
const document = require('./Document')
const _ = require('./../src/util')

test('createElement 函数返回真实 dom', t => {
    t.plan(1)

    const tagName = 'span'
    const vnode = h(tagName)
    const node = createElement(vnode, document)

    t.true(_.isHtmlSpan(node))
})

test('createElement 函数应为生成 dom 创建 attribute', t => {
    const vnode = h(
        'span',
        {
            id : 'anning'
        }
    )
    const node = createElement(vnode, document)
    t.is(node.getAttribute('id'), 'anning')
})

test('createElement 函数不设置 value 值为 undefined 的属性', t => {
    const vnode = h(
        'span',
        {
            again : void 0
        }
    )
    const node = createElement(vnode, document)
    t.false(node.hasAttribute('again'))
})

test('createElement 函数检测到 children 元素为文本节点时，应创建文本节点', t => {
    const vnode = h(
        'span',
        {},
        [
            'again'
        ]
    )

    const node = createElement(vnode, document)
    t.true(_.isTextNode(node.childNodes[0]))
})

test('createElement 函数检测到 children 元素为 VNode 元素时，应调用为其调用 createElement 函数', t => {
    const sonVNode = h(
        'b',
        {},
        [
            'b'
        ]
    )
    const vnode = h(
        'span',
        {},
        [
            sonVNode
        ]
    )

    const node = createElement(vnode, document)
    const sonNode = createElement(sonVNode, document)

    t.deepEqual(node.childNodes[0], sonNode)
})