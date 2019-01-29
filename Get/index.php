<?php
$action=isset($_GET["action"])?$_GET["action"]:"";
$siteid=isset($_GET["siteid"])?$_GET["siteid"]:0;
$ToKen=isset($_GET["ToKen"])?$_GET["ToKen"]:"";
$YMD=isset($_GET["YMD"])?$_GET["YMD"]:0;
define("siteid",$siteid);
define("YMD",$YMD);

//判断时间差
//
//读取
if($action=="day"){
//取每日读取信息
$pagebase=isset($_GET["pagebase"])?$_GET["pagebase"]:20;
$pageid=isset($_GET["pageid"])?$_GET["pageid"]:1;
//统计所有数量
$dbs = new MyDBs();
$Allcounts="0";
$Allcount="0";
$ipcount="0";
if($dbs){
$tablename="Site_".siteid;
$sql =<<<EOF
      SELECT * from $tablename where flag=0 and YMD=$YMD order by id desc LIMIT 1;
EOF;
$ret = $dbs->query($sql);
while($row = $ret->fetchArray(SQLITE3_ASSOC) ){
	$Allcounts=$row['allcounts'];
	$Allcount=$row['allcount'];
	$ipcounts=$row['ipcount'];
}

}

$db = new MyDB();
$backStr="id,siteid,counthour,countck,ip,country,city,isp,browserName,browserVersion,os,area,dpi,color,lang,referrer,location,addtime";
if($db){
$tablename="Day_".substr(YMD,-2);
$limits=$pageid<=1?$pagebase:($pagebase." OFFSET ".($pagebase*($pageid-1)));
$sql =<<<EOF
      SELECT * from $tablename where flag=0 order by id desc LIMIT $limits ;
EOF;
$ret = $db->query($sql);
while($row = $ret->fetchArray(SQLITE3_ASSOC) ){
	$backStr.="|".$row['id'].",";
	$backStr.=$row['siteid'].",";
	$backStr.=$row['counthour'].",";
	$backStr.=$row['countck'].",";
	$backStr.=escape($row['ip']).",";
	$backStr.=escape($row['country']).",";
	$backStr.=escape($row['city']).",";
	$backStr.=escape($row['isp']).",";
	$backStr.=escape($row['browserName']).",";
	$backStr.=escape($row['browserVersion']).",";
	$backStr.=escape($row['os']).",";
	$backStr.=escape($row['area']).",";
	$backStr.=escape($row['dpi']).",";
	$backStr.=escape($row['color']).",";
	$backStr.=escape($row['lang']).",";
	$backStr.=escape($row['referrer']).",";
	$backStr.=escape($row['location']).",";
	$backStr.=escape($row['addtime']);
}
}
echo "Date:".$YMD.";Allcounts:".$Allcounts.";Allcount:".$Allcount.";ipcounts:".$ipcounts.";pagebase:".$pagebase.";pageid:".$pageid.";Msg:".$backStr.";";
}
else{

$dbs = new MyDBs();
$backStr="Date,Allcounts,Allcount,ipcounts";
if($dbs){
$tablename="Site_".siteid;
$sql =<<<EOF
      SELECT * from $tablename where flag=0 and YMD>=$YMD and YMD>=(strftime('%Y%m%d', datetime('now','localtime'))-10000) order by id desc LIMIT 365;
EOF;
//
//循环
$ret = $dbs->query($sql);
while($row = $ret->fetchArray(SQLITE3_ASSOC) ){
	$backStr.="|".$row['YMD'].",";
	$backStr.=$row['allcounts'].",";
	$backStr.=$row['allcount'].",";
	$backStr.=$row['ipcount'];
}
}
echo $backStr;
}


class MyDB extends SQLite3
{
    function __construct()
    {
    	//判断是是否有文件夹
		$path =  $_SERVER['DOCUMENT_ROOT'];
		$path = str_replace("\\","/",$path)."/Count/CountDB/Site_".siteid;
		$paths = $path.'/YM_'.substr(YMD,0,6).'.db';
		$this->open($paths);
    }
}

class MyDBs extends SQLite3
{
    function __construct()
    {
    	//判断是是否有文件夹
		$path =  $_SERVER['DOCUMENT_ROOT'];
		$path = str_replace("\\","/",$path)."/Count/CountDB/Site_".siteid;
		$paths = $path.'/Site_'.siteid.'.db';
		$this->open($paths);
    }
}


/**
     * js escape php 实现
     * @param $string           the sting want to be escaped
     * @param $in_encoding
     * @param $out_encoding
     */
    function escape($str) {
        preg_match_all ( "/[\xc2-\xdf][\x80-\xbf]+|[\xe0-\xef][\x80-\xbf]{2}|[\xf0-\xff][\x80-\xbf]{3}|[\x01-\x7f]+/e", $str, $r );

        //匹配utf-8字符，
        $str = $r [0];
        $l = count ( $str );
        for($i = 0; $i < $l; $i ++) {
            $value = ord ( $str [$i] [0] );
            if ($value < 223) {
                $str [$i] = rawurlencode ( utf8_decode ( $str [$i] ) );
                //先将utf8编码转换为ISO-8859-1编码的单字节字符，urlencode单字节字符.
                //utf8_decode()的作用相当于iconv("UTF-8","CP1252",$v)。
            } else {
                $str [$i] = "%u" . strtoupper ( bin2hex ( iconv ( "UTF-8", "UCS-2", $str [$i] ) ) );
            }
        }

        $str = str_replace("%2A","*",join ( "", $str ) );
        return $str ;
    }

    //解析数据
    function unescape($str) {
        $str = str_replace("%B0","°", $str );
        $ret = '';
        $len = strlen ( $str );
        for($i = 0; $i < $len; $i ++) {
            if ($str [$i] == '%' && $str [$i + 1] == 'u') {
                $val = hexdec ( substr ( $str, $i + 2, 4 ) );
                if ($val < 0x7f)
                    $ret .= chr ( $val );
                else if ($val < 0x800)
                    $ret .= chr ( 0xc0 | ($val >> 6) ) . chr ( 0x80 | ($val & 0x3f) );
                else
                    $ret .= chr ( 0xe0 | ($val >> 12) ) . chr ( 0x80 | (($val >> 6) & 0x3f) ) . chr ( 0x80 | ($val & 0x3f) );
                $i += 5;
            } else if ($str [$i] == '%') {
                $ret .= urldecode ( substr ( $str, $i, 3 ) );
                $i += 2;
            } else
                $ret .= $str [$i];
        }
        return $ret;
    }

?>