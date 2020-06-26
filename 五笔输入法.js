const 码表 = require('wubi-code-data')

function 五笔(文字, 提示方式) {
	if (!文字) return "";
	var 键码 = "";
	var 非汉字字符计数 = 0
	for (var i = 0, len = 文字.length; i < len; i++) {
		var 字 = 文字.substr(i, 1);
		var unicode = 字.charCodeAt(0);
		//如果unicode在符号，英文，数字或其他语系，则直接返回
		if (unicode > 40869 || unicode < 19968) {
			键码 += 字
			非汉字字符计数++
		} else if (提示方式 == "五笔98全码") {
			键码 += 首字母大写(码表.取码(字))
		} else if (提示方式 == "五笔98四码") {
			if (文字.length - 非汉字字符计数 == 1) {
				键码 += 码表.取码(字)
			} else if (文字.length - 非汉字字符计数 == 2) {
				键码 += 码表.取码(字).slice(0, 2)
			} else if (文字.length - 非汉字字符计数 == 3) {
				键码 += 码表.取码(字).slice(0, i - 非汉字字符计数 < 2 ? 1 : 2)
			} else if (文字.length - 非汉字字符计数 >= 4 && (i - 非汉字字符计数 < 3 || i + 1 - 非汉字字符计数 == 文字.length)) {
				键码 += 码表.取码(字).slice(0, 1)
			}
		}
	}
	return 键码;


}
function 首字母大写(拼音) {
	if (拼音.length > 0) {
		var first = 拼音.substr(0, 1).toUpperCase();
		var spare = 拼音.substr(1, 拼音.length);
		return first + spare;
	} else {
		return 拼音;
	}
}
// console.log(五笔98["五"])
// console.log(五笔("五笔"))
module.exports = {
	五笔
}