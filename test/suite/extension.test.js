const assert = require('assert');
const { before } = require('mocha');

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = require('vscode');
// const 补全实现 = require('../../补全实现') // TODO: 应直接引用模块
// 拷贝自"补全实现"
const 标识符模式 = /(-?\d*\.\d\w*)|([^\`\~\!\@\^\&\*\(\)\-\#\?\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s？。，、；：？…—·ˉˇ¨“”～〃｜《》〔〕（），]+)/g;
const 待测代码 = [
	"1+数?1",
	"1+数+1",
	"1+数-1",
	"1+数*1",
	"1+数/1",
	"1+数\\1",
	"1+数=1",
	"1+数`1",
	"1+数~1",
	"1+数!1",
	"1+数@1",
	"1+数#1",
	"1+数^1",
	"1+数&1",
	"1+数*1",
	"1+数(1",
	"1+数)1",
	"1+数<1",
	"1+数>1",
	"1+数:1",
	"1+数'1",
	"1+数:1",
	"1+数\"1",
]

suite('Extension Test Suite', () => {
	before(() => {
		vscode.window.showInformationMessage('Start all tests.');
	});

	test('标识符识别', () => {
		assert.deepEqual("量 - 1".match(标识符模式), ["量", "1"]);

		// https://github.com/program-in-chinese/vscode_Chinese_Input_Assistant/issues/8
		assert.deepEqual("量-1".match(标识符模式), ["量", "1"], "与-相连");
		for (代码 of 待测代码) {
			assert.deepEqual(代码.match(标识符模式), ["1", "数", "1"], 代码);
		}
		assert.deepEqual("1+数.1".match(标识符模式), ["1", "数", ".1"], "1+数.1");
		assert.deepEqual("数.方法".match(标识符模式), ["数", "方法"], "数.方法");

		assert.deepEqual("1+数_1".match(标识符模式), ["1", "数_1"], "1+数_1");

		assert.deepEqual("1+数$1".match(标识符模式), ["1", "数$1"], "1+数$1");
		assert.deepEqual("1+$数1".match(标识符模式), ["1", "$数1"], "1+$数1");
	});
});
