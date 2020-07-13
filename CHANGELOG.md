## 各版本更新说明

### 1.1.1

新功能：中文 snippet [试添加](https://github.com/program-in-chinese/vscode_Chinese_Input_Assistant/pull/24)。

### 1.1.0

改进：[获得vsc本身的提示并转为拼音](https://github.com/program-in-chinese/vscode_Chinese_Input_Assistant/pull/20)

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

## [Unreleased]

- 添加了对所有文本编辑的支持并匹配本行外任意位置的中文
- 添加了词条描述避免被超长的拼音盖住后面的汉字内容 比如 汪汪汪汪汪汪汪汪黑汪汪汪 妙妙妙喵喵喵喵
- 屏蔽掉了那些非常非常长的文本因为这很可能不是你想输入的内 而不巧这段拼音很长涵盖了几乎所有的英文字母 然后随便按几个键都会提示出上面的内容就让人很闹心
- 删除了英文代码的重复提示项