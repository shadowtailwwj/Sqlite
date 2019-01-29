<?php
header("Content-Type:text/html;charset=UTF-8");
//设置参数信息
//
//设置页面
//pageid页面编号（最后一位，0为全新页面，1为二级，2为3级）
//设置说明：
//title:列表标题
//addid：是否有添加按钮
//tablename:读取数据表格
//search:综合搜索涉及字段
//table：表格设置，间隔符为"|"，间隔依次是title名称，field字段，width宽度，inputtype输入类型（0:input,1:select,2:checkbox,3:textare,4:port,5:button），inputinfo输入参数（1、2为枚举编号，3、4为端口号）,defaultvals默认值，placeholder输入提示
//sub:操作按钮，间隔为"|"，间隔依次是title名称，pageid页面编号（最后一位，0为全新页面，1为二级，2为3级），childid下一级id对应的字段名
function Page($PageId){
	$OutMsg=array(
		//数据表列表
		"200100"=>array(
			"title"=>"数据表",
			"addid"=>"200101",
			"tablename"=>"T_Dev_Table",
			"orderby"=>"SysId,TableId,ID",
			"search"=>"tablename,title",
			"table"=>"title,field,width,inputtype,inputinfo,defaultvals,placeholder|系统编号,SysId,80,0,,0,4位系统编号|表中文名,Title,120,0,,,表中文名|表编号,TableId,120,0,,0,唯一表编号|表名,TableName,150,0,,,表英文名|父表编号,RTableId,100,0,,0,上级数据表编号|数据编码,IsNo,60,0,,0,无设0|工作流编号,WorkFlowId,100,0,,0,工作流编号|视图语句,Sql,300,3,,,视图专用|缓存状态,IsCache,120,1,2001001,0,请选择缓存|可否回收,IsRecovery,60,2,2001002,0,是否可以回收|可否重建,IsRebuild,60,2,2001003,0,是否可以重建;",
			"sub"=>"title,pageid,childid|字段,200111,TableId|显示字段,200121,TableId",
			),
		//数据表字段列表
		"200111"=>array(
			"title"=>"数据字段",
			"addid"=>"200111",
			"tablename"=>"T_Dev_Table",
			"orderby"=>"SysId,TableId,ID",
			"search"=>"tablename,title",
			"table"=>"title,field,width,inputtype,inputinfo,defaultvals,placeholder|系统编号,SysId,80,0,,0,4位系统编号|表中文名,Title,120,0,,,表中文名|表编号,TableId,120,0,,0,唯一表编号|表名,TableName,150,0,,,表英文名|父表编号,RTableId,100,0,,0,上级数据表编号|数据编码,IsNo,60,0,,0,无设0|工作流编号,WorkFlowId,100,0,,0,工作流编号|视图语句,Sql,300,3,,,视图专用|缓存状态,IsCache,120,1,2001001,0,请选择缓存|可否回收,IsRecovery,60,2,2001002,0,是否可以回收|可否重建,IsRebuild,60,2,2001003,0,是否可以重建;",
			"sub"=>"title,pageid,childid|字段,200111,TableId|显示字段,200121,TableId",
			),
		);
	return $OutMsg[$PageId];
}
//
//
//设置枚举
//设置说明：
//key:枚举值，不可空
//nokey:复选框选中取消值，可空；仅复选框有效
//value：枚举信息
function Enum($EnumId){
	$EnumMsg=array(
		'2001001' => "key,valule|0,不缓存|1,Table缓存|2,HashTable缓存", 
		'2001002' => "key,nokey,valule|0,1,允许", 
		'2001003' => "key,nokey,valule|0,1,允许", 
		);
	return $EnumMsg[$EnumId];
}
//
//

?>