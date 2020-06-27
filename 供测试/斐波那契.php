<?php
//https://github.com/program-in-chinese/overview/blob/master/%E7%A4%BA%E4%BE%8B%E4%BB%A3%E7%A0%81/%E6%96%90%E6%B3%A2%E9%82%A3%E5%A5%91.php

function 生成数列() {
    $数列[1] = 1;
    for($索引 = 2;$索引 <= 16;$索引++)
    {
        $数列[$索引] = $数列[$索引-1] + $数列[$索引-2];
    }
    echo join(",",$数列);//将数组合并为一个字符串输出
}
生成数列()
?>
