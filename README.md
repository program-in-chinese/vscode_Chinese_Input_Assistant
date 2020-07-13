[![installs](https://vsmarketplacebadge.apphb.com/installs/CodeInChinese.ChineseInputAssistant.svg?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=CodeInChinese.ChineseInputAssistant)
[![version](https://vsmarketplacebadge.apphb.com/version/CodeInChinese.ChineseInputAssistant.svg?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=CodeInChinese.ChineseInputAssistant)

# 中文代码快速补全

【1.1.1 更新】试添加中文 snippets：2 个 Python 片段，1 个 JavaScript。如有相关建议如使用问题、希望添加的片段，欢迎[提 issue](https://github.com/program-in-chinese/vscode_Chinese_Input_Assistant/issues)。支持中、英、拼音三种触发方式，下面是拼音演示（其他方式与瑕疵详见[此 PR](https://github.com/program-in-chinese/vscode_Chinese_Input_Assistant/pull/24)）：

![](截图/演示_snippet_拼音.png)

## 功能简介

英文输入下，匹配中文标识符。多谢 @lsby 实现了不限于当前文件内标识符的补全，如下面导入库的方法补全：

![演示](截图/演示_库.png)

支持多种中文输入方式如下。

***注：全拼之外，双拼和五笔为 beta。多谢 @YoungBoron 添加五笔四码功能！***

![演示](截图/输入法选项.png)

五笔四码演示：

![演示](截图/输入法_五笔四码.png)

支持各种编程语言，全拼下已实测过的：

- C#

![演示](截图/演示_c.png)

- Haskell

![演示](截图/演示_Haskell.png)

- Java

![演示](截图/演示_Java.png)

- JavaScript

![演示](截图/演示_JS.png)

- Kotlin

![演示](截图/演示_Kotlin.png)

- PHP

对 $ 开头的变量名，直接输入拼音即有提示：

![演示](截图/演示_PHP.png)

- Python

![演示](截图/演示_Python.png)

- Swift

![演示](截图/演示_Swift.png)

- TypeScript

![演示](截图/演示_TS.png)

同样支持中英混合命名：

![演示](截图/演示_中英混合.png)

## [版本更新说明](CHANGELOG.md)

## 已知问题

暂无
