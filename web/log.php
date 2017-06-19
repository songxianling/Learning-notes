<?php
	$max = 5; //最大支持数
    $file = './log.txt';
    $num = file_get_contents($file);
    if($num<0){
        $num = 0;
    }else{
        $num = intval($num);
        $num ++;
        $num = $num >= $max ? 0 : $num;
    }
    file_put_contents($file, $num);
    echo $num;
?>