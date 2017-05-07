<?php
$prize_arr = array( 
    '0' => array('id' => 1, 'prize' => '一等奖', 'v' => 5), 
    '1' => array('id' => 2, 'prize' => '二等奖', 'v' => 5), 
    '2' => array('id' => 3, 'prize' => '三等奖', 'v' => 5), 
    '3' => array('id' => 4, 'prize' => '四等奖', 'v' => 5), 
    '4' => array('id' => 5, 'prize' => '五等奖', 'v' => 5), 
    '5' => array('id' => 6, 'prize' => '六等奖', 'v' => 5), 
    '6' => array('id' => 7, 'prize' => '七等奖', 'v' => 5), 
    '7' => array('id' => 8, 'prize' => '八等奖', 'v' => 5), 
    '8' => array('id' => 9, 'prize' => '九等奖', 'v' => 5), 
    '9' => array('id' => 10, 'prize' => '十等奖', 'v' => 5), 
    '10' => array('id' => 11, 'prize' => '十一等奖', 'v' => 25), 
    '11' => array('id' => 12, 'prize' => '十二等奖', 'v' => 25), 
);

foreach ($prize_arr as $k=>$v) { 
    $arr[$v['id']] = $v['v']; 
 
} 
 
$prize_id = getRand($arr); //根据概率获取奖项id  
foreach($prize_arr as $k=>$v){ //获取前端奖项位置 
    if($v['id'] == $prize_id){ 
     $prize_site = $k; 
     break; 
    } 
} 
$res = $prize_arr[$prize_id - 1]; //中奖项  
 
$data['prize_name'] = $res['prize']; 
$data['prize_site'] = $prize_site;//前端奖项从-1开始 
echo json_encode($data);
?>