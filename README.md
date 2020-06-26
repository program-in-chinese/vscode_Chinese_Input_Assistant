[![installs](https://vsmarketplacebadge.apphb.com/installs/CodeInChinese.ChineseInputAssistant.svg?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=CodeInChinese.ChineseInputAssistant)
[![version](https://vsmarketplacebadge.apphb.com/version/CodeInChinese.ChineseInputAssistant.svg?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=CodeInChinese.ChineseInputAssistant)

# 中文代码快速补全

英文输入下，匹配本行外任意位置的中文标识符。支持多种中文输入方式如下。

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

## 版本说明

### 1.0.6

- 改进：[支持js模块中的中文属性](https://github.com/program-in-chinese/vscode_Chinese_Input_Assistant/issues/18)
- 重构：提取拼音数据到 npm 库

### 1.0.5

- 鸣谢： @YoungBoron 修正五笔错码，以及五笔输入法增加传统的四码上屏功能

### 1.0.4

- 五笔和双拼输入法处于 beta 状态，欢迎反馈！

### 1.0.3

- PHP 支持说明
- 修复标识符[识别 bug](https://github.com/program-in-chinese/vscode_Chinese_Input_Assistant/issues/8)

### 1.0.2

- 调整待选项显示：中文在前
- 改进多音字处理

### 1.0.1

“中文编程”知乎专栏文章：[中文代码快速补全 VS Code 插件尝鲜](https://zhuanlan.zhihu.com/p/138708196)

## 已知问题

暂无
