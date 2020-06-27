// 使用 import 语法需要 `babel` 或者 `-r esm`
import lib_esm from './lib_esm'
var lib_node = require('./lib_node')
var 中文变量 = 1

// 输入 lib_esm.zw
// 输入 lib_node.zw
// 输入 zw

console.log(lib_node.加法(1)(2) == lib_esm.加法(1)(2))
