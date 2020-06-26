const vscode = require('vscode');
const bopomofo = require('./bopomofo')
const 五笔 = require('./五笔输入法')
const 提示方式 = vscode.workspace.getConfiguration('中文代码快速补全').get("提示方式")

function 包含中文(str) {
    return /.*[\u4e00-\u9fa5]+.*$/.test(str)
}
function 获得拼音(提示方式, 文本) {
    var 拼音 = null
    if (["五笔98全码", "五笔98四码"].includes(提示方式)) {
        拼音 = 五笔.五笔(文本, 提示方式)
    } else {
        拼音 = bopomofo.pinyin(文本, 2, false, true, '')
        if (提示方式 != "全拼") 拼音 = bopomofo.双拼转换(拼音, 提示方式)
    }
    return 拼音
}

var provideCompletionItems_上次调用参数 = null
async function provideCompletionItems(document, position, token, context) {
    // 防止无限递归
    var 本次调用参数 = JSON.stringify(arguments)
    if (本次调用参数 == provideCompletionItems_上次调用参数)
        return []
    provideCompletionItems_上次调用参数 = 本次调用参数

    // 获得提示字
    // https://code.visualstudio.com/api/references/commands
    // vscode.executeCompletionItemProvider 会调用 provideCompletionItems, 所以要防止无限递归
    var 系统解析出的关键字 = await vscode.commands.executeCommand('vscode.executeCompletionItemProvider', document.uri, position)
    console.log('系统解析出的关键字', 系统解析出的关键字)

    // 过滤掉不包含中文的,就是提示文本了
    // 另外它似乎会在引入文本内解析一次,所以包含中文的字段会重复,过滤\t来把重复的字段删掉
    var 提示文本 = 系统解析出的关键字.items.filter(a => 包含中文(a.label)).filter(a => a.label.indexOf('\t') == -1)
    console.log('提示文本', 提示文本)

    // 将标签转成拼音返回
    return 提示文本.map(a => {
        var r = Object.assign(a)
        r.label = a.label + '\t' + 获得拼音(提示方式, a.label)
        return r
    })
}

function resolveCompletionItem(item, token) {
    return null;
}

module.exports = function (context) {
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider({ scheme: 'file', language: '*' }, {
        provideCompletionItems,
        resolveCompletionItem
    }, '.'));
};

