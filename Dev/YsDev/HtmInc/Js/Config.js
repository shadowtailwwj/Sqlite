// JavaScript Document
//时钟信号，禁用alert

//鼠标移动
document.onmousemove = function() {
}

document.onclick=document.onmousedown=function(evt){
}

//禁止使用右键
document.oncontextmenu = function(evt) {
	//取消默认操作
	var evt=evt?evt:(window.event?window.event:null);//兼容IE和FF
	if(evt.stopPropagation){
		evt.stopPropagation();
    }
	else{
		evt.cancelBubble = true;
	}
	if(evt.preventDefault){
		evt.preventDefault();
	}
	else{
		evt.returnValue = false;
	}
	//根据不同的页面，进行不同的更新
	try{
		
	}
	catch(e){return false;}
	finally{return false;}
}

//键盘按键控制
document.onkeydown=function(evt){
	try{
		//alert(window.event.keyCode);
		var evt=evt?evt:(window.event?window.event:null);//兼容IE和FF
		if(evt!=null){
			var ck=true;
			switch(evt.keyCode){
				case 13://回车
					ck=false;
				break;
				case 116://F5刷新
					//ck=false;
				break;
				case 115://F4快速搜索
					//ck=false;
				break;
				case 112://F1帮助
					//ck=false;
				break;
				break;
				default:
					if(evt.keyCode!=16 && evt.keyCode!=17 && evt.keyCode!=18){
						ck=false;
					}
				break;
			}
			if(ck){
				evt.keyCode = 0;
				evt.cancelBubble = false;
				evt.returnValue = false;
				return false;
			}
		}
	}
	catch(e){}
}

window.onresize = function(){
	try{
		Main.Page.GetOpenWinMaxHeight();
	}
	catch(e){}
}


//更多定义
var Js=new Object();
var Main=new Object();


Js.Now=new Date();

var YsDateTime=new Object();

//默认信息
var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31,30, 31, 30, 31];

////////////////////////////////////////////////
//获取设置默认层z-index信息
function GetzIndex(){
	try{
		try{
			self.parent.yseip.zIndex++;
			return self.parent.yseip.zIndex;
		}
		catch(e){
			yseip.zIndex++;
			return yseip.zIndex;
		}
	}
	catch(e){return 10000000;}
}


function $(id)
{
	var obj=null;
	var node=null;
	var tag=null;
	if(id!=null && id!=""){
		if(id.substr(0,1)=="."){
			try{				
				//obj=(document.getElementsByClassName(id.substr(1)) != null)?document.getElementsByClassName(id.substr(1)):null;
				if (document.getElementsByClassName) {
					obj=((node || document).getElementsByClassName(id.substr(1)) != null)?(node || document).getElementsByClassName(id.substr(1)):null;
			        if(tag!=null && tag!=""){
				        var nodes = obj, result = [];
				        for (var i = 0 ; node = nodes[i++];) {
				            if (!!tag) {
				                if (tag !== "*" && node.tagName === tag.toUpperCase()) {
				                    result.push(node);
				                }
				            } else {
				                result.push(node);
				            }
				        }
				        obj= result;
				    }
			    } else {
			    	node = node || document;
			    	tag = tag || "*";
			        var result = [];
			        var classes = (id.substr(1)).split(" "),
			        elements = (tag === "*" && node.all) ? node.all : node.getElementsByTagName(tag),
			        patterns = [],
			        current,
			        match;
			        for (var i=0;i<classes.length;i++) {
			            patterns.push(new RegExp("(^|\\s)" + classes[i] + "(\\s|$)"));
			        }
			        for (var j=0;j<elements.length;j++){
			            current = elements[j];
			            match = false;
			            for (var k = 0, n = 0, kl = patterns.length; k < kl; k++) {
			                match = patterns[k].test(current.className);
			                if (match) n++;
			            }
			            if (n == kl) {
			                result.push(current);
			            }

			        }
			        obj=result;
			    }
			}
			catch(e){}
		}
		else if(id.substr(0,1)=="#"){
			try{
				obj=(document.getElementsByTagName(id.substr(1)) != null)?document.getElementsByTagName(id.substr(1)):null;
			}
			catch(e){}
		}
		else if(id.substr(0,1)=="@"){
			try{
				obj=(document.getElementsByName(id.substr(1)) != null)?document.getElementsByName(id.substr(1)):null;
				obj=(obj!=null && obj.length>0)?obj:null;
			}
			catch(e){}
		}
		else{
			try{
				obj=(document.getElementById(id) != null)?document.getElementById(id):null;
			}
			catch(e){}
			if(obj==null){
				try{
					//obj=(document.getElementByName(id) != null)?document.getElementByName(id):null;
				}
				catch(e){}
			}
			if(obj==null){
				try{
					obj=(document.getElementsByName(id) != null)?document.getElementsByName(id):null;
					obj=(obj!=null && obj.length>0)?obj:null;
				}
				catch(e){}
			}
		}
	}
	return (obj==null || obj=="")?null:obj;
}

//==========浏览器检测
function IECK(){
	var ck="MSIE";
	try{
		if(navigator.userAgent.indexOf("MSIE")>0) {
			ck = "MSIE";
		}
		else if(navigator.userAgent.indexOf("Firefox")>0){
			ck = "Firefox";
		}
		else if(navigator.userAgent.indexOf("Safari")>0){
			ck = "Safari";
		}
		else if(navigator.userAgent.indexOf("Camino")>0){
			ck = "Camino";
		}
		else if(navigator.userAgent.indexOf("Gecko")>0){
			ck = "Gecko";
		}
		//if("\v"=="v"){
			//为IE浏览器
			//return true;
		//}
		//else{
			//非IE浏览器
			//return false;
		//}
	}
	catch(e){Js.Log("IECK:浏览器检测！");}
	return ck;
}


//==========通用部分

//获取地址栏的参数，，获取地址栏的参数,前面要获取的信息，后面要获取的地址，为空默认为本地地址
Js.GetQuery=function(MenuId,Url)
{
	try{
		var getmsg="";
		if(Url == "" || Url == null)Url=location.href;
		if(Url != "" && Url != null && MenuId != null && MenuId != "")
		{
			var Url_split=Url.split("?");
			if(Url_split.length>1)
			{
				//var Url_content=Url.substring((Url_split[0].length+1),Url.length);
				if(Url_split[1] != "" || Url_split[1] != null)
				{
					var Url_split_msg=Url_split[1].split("&");
					for(var gi=0;gi<Url_split_msg.length;gi++)
					{
						if(Url_split_msg[gi] != null && Url_split_msg[gi] != "")
						{
							Url_split_msg_get=Url_split_msg[gi].split("=");
							if(Url_split_msg_get.length > 1)
							{
								if(Url_split_msg_get[0].toLowerCase() == MenuId.toLowerCase())
								{
									getmsg=Url_split_msg_get[1];
									break;
								}
							}
						}
					}
				}
			}
		}
		return unescape(getmsg);
	}
	catch(e){Js.Log("Js.GetQuery:" + MenuId);}
}

//获取鼠标坐标,鼠标，判断取值类型，null/0:取默认值，100:去xy值，111三个值获取，010，取中间的值
Js.GetXY=function(evt,type){
	try{
		evt=evt?evt:(window.event?window.event:null);//兼容IE和FF
		//获取X,Y轴
		var scrollPosX,scrollPosY;
		if (typeof window.pageYOffset != "undefined") {
			scrollPosX = window.pageXOffset;
			scrollPosY = window.pageYOffset;
		}
		else if (typeof document.compatMode != "undefined" && document.compatMode != "BackCompat"){
			scrollPosX = document.documentElement.scrollLeft;
			scrollPosY = document.documentElement.scrollTop; 
		}
		else if (typeof document.body != "undefined") {
			scrollPosX = document.body.scrollLeft;
			scrollPosY = document.body.scrollTop; 
		}
		var	vx= evt.clientX || evt.x || evt.pageX;
		var	vy= evt.clientY || evt.y || evt.pageY;
		switch(Js.ChkId(type)){
			case 132:
			vx= evt.clientX || evt.pageX || evt.x;
			vy= evt.clientY || evt.pageY || evt.y;
			break;
			case 213:
		    vx=evt.x || evt.clientX || evt.pageX;
		    vy=evt.y || evt.clientY || evt.pageY;
			break;
			case 231:
			vx= evt.x || evt.clientX || evt.pageX;
			vy= evt.y || evt.clientY || evt.pageY;
			break;
			case 312:
			vx= evt.pageX || evt.clientX || evt.x;
			vy= evt.pageY || evt.clientY || evt.y;
			break;
			case 321:
			vx= evt.pageX || evt.x || evt.clientX;
			vy= evt.pageY || evt.y || evt.clientY;
			break;
			default:
			break;
		}
		return {
			X:vx + scrollPosX,
			Y:vy + scrollPosY
		}
	}
	catch(e){Js.Log("Js.GetXY:" + MenuId);}
}

//参数设置或者获取
//信息获取操作
Js.Get=function(typeid,id){
	try{
		var obj=id;
		if(typeof(id) != "object"){
			obj=$(id);
		}
		var Msg=null;
		if(obj!=null && typeid!="" && typeid!=null){
			if(typeid.substr(0,7)=="DefAtt_")
			{
				eval("Msg=obj." + typeid.substr(7,typeid.length));
			}
			else if(typeid.substr(0,7)=="StyAtt_")
			{
				eval("Msg=obj.style." + typeid.substr(7,typeid.length));
			}
			else if(typeid.substr(0,4)=="Att_")
			{
				Msg=obj.getAttribute(typeid.substr(4,typeid.length));
			}
			else
			{
				switch (typeid.toLowerCase())
				{
					case "htm":
						Msg=obj.innerHTML;
					break;
					case "text":
						Msg=obj.innerText;
					break;
					case "value":
						Msg=obj.value;
					break;
					default:
						Msg=null;
				}
			}
		}
		else if(typeid!="" && typeid!=null){
			switch (typeid.toLowerCase())
				{
					case "cookie":
						Msg=Js.Cookie.get(id);
					break;
					default:
						Msg=null;
				}
		}
		return Msg;
	}
	catch(e){
		Js.Log("Js.Get("+id+")");
		return null;
	}
}
//信息设置操作
Js.Set = function (typeid, id, content) {
    try {
        if (typeof (id) == "function") {
            id(content, typeid);
        }
        else {
            var obj = id;
            if (typeof (id) != "object") {
                obj = $(id);
            }
            if (obj != null && typeid != "" && typeid != null) {
                if (typeid.substr(0, 7) == "DefAtt_") {
                    //属性设置
                    eval("obj." + typeid.substr(7, typeid.length) + "=content");
                }
                else if (typeid.substr(0, 7) == "StyAtt_") {
                    //属性设置
                    eval("obj.style." + typeid.substr(7, typeid.length) + "=content");
                }
                else if (typeid.substr(0, 4) == "Att_") {
                    //属性设置
                    obj.setAttribute(typeid.substr(4, typeid.length), content);
                }
                else if (typeid.substr(0, 6) == "AttAL_") {
                    //属性设置,左边添加
                    if (obj.getAttribute(typeid.substr(6, typeid.length)) != null) {
                        obj.setAttribute(typeid.substr(6, typeid.length), content + obj.getAttribute(typeid.substr(6, typeid.length)));
                    }
                    else {
                        obj.setAttribute(typeid.substr(6, typeid.length), content);
                    }
                }
                else if (typeid.substr(0, 6) == "AttAR_") {
                    //属性设置，右边添加
                    if (obj.getAttribute(typeid.substr(6, typeid.length)) != null) {
                        obj.setAttribute(typeid.substr(6, typeid.length), obj.getAttribute(typeid.substr(6, typeid.length)) + content);
                    }
                    else {
                        obj.setAttribute(typeid.substr(6, typeid.length), content);
                    }
                }
                else {
                    switch (typeid.toLowerCase()) {
                        case "htm":
                            obj.innerHTML = content;
                            break;
                        case "htm_left":
                            obj.innerHTML = content + obj.innerHTML;
                            break;
                        case "htm_right":
                            obj.innerHTML += content;
                            break;
                        case "value":
                            obj.value = content;
                            break;
                        case "value_left":
                            obj.value = content + obj.value;
                            break;
                        case "value_right":
                            obj.value += content;
                            break;
                        case "img_src":
                            obj.src = content;
                            break;
                        default:
                    }
                }
            }
            else if (typeid != "" && typeid != null) {
                switch (typeid.toLowerCase()) {
                    case "alert":
                        alert(content);
                        break;
                    case "cookie":
                        Js.Cookie.set(title, content, 1200);
                        break;
                    case "cookie_left":
                        Js.Cookie.set(title, content + GetCookie(title), 1200);
                        break;
                    case "cookie_right":
                        Js.Cookie.set(title, GetCookie(title) + content, 1200);
                        break;
                    default:
                }
            }
            delete obj;
        }
        delete typeid;
        delete id;
        delete content;
        try {
            CollectGarbage();
        }
        catch (e) { }
    }
    catch (e) { Js.Log("Js.Set(" + id + "):" + e.message); }
}

//Cookie部分
Js.Cookie={
	//设置cookie，标题，内容，有效期（s）
	set:function(title,value,expires){
		try{
			var exdate=new Date();
			expires=Js.ChkId(expires);
			if(expires>0){
				exdate.setSeconds(exdate.getDate()+expires);
				//exdate.setDate(exdate.getDate()+expiredays);
			}
			document.cookie=title+ "=" +escape(value)+ ((expires==0) ? "" : ";expires="+exdate.toGMTString());
		}
		catch(e){alert("err"+e.message);Js.Log("Js.Cookie.set("+title+")");}
	},
	
	get:function(title){
		try{
			if (document.cookie.length>0){
				c_start=("; "+document.cookie).indexOf("; "+title + "=");
				if (c_start!=-1){
					var c_str=document.cookie.substring(c_start+title.length+1);
					c_end=c_str.indexOf(";");
					if (c_end!=-1 && c_str.length>0) {
						c_str=c_str.substring(0,c_end);
					}
					return unescape(c_str);
				}
			}
			return "";
		}
		catch(e){alert("err"+e.message);Js.Log("Js.Cookie.get("+title+")");return null;}
	}


}

//数字判断//处理编号，参数为（处理数，最小值，最大值，错误返回值）
Js.ChkId=function(id,minid,maxid,defid){
	try
	{
		try{
			if(defid == "" || defid == null)defid=0;
			if(!isNaN(defid))defid=1*defid;
			if (("a" + "") == ("a" + id)) id = defid;
			if(id == null)id=defid;
			if(isNaN(id))id=defid;
			id=1*id;
		}
		catch(e){
			id=0;
		}
        if (minid != null && ("a" + "") != ("a" + minid)) {
            if (!isNaN(minid)) {
                if (id < (1 * minid)) { id = defid; }
            }
        }
        if (maxid != null && ("a" + "") != ("a" + maxid)) {
            if (!isNaN(maxid)) {
                if (id > (1 * maxid)) { id = defid; }
            }
        }
		return 1*id;
	}
	catch(e){Js.Log("Js.ChkId");}
}

//锁定层，锁定层位置异常时，父窗口设置position:relative;
Js.Lock=function(id,obj,Lock,Attobj){
	try{
		if(id!=""){
			Lock=Js.ChkId(Lock,0,100,30);
			if($("Lock_"+id)!=null){
				Js.LockClose(id);
			}
			var obj_lock=document.createElement("div");
			obj_lock.id="Lock_"+id;
			obj_lock.className="AlertLock";
			obj_lock.style.filter = "alpha(opacity=" + Lock + ")";
			//FF
			obj_lock.style.MozOpacity =Lock/100;
			obj_lock.style.opacity =Lock/100;
			obj_lock.style.zIndex = GetzIndex();
			if(Attobj!=null){
				Attobj.Width=Js.ChkId(Attobj.Width);
				Attobj.Height=Js.ChkId(Attobj.Height);
				if(Attobj.Width>0){
					obj_lock.style.width=Attobj.Width+"px";
				}
				if(Attobj.Width>0){
					obj_lock.style.height=Attobj.Height+"px";
				}
			}
			if(obj==null || obj ==""){
				obj=document.body;
				if(obj.scrollHeight>obj.clientHeight){
					obj_lock.style.height=obj.scrollHeight;
				}
				if(obj.scrollWidth>obj.clientWidth){
					obj_lock.style.width=obj.clientWidth;
				}
			}
			obj.appendChild(obj_lock);
		}
	}
	catch(e){Js.Log("Js.Lock");}
}
//解除锁定层
Js.LockClose=function(id){
	try{
		var obj=null;
		try{
			obj=$("Lock_"+id).parentNode;
		}
		catch(e){obj=document.body;}
		if(obj!=null && $("Lock_"+id)!=null){
			obj.removeChild($("Lock_"+id));
		}
	}
	catch(e){Js.Log("Js.LockClose");}
}


//标题，内容，id，按钮，宽度，高度，是否有关闭叉叉（直接关闭的，默认可以）,是否可以移动（默认不可以），判断重复(0默认最前，1关闭重开)
//Js.Alert=function(title,info,id,submits,swidth,sheight,ckclose,ckmove,ckdb){
//在id有的情况下，是不是允许隐藏，然后打开操作仅显示
//2013-2-7改版通过对象来处理;锁屏(lock);判断处理ConfirmSubmits
Js.Alert=function(title,info,obj){
	try{
		if(obj==null || typeof(obj)!="object"){
			obj=new Object();
		}
		if(obj.id=="" || obj.id==null){obj.id="Alert_" + Js.ChangeNow();}
		if(obj.submits==null){obj.submits=(obj.ConfirmSubmits==null || obj.ConfirmSubmits=="")?"<input type=\"submit\" value=\"确认\" hidefocus onClick=\"Js.AlertClose('" + obj.id + "');\"/>":"<input type=\"submit\" value=\"确认\" hidefocus onClick=\"" + obj.ConfirmSubmits + ";Js.AlertClose('" + obj.id + "');\"/><input type=\"submit\" value=\"取消\" hidefocus onClick=\"Js.AlertClose('" + obj.id + "');\"/>";}
		obj.width=Js.ChkId(obj.width,"23","800","200")+18;
		var infooverflow=(obj.overflow=="" || obj.overflow==null || !obj.overflow)?"":((Js.ChkId(obj.height,"25","400","0")==0)?"":"infoflow");//如果固定高度，则采用自动滚动条
		obj.height=Js.ChkId(obj.height,"25","400","75")+((title!=null && title!="")?47:0);//建议默认为400，由于打印400
		var mTop=parseInt((obj.height*2)/3)*(-1);
		var mLeft=parseInt(obj.width/2)*(-1);
		obj.ckdb=Js.ChkId(obj.ckdb,"0","1","0");
		obj.lock=Js.ChkId(obj.lock,"0","100","30");
		//判断是否已经存在
		if($(obj.id)!=null && $(obj.id)!=""){
			if(obj.ckdb==1){
				Js.AlertClose(obj.id);
			}
			else{
				$(obj.id).style.zIndex = GetzIndex();
			}
		}
		if($(obj.id)==null || $(obj.id)==""){
			//锁屏
			if(obj.lock>0){
				Js.Lock(obj.id,null,obj.lock);
			}
			//内容
			var ckl=(obj.ckclose)?"<span class=\"close\">&nbsp;</span>":"<span class=\"close\" onMouseOver=\"this.style.color='#B83C3C';\" onMouseOut=\"this.style.color='';\" onClick=\"Js.AlertClose('" + obj.id + "');\">&times;</span>";
			var ckm=(obj.ckmove)?" onmousedown=\"Js.DivMove('" + obj.id + "');\" ":"";//后面为默认
			if(obj.submits!=""){
				obj.submits="<li id=\"" + obj.id + "_submit\" class=\"submit\">" + obj.submits + "</li>";
			}
			var Aobj=document.createElement("div");
			Aobj.id=obj.id;
			Aobj.className="Alert";
			Aobj.style.width=obj.width + "px";
			Aobj.style.height=obj.height + "px";
			if(obj.ckmove){
				//移动top和left通过屏幕来定位
				if(parseInt(document.body.clientHeight-obj.height)>0){
					Aobj.style.top=parseInt((document.body.clientHeight-obj.height)/3) + document.body.scrollTop + "px";
				}
				else{
					Aobj.style.top="0px";
				}
				if(parseInt(document.body.clientWidth-obj.width)>0){
					Aobj.style.left=parseInt((document.body.clientWidth-obj.width)/2) + document.body.scrollLeft + "px";
				}
				else{
					Aobj.style.left="0px";
				}
			}
			else{
				Aobj.className="Alert Alert_Center";
				Aobj.style.marginTop=mTop + document.body.scrollTop + "px";
				Aobj.style.marginLeft=mLeft + document.body.scrollLeft + "px";
			}
			Aobj.setAttribute("sTop",document.body.scrollTop);
			Aobj.setAttribute("sLeft",document.body.scrollLeft);
			Aobj.style.zIndex = GetzIndex();
			document.body.appendChild(Aobj);
			info="<div class=\"AlertDiv\" ononselectstart=\"return false\" unselectable=\"on\" style=\"-moz-user-select:none;width:"+(obj.width-2)+"px;height:"+(obj.height-2)+"px;\"><li class=\"Alertli title\" style=\"display:"+((title!=null && title!="")?"":"none")+";\"><span class=\"title\" style=\"width:"+(obj.width-30)+"px;\"" + ckm + ">"+title+"</span>"+ckl+"</li><li class=\"info " + infooverflow + "\" style=\"width:" + (obj.width-9) + ";height:"+(obj.height-((title!=null && title!="")?60:0))+"px !important;height:"+(obj.height-((title!=null && title!="")?47:0))+"px;\">"+info+"</li>" + obj.submits + "</div>";
			Aobj.innerHTML=info;
			//最高不能超过左上角0,0坐标
			if(Aobj.offsetTop<0){
				Aobj.style.marginTop=(mTop-Aobj.offsetTop) + "px";
			}
			if(Aobj.offsetLeft<0){
				Aobj.style.marginLeft=(mLeft-Aobj.offsetLeft) + "px";
			}
		}
		//锁定第一个按钮
		if($(obj.id + "_submit")!=null && $(obj.id + "_submit").childNodes.length>0){
			for(var si=0;si<$(obj.id + "_submit").childNodes.length;si++){
				if(!$(obj.id + "_submit").childNodes[si].disabled){
					$(obj.id + "_submit").childNodes[si].focus();
					break;
				}
			}
		}
		else if($(obj.id)!=null){
			$(obj.id).focus();
		}
		
	}
	catch(e){Js.Log("Js.Alert");}
}

Js.AlertClose=function(id){
	try{
		if($("Lock_" + id)!=null){
			document.body.removeChild($("Lock_" + id));
		}
		if($(id)!=null){
			var sTop=Js.ChkId($(id).getAttribute("sTop"));
			var sLeft=Js.ChkId($(id).getAttribute("sLeft"));
			document.body.removeChild($(id));
		}
		//未确定上一个焦点时，先赋予body=====XXXX
		if(document.body.childNodes.length>0){
			try{
				//苹果浏览器不支持
				document.body.childNodes[0].focus();
			}
			catch(e){}
			//滚动条有值，则滚动
			if(sTop!=0){document.body.scrollTop=sTop;}
			if(sLeft!=0){document.body.scrollLeft=sLeft;}
		}

	try { CollectGarbage(); } catch (e) { }
	}
	catch(e){Js.Log("Js.AlertClose:" + id + "|ErrMsg:" + e.message);}
}

//层移动,,<div id="divPhoto" onmousedown="Js.DivMove(this)"></div>//当前层或者移动层id，空同层
Js.DivMove=function(obj){
	try{
		if(typeof(obj)!="object" && obj!="" && obj!=null){
			obj=$(obj);
		}
		if(obj!=null && typeof(obj)=="object"){
			var evt=evt?evt:(window.event?window.event:null);//兼容IE和FF
			if(!evt.pageX){evt.pageX=evt.x;}
			if(!evt.pageY){evt.pageY=evt.y;} 
			var x=evt.pageX,y=evt.pageY;
			if(obj.setCapture){
				obj.setCapture(); 
			}
			else if(window.captureEvents){
				window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
			}
			var backData = {x : obj.style.top, y : obj.style.left};
			
			obj.onmousemove=function(){
				var evt=evt?evt:(window.event?window.event:null);//兼容IE和FF
				if(!evt.pageX){evt.pageX=evt.x;}
				if(!evt.pageY){evt.pageY=evt.y;}
				var tx=evt.pageX-x+parseInt(obj.style.left),ty=evt.pageY-y+parseInt(obj.style.top);
				obj.style.left=tx+"px";
				obj.style.top=ty+"px";
				x=evt.pageX;
				y=evt.pageY;
			}
			
			obj.onmouseup=function(){
				var evt=evt?evt:(window.event?window.event:null);//兼容IE和FF
				if(obj.releaseCapture){
					obj.releaseCapture();
				}
				else if(window.captureEvents) {
					window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
				}
				obj.onmousemove=null; 
				obj.onmouseup=null;
				
				if(!evt.pageX){evt.pageX=evt.x;}
				if(!evt.pageY){evt.pageY=evt.y;}
				if(!document.body.pageWidth){document.body.pageWidth=document.body.clientWidth;}
				if(!document.body.pageHeight){document.body.pageHeight=document.body.clientHeight;}
				if(evt.pageX < 1 || evt.pageY < 1 || evt.pageX > document.body.pageWidth || evt.pageY > document.body.pageHeight){
					obj.style.left = backData.y;
					obj.style.top = backData.x;
				}
			}
		}
	}
	catch(e){Js.Log("Js.DivMove:" + obj);}
}

Js.Ppath=function(){
	var  path="/";
	try{
		path=yseip.path;
	}
	catch(e){
		try{
			path=self.parent.yseip.path;
		}
		catch(e){}
	}
	return path;
}


//获取当前时间及随机数做编号
Js.ChangeNow=function(){
	var ndate=new Date();
	var gm="";
	var gd="";
	var gh="";
	var gn="";
	var gs="";
	var gl="";
	var gr=Math.floor(Math.random()*10001);
	if (ndate.getMonth() < 9) gm = "0";
	if (ndate.getDate() < 10) gd = "0";
	if (ndate.getHours() < 10) gh = "0";
	if (ndate.getMinutes() < 10) gn = "0";
	if (ndate.getSeconds() < 10) gs = "0";	
	if (ndate.getMilliseconds() < 1000) gl = "0";	
	if (ndate.getMilliseconds() < 100) gl = "00";	
	if (ndate.getMilliseconds() < 10) gl = "000";	
	if (gr<1000)gr+=1000;
	return (String(ndate.getYear()) + gm + (ndate.getMonth()+1) + gd +  ndate.getDate() + gh + ndate.getHours() + gn + ndate.getMinutes() + gs + ndate.getSeconds() + gl + ndate.getMilliseconds() + gr);
}

//图片处理，目标，最大宽度，最大高度，是否强制放大，是否上下居中(默认false居中，true不居中)。
Js.DrawImage=function(ImgD,Width,Height,ck,cc){
	try{
		var image=new Image();
		image.src=ImgD.src;
		ck=(ck)?true:false;
		cc=(cc)?true:false;
		if(image.width>0 && image.height>0){
			if(Width>0 && Height>0){
				if(image.width/image.height>= Width/Height){
					if(image.width>Width){
						ImgD.width=Width;
						ImgD.height=parseInt((image.height*Width)/image.width);
					}
					else{
						ImgD.width=image.width;
						ImgD.height=image.height; 
					}
				}
				else{
					if(image.height>Height){
						ImgD.height=Height;
						ImgD.width=parseInt((image.width*Height)/image.height);
					}
					else{
						ImgD.width=image.width;
						ImgD.height=image.height;
					}
				}
			}
			else{
				if(Width>0){
					if(image.width>Width){
						ImgD.width=Width;
						ImgD.height=parseInt((image.height*Width)/image.width);
					}
					else{
						ImgD.width=image.width;
						ImgD.height=image.height; 
					}
				}
				if(Height>0){
					if(image.height>Height){
						ImgD.height=Height;
						ImgD.width=parseInt((image.width*Height)/image.height);
					}
					else{
						ImgD.width=image.width;
						ImgD.height=image.height; 
					}
				}
			}
			if(!cc && Height>image.height){
				ImgD.style.marginTop=parseInt((Height-image.height)/2)+"px";
			}
		}
	}
	catch(e){Js.Log("Js.DrawImage");}
}


//错误日志记录器
Js.Log=function(msg){
	try{
		var http_request = Js.Ajax_createHttpRequest();
		//创建军请求结果处理
		http_request.onreadystatechange = function(){
			if(http_request.readyState==4){
				http_request=null;
				delete http_request;
				try { CollectGarbage(); } catch (e) { }
			}
		}
		http_request.open("POST", Js.Ppath() + "CNet/Log.ashx", true);
		http_request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		http_request.setRequestHeader("Cache-Control","no-cache");
		http_request.send("msg=" + escape(msg));
		return http_request;
		delete http_request;
		try { CollectGarbage(); } catch (e) { }
	}
	catch(e){
		alert("Js.Log:" + Js.Ppath() + "CNet/Log.ashx?" + msg);
	}
}

///////////Ajax通用模块/////
Js.Ajax_createHttpRequest=function(){
	var http_request = null;//开始初始化XMLHttpRequest对象
	if(window.XMLHttpRequest) { //Mozilla 浏览器
		http_request = new XMLHttpRequest();
		if (http_request.overrideMimeType) {//设置MiME类别
			http_request.overrideMimeType('text/xml');
		}
	}
	else if (window.ActiveXObject) { // IE浏览器
		try {
			http_request = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				http_request = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {}
		}
	}
	if (!http_request) { // 异常，创建对象实例失败
		alert("不能创建XMLHttpRequest对象实例.");
		return null;
	} 
	return http_request;
}