const vscode = require('vscode');
const bopomofo = require('./bopomofo')
const 五笔 = require('./五笔输入法')
var 提示文本 = ["中文测试","文本","数据","中英结合abdc"];
const wordPattern = /(-?\d*\.\d\w*)|([^\`\~\!\@\^\&\*\(\)\-\#\?\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s？。，、；：？…—·ˉˇ¨“”～〃｜《》〔〕（），]+)/g;

function provideCompletionItems(document, position, token, context) {

    var 总行数 =  document.lineCount
    var 当前行 =  position.line;
    var 代码内容 = "";
    for (var i = 0; i < 总行数; i++){
        if(i!=当前行)
        代码内容 += document.lineAt(i).text+"\n";
    }
        var 提示方式=vscode.workspace.getConfiguration('中文代码快速补全').get("提示方式")
       
    提示文本=  去重(代码内容.match(wordPattern)) ;
        return 提示文本.map(文本 => {
        if(["五笔98全码", "五笔98四码"].includes(提示方式)){
            var 拼音 = 五笔.五笔(文本, 提示方式)  
        }else{
            var 拼音 = bopomofo.pinyin(文本, 2, false, true, '')     
            if(提示方式!="全拼") 拼音 = bopomofo.双拼转换(拼音,提示方式)
        }
                var item=new vscode.CompletionItem(                   
                    拼音,
                    vscode.CompletionItemKind.Text)
                item.sortText=拼音
                item.filterText=拼音
                item.label=文本+'\t'+拼音
                item.insertText=文本
                return item;

        })

}
function 包含中文(str) {
    if (/.*[\u4e00-\u9fa5]+.*$/.test(str)) return true;
    return false;
}
/**
 * 光标选中当前自动补全item时触发动作，一般情况下无需处理
 * @param {*} item 
 * @param {*} token 
 */
function resolveCompletionItem(item, token) {
    return null;
}

function 去重 (arr) {
    var ret=Array.from(new Set(arr))

    for (var i = 0; i < ret.length; i++) {
        　　if ((!包含中文(ret[i]))||ret[i].length>20) {
            ret.splice(i, 1);
        　　　　i--; 
        　　}
        }

    return ret;
  }

module.exports = function(context) {
    // 注册代码建议提示，只有当按下“.”时才触发
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider({ scheme: 'file', language: '*' }, {
        provideCompletionItems,
        resolveCompletionItem
    }, '.'));
};

