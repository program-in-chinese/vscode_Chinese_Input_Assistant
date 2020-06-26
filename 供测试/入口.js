// https://github.com/program-in-chinese/npm-chinese-dynasties/blob/master/%E5%85%A5%E5%8F%A3.js
const 夏朝 = 朝代("夏", -2070, -1600)
const 商朝 = 朝代("商", -1600, -1046)
const 西周 = 朝代("西周", -1046, -771)
const 东周 = 朝代("东周", -770, -256)
const 春秋时代 = 朝代("春秋时代", -770, -476)
const 战国时代 = 朝代("战国时代", -475, -221)
const 秦朝 = 朝代("秦", -221, -206)
const 西汉 = 朝代("西汉", -206, 25)
const 东汉 = 朝代("东汉", 25, 220)
const 魏国 = 朝代("魏", 220, 265)
const 蜀国 = 朝代("蜀", 221, 263)
const 吴国 = 朝代("吴", 222, 280)
const 西晋 = 朝代("西晋", 265, 317)
const 东晋 = 朝代("东晋", 317, 420)
const 十六国 = 朝代("十六国", 304, 439)
const 宋朝 = 朝代("宋", 420, 479)
const 齐朝 = 朝代("齐", 479, 502)
const 梁朝 = 朝代("梁", 502, 557)
const 陈朝 = 朝代("陈", 557, 589)
const 北魏 = 朝代("北魏", 386, 534)
const 东魏 = 朝代("东魏", 534, 550)
const 北齐 = 朝代("北齐", 550, 577)
const 西魏 = 朝代("西魏", 535, 556)
const 北周 = 朝代("北周", 557, 581)
const 隋朝 = 朝代("隋", 581, 618)
const 唐朝 = 朝代("唐", 618, 907)
const 后梁 = 朝代("后梁", 907, 923)
const 后唐 = 朝代("后唐", 923, 936)
const 后晋 = 朝代("后晋", 936, 947)
const 后汉 = 朝代("后汉", 947, 950)
const 后周 = 朝代("后周", 951, 960)
const 十国 = 朝代("十国", 902, 979)
const 北宋 = 朝代("北宋", 960, 1127)
const 南宋 = 朝代("南宋", 1127, 1279)
const 辽朝 = 朝代("辽", 907, 1125)
const 西夏 = 朝代("西夏", 1038, 1227)
const 金朝 = 朝代("金", 1115, 1234)
const 元朝 = 朝代("元", 1206, 1368)
const 明朝 = 朝代("明", 1368, 1644)
const 清朝 = 朝代("清", 1616, 1911)
const 中华民国 = 朝代("中华民国", 1912, 1949)
const 中华人民共和国 = 朝代("中华人民共和国", 1949)

const 原始数据 = Object.freeze([
    夏朝,
    商朝,
    {
        "周": [
            西周,
            东周,
            春秋时代,
            战国时代,
        ]
    },
    秦朝,
    {
        "汉": [
            西汉,
            东汉,
        ]
    },
    {
        "三国": [
            魏国,
            蜀国,
            吴国,
        ]
    },
    西晋,
    {
        "东晋十六国": [
            东晋,
            十六国,
        ]
    },
    {
        "南北朝": [
            {
                "南朝": [
                    宋朝,
                    齐朝,
                    梁朝,
                    陈朝,
                ]
            },
            {
                "北朝": [
                    北魏,
                    东魏,
                    北齐,
                    西魏,
                    北周
                ]
            }
        ]
    },
    隋朝,
    唐朝,
    {
        "五代十国": [
            后梁,
            后唐,
            后晋,
            后汉,
            后周,
            十国
        ]
    },
    {
        "宋": [
            北宋,
            南宋
        ]
    },
    辽朝,
    西夏,
    金朝,
    元朝,
    明朝,
    清朝,
    中华民国,
    中华人民共和国
])

function 朝代(名称, 起始年, 结束年) {
    return { 名: 名称, 起: 起始年, 止: 结束年 }
}

exports.夏朝 = 夏朝
exports.商朝 = 商朝
exports.西周 = 西周
exports.东周 = 东周
exports.春秋时代 = 春秋时代
exports.战国时代 = 战国时代
exports.秦朝 = 秦朝
exports.西汉 = 西汉
exports.东汉 = 东汉
exports.魏国 = 魏国
exports.蜀国 = 蜀国
exports.吴国 = 吴国
exports.西晋 = 西晋
exports.东晋 = 东晋
exports.十六国 = 十六国
exports.宋朝 = 宋朝
exports.齐朝 = 齐朝
exports.梁朝 = 梁朝
exports.陈朝 = 陈朝
exports.北魏 = 北魏
exports.东魏 = 东魏
exports.北齐 = 北齐
exports.西魏 = 西魏
exports.北周 = 北周
exports.隋朝 = 隋朝
exports.唐朝 = 唐朝
exports.后梁 = 后梁
exports.后唐 = 后唐
exports.后晋 = 后晋
exports.后汉 = 后汉
exports.后周 = 后周
exports.十国 = 十国
exports.北宋 = 北宋
exports.南宋 = 南宋
exports.辽朝 = 辽朝
exports.西夏 = 西夏
exports.金朝 = 金朝
exports.元朝 = 元朝
exports.明朝 = 明朝
exports.清朝 = 清朝
exports.中华民国 = 中华民国
exports.中华人民共和国 = 中华人民共和国

exports.原始数据 = function () {
    return 原始数据
}

/* 列出所有朝代信息, 来源: 新华字典第 11 版附录"我国历代纪元简表" */
exports.历代 = function () {
    return 遍历(都有, true)
}

function 都有(代, 占位) {
    return true;
}

function 名称匹配(代, 名称) {
    return 代.名.includes(名称);
}

function 所在范围(代, 年份) {
    return 代.起 <= 年份 && (!代.止 || 代.止 >= 年份);
}

exports.查询 = function (名称) {
    return 遍历(名称匹配, 名称);
}

exports.哪代 = function (年份) {
    return 遍历(所在范围, 年份);
}

function 遍历(条件, 值) {
    if (!值) {
        return []
    }
    var 结果 = []
    for (代 of 原始数据) {
        if (代.名 && 条件(代, 值)) {
            结果.push(代)
        } else if (!代.名) {
            for (时期 in 代) {
                for (时期内代 of 代[时期]) {
                    if (时期内代.名) {
                        if (条件(时期内代, 值)) {
                            结果.push(时期内代)
                        }
                    } else {
                        // console.log(时期内代)
                        for (子时期 in 时期内代) {
                            for (子时期内代 of 时期内代[子时期]) {
                                if (子时期内代.名 && 条件(子时期内代, 值)) {
                                    结果.push(子时期内代)
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return 结果
}
