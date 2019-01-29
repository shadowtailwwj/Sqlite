<?php
header("Content-Type:text/html;charset=UTF-8");
include_once("config.php");
include_once("Inc/common.php");
include_once("Inc/Sqlite.php");
include_once("Setting.php");

$OutMsg="请先登陆后操作";

$PortId =isset($_POST["PortId"])?$_POST["PortId"]:0;
$Send =isset($_POST["Send"])?$_POST["Send"]:"";

//$PortId=200100;


switch ($PortId) {
	case 0:
		$OutMsg="页面编号异常！";
		break;
	case 999900:
		$OutMsg=Save($Send);
		break;
	default:
		$OutMsg=GetListPage($PortId,$Send);
		break;
}
echo $OutMsg;



function GetListPage($PageId,$Send){
	$ReturnMsg="";
	$Send=($Send==null || $Send=="")?"search:;":$Send;
	$P=Page($PageId);
	$PTable=StrToListObj($P["table"]);
	$PSub=StrToListObj($P["sub"]);
	$TS=StrToObj($Send);

	$TWidth=82 + count($PTable);
	$SubWidth=20;
	$PTitle="<li style=\"width:80px;\" onclick=\"\">ID</li>";
	$PValue="";
	$PButton="";

	for($j=0;$j<count($PSub);$j++){		
		$SubWidth=$SubWidth+(5*strlen($PSub[$j]["title"]))+22;
		$PButton.="<input type=\"button\" class=\"Sub\" value=\"".$PSub[$j]["title"]."\" childid=\"".$PSub[$j]["childid"]."\" onclick=\"Main.Page.OnSub(".$PSub[$j]["pageid"].",this);\">";
	}
	$TWidth=$TWidth+$SubWidth;

	for($j=0;$j<count($PTable);$j++){		
		$TWidth=$TWidth+(1*$PTable[$j]["width"]);
		$PTitle.="<li style=\"width:".$PTable[$j]["width"]."px;\" onclick=\"\">".$PTable[$j]["title"]."</li>";
	}

	$conn=new SQLite(SQLitePath);//连接数据库
	$DBArr=$conn->getlist("SELECT * from ".$P["tablename"]." where flag=0 ".($TS["search"]!=""?" and ":"").$TS["search"]." order by ".$P["orderby"].";");
	for($i=0;$i<count($DBArr);$i++){
		$PValue.="<ul listid=\"".$DBArr[$i]["ID"]."\">";
		$PValue.="<li style=\"width:80px;\" onclick=\"\">".$DBArr[$i]["ID"]."</li>";
		for($j=0;$j<count($PTable);$j++){
			$PValue.="<li style=\"width:".$PTable[$j]["width"]."px;\" onclick=\"\">".GetInput($PTable[$j],$DBArr[$i][$PTable[$j]["field"]])."</li>";
		}
		$PValue.="<li style=\"width:".$SubWidth."px;\" onclick=\"\">".$PButton."</li>";
		$PValue.="</ul>";
	}

	$ReturnMsg="<li class=\"InfoTitle\" tablename=\"".$P["tablename"]."\">".$P["title"]."</li><li class=\"InfoSearch\" search=\"".escape($TS["search"])."\">Search</li>";
	$ReturnMsg.="<li class=\"InfoMenu\"><div style=\"width: ".$TWidth."px;\"><ul>";
	$ReturnMsg.=$PTitle."<li style=\"width:".$SubWidth."px;\" onclick=\"\">明细</li>";
	$ReturnMsg.="</ul></div></li>";
	$ReturnMsg.="<li class=\"InfoContent\" onscroll=\"Main.Page.OnScroll(this);\" style=\"height: 300px;\"><div style=\"width: ".$TWidth."px;\">";
	$ReturnMsg.=$PValue;
	$ReturnMsg.="</div></li>";

	return $ReturnMsg;
}

function GetInput($PT,$values){
	$InputMsg="";
	//0:input,1:select,2:checkbox,3:textare,4:port,5:button
	$InputAtt=" placeholder=\"".unescape($PT["placeholder"])."\" vtitle=\"".$PT["title"]."\" field=\"".$PT["field"]."\" inputtype=\"".$PT["inputtype"]."\"  inputinfo=\"".$PT["inputinfo"]."\" defaultvals=\"".$PT["defaultvals"]."\" onblur=\"Main.SaveUp.Save(this);\" oldvalue=\"".$values."\" ";
	switch($PT["inputtype"]){
		case 1:
		$InputMsg="<select  style=\"width:".($PT["width"]-10)."px;\" ".$InputAtt." value=\"".$values."\" onchange=\"Main.SaveUp.Save(this);\">";
		$SArr=StrToListObj(Enum($PT["inputinfo"]));
		for($i=0;$i<count($SArr);$i++){
			$InputMsg.="<option value=\"".$SArr[$i]["key"]."\" ".($SArr[$i]["key"]==$values?"selected":"").">".unescape($SArr[$i]["valule"])."</option>";
		}
		$InputMsg.="</select>";
		break;
		case 2:
		$SArr=StrToListObj(Enum($PT["inputinfo"]));
		$InputMsg="<input type=\"hidden\" ".$InputAtt." value=\"".$values."\">";
		for($i=0;$i<count($SArr);$i++){
			$InputMsg.="<input style=\"width:14px; height:14px; margin:8px -10px 0 5px;\" type=\"checkbox\" value=\"".$SArr[$i]["key"]."\" novalue=\"".$SArr[$i]["nokey"]."\" ".(strpos((",,".$values.","),(",".$SArr[$i]["key"].","))>0?"checked":"")." onclick=\"Main.SaveUp.CheckBox(this);\">".unescape($SArr[$i]["valule"]);
		}
		break;
		case 3:
		$InputMsg="<input style=\"width:".($PT["width"]-30)."px;\" ".$InputAtt." value=\"".$values."\"><div onClick=\"Main.Page.OpenWin(this.previousElementSibling);\">三</div>";
		break;
		case 4:
			# code...
		break;
		default:
		$InputMsg="<input style=\"width:".($PT["width"]-10)."px;\" ".$InputAtt." value=\"".$values."\">";
		break;
	}	
	return $InputMsg;
}


function Save($Send){
	$SaveMsg=200;
	$TS=StrToObj($Send);
	$conn=new SQLite(SQLitePath);//连接数据库
	$conn->Exec("update ".$TS["tablename"]." set ".$TS["field"]."='".$TS["values"]."' where flag=0 and id=".$TS["listid"]);
	$SaveMsg=100;
	return $SaveMsg;
}


?>