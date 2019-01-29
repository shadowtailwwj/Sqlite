<!---------------------made by link ------------------------>
<!------------------------18/06/18---------------------------->
<?php
$siteid=isset($_GET["siteid"])?$_GET["siteid"]:1;
?>

<!--网站Cookie名称-->
document.write("<script>var siteid='<?php echo $siteid?>';</script>")
document.write("<script>var ys_count_site_all='ys_count_all_site_' + siteid;</script>")
document.write("<script>var ys_count_site_all_check=0;</script>")

<!---------------------设置cookie开始---------------------------->
document.write("<script>function SetCookie(sName , timeKeep) {document.cookie = sName + '=1; path=/; expires=' + new Date(new Date().valueOf()+timeKeep*60000*60).toGMTString() + ';';}</script>")
<!--------------------设置cookie结束---------------------------->

<!--------------------读取cookie开始---------------------------->
document.write("<script>function GetCookie(sName) {var aCookie = document.cookie.split('; ');for (var i=0; i < aCookie.length; i++) {var aCrumb = aCookie[i].split('=');if (sName == aCrumb[0]) {return unescape(aCrumb[1]);}}return null;}</script>")
<!--------------------读取cookie结束--------------------------->
<!------------------------计数统计开始------------------------>

<!--是否唯一用户；2小时算一次-->
document.write("<script>if (GetCookie(ys_count_site_all)==null){ys_count_site_all_check=1;SetCookie(ys_count_site_all,2);}</script>")

	<!----------------------基本信息读取开始-------------------->
	<!--浏览器类型读取-->
document.write("<script>var browserName=navigator.appName;</script>")
	<!--浏览器版本读取-->
document.write("<script>var browserVersion=parseInt(navigator.appVersion);</script>")
	<!--操作系统版本读取-->
document.write("<script>var OSVersion=navigator.appVersion</script>")
	<!--分辨率读取-->
document.write("<script>var browserdpi=escape(screen.width)+'*'+escape(screen.height);</script>")
	<!--读取色彩-->
document.write("<script>var color=screen.colorDepth</script>")
	<!--客户端语言读取-->
document.write("<script>var browserlanguage=escape(navigator.browserLanguage);</script>")
	<!--读取地区-->
document.write("<script>var area=escape(String(new Date()).split(' ')[4]);</script>")
	<!--网站来路读取-->
document.write("<script>var browserreferrer=escape(document.referrer);</script>")
	<!--受访页面读取-->
document.write("<script>var browserlocation=escape(location.href);</script>")	
<!---------------------基本信息读取结束-------------------------->
	

<!----------------------处理浏览器类型及版本开始------------------->
<!--netspace4-netspace6,7-IE4.0-IE5.0-IE5.5-IE6.0-未知-->
document.write("<script>var browserread=0;</script>")
document.write("<script>if(browserName=='Netscape'&&browserVersion==4){browserread=201;} else if(browserName=='Netscape'&&browserVersion==5){browserread=202;}else if(browserName='Microsoft Internet Explorer'&&browserVersion==4&&OSVersion.indexOf('MSIE 4.0')!=-1){browserread=101; }else if(browserName='Microsoft Internet Explorer'&&browserVersion==4&&OSVersion.indexOf('MSIE 5.0')!=-1){browserread=102; }else if(browserName='Microsoft Internet Explorer'&&browserVersion==4&&OSVersion.indexOf('MSIE 5.5')!=-1){browserread=103; }else if(browserName='Microsoft Internet Explorer'&&browserVersion==4&&OSVersion.indexOf('MSIE 6.0')!=-1){browserread=104;}else if(browserName='Microsoft Internet Explorer'&&browserVersion==4&&OSVersion.indexOf('MSIE 7.0')!=-1){browserread=105;}else {browserread=0;}</script>") 
<!---------------------处理浏览器类型及版本结束------------------>

<!----------------------处理操作系统信息开始------------------------->
<!--windows 95-windows 98-windows ME-windows NT-windows 2000-windows XP-windows 2003-未知-windows-未知-->
document.write("<script>var osread=0;</script>")
document.write("<script>if(browserName='Microsoft Internet Explorer') {if(OSVersion.indexOf('95')!=-1){osread=101;}else if(OSVersion.indexOf('98')!=-1){osread=102;}else if(OSVersion.indexOf('ME')!=-1){osread=103; }else if(OSVersion.indexOf('NT 4')!=-1){osread=104;}else if(OSVersion.indexOf('NT 5.0')!=-1){osread=105;}else if(OSVersion.indexOf('NT 5.1')!=-1){osread=106;}else if(OSVersion.indexOf('NT 5.2')!=-1){osread=107;}else if(OSVersion.indexOf('NT 6.0')!=-1){osread=108;}else{osread=0;}}else{if(OSVersion.indexOf('windows')!=-1){osread=100;}else {osread=0;}}</script>") 
<!---------------------处理操作系统信息结束--------------------->
<!-- 统计代码-->
<!--防刷新统计-->
document.write("<div id=\"ys_count\" style=\"display:none;\"></div><iframe src=\"http://127.0.0.1:8013/l81/count/Send?siteid="+siteid+"&countck="+ys_count_site_all_check+"&browser="+browserread+"&os="+osread+"&area="+area+"&dpi="+browserdpi+"&color="+color+"&language="+browserlanguage+"&referrer="+browserreferrer+"&location="+browserlocation+"\" style=\"display:none;width:0;height:0;\" onreadystatechange=\"if(this.readyState=='complete' && this.src!='about:blank'){ys_count.innerHTML=this.src;this.src='about:blank';}\"></iframe>");
<!-------------------------计数统计结束----------------------->
