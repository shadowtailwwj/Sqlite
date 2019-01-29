<?php
header("Content-Type: text/html; charset=UTF-8");

//获取信息
$siteid=isset($_GET["siteid"])?$_GET["siteid"]:4;
define("siteid",$siteid);
if(1*$siteid>0){
	//获取信息
	$countck=isset($_GET["countck"])?$_GET["countck"]:0;
	$browser=isset($_GET["browser"])?$_GET["browser"]:"";
	$os=isset($_GET["os"])?$_GET["os"]:"";
	$area=isset($_GET["area"])?$_GET["area"]:"";
	$dpi=isset($_GET["dpi"])?$_GET["dpi"]:"";
	$color=isset($_GET["color"])?$_GET["color"]:"";
	$lang=isset($_GET["language"])?$_GET["language"]:"";
	$referrer=isset($_GET["referrer"])?$_GET["referrer"]:"";
	$location=isset($_GET["location"])?$_GET["location"]:"";
	$countck=$countck=="1"?1:0;
	//
	$db = new MyDB();

	//
	//判断是否有数据表
	$tablename="Day_".date("d");
	$sql_create =<<<EOF
	CREATE TABLE $tablename
	(id integer PRIMARY KEY autoincrement,
	siteid INT default 0,
	counthour INT default (strftime('%H', datetime('now', 'localtime'))),
	countck INT default 0,
	ip varchar (50),
	country varchar(255),
	city varchar(255),
	isp varchar(255),
	browserName varchar(50),
	browserVersion varchar(50),
	os varchar(200),
	area varchar(50),
	dpi  varchar(50),
	color varchar(50),
	lang varchar(50),
	referrer TEXT,
	location TEXT,
	addtime TIMESTAMP default (datetime('now', 'localtime')),
	flag INT default 0);
EOF;
	$sql_query =<<<EOF
      select * from sqlite_master where type='table' and name='$tablename';
EOF;
	$ret_query = $db->query($sql_query);
	$query = $ret_query->fetchArray();
	if(empty($query)){
		$ret_create = $db->exec($sql_create);
	}
	//
	//插入数据
	//本地初始化数据
	$ip=getIp();
	$address = findCityByIp($ip);
	$country=$address['data']['country'];
	$city=$address['data']['city'];
	$isp=$address['data']['isp'];
	$browser=get_broswer();
	$browserName = $browser["title"];//浏览器类型
	$browserVersion = $browser["ver"];//浏览器型号
	$os=get_os();
	//$area="";
	//$dpi="";
	//$color="";
	$lang=getPreferredLanguage();
	//$referrer="";
	//$location="";
	$sql_insert =<<<EOF
	INSERT INTO $tablename (siteid,countck,ip,country,city,isp,browserName,browserVersion,os,area,dpi,color,lang,referrer,location)
	VALUES ('$siteid','$countck', '$ip','$country','$city','$isp', '$browserName', '$browserVersion','$os', '$area', '$dpi','$color','$lang','$referrer','$location');
EOF;
	$ret_insert = $db->exec($sql_insert);
	//
	//
	$db->close();


	//综合统计，按照日
	$dbs=new MyDBs();
	//判断是否有数据表
	$tablename="Site_".siteid;
	$sql_create =<<<EOF
	CREATE TABLE $tablename
	(id integer PRIMARY KEY autoincrement,
	YMD INT default (strftime('%Y%m%d', datetime('now', 'localtime'))),
	allcounts INT default 0,
	allcount INT default 0,
	ipcount INT default 0,
	addtime TIMESTAMP default (datetime('now', 'localtime')),
	flag INT default 0);
EOF;
	$sql_query =<<<EOF
      select * from sqlite_master where type='table' and name='$tablename';
EOF;
	$ret_query = $dbs->query($sql_query);
	$query = $ret_query->fetchArray();
	if(empty($query)){
		$ret_create = $dbs->exec($sql_create);
	}
	//插入数据
	$sql_query =<<<EOF
      select * from $tablename where flag=0 and YMD=(strftime('%Y%m%d', datetime('now', 'localtime')));
EOF;
	$ret_query = $dbs->query($sql_query);
	$query = $ret_query->fetchArray();
	if(empty($query)){
		$sql_Count =<<<EOF
	INSERT INTO $tablename (allcounts)
	VALUES (1);
EOF;
	}
	else{
		$sql_Count =<<<EOF
	update $tablename set allcounts=allcounts+1,allcount=allcount+$countck where flag=0 and YMD=(strftime('%Y%m%d', datetime('now', 'localtime')));
EOF;
	}
	$ret_create = $dbs->exec($sql_Count);

}

//Function类获取

function getIp(){
	$ip=false;

	if(!empty($_SERVER["HTTP_CLIENT_IP"])){
		$ip = $_SERVER["HTTP_CLIENT_IP"];
	}

	if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
		$ips = explode (", ", $_SERVER['HTTP_X_FORWARDED_FOR']);
		if ($ip) { array_unshift($ips, $ip); $ip = FALSE; }
			for ($i = 0; $i < count($ips); $i++) {
				if (!eregi ("^(10│172.16│192.168).", $ips[$i])) {
					$ip = $ips[$i];
					break;
				}
			}
		}
	return ($ip ? $ip : $_SERVER['REMOTE_ADDR']);
}
//
function get_broswer(){  
     $sys = $_SERVER['HTTP_USER_AGENT'];  //获取用户代理字符串  
     if (stripos($sys, "Firefox/") > 0) {  
         preg_match("/Firefox\/([^;)]+)+/i", $sys, $b);  
         $exp[0] = "Firefox";  
         $exp[1] = $b[1];  //获取火狐浏览器的版本号  
     } elseif (stripos($sys, "Maxthon") > 0) {  
         preg_match("/Maxthon\/([\d\.]+)/", $sys, $aoyou);  
         $exp[0] = "傲游";  
         $exp[1] = $aoyou[1];  
     } elseif (stripos($sys, "MSIE") > 0) {  
         preg_match("/MSIE\s+([^;)]+)+/i", $sys, $ie);  
         $exp[0] = "IE";  
         $exp[1] = $ie[1];  //获取IE的版本号  
     } elseif (stripos($sys, "OPR") > 0) {  
             preg_match("/OPR\/([\d\.]+)/", $sys, $opera);  
         $exp[0] = "Opera";  
         $exp[1] = $opera[1];    
     } elseif(stripos($sys, "Edge") > 0) {  
         //win10 Edge浏览器 添加了chrome内核标记 在判断Chrome之前匹配  
         preg_match("/Edge\/([\d\.]+)/", $sys, $Edge);  
         $exp[0] = "Edge";  
         $exp[1] = $Edge[1];  
     } elseif (stripos($sys, "Chrome") > 0) {  
             preg_match("/Chrome\/([\d\.]+)/", $sys, $google);  
         $exp[0] = "Chrome";  
         $exp[1] = $google[1];  //获取google chrome的版本号  
     } elseif(stripos($sys,'rv:')>0 && stripos($sys,'Gecko')>0){  
         preg_match("/rv:([\d\.]+)/", $sys, $IE);  
             $exp[0] = "IE";  
         $exp[1] = $IE[1];  
     }else {  
        $exp[0] = "未知浏览器";  
        $exp[1] = "";   
     }  
     // return $exp[0].'('.$exp[1].')'; 
     return $StrData=array(
            'title'   => $exp[0],
            'ver' => $exp[1]
        );
 }

 function getPreferredLanguage() {
 $langs = array();
 if (isset($_SERVER['HTTP_ACCEPT_LANGUAGE'])) {
  // break up string into pieces (languages and q factors)
  preg_match_all('/([a-z]{1,8}(-[a-z]{1,8})?)\s*(;\s*q\s*=\s*(1|0\.[0-9]+))?/i',$_SERVER['HTTP_ACCEPT_LANGUAGE'], $lang_parse);
  if (count($lang_parse[1])) {
   // create a list like "en" => 0.8
   $langs = array_combine($lang_parse[1], $lang_parse[4]);
   // set default to 1 for any without q factor
   foreach ($langs as $lang => $val) {
    if ($val === '') $langs[$lang] = 1;
   }
   // sort list based on value 
   arsort($langs, SORT_NUMERIC);
  }
 }
 //extract most important (first)
 foreach ($langs as $lang => $val) { break; }
 //if complex language simplify it
 if (stristr($lang,"-")) {$tmp = explode("-",$lang); $lang = $tmp[0]; }
 return $lang;
}

function get_os(){  
$agent = $_SERVER['HTTP_USER_AGENT'];  
    $os = false;  
   
    if (preg_match('/win/i', $agent) && strpos($agent, '95'))  
    {  
      $os = 'Windows 95';  
    }  
    else if (preg_match('/win 9x/i', $agent) && strpos($agent, '4.90'))  
    {  
      $os = 'Windows ME';  
    }  
    else if (preg_match('/win/i', $agent) && preg_match('/98/i', $agent))  
    {  
      $os = 'Windows 98';  
    }  
    else if (preg_match('/win/i', $agent) && preg_match('/nt 6.0/i', $agent))  
    {  
      $os = 'Windows Vista';  
    }  
    else if (preg_match('/win/i', $agent) && preg_match('/nt 6.1/i', $agent))  
    {  
      $os = 'Windows 7';  
    }  
      else if (preg_match('/win/i', $agent) && preg_match('/nt 6.2/i', $agent))  
    {  
      $os = 'Windows 8';  
    }else if(preg_match('/win/i', $agent) && preg_match('/nt 10.0/i', $agent))  
    {  
      $os = 'Windows 10';#添加win10判断  
    }else if (preg_match('/win/i', $agent) && preg_match('/nt 5.1/i', $agent))  
    {  
      $os = 'Windows XP';  
    }  
    else if (preg_match('/win/i', $agent) && preg_match('/nt 5/i', $agent))  
    {  
      $os = 'Windows 2000';  
    }  
    else if (preg_match('/win/i', $agent) && preg_match('/nt/i', $agent))  
    {  
      $os = 'Windows NT';  
    }  
    else if (preg_match('/win/i', $agent) && preg_match('/32/i', $agent))  
    {  
      $os = 'Windows 32';  
    }  
    else if (preg_match('/linux/i', $agent))  
    {  
      $os = 'Linux';  
    }  
    else if (preg_match('/unix/i', $agent))  
    {  
      $os = 'Unix';  
    }  
    else if (preg_match('/sun/i', $agent) && preg_match('/os/i', $agent))  
    {  
      $os = 'SunOS';  
    }  
    else if (preg_match('/ibm/i', $agent) && preg_match('/os/i', $agent))  
    {  
      $os = 'IBM OS/2';  
    }  
    else if (preg_match('/Mac/i', $agent) && preg_match('/PC/i', $agent))  
    {  
      $os = 'Macintosh';  
    }  
    else if (preg_match('/PowerPC/i', $agent))  
    {  
      $os = 'PowerPC';  
    }  
    else if (preg_match('/AIX/i', $agent))  
    {  
      $os = 'AIX';  
    }  
    else if (preg_match('/HPUX/i', $agent))  
    {  
      $os = 'HPUX';  
    }  
    else if (preg_match('/NetBSD/i', $agent))  
    {  
      $os = 'NetBSD';  
    }  
    else if (preg_match('/BSD/i', $agent))  
    {  
      $os = 'BSD';  
    }  
    else if (preg_match('/OSF1/i', $agent))  
    {  
      $os = 'OSF1';  
    }  
    else if (preg_match('/IRIX/i', $agent))  
    {  
      $os = 'IRIX';  
    }  
    else if (preg_match('/FreeBSD/i', $agent))  
    {  
      $os = 'FreeBSD';  
    }  
    else if (preg_match('/teleport/i', $agent))  
    {  
      $os = 'teleport';  
    }  
    else if (preg_match('/flashget/i', $agent))  
    {  
      $os = 'flashget';  
    }  
    else if (preg_match('/webzip/i', $agent))  
    {  
      $os = 'webzip';  
    }  
    else if (preg_match('/offline/i', $agent))  
    {  
      $os = 'offline';  
    }  
    else  
    {  
      $os = '未知操作系统';  
    }  
    return $os;    
}


 function findCityByIp($ip){
 	$data ="{\"code\":0,\"data\":{\"ip\":\"0.0.0.0\",\"country\":\"-\",\"area\":\"\",\"region\":\"-\",\"city\":\"-\",\"county\":\"-\",\"isp\":\"-\",\"country_id\":\"-\",\"area_id\":\"\",\"region_id\":\"0\",\"city_id\":\"0\",\"county_id\":\"0\",\"isp_id\":\"0\"}}";
 	try{
		@$data = file_get_contents('http://ip.taobao.com/service/getIpInfo.php?ip='.$ip);
	}
	catch(Exception $e){}
	return json_decode($data,$assoc=true);
}

//数据库连接
class MyDB extends SQLite3
{
    function __construct()
    {
    	//判断是是否有文件夹
		$path =  $_SERVER['DOCUMENT_ROOT'];
		$path = str_replace("\\","/",$path)."/Count";
		//$path = str_replace('\\','/',realpath(dirname(__FILE__).'/../'));
		$time = date("Ym");
		$times = date("d");
		$rrr = $path.'/CountDB';
		if(!file_exists($rrr)){
			mkdir('CountDB');
		}
		$path = $path.'/CountDB/Site_'.siteid;
		if(!file_exists($path)){
			mkdir($path);
		}
		$paths = $path.'/YM_'.$time.'.db';
		$this->open($paths);
    }
}

class MyDBs extends SQLite3
{
    function __construct()
    {
    	//判断是是否有文件夹
		$path =  $_SERVER['DOCUMENT_ROOT'];
		$path = str_replace("\\","/",$path)."/Count";
		//$path = str_replace('\\','/',realpath(dirname(__FILE__).'/../'));
		$rrr = $path.'/CountDB';
		if(!file_exists($rrr)){
			mkdir('CountDB');
		}
		$path = $path.'/CountDB/Site_'.siteid;
		if(!file_exists($path)){
			mkdir($path);
		}
		$paths = $path.'/Site_'.siteid.'.db';
		$this->open($paths);
    }
}

?>