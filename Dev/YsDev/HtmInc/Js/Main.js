Main={
	UserId:1,//缓存编号，不可改==
	PortUrl:"Port.php",//接口地址
	OpenMenu:null,//打开对象

	//默认处理
	OnLoad:function(){
		try{
			//根据读取，判断是否在线，在线显示默认页，否则显示登录页
			//Main.Login.Init();
			Main.Menu.OpenSmall(200100);
		}
		catch(e){Js.Log("Main.OnLoad!Errmsg:" + e.message);}
	},

	//菜单处理
	Menu:{
		BigClick:function(Obj){
			try{
				var FObj=Obj.parentNode.getElementsByTagName("li");
				var SObj=$("SmallMenu").getElementsByTagName("ul");
				for(var i=0;i<4;i++){
					if(FObj[i]==Obj){
						Obj.className="On";
						for(var j=0;j<SObj.length;j++){
							if(Js.Get("Att_bigmenu",SObj[j])==i){
								SObj[j].style.display="";
								SObj[j].className=SObj[j]==Main.OpenMenu?"On":"";
							}
							else{
								SObj[j].style.display="none";
								SObj[j].className="";
							}
						}
					}
					else{
						FObj[i].className="Off";
					}
				}
			}
			catch(e){Js.Log("Main.Menu.BigClick!Errmsg:" + e.message);}
		},

		OpenBig:function(fi){
			try{
				var FObj=$("BigMenu").getElementsByTagName("li");
				for(var i=0;i<4;i++){
					if(i==fi){
						Main.Menu.BigClick(FObj[i]);
						break;
					}
				}
			}
			catch(e){Js.Log("Main.Menu.OpenBig!Errmsg:" + e.message);}
		},

		SmallClick:function(Obj,Send){
			try{
				Main.OpenMenu=Obj;
				var Fi=Js.Get("Att_bigmenu",Obj);
				Main.Menu.OpenBig(Fi);
				var Menuid=Js.Get("Att_menuid",Obj);
				Main.Page.Open(Menuid,Send);//执行打开页面
			}
			catch(e){Js.Log("Main.Menu.SmallClick!Errmsg:" + e.message);}
		},

		OpenSmall:function(menuid,Send){
			try{
				var SObj=$("SmallMenu").getElementsByTagName("ul");
				for(var j=0;j<SObj.length;j++){
					if(Js.Get("Att_menuid",SObj[j])==menuid){
						Main.Menu.SmallClick(SObj[j],Send);
						break;
					}
				}
			}
			catch(e){Js.Log("Main.Menu.OpenSmall!Errmsg:" + e.message);}
		}
	},

	//页面处理
	Page:{
		Open:function(Pageid,Send){
			try{				
				if(Main.UserId>0){
					Main.Ajax(Pageid,Send,function(Str){
						var Infoi=$(".InfoUl");
						for(var i=0;i<Infoi.length;i++){
							Infoi[i].style.display="none";
						}
						//最后1位是0，则全屏，1为分2屏幕，2分3屏幕，9弹出
						switch(Pageid%10){
							case 1:
							$("InfoMsg_1").style.display="";
							$("InfoMsg_2").style.display="";alert(Str);
							$("InfoMsg_2").innerHTML=Str;
							break;
							case 2:
							$("InfoMsg_1").style.display="";
							$("InfoMsg_2").style.display="";
							$("InfoMsg_3").style.display="";
							$("InfoMsg_3").innerHTML=Str;
							break;
							case 9:
							break;
							default:
							$("InfoMsg_1").style.display="";
							$("InfoMsg_1").innerHTML=Str;
							break;
						}
						Main.Page.OnResize();
					});
				}
				else{
					$("InfoMsg").innerHTML="请先登陆后进行操作！";
				}
			}
			catch(e){Js.Log("Main.Page.Open!Errmsg:" + e.message);}
		},

		OnSub:function(PageId,Obj){
			try{
				//获取ID
				var Search="search:"+escape(Js.Get("Att_childid",Obj)+"="+Js.Get("Att_listid",Obj.parentNode.parentNode))+";";
				if(PageId%10==0){
					Main.Menu.OpenSmall(PageId,Search);
				}
				else{
					Main.Page.Open(PageId,Search);
				}
			}
			catch(e){Js.Log("Main.Page.OnSub!Errmsg:" + e.message);}
		},

		//监控滚轮(列表)
		OnScroll:function(Obj){
			try{
				Obj.previousElementSibling.scrollLeft=Obj.scrollLeft;
			}
			catch(e){Js.Log("Main.Page.OnScroll!Errmsg:" + e.message);}
		},

		OnResize:function(){
			try{
				var vHeight=parseInt(document.body.clientHeight-100);
				if($("InfoMsg_3").style.display==""){
					Main.Page.SetHeight("InfoMsg_1",parseInt(vHeight*0.25));
					Main.Page.SetHeight("InfoMsg_2",parseInt(vHeight*0.25));
					Main.Page.SetHeight("InfoMsg_3",parseInt(vHeight*0.5));
				}
				else if($("InfoMsg_2").style.display==""){
					Main.Page.SetHeight("InfoMsg_1",parseInt(vHeight*0.3));
					Main.Page.SetHeight("InfoMsg_2",parseInt(vHeight*0.7));
				}
				else if($("InfoMsg_1").style.display==""){
					Main.Page.SetHeight("InfoMsg_1",vHeight);
				}
			}
			catch(e){Js.Log("Main.Page.OnResize!Errmsg:" + e.message);}
		},

		SetHeight:function(id,heights){
			$(id).lastElementChild.style.height=(heights-85)+"px";
		},

		WinFObj:null,

		//弹出窗口部分
		OpenWin:function(Obj){
			try{
				var inputtype=Js.Get("Att_inputtype",Obj);
				var Val=Obj.value;
				var Title="窗口标题";
				var IsAdd=false;
				var Wwidth=0;
				var Wheight=0;
				var Content="";
				if(inputtype==3){
					Title=unescape(Js.Get("Att_vtitle",Obj));
					Wwidth=300;
					Wheight=150;
					Content="<textarea placeholder=\""+Js.Get("Att_placeholder",Obj)+"\">"+Val+"</textarea>";
				}
				else{

				}

				Title=Title=="" || Title==null?"窗口标题":Title;

				var WinObj=$("WinInfoMsg");
				Main.Page.WinFObj=Obj;
				WinObj.style.width=(Wwidth+20)+"px";
				WinObj.style.height=(Wheight+72)+"px";
				WinObj.style.marginLeft=parseInt((0-Wwidth-20)/2)+"px";
				WinObj.style.marginTop=parseInt((0-Wheight-72)/2)+"px";
				WinObj.firstElementChild.firstElementChild.innerHTML=Title;
				WinObj.firstElementChild.lastElementChild.style.display=IsAdd?"":"none";
				WinObj.firstElementChild.nextElementSibling.firstElementChild.style.width=Wwidth+"px";
				WinObj.firstElementChild.nextElementSibling.firstElementChild.style.height=Wheight+"px";
				WinObj.firstElementChild.nextElementSibling.firstElementChild.innerHTML=Content;
				WinObj.style.display="";
			}
			catch(e){Js.Log("Main.Page.OpenWin!Errmsg:" + e.message);}
		},

		SaveWin:function(Obj){
			try{
				var FObj=Main.Page.WinFObj;
				var WinObj=$("WinInfoMsg");
				var inputtype=Js.Get("Att_inputtype",FObj);
				var NewVal="";
				if(inputtype==3){
					NewVal=WinObj.firstElementChild.nextElementSibling.firstElementChild.firstElementChild.value;
				}
				FObj.value=NewVal;
				Main.SaveUp.Save(FObj);
				Main.Page.CloseWin();
			}
			catch(e){Js.Log("Main.Page.SaveWin!Errmsg:" + e.message);}
		},

		CloseWin:function(Obj){
			try{
				Main.Page.WinFObj=null;
				$("WinInfoMsg").firstElementChild.nextElementSibling.firstElementChild.innerHTML="";
				$("WinInfoMsg").style.display="none";
			}
			catch(e){Js.Log("Main.Page.CloseWin!Errmsg:" + e.message);}
		}

	},

	SaveUp:{
		//提价
		Save:function(Obj){
			try{
				//有修改才提交
				if(Obj.value != Js.Get("Att_oldvalue",Obj)){
					var TitleObj=Obj.parentNode.parentNode.parentNode.parentNode.previousElementSibling.previousElementSibling.previousElementSibling;
					var ListObj=Obj.parentNode.parentNode;
					Main.Ajax(999900,{
						listid:Js.Get("Att_listid",ListObj),
						tablename:Js.Get("Att_tablename",TitleObj),
						field:Js.Get("Att_field",Obj),
						values:Obj.value
					},function(Str){
						if(1*Str!=100){
							alert("修改失败，还原请刷新！");
						}
						else{
							Js.Set("Att_oldvalue",Obj,Obj.value);
						}
					});
				}
			}
			catch(e){Js.Log("Main.SaveUp.Save!Errmsg:" + e.message);}
		},

		//复选框提交
		CheckBox:function(Obj){
			try{
				var inputobj=Obj.parentNode.firstElementChild;
				var novalue=Js.Get("Att_novalue",Obj);
				if(Obj.checked){
					inputobj.value=(",,"+inputobj.value+",").replace(","+novalue+",",",");
					inputobj.value=inputobj.value+","+Obj.value;
				}
				else{
					inputobj.value=(",,"+inputobj.value+",").replace(","+Obj.value+",",",");
					inputobj.value=inputobj.value+","+novalue;
				}
				inputobj.value=inputobj.value.replace(",,",",").Trim(",");
				Main.SaveUp.Save(inputobj);
			}
			catch(e){Js.Log("Main.SaveUp.CheckBox!Errmsg:" + e.message);}
		}
	},

	//Ajax处理模块
	Ajax:function(PortId,Send,EndObj){
		try{
			//上送信息
			Send=Send==null?"":Send;
			Send=typeof(Send)=="object"?Js.ObjToStr(Send):Send;
			//定义上送信息
			var upobj=new Object();
			//授权地址
			upobj.url=Main.PortUrl+"?" + (new Date().getTime());//默认从单一入口获取，进行DES加密法则配置
			//综合内容上送
			upobj.sendmsg="PortId=" + PortId + "&Send=" + escape(Send);
			upobj.endobj=function(Str){
				try{
					if(typeof(EndObj)=="function"){
						try{
							//内容obj，code，codemsg，响应内容，sobj
							EndObj(Str);
						}
						catch(e){Js.Log("Main.Ajax.endobj.EndObj!Errmsg:Ajax个性结束脚本执行失败:"+e.message);}
					}
				}
				catch(e){Js.Log("Main.Ajax.endobj!Errmsg:" + e.message);}
			};

			upobj.loadobj=function(cent){
				//进度条
			};
			//o.readcode;
			Js.Ajax(upobj);
		}
		catch(e){Js.Log("Main.Ajax!Errmsg:" + e.message);}
	}/*,

	Alert:function(Title,Msg,OkSub){
		try{
			alert(Msg);
			if(OkSub!=""){
				eval(OkSub);
			}
		}
		catch(e){Js.Log("Main.Alert!Errmsg:" + e.message);}
	}*/
}


