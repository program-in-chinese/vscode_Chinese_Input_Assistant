const 拼音数据 = require('pinyin-data')

var pinyins = 拼音数据.带音调拼音
var polyphones = 拼音数据.多音字词表

/**
 * 将汉字句子转换拼音，支持声母带音调，数字音调，无音调三种格式
 * @param {Object} words 句子
 * @param {Object} toneType 拼音样式 0-声母带音调，1-数字音调在最后，2-无音调，默认值0
 * @param {Object} upper 是否大写,默认为假（小写）
 * @param {Object} cap 是否首字母大写,在upper为假时有效,默认为假（小写）
 * @param {Object} split 分割符号，默认一个空格
 * @return 拼音
 */
function pinyin(words, toneType, upper, cap, split) {
	if(!words){
		return "";
	}
	toneType = (toneType == undefined || toneType == null) ? toneType = 0 : toneType;
	upper = (upper == undefined || upper == null) ? upper = false : upper;
	cap = (cap == undefined || cap == null) ? cap = false : cap;
	split = (split == undefined || split == null) ? ' ' : split;
	var result = [];
	//0为不需要处理，1为单音字，2为已处理的多音字
	var types = [];
	var lastPolyphoneIndex = 0;
	for (var i = 0, len = words.length; i < len; ) {
		var _char = words.substr(i, 1);
		var unicode = _char.charCodeAt(0);
		//如果unicode在符号，英文，数字或其他语系，则直接返回
		if (unicode > 40869 || unicode < 19968) {
			result.push(_char);
			types.push(0);
		} else {//如果是支持的中文，则获取汉字的所有拼音
			var 拼音s = getPinyins(_char);
			if(拼音s.length == 1){//单音字
				var 拼音 = 拼音s[0];
				result.push(拼音);
				types.push(1);
			}else if(拼音s.length > 1){//多音字，需要进行特殊处理
				//
				var data = getPolyphoneWord(words, _char, i, lastPolyphoneIndex);
				if(data != null){
					for (var k = 0; k < data.words.length; k++) {
						result[i - data.offset + k] = data.words[k];
						types[i - data.offset + k] = 2;
					}
					//修正偏移，有可能当前字是词组中非第一个字
					i = i - data.offset + data.words.length - 1 ;
					//最后处理过的多音字位置，以防止一个多音字词组有多个多音字，例如患难与共，难和共都是多音字
					lastPolyphoneIndex = i;
				}else{//没有找到多音字的词组，默认使用第一个发音
					var 拼音 = 拼音s[0];
					result.push(拼音);
					types.push(1);
				}
			}else{//未发现
				result.push(_char);
				types.push(0);
			}
		}
		i++;
	}
	return handlePinyin(result, types, toneType, upper, cap, split);
}
/**
 * 进行拼音处理
 * @param {Object} result
 * @param {Object} types
 * @param {Object} toneType
 * @param {Object} upper
 * @param {Object} cap
 * @param {Object} split
 */
function handlePinyin(result, types, toneType, upper, cap, split){
	//aeiouü
	var vowelsz = "aeiouv";
	var toneVowelsz = "āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ";
	var 拼音s = "";
	for (var i = 0; i < result.length; i++) {
		var 拼音 = result[i];
		var type = types[i];
		var 拼音1 = '';
		if(type == 1 || type == 2){//如果是拼音或者多音字
			if(toneType == 1 || toneType == 2){//如需要数字声调或者无声调
				var tone = -1;//音调数字形式
				for (let indexz = 0; indexz < 拼音.length; indexz++) {
					var k = -1;
					var wz = 拼音[indexz];					
					//寻找在有声调声母中的位置
					if(wz!=null){
						if((k = toneVowelsz.indexOf(wz)) > -1){
							tone = (k % 4);
							//计算当前声母在无音调声母的位置
							var pos = parseInt(k / 4);
							拼音1+=vowelsz[pos];
						}else{
							//原样
							拼音1+=wz;
						}
					}
					
				}
				//如果是带音调数字形式，则将音调添加到末尾
				拼音1 = 拼音1 + (toneType == 1 ? tone + 1 : '');
			}else{
				拼音1 = 拼音;
			}
			if (upper) {
				拼音1 = 拼音1.toUpperCase();
			} else {
				拼音1 = cap ? 首字母大写(拼音1) : 拼音1;
			}
			拼音1 = split.length > 0 && 拼音s.length > 0 ? split + 拼音1 : 拼音1;
		}else{//如果不需要处理的非拼音
			拼音1 = 拼音;
		}
		拼音s += 拼音1;
	}
	return 拼音s;
}
/**
 * 获取多音字词，返回时返回替换起始位置和结束位置
 * @param {Object} words 句子 
 * @param {Object} current 当前字
 * @param {Object} pos 当前汉字的位置
 * @param {Object} type 拼音样式 0-声母带音调，1-音调在最后，2-无音调，默认值0
 */
function getPolyphoneWord(words, current, pos, lastPolyphoneIndex, type){
	var pinyinSeparator = ","; // 拼音分隔符
	var results = [];
	var maxMatchLen = 0;
	for(var w in polyphones){
		var len = w.length;
		var beginPos = pos - len;
		beginPos = Math.max(lastPolyphoneIndex, beginPos);
		var endPos = Math.min(pos + len, words.length);
		var temp = words.slice(beginPos, endPos);
		var index = -1;
		if((index = temp.indexOf(w)) > -1){
			if(len > maxMatchLen){
				maxMatchLen = len;
			}
			//当前汉字在多音字词组的偏移位置，用于修正词组的替换
			var offset = w.indexOf(current);
			var data = {words: polyphones[w].split(pinyinSeparator), offset: offset, length: len};
			results.push(data);
		}
	}
	if(results.length == 1){
		return results[0];
	}else if(results.length > 1){//如果存在多个匹配的多音字词组，以最大匹配项为最佳答案,例如词库中有'中国人'和'中国',最理想的答案应该是最大匹配
		for (var i = 0; i < results.length; i++) {
			if(results[i].length == maxMatchLen){
				return results[i];
			}
		}
	}
	return null;
}
/**
 * 获取一个汉字的所有拼音
 * @param {Object} hanzi 汉字
 * @param {Object} type 0-声母带音调，1-音调在最后，2-无音调，默认值0
 */
function getPinyins(hanzi){
	var pinyinSeparator = ","; // 拼音分隔符
	var 拼音s = pinyins[hanzi];
	var result = [];
	if(!拼音s){//如果不存在拼音
		return result;
	}
	var 拼音sArray = 拼音s.split(pinyinSeparator);
	return 拼音sArray;
}

/**
 * 单个汉字拼音，进行首字母大写
 * @param {Object} 拼音 单个汉字拼音
 */
function 首字母大写(拼音){
	if(拼音.length>0){
		var first = 拼音.substr(0, 1).toUpperCase();
		var spare = 拼音.substr(1, 拼音.length);
		return first + spare;
	}else{
		return 拼音;
	}
}
const 双拼方案={
	拼音加加双拼:{
		iang: 'h',	iong: 'y',	uang: 'h',	eng: 't',	uan: 'c',	uai: 'x',	ong: 'y',	ian: 'j',	ang: 'g',	iao: 'k',	ing: 'q',
		Ang: 'Ag',	Eng: 'Et',	ai: 's',	an: 'f',	ao: 'd',	ei: 'w',	en: 'r',	ia: 'b',	ie: 'm',	in: 'l',	iu: 'n',
		ou: 'p',	ue: 'x',	ua: 'b',	Ch: 'U',	ui: 'v',	un: 'z',	uo: 'o',	ve: 'x',	Ai: 'As',	Ei: 'Ew',	An: 'Af',
		Sh: 'I',	Ao: 'Ad',	Ou: 'Op',	En: 'Er',	Zh: 'V',	Er: 'Eq',	E: 'Ee',	A: 'Aa',	O: 'Oo',
	},
	小鹤双拼:{
		iong: 's',	iang: 'l',	uang: 'l',	iao: 'n',	ang: 'h',	eng: 'g',	ian: 'm',	ing: 'k',	ong: 's',	uai: 'k',
		uan: 'r',	Ch: 'I',	Sh: 'U',	Zh: 'V',   	ai: 'd',	an: 'j',	ao: 'c',	ei: 'w',	en: 'f',	ia: 'x',
		ie: 'p',	in: 'b',	iu: 'q',	ou: 'z',	ua: 'x',	ue: 't',	ui: 'v',	un: 'y',	uo: 'o',	ve: 't'
	},
	搜狗双拼:{
		uang: 'd',	iang: 'd',	iong: 's',	ang: 'h',	ong: 's',	ing: ';',	ian: 'm',	eng: 'g',	uan: 'r',
		iao: 'c',	uai: 'y',	Sh: 'U',	Zh: 'V',	an: 'j',	ao: 'k',	ei: 'z',	en: 'f',	Ch: 'I',
		ia: 'w',	in: 'n',	iu: 'q',	ie: 'x',	ou: 'b',	ua: 'w',	ue: 't',	ui: 'v',	un: 'p',
		uo: 'o',	ve: 't',	v: 'y',	ai: 'l',	Ang: 'Oh',	Eng: 'Og',	Ai: 'Ol',	An: 'Oj',	Ao: 'Ok',	Ei: 'Oz',
		En: 'Of',	Er: 'Or',	Ou: 'Ob',	A: 'Oa',	E: 'Oe',
	},
	微软双拼:{
		iong: 's',		iang: 'd',		uang: 'd',		ian: 'm',		eng: 'g',		ing: ';',		ang: 'h',
		iao: 'c',		ong: 's',		uai: 'y',		uan: 'r',		an: 'j',		ao: 'k',		ei: 'z',
		en: 'f',		ia: 'w',		ie: 'x',		Ch: 'I',		in: 'n',		iu: 'q',		ou: 'b',
		ua: 'w',		Sh: 'U',		Zh: 'V',		ai: 'l',		ue: 'tv',		ui: 'v',		un: 'p',
		uo: 'o',		ve: 'v',		e: 'e',		i: 'i',		u: 'u',		v: 'y',		o: 'o',
		Ang: 'Oh',	Eng: 'Og',	Ai: 'Ol',	An: 'Oj',	Ao: 'Ok',	Ei: 'Oz',
		En: 'Of',	Er: 'Or',	Ou: 'Ob',	A: 'Oa',	E: 'Oe',
	},
	自然码双拼:{
		iong: 's',		iang: 'd',		uang: 'd',		ian: 'm',		eng: 'g',		ing: 'y',		ang: 'h',		iao: 'c',
		ong: 's',		uai: 'y',		uan: 'r',		an: 'j',		ao: 'k',		ei: 'z',		en: 'f',
		ia: 'w',		ie: 'x',		Ch: 'I',		in: 'n',		iu: 'q',		ou: 'b',		ua: 'w',
		Sh: 'U',		Zh: 'V',		ai: 'l',		ue: 't',		ui: 'v',		un: 'p',		uo: 'o',		ve: 't',
	},
	紫光双拼:{
		iong: 'h',		iang: 'g',		uang: 'g',		ing: ';',		eng: 't',		ong: 'h',		ian: 'f',		ang: 's',
		uai: 'y',		iao: 'b',		uan: 'l',		Eng: 'Ot',		ai: 'p',		an: 'r',		ao: 'q',		ei: 'k',
		en: 'w',		ia: 'x',		ie: 'd',		in: 'y',		iu: 'j',		ou: 'z',		ua: 'x',		Ch: 'A',
		Sh: 'I',		ue: 'n',		ui: 'n',		un: 'm',		uo: 'o',		ve: 'n',		Ei: 'Ok',		En: 'Ow',
		Zh: 'U',		Er: 'Oj',		Ou: 'Oz',		E: 'Oe',		e: 'e',		o: 'o',		u: 'u',		v: 'v',		i: 'i',
	}
}


function 双拼转换(全拼,方案){
	方案=双拼方案[方案];
for(let 码 in 方案){
	全拼=全拼.replace(new RegExp(码,'g'),方案[码])
}
return 全拼
}

module.exports = {
	pinyin,双拼转换
}