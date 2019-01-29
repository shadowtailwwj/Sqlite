// JavaScript Document
//通用===
//去除空格
String.prototype.Trim = function(S){ 
    return (S=="" || S==null)?this.replace(/(^\s*)|(\s*$)/g, ""):this.replace(/^,+/,"").replace(/,+$/,"");
}

//最大值
Array.prototype.max = function(){
 return Math.max.apply({},this) 
}

//最小值
Array.prototype.min = function(){
 return Math.min.apply({},this) 
}

/* 得到日期年月日等加数字后的日期 */ 
Date.prototype.dateAdd = function(interval,number) 
{ 
    var d = this; 
	interval=(interval=="" || interval ==null)?"":interval.toLowerCase();
    //var k={"y":"FullYear", "q":"Month", "m":"Month", "w":"Date", "d":"Date", "h":"Hours", "n":"Minutes", "s":"Seconds", "ms":"MilliSeconds"}; 
    //var n={"q":3, "w":7}; 
	switch(interval){
		case "y":
			d.setFullYear(d.getFullYear()+number);
		break;
		case "q":
			d.setMonth(d.getMonth()+(3*number));
		break;
		case "m":
			d.setMonth(d.getMonth()+ number);
		break;
		case "w":
			d.setDate(d.getDate()+(7*number));
		break;
		case "d":
			d.setDate(d.getDate()+number);
		break;
		case "h":
			d.setHours(d.getHours()+number);
		break;
		case "n":
			d.setMinutes(d.getMinutes()+number);
		break;
		case "s":
			d.setSeconds(d.getSeconds()+number);
		break;
		case "ms":
			d.setTime(d.getTime()+number);
		break;
		default:
		break;
	}
	//setTimeout("d.set"+k[interval]+"(d.get"+k[interval]+"()+"+((n[interval]||1)*number)+")",0);
	//d.setMonth(d.getMonth()+((n[interval]||1)*number));
    //eval("d.set"+k[interval]+"(d.get"+k[interval]+"()+"+((n[interval]||1)*number)+")"); 
    return d; 
} 
/* 计算两日期相差的日期年月日等 */ 
Date.prototype.dateDiff = function(interval,objDate2) 
{ 
    var d=this, i={}, t=d.getTime(), t2=objDate2.getTime(); 
    i["y"]=objDate2.getFullYear()-d.getFullYear(); 
    i["q"]=i["y"]*4+Math.floor(objDate2.getMonth()/4)-Math.floor(d.getMonth()/4); 
    i["m"]=i["y"]*12+objDate2.getMonth()-d.getMonth(); 
    i["ms"]=objDate2.getTime()-d.getTime(); 
    i["w"]=Math.floor((t2+345600000)/(604800000))-Math.floor((t+345600000)/(604800000)); 
    i["d"]=Math.floor(t2/86400000)-Math.floor(t/86400000); 
    i["h"]=Math.floor(t2/3600000)-Math.floor(t/3600000); 
    i["n"]=Math.floor(t2/60000)-Math.floor(t/60000); 
    i["s"]=Math.floor(t2/1000)-Math.floor(t/1000); 
    return i[interval]; 
}

/*日期转换为标准格式*/
Date.prototype.Format = function(fmt) 
{
	fmt=(fmt==null || fmt=="")?"yyyy-MM-dd hh:mm:ss":fmt;
	var o = { 
        "M+" : this.getMonth()+1,                 //月份 
        "d+" : this.getDate(),                    //日 
        "H+" : this.getHours(),                   //小时 
        "h+" : this.getHours(),                   //小时 
        "m+" : this.getMinutes(),                 //分 
        "s+" : this.getSeconds(),                 //秒 
        "q+" : Math.floor((this.getMonth()+3)/3), //季度 
        "S"  : this.getMilliseconds()             //毫秒 
    }; 
    if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
    }
     for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
         }
     }
    return fmt; 
}

//设置为人民币的格式
String.prototype.RMB = function(n){
	if(this==null || this==""){
		return "";
	}
	else{
		n=(isNaN(n))?2:n;
		n=(n<0 || n>3)?2:n;
		s = (parseFloat((((isNaN(this))?0:this) + "").replace(/[^\d\.-]/g, "")).toFixed(n) + ((n==0)?".":"")).split(".");
		var r="";
		if(n>0){r = "." + s[1];}
		var l = s[0].split("").reverse();
		var t = "";
		for(i = 0; i < l.length; i ++ ){
			t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
		}
		return t.split("").reverse().join("") + r;
	}
}

//设置大写人民币格式
String.prototype.CNRMB = function(){
	// Constants:
	var currencyDigits=this.RMB();
	var MAXIMUM_NUMBER = 99999999999.99;
	// Predefine the radix characters and currency symbols for output:
	var CN_ZERO = "零";
	var CN_ONE = "壹";
	var CN_TWO = "贰";
	var CN_THREE = "叁";
	var CN_FOUR = "肆";
	var CN_FIVE = "伍";
	var CN_SIX = "陆";
	var CN_SEVEN = "柒";
	var CN_EIGHT = "捌";
	var CN_NINE = "玖";
	var CN_TEN = "拾";
	var CN_HUNDRED = "佰";
	var CN_THOUSAND = "仟";
	var CN_TEN_THOUSAND = "万";
	var CN_HUNDRED_MILLION = "亿";
	var CN_SYMBOL = "人民币";
	var CN_DOLLAR = "元";
	var CN_TEN_CENT = "角";
	var CN_CENT = "分";
	var CN_INTEGER = "整";
	
	// Variables:
	var integral; // Represent integral part of digit number.
	var decimal; // Represent decimal part of digit number.
	var outputCharacters; // The output result.
	var parts;
	var digits, radices, bigRadices, decimals;
	var zeroCount;
	var i, p, d;
	var quotient, modulus;
	
	// Validate input string:
	currencyDigits = currencyDigits.toString();
	if (currencyDigits == ""){
		//alert("Empty input!");
		return "";
	}
	if (currencyDigits.match(/[^,.\d]/) != null) {
		//alert("Invalid characters in the input string!");
		return "";
	}
	if ((currencyDigits).match(/^((\d{1,3}(,\d{3})*(.((\d{3},)*\d{1,3}))?)|(\d+(.\d+)?))$/) == null) {
		//alert("Illegal format of digit number!");
		return "";
	}
	
	// Normalize the format of input digits:
	currencyDigits = currencyDigits.replace(/,/g, ""); // Remove comma delimiters.
	currencyDigits = currencyDigits.replace(/^0+/, ""); // Trim zeros at the beginning.
	// Assert the number is not greater than the maximum number.
	if (Number(currencyDigits) > MAXIMUM_NUMBER) {
		//alert("Too large a number to convert!");
		return "";
	}
	
	// Process the coversion from currency digits to characters:
	// Separate integral and decimal parts before processing coversion:
	parts = currencyDigits.split(".");
	if (parts.length > 1) {
		integral = parts[0];
		decimal = parts[1];
		// Cut down redundant decimal digits that are after the second.
		decimal = decimal.substr(0, 2);
	}
	else {
		integral = parts[0];
		decimal = "";
	}
	// Prepare the characters corresponding to the digits:
	digits = new Array(CN_ZERO, CN_ONE, CN_TWO, CN_THREE, CN_FOUR, CN_FIVE, CN_SIX, CN_SEVEN, CN_EIGHT, CN_NINE);
	radices = new Array("", CN_TEN, CN_HUNDRED, CN_THOUSAND);
	bigRadices = new Array("", CN_TEN_THOUSAND, CN_HUNDRED_MILLION);
	decimals = new Array(CN_TEN_CENT, CN_CENT);
	// Start processing:
	outputCharacters = "";
	// Process integral part if it is larger than 0:
	if (Number(integral) > 0) {
		zeroCount = 0;
		for (i = 0; i < integral.length; i++) {
			p = integral.length - i - 1;
			d = integral.substr(i, 1);
			quotient = p / 4;
			modulus = p % 4;
			if (d == "0") {
				zeroCount++;
			}
			else {
				if (zeroCount > 0){
					outputCharacters += digits[0];
				}
				zeroCount = 0;
				outputCharacters += digits[Number(d)] + radices[modulus];
			}
			if (modulus == 0 && zeroCount < 4) {
				outputCharacters += bigRadices[quotient];
			}
		}
		outputCharacters += CN_DOLLAR;
	}
	// Process decimal part if there is:
	if (decimal != "") {
		for (i = 0; i < decimal.length; i++) {
			d = decimal.substr(i, 1);
			if (d != "0") {
				outputCharacters += digits[Number(d)] + decimals[i];
			}
		}
	}
	// Confirm and return the final output string:
	if (outputCharacters == "") {
		outputCharacters = CN_ZERO + CN_DOLLAR;
	}
	if (decimal == "") {
		outputCharacters += CN_INTEGER;
	}
	//outputCharacters = CN_SYMBOL + outputCharacters;
	return outputCharacters;
}

//转为数字
String.prototype.HostSize=function(type){
    var FactSize = this;
	if(type!="" && type!=null && type.toLowerCase()=="unit"){
		var KBCount = 1024;
        var MBCount = KBCount * 1024;
        var GBCount = MBCount * 1024;
        var TBCount = GBCount * 1024;
        var m_strSize = "";
        FactSize=Js.ChkId(FactSize);
        if (FactSize < KBCount)
        {
            m_strSize = FactSize.toFixed(2) + " Byte";
        }
        else if (FactSize >= KBCount && FactSize < (MBCount - 1024))
        {
           m_strSize = (FactSize / KBCount).toFixed(2) + " KB";
        }
        else if (FactSize >= (MBCount - 1024) && FactSize < (GBCount - 1024))
        {
           m_strSize = (FactSize / MBCount).toFixed(2) + " MB";
        }
        else if (FactSize >= (GBCount - 1024) && FactSize < (TBCount - 1024))
        {
            m_strSize = (FactSize / GBCount).toFixed(2) + " GB";
        }
        else if (FactSize >= (TBCount - 1024))
        {
            m_strSize = (FactSize / TBCount).toFixed(2) + " TB";
        }
		return m_strSize;
	}
	else if((new RegExp("^\\d+(\\.\\d+)?[ |]?[[|K|M|G|T]?B|Byte]?$","g")).test(FactSize)){
		var _BSize = 1;
		FactSize = FactSize.Trim().toUpperCase();
		if (FactSize.indexOf("TB") > 0){
			FactSize = FactSize.replace("TB", "").Trim();
			_BSize = 1099511627776;
		}
		else if (FactSize.indexOf("GB") > 0){
			FactSize = FactSize.replace("GB", "").Trim();
			_BSize = 1073741824;
		}
		else if (FactSize.indexOf("MB") > 0){
			FactSize = FactSize.replace("MB", "").Trim();
			_BSize = 1048576;
		}
		else if (FactSize.indexOf("KB") > 0){
			FactSize = FactSize.replace("KB", "").Trim();
			_BSize = 1024;
		}
		else{
			FactSize = FactSize.replace("BYTE", "").replace("B", "").Trim();
		}
		FactSize = FactSize * _BSize;
		return FactSize;
	}
	else{
		return FactSize;
	}
}

//保留小数点后面2位
String.prototype.toFixed = function(si){
	return this.ToF(si);
}
String.prototype.ToF = function(si){
	var f_x = parseFloat(this);
	if (isNaN(f_x))
	{
		return 0;
	}
	var ci=1;
	si=isNaN(si)?2:si;
	si=si<0?2:si;
	if(si==0){
		return parseInt(this);
	}
	for(var i=0;i<si;i++){
		ci*=10;
	}
	var f_x = Math.round(f_x*ci)/ci;
	var s_x = f_x.toString();
	var pos_decimal = s_x.indexOf('.');
	if (pos_decimal < 0)
	{
		pos_decimal = s_x.length;
		s_x += '.';
	}
	if(s_x.length>pos_decimal + si){
		s_x=s_x.substr(0,pos_decimal + si);
	}
	else{
		while (s_x.length <= pos_decimal + si)
		{
			s_x += '0';
		}
	}
	f_x=null;
	ci=null;
	i=null;
	//s_x=null;
	pos_decimal=null;
	delete f_x;
	delete ci;
	delete i;
	//delete s_x;
	delete pos_decimal;
	return s_x;
}

//全局替换
String.prototype.replaceAll = function(oldString,newString){
	return this.replace(new RegExp(oldString,"gm"),newString);
}

//设置为MD5加密
String.prototype.MD5 = function(){
	function RotateLeft(lValue, iShiftBits)
	{
		return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
	}
	function AddUnsigned(lX,lY)
	{
		var lX4,lY4,lX8,lY8,lResult;
		lX8 = (lX & 0x80000000);
		lY8 = (lY & 0x80000000);
		lX4 = (lX & 0x40000000);
		lY4 = (lY & 0x40000000);
		lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
		if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
		if (lX4 | lY4) {
		if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
		else return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
		} else return (lResult ^ lX8 ^ lY8);
	}
	function F(x,y,z) { return (x & y) | ((~x) & z); }
	function G(x,y,z) { return (x & z) | (y & (~z)); }
	function H(x,y,z) { return (x ^ y ^ z); }
	function I(x,y,z) { return (y ^ (x | (~z))); }
	function FF(a,b,c,d,x,s,ac) {
	a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
	return AddUnsigned(RotateLeft(a, s), b);
	}
	function GG(a,b,c,d,x,s,ac) {
	a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
	return AddUnsigned(RotateLeft(a, s), b);
	}
	function HH(a,b,c,d,x,s,ac) {
	a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
	return AddUnsigned(RotateLeft(a, s), b);
	}
	function II(a,b,c,d,x,s,ac) {
	a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
	return AddUnsigned(RotateLeft(a, s), b);
	}
	function ConvertToWordArray(sMessage) {
	var lWordCount;
	var lMessageLength = sMessage.length;
	var lNumberOfWords_temp1=lMessageLength + 8;
	var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
	var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
	var lWordArray=Array(lNumberOfWords-1);
	var lBytePosition = 0;
	var lByteCount = 0;
	while ( lByteCount < lMessageLength ) {
		lWordCount = (lByteCount-(lByteCount % 4))/4;
		lBytePosition = (lByteCount % 4)*8;
		lWordArray[lWordCount] = (lWordArray[lWordCount] | (sMessage.charCodeAt(lByteCount)<<lBytePosition));
		lByteCount++;
	}
	lWordCount = (lByteCount-(lByteCount % 4))/4;
	lBytePosition = (lByteCount % 4)*8;
	lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
	lWordArray[lNumberOfWords-2] = lMessageLength<<3;
	lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
	return lWordArray;
	}
	function WordToHex(lValue) {
		var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
		for (lCount = 0;lCount<=3;lCount++) {
			lByte = (lValue>>>(lCount*8)) & 255;
			WordToHexValue_temp = "0" + lByte.toString(16);
			WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
		}
		return WordToHexValue;
	}
	var x=Array();
	var k,AA,BB,CC,DD,a,b,c,d
	var S11=7, S12=12, S13=17, S14=22;
	var S21=5, S22=9 , S23=14, S24=20;
	var S31=4, S32=11, S33=16, S34=23;
	var S41=6, S42=10, S43=15, S44=21;
	// Steps 1 and 2. Append padding bits and length and convert to words
	x = ConvertToWordArray(this);
	// Step 3. Initialise
	a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
	// Step 4. Process the message in 16-word blocks
	for (k=0;k<x.length;k+=16) {
		AA=a; BB=b; CC=c; DD=d;
		a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
		d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
		c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
		b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
		a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
		d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
		c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
		b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
		a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
		d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
		c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
		b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
		a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
		d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
		c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
		b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
		a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
		d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
		c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
		b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
		a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
		d=GG(d,a,b,c,x[k+10],S22,0x2441453);
		c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
		b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
		a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
		d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
		c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
		b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
		a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
		d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
		c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
		b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
		a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
		d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
		c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
		b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
		a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
		d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
		c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
		b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
		a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
		d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
		c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
		b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
		a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
		d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
		c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
		b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
		a=II(a,b,c,d,x[k+0], S41,0xF4292244);
		d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
		c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
		b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
		a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
		d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
		c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
		b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
		a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
		d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
		c=II(c,d,a,b,x[k+6], S43,0xA3014314);
		b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
		a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
		d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
		c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
		b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
		a=AddUnsigned(a,AA); b=AddUnsigned(b,BB); c=AddUnsigned(c,CC); d=AddUnsigned(d,DD);
	}
	// Step 5. Output the 128 bit digest
	var temp= WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
	return temp.toUpperCase();
}

Object.prototype.getTab = function(s){
	return this.getElementsByTagName(s);
}

//DES加密法则
var DES={
	//加密法则
	DES:function(Message,Key,Iv){
		if(Key == null || Key == ""){
			Key="YuShi_DES";
		}
		if(Iv == null || Iv == ""){
			Iv=Key;
		}
		return this.stringToHex(this.SetDES(Message,Key,Iv,1));
	},
	
	//解密法则
	UnDES:function(Message,Key,Iv){
		if(Key == null || Key == ""){
			Key="YuShi_DES";
		}
		if(Iv == null || Iv == ""){
			Iv=Key;
		}
		return this.SetDES(this.HexTostring(Message),Key,Iv,0);
	},
	
	//核心处理,key,message,encrypt,mode,iv
	SetDES:function(message,key,iv,encrypt,mode){
		//declaring this locally speeds things up a bit
		var spfunction1=new Array(0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x1010400,0x1010404,0x400,0x1000404,0x1010004,0x1000000,0x4,0x404,0x1000400,0x1000400,0x10400,0x10400,0x1010000,0x1010000,0x1000404,0x10004,0x1000004,0x1000004,0x10004,0,0x404,0x10404,0x1000000,0x10000,0x1010404,0x4,0x1010000,0x1010400,0x1000000,0x1000000,0x400,0x1010004,0x10000,0x10400,0x1000004,0x400,0x4,0x1000404,0x10404,0x1010404,0x10004,0x1010000,0x1000404,0x1000004,0x404,0x10404,0x1010400,0x404,0x1000400,0x1000400,0,0x10004,0x10400,0,0x1010004);
		var spfunction2=new Array(-0x7fef7fe0,-0x7fff8000,0x8000,0x108020,0x100000,0x20,-0x7fefffe0,-0x7fff7fe0,-0x7fffffe0,-0x7fef7fe0,-0x7fef8000,-0x80000000,-0x7fff8000,0x100000,0x20,-0x7fefffe0,0x108000,0x100020,-0x7fff7fe0,0,-0x80000000,0x8000,0x108020,-0x7ff00000,0x100020,-0x7fffffe0,0,0x108000,0x8020,-0x7fef8000,-0x7ff00000,0x8020,0,0x108020,-0x7fefffe0,0x100000,-0x7fff7fe0,-0x7ff00000,-0x7fef8000,0x8000,-0x7ff00000,-0x7fff8000,0x20,-0x7fef7fe0,0x108020,0x20,0x8000,-0x80000000,0x8020,-0x7fef8000,0x100000,-0x7fffffe0,0x100020,-0x7fff7fe0,-0x7fffffe0,0x100020,0x108000,0,-0x7fff8000,0x8020,-0x80000000,-0x7fefffe0,-0x7fef7fe0,0x108000);
		var spfunction3=new Array(0x208,0x8020200,0,0x8020008,0x8000200,0,0x20208,0x8000200,0x20008,0x8000008,0x8000008,0x20000,0x8020208,0x20008,0x8020000,0x208,0x8000000,0x8,0x8020200,0x200,0x20200,0x8020000,0x8020008,0x20208,0x8000208,0x20200,0x20000,0x8000208,0x8,0x8020208,0x200,0x8000000,0x8020200,0x8000000,0x20008,0x208,0x20000,0x8020200,0x8000200,0,0x200,0x20008,0x8020208,0x8000200,0x8000008,0x200,0,0x8020008,0x8000208,0x20000,0x8000000,0x8020208,0x8,0x20208,0x20200,0x8000008,0x8020000,0x8000208,0x208,0x8020000,0x20208,0x8,0x8020008,0x20200);
		var spfunction4=new Array(0x802001,0x2081,0x2081,0x80,0x802080,0x800081,0x800001,0x2001,0,0x802000,0x802000,0x802081,0x81,0,0x800080,0x800001,0x1,0x2000,0x800000,0x802001,0x80,0x800000,0x2001,0x2080,0x800081,0x1,0x2080,0x800080,0x2000,0x802080,0x802081,0x81,0x800080,0x800001,0x802000,0x802081,0x81,0,0,0x802000,0x2080,0x800080,0x800081,0x1,0x802001,0x2081,0x2081,0x80,0x802081,0x81,0x1,0x2000,0x800001,0x2001,0x802080,0x800081,0x2001,0x2080,0x800000,0x802001,0x80,0x800000,0x2000,0x802080);
		var spfunction5=new Array(0x100,0x2080100,0x2080000,0x42000100,0x80000,0x100,0x40000000,0x2080000,0x40080100,0x80000,0x2000100,0x40080100,0x42000100,0x42080000,0x80100,0x40000000,0x2000000,0x40080000,0x40080000,0,0x40000100,0x42080100,0x42080100,0x2000100,0x42080000,0x40000100,0,0x42000000,0x2080100,0x2000000,0x42000000,0x80100,0x80000,0x42000100,0x100,0x2000000,0x40000000,0x2080000,0x42000100,0x40080100,0x2000100,0x40000000,0x42080000,0x2080100,0x40080100,0x100,0x2000000,0x42080000,0x42080100,0x80100,0x42000000,0x42080100,0x2080000,0,0x40080000,0x42000000,0x80100,0x2000100,0x40000100,0x80000,0,0x40080000,0x2080100,0x40000100);
		var spfunction6=new Array(0x20000010,0x20400000,0x4000,0x20404010,0x20400000,0x10,0x20404010,0x400000,0x20004000,0x404010,0x400000,0x20000010,0x400010,0x20004000,0x20000000,0x4010,0,0x400010,0x20004010,0x4000,0x404000,0x20004010,0x10,0x20400010,0x20400010,0,0x404010,0x20404000,0x4010,0x404000,0x20404000,0x20000000,0x20004000,0x10,0x20400010,0x404000,0x20404010,0x400000,0x4010,0x20000010,0x400000,0x20004000,0x20000000,0x4010,0x20000010,0x20404010,0x404000,0x20400000,0x404010,0x20404000,0,0x20400010,0x10,0x4000,0x20400000,0x404010,0x4000,0x400010,0x20004010,0,0x20404000,0x20000000,0x400010,0x20004010);
		var spfunction7=new Array(0x200000,0x4200002,0x4000802,0,0x800,0x4000802,0x200802,0x4200800,0x4200802,0x200000,0,0x4000002,0x2,0x4000000,0x4200002,0x802,0x4000800,0x200802,0x200002,0x4000800,0x4000002,0x4200000,0x4200800,0x200002,0x4200000,0x800,0x802,0x4200802,0x200800,0x2,0x4000000,0x200800,0x4000000,0x200800,0x200000,0x4000802,0x4000802,0x4200002,0x4200002,0x2,0x200002,0x4000000,0x4000800,0x200000,0x4200800,0x802,0x200802,0x4200800,0x802,0x4000002,0x4200802,0x4200000,0x200800,0,0x2,0x4200802,0,0x200802,0x4200000,0x800,0x4000002,0x4000800,0x800,0x200002);
		var spfunction8=new Array(0x10001040,0x1000,0x40000,0x10041040,0x10000000,0x10001040,0x40,0x10000000,0x40040,0x10040000,0x10041040,0x41000,0x10041000,0x41040,0x1000,0x40,0x10040000,0x10000040,0x10001000,0x1040,0x41000,0x40040,0x10040040,0x10041000,0x1040,0,0,0x10040040,0x10000040,0x10001000,0x41040,0x40000,0x41040,0x40000,0x10041000,0x1000,0x40,0x10040040,0x1000,0x41040,0x10001000,0x40,0x10000040,0x10040000,0x10040040,0x10000000,0x40000,0x10001040,0,0x10041040,0x40040,0x10000040,0x10040000,0x10001000,0x10001040,0,0x10041040,0x41000,0x41000,0x1040,0x1040,0x40040,0x10000000,0x10041000);
		//create the 16 or 48 subkeys we will need
		var keys=this.des_createKeys(key);
		var m=0,i,j,temp,temp2,right1,right2,left,right,looping;
		var cbcleft,cbcleft2,cbcright,cbcright2
		var endloop,loopinc;
		var len=message.length;
		var chunk=0;
		//set up the loops for single and triple des
		var iterations=keys.length==32?3 :9;//single or triple des
		if(iterations==3){
			looping=encrypt?new Array(0,32,2):new Array(30,-2,-2);
		}
		else{
			looping=encrypt?new Array(0,32,2,62,30,-2,64,96,2):new Array(94,62,-2,32,64,2,30,-2,-2);
		}
		message+="\0\0\0\0\0\0\0\0";//pad the message out with null bytes
		//store the result here
		result="";
		tempresult="";
		mode=(isNaN(mode))?0:mode;
		if(mode==1){//CBC mode
			cbcleft=(iv.charCodeAt(m++)<<24)|(iv.charCodeAt(m++)<<16)|(iv.charCodeAt(m++)<<8)|iv.charCodeAt(m++);
			cbcright=(iv.charCodeAt(m++)<<24)|(iv.charCodeAt(m++)<<16)|(iv.charCodeAt(m++)<<8)|iv.charCodeAt(m++);
			m=0;
		}
		
		//loop through each 64 bit chunk of the message
		while(m<len){
			if(encrypt){
				//加密时按双字节操作
				left=(message.charCodeAt(m++)<<16)|message.charCodeAt(m++);
				right=(message.charCodeAt(m++)<<16)|message.charCodeAt(m++);
				}else{
					left=(message.charCodeAt(m++)<<24)|(message.charCodeAt(m++)<<16)|(message.charCodeAt(m++)<<8)|message.charCodeAt(m++);
					right=(message.charCodeAt(m++)<<24)|(message.charCodeAt(m++)<<16)|(message.charCodeAt(m++)<<8)|message.charCodeAt(m++);
				}
				//for Cipher Block Chaining mode,xor the message with the previous result
				if(mode==1){
					if(encrypt){
						left^=cbcleft;right^=cbcright;
					}
					else{
						cbcleft2=cbcleft;cbcright2=cbcright;cbcleft=left;cbcright=right;
					}
				}
				//first each 64 but chunk of the message must be permuted according to IP
				temp=((left>>>4)^right)&0x0f0f0f0f;right^=temp;left^=(temp<<4);
				temp=((left>>>16)^right)&0x0000ffff;right^=temp;left^=(temp<<16);
				temp=((right>>>2)^left)&0x33333333;left^=temp;right^=(temp<<2);
				temp=((right>>>8)^left)&0x00ff00ff;left^=temp;right^=(temp<<8);
				temp=((left>>>1)^right)&0x55555555;right^=temp;left^=(temp<<1);
				left=((left<<1)|(left>>>31));
				right=((right<<1)|(right>>>31));
				
				//do this either 1 or 3 times for each chunk of the message
				for(j=0;j<iterations;j+=3){
					endloop=looping[j+1];
					loopinc=looping[j+2];
					
					//now go through and perform the encryption or decryption
					for(i=looping[j];i!=endloop;i+=loopinc){
						//for efficiency
						right1=right^keys[i];
						right2=((right>>>4)|(right<<28))^keys[i+1];
						//the result is attained by passing these bytes through the S selection functions
						temp=left;
						left=right;
						right=temp^(spfunction2[(right1>>>24)&0x3f]|spfunction4[(right1>>>16)&0x3f]|spfunction6[(right1>>>8)&0x3f]|spfunction8[right1&0x3f]|spfunction1[(right2>>>24)&0x3f]|spfunction3[(right2>>>16)&0x3f]|spfunction5[(right2>>>8)&0x3f]|spfunction7[right2&0x3f]);
					}
					temp=left;left=right;right=temp;//unreverse left and right
				}//for either 1 or 3 iterations
				//move then each one bit to the right
				left=((left>>>1)|(left<<31));
				right=((right>>>1)|(right<<31));
				
				//now perform IP-1,which is IP in the opposite direction
				temp=((left>>>1)^right)&0x55555555;right^=temp;left^=(temp<<1);
				temp=((right>>>8)^left)&0x00ff00ff;left^=temp;right^=(temp<<8);
				temp=((right>>>2)^left)&0x33333333;left^=temp;right^=(temp<<2);
				temp=((left>>>16)^right)&0x0000ffff;right^=temp;left^=(temp<<16);
				temp=((left>>>4)^right)&0x0f0f0f0f;right^=temp;left^=(temp<<4);
				
				//for Cipher Block Chaining mode,xor the message with the previous result
				if(mode==1){
					if(encrypt){
						cbcleft=left;cbcright=right;
					}
					else{
						left^=cbcleft2;right^=cbcright2;
					}
				}
				if(encrypt){
					tempresult+=String.fromCharCode((left>>>24),((left>>>16)&0xff),((left>>>8)&0xff),(left&0xff),(right>>>24),((right>>>16)&0xff),((right>>>8)&0xff),(right&0xff));
				}
				else{
					tempresult+=String.fromCharCode(((left>>>16)&0xffff),(left&0xffff),((right>>>16)&0xffff),(right&0xffff));
				}
				//////解密时输出双字节
				encrypt?chunk+=16:chunk+=8;
				if(chunk==512){
					result+=tempresult;
					tempresult="";
					chunk=0;
				}
		}//for every 8 characters,or 64 bits in the message
		//return the result as an array
		return result+tempresult;
		//end of des
	},
	
	
	des_createKeys:function(key){
		//declaring this locally speeds things up a bit
		pc2bytes0=new Array(0,0x4,0x20000000,0x20000004,0x10000,0x10004,0x20010000,0x20010004,0x200,0x204,0x20000200,0x20000204,0x10200,0x10204,0x20010200,0x20010204);
		pc2bytes1=new Array(0,0x1,0x100000,0x100001,0x4000000,0x4000001,0x4100000,0x4100001,0x100,0x101,0x100100,0x100101,0x4000100,0x4000101,0x4100100,0x4100101);
		pc2bytes2=new Array(0,0x8,0x800,0x808,0x1000000,0x1000008,0x1000800,0x1000808,0,0x8,0x800,0x808,0x1000000,0x1000008,0x1000800,0x1000808);
		pc2bytes3=new Array(0,0x200000,0x8000000,0x8200000,0x2000,0x202000,0x8002000,0x8202000,0x20000,0x220000,0x8020000,0x8220000,0x22000,0x222000,0x8022000,0x8222000);
		pc2bytes4=new Array(0,0x40000,0x10,0x40010,0,0x40000,0x10,0x40010,0x1000,0x41000,0x1010,0x41010,0x1000,0x41000,0x1010,0x41010);
		pc2bytes5=new Array(0,0x400,0x20,0x420,0,0x400,0x20,0x420,0x2000000,0x2000400,0x2000020,0x2000420,0x2000000,0x2000400,0x2000020,0x2000420);
		pc2bytes6=new Array(0,0x10000000,0x80000,0x10080000,0x2,0x10000002,0x80002,0x10080002,0,0x10000000,0x80000,0x10080000,0x2,0x10000002,0x80002,0x10080002);
		pc2bytes7=new Array(0,0x10000,0x800,0x10800,0x20000000,0x20010000,0x20000800,0x20010800,0x20000,0x30000,0x20800,0x30800,0x20020000,0x20030000,0x20020800,0x20030800);
		pc2bytes8=new Array(0,0x40000,0,0x40000,0x2,0x40002,0x2,0x40002,0x2000000,0x2040000,0x2000000,0x2040000,0x2000002,0x2040002,0x2000002,0x2040002);
		pc2bytes9=new Array(0,0x10000000,0x8,0x10000008,0,0x10000000,0x8,0x10000008,0x400,0x10000400,0x408,0x10000408,0x400,0x10000400,0x408,0x10000408);
		pc2bytes10=new Array(0,0x20,0,0x20,0x100000,0x100020,0x100000,0x100020,0x2000,0x2020,0x2000,0x2020,0x102000,0x102020,0x102000,0x102020);
		pc2bytes11=new Array(0,0x1000000,0x200,0x1000200,0x200000,0x1200000,0x200200,0x1200200,0x4000000,0x5000000,0x4000200,0x5000200,0x4200000,0x5200000,0x4200200,0x5200200);
		pc2bytes12=new Array(0,0x1000,0x8000000,0x8001000,0x80000,0x81000,0x8080000,0x8081000,0x10,0x1010,0x8000010,0x8001010,0x80010,0x81010,0x8080010,0x8081010);
		pc2bytes13=new Array(0,0x4,0x100,0x104,0,0x4,0x100,0x104,0x1,0x5,0x101,0x105,0x1,0x5,0x101,0x105);
		
		//how many iterations(1 for des,3 for triple des)
		var iterations=key.length>=24?3 :1;
		//stores the return keys
		var keys=new Array(32 * iterations);
		//now define the left shifts which need to be done
		var shifts=new Array(0,0,1,1,1,1,1,1,0,1,1,1,1,1,1,0);
		//other variables
		var lefttemp,righttemp,m=0,n=0,temp;
		for(var j=0;j<iterations;j++){
			//either 1 or 3 iterations
			left=(key.charCodeAt(m++)<<24)|(key.charCodeAt(m++)<<16)|(key.charCodeAt(m++)<<8)|key.charCodeAt(m++);
			right=(key.charCodeAt(m++)<<24)|(key.charCodeAt(m++)<<16)|(key.charCodeAt(m++)<<8)|key.charCodeAt(m++);
			temp=((left>>>4)^right)&0x0f0f0f0f;right^=temp;left^=(temp<<4);
			temp=((right>>>-16)^left)&0x0000ffff;left^=temp;right^=(temp<<-16);
			temp=((left>>>2)^right)&0x33333333;right^=temp;left^=(temp<<2);
			temp=((right>>>-16)^left)&0x0000ffff;left^=temp;right^=(temp<<-16);
			temp=((left>>>1)^right)&0x55555555;right^=temp;left^=(temp<<1);
			temp=((right>>>8)^left)&0x00ff00ff;left^=temp;right^=(temp<<8);
			temp=((left>>>1)^right)&0x55555555;right^=temp;left^=(temp<<1);
			//the right side needs to be shifted and to get the last four bits of the left side
			temp=(left<<8)|((right>>>20)&0x000000f0);
			//left needs to be put upside down
			left=(right<<24)|((right<<8)&0xff0000)|((right>>>8)&0xff00)|((right>>>24)&0xf0);
			right=temp;
			//now go through and perform these shifts on the left and right keys
			for(i=0;i<shifts.length;i++){
				//shift the keys either one or two bits to the left
				if(shifts[i]){
					left=(left<<2)|(left>>>26);right=(right<<2)|(right>>>26);
				}
				else{
					left=(left<<1)|(left>>>27);right=(right<<1)|(right>>>27);
				}
				left&=-0xf;right&=-0xf;
				//now apply PC-2,in such a way that E is easier when encrypting or decrypting
				//this conversion will look like PC-2 except only the last 6 bits of each byte are used
				//rather than 48 consecutive bits and the order of lines will be according to
				//how the S selection functions will be applied:S2,S4,S6,S8,S1,S3,S5,S7
				lefttemp=pc2bytes0[left>>>28]|pc2bytes1[(left>>>24)&0xf]
				|pc2bytes2[(left>>>20)&0xf]|pc2bytes3[(left>>>16)&0xf]
				|pc2bytes4[(left>>>12)&0xf]|pc2bytes5[(left>>>8)&0xf]
				|pc2bytes6[(left>>>4)&0xf];
				
				righttemp=pc2bytes7[right>>>28]|pc2bytes8[(right>>>24)&0xf]
				|pc2bytes9[(right>>>20)&0xf]|pc2bytes10[(right>>>16)&0xf]
				|pc2bytes11[(right>>>12)&0xf]|pc2bytes12[(right>>>8)&0xf]
				|pc2bytes13[(right>>>4)&0xf];
				
				temp=((righttemp>>>16)^lefttemp)&0x0000ffff;
				keys[n++]=lefttemp^temp;keys[n++]=righttemp^(temp<<16);
			}
		}//for each iterations
		//return the keys we"ve created
		return keys;
		//end of des_createKeys
	},
	
	stringToHex:function(s){
		var r="";
		var hexes=new Array("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f");
		for(var i=0;i<(s.length);i++){
			r+=hexes[s.charCodeAt(i)>>4]+hexes[s.charCodeAt(i)&0xf];
		}
		return r;
	},
	
	HexTostring:function(s){
		var r="";
		for(var i=0;i<s.length;i+=2){
			var sxx=parseInt(s.substring(i,i+2),16);
			r+=String.fromCharCode(sxx);
		}
		return r;
	}

}

//随机信息，主要用于密码
//组成说明，0|100$2|1234$3$1|(位数|组成成分$位数|组成部分),id或obj,展示类型htm/value;位数为0，则直接将后面内容赋值
Js.ChangeStr=function(type,obj,typei){
	try{
		var v1="0123456789";
		var v2="abcdefghijklmnopqrstuvwxyz";
		var v3="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		var v4="~!@#$%^&*()?[]{}_+-=|<>?";
		var str="";
		var vstr="";
		if(type==null || type == ""){
			type="6";
		}
		ts=type.split("$");
		for(var ti=0;ti<ts.length;ti++){
			if(ts[ti]!=""){
				tss=(ts[ti]+"|").split("|");//获取规则
				tss[0]=Js.ChkId(tss[0],0,"",0);
				vstr=v1+v2+v3;
				if(tss.length>1){
					tss[1]=Js.ChkId(tss[1],0,4321,0);
					if(tss[1]>0){
						vstr="";
						if((""+tss[1]).indexOf("1")>=0){
							vstr+=v1;
						}
						if((""+tss[1]).indexOf("2")>=0){
							vstr+=v2;
						}
						if((""+tss[1]).indexOf("3")>=0){
							vstr+=v3;
						}
						if((""+tss[1]).indexOf("4")>=0){
							vstr+=v4;
						}
					}
				}
				if(vstr==""){
					vstr=v1+v2+v3;
				}
				if(tss[0]>0){
					str+=get(tss[0],vstr);
				}
				else{
					str+=tss[1];
				}
			}
		}
		if(obj!="" && obj!=null){
			if(typeof(obj)!="object"){
				obj=$(obj);
			}
			if(obj!=null){
				if(typei=="value"){
					obj.value=str;
				}
				else{
					obj.innerHTML=str;
				}
			}
		}
		return str;
		
		//获取随机数
		function get(len,vstrl) {
			vstrls=vstrl.split("");
			vistr="";
			for(var vi=0;vi<len;vi++){
				vistr+=vstrls[Math.floor(Math.random() * (vstrls.length))];
			}
			return vistr;
		}
	}
	catch(e){Js.Log("Js.ChangeStr:" + type);}
}

//展示页面
Js.ChangeView=function(obj,typeid)
{
	try{
		var re=null;
		if(typeof(obj)!="object"){
			obj=$(obj);
		}
		if(obj!=null){
			if (typeid != "change" && typeid != "changeb"){
				obj.style.display=typeid;
			}
			if (typeid == "change"){
			  if (obj.style.display=="none"){
				obj.style.display="";
			  }
			  else{
				obj.style.display="none";
			  }
			}
			if (typeid == "changeb")
			{
			  if (obj.style.display=="none"){
				obj.style.display="block";
			  }
			  else{
				obj.style.display="none";
			  }
			}
			re=obj.style.display;
		}
		return re;
	}
	catch(e){Js.Log("Js.ChangeView:" + title); return null;}
}

//获取光标定位
Js.GetSelection=function(type){
	try{
		var obj=null;
		var str="";
		if(window.getSelection){
			obj=window.getSelection();
			str=obj.toString();
		}
		else if(document.selection && document.selection.createRange) {
			obj=document.selection.createRange();
			str=obj.text;
		}
		return (type=="obj")?obj:str;
	}
	catch(e){
		Js.Log("Js.GetSelection");
	}
}

//鼠标插入内容
Js.insertAtCursor=function(obj,Value,type){
	try{
		if (document.selection && document.selection.createRange){
			//IE support
            obj.focus();
            var sel = document.selection.createRange();
			if(type !=null && type.toLowerCase()=="htm"){
				sel.pasteHTML(Value);
			}
			else{
            	sel.text = Value;
			}
            sel.select();
        }
		else if (obj.selectionStart || obj.selectionStart == "0"){
			var startPos = obj.selectionStart;
            var endPos = obj.selectionEnd;
            // save scrollTop before insert
            var restoreTop = obj.scrollTop;
			if(type !=null && type.toLowerCase()=="htm"){
				obj.innerHTML = obj.innerHTML.substring(0, startPos) + Value + obj.innerHTML.substring(endPos, obj.innerHTML.length);
			}
			else{
				obj.value = obj.value.substring(0, startPos) + Value + obj.value.substring(endPos, obj.value.length);
			}
            if (restoreTop > 0){
                // restore previous scrollTop
                obj.scrollTop = restoreTop;
            }
            obj.focus();
            obj.selectionStart = startPos + Value.length;
            obj.selectionEnd = startPos + Value.length;
        }
		else{
			if(type !=null && type.toLowerCase()=="htm"){
				obj.innerHTML += Value;
			}
			else{
				obj.value += Value;
			}
            obj.focus();
        }
	}
	catch(e){
		Js.Log("Js.insertAtCursor");
	}
}

//鼠标定位在输入信息结束处
Js.order=function(id){
	try{
		var e = $(id)==null?event.srcElement:$(id);
		if(e.value!=""){
			var r = e.createTextRange();
			r.moveStart('character',e.value.length);
			r.collapse(true);
			r.select();
		}
		else{
			e.focus();
		}
	}
	catch(e){//Js.Log("Js.order");
	}
}

//////////////////////数据处理区域//////////////////////////
Js.ObjToStr=function(o,type){
	var str="";
	try{
		type=Js.ChkId(type);
		if(typeof(o)=="object"){
			//对象处理方式
			for(var sm in o){
				if(sm!="getTab"){
					switch(type){
						case 220:
							str+= ("&" + sm + "=" + ((typeof(o[sm])=="object")?Js.ObjToStr(o[sm],type):o[sm]));
						break;
						case 221:
							str+= ("&" + sm + "=" + escape((typeof(o[sm])=="object")?Js.ObjToStr(o[sm],type):o[sm]));
						break;
						case 210:
							str+= (sm + ":" + ((typeof(o[sm])=="object")?Js.ObjToStr(o[sm],type):o[sm]) + "&");
						break;
						case 211:
							str+= (sm + ":" + escape((typeof(o[sm])=="object")?Js.ObjToStr(o[sm],type):o[sm]) + "&");
						break;
						case 110:
							str+= (sm + ":" + ((typeof(o[sm])=="object")?Js.ObjToStr(o[sm],0):o[sm]) + ";");
						break;
						case 111:
						default:
							str+= (sm + ":" + escape((typeof(o[sm])=="object")?Js.ObjToStr(o[sm],type):o[sm]) + ";");
						break;
					}
				}
			}
			if(str!="" && (type==220 || type==221)){
				str=str.substr(1);
			}
		}
		else if(typeof(o)=="string"){
			str=o;
		}
	}
	catch(e){Js.Log("Js.ObjToStr!Err:" + e.message);}
	return str;
}

Js.StrToObj=function(s,type){
	var So=new Object();
	try{
		if(s!="" && s!=null){
			//对象处理方式
			var sp=";";
			type=Js.ChkId(type);
			switch(parseInt(type/100)){
				case 2:
					sp="&";
				break;
				case 1:
				default:
					type=0;
					sp=";";
				break;
			}
			var sp2=":";
			switch(parseInt((type%100)/10)){
				case 2:
					sp2="=";
				break;
				case 1:
				default:
					sp2=":";
				break;
			}
			var si=s.split(sp);
			for(var sis=0;sis<si.length;sis++){
				si[sis]=si[sis].Trim();
				if(si[sis]!=null && si[sis]!="" && si[sis].indexOf(sp2)>0){
					sisi=si[sis].split(sp2);
					if(sisi.length>=2 && sisi[0]!="" && sisi[0]!=null){
						So[sisi[0]]=(type%10==1)?si[sis].substring(sisi[0].length+1):unescape(si[sis].substring(sisi[0].length+1));
					}
				}
			}
		}
	}
	catch(e){Js.Log("Js.StrToObj!Err:" + e.message);}
	return So;
}


Js.ListToArrObj=function(s,btype,stype){
	var AO=new Array();
	try{
		btype=(btype==null || btype=="")?"|":btype;
		stype=(stype==null || stype=="")?",":stype;
		if(s!=null || s!=""){
			var V=s.split("|");
			var Vk=V[0].split(",");
			var Vv;
			var Obj=new Object();
			for(var i=1;i<V.length;i++){
				Vv=V[i].split(",");
				Obj=new Object();
				for(var j=0;j<Vk.length && j<Vv.length;j++){
					Obj[Vk[j]]=unescape(Vv[j]);
				}
				AO.push(Obj);
			}
		}
	}
	catch(e){Js.Log("Js.ListToObj!Err:" + e.message);}
	return AO;
}

Js.GetObjVal=function(o,keys){
	var Val="";
	try{
		Val=o[keys];
	}
	catch(e){}
	return Val;
}


//时间通用
//月份天数信息
Js.Time_GetDays=function(month, year){
	var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31,30, 31, 30, 31];
	if (2 == month)
		return ((0 == year % 4) && (0 != (year % 100))) ||(0 == year % 400) ? 29 : 28;
	else
		return daysInMonth[month-1];
}



//ChkStr数据验证处理函数====
Js.ChkStr=function(str,type,arr){
	try{
		
	}
	catch(e){Js.Log("Js.ChkStr");}
}

//ChkForm表单数据验证处理函数====
Js.ChkForm=function(obj){
	try{
		if(obj != null && obj != "" && typeof(obj) == "object"){
			str="";
			
			return str;
		}
		else{
			return true;
		}
	}
	catch(e){Js.Log("Js.ChkForm");}
}

//层信息替换
Js.ViewHtm=function(obj,str){
	try{
		if(typeof(obj)!="object"){
			obj=$(obj);
		}
		if(obj!=null ){
		    if ((obj.innerHTML != "" && obj.getAttribute("CacheView") == null)) {
				obj.setAttribute("CacheView",escape(obj.innerHTML));
				obj.innerHTML="";
			}
			if(str!=null && str !=""){
			    obj.setAttribute("CacheView", escape(str));
			}
			return unescape(obj.getAttribute("CacheView"));
		}
		else{
			return "";
		}
	}
	catch(e){Js.Log("Js.ViewHtm");return "";}
}

//层信息获取
Js.GetHtm=function(id){
	try{
		if($(id)!=null){
			var str=$(id).innerHTML;
			$(id).parentNode.removeChild($(id));
			return str;
		}
		else{
			return null;
		}
	}
	catch(e){Js.Log("Js.GetHtm");return null;}
}

//Alert设置
Js.AlertSet=function(id,info,type){
	try{
		if($(id)!=null){
			var obj=null;
			type=(type==null)?"info":type;
			switch(type.toLowerCase()){
				case "title":
					obj=$(id).childNodes[0].childNodes[0].childNodes[0];
				break;
				default:
					obj=$(id).childNodes[0].childNodes[1];
				break;
			}
			if(obj!=null){
				obj.innerHTML=info;
			}
			obj=null;
			delete obj;
			try { CollectGarbage(); } catch (e) { }
		}
	}
	catch(e){Js.Log("Js.AlertSet:" + id);}
}

//Alert获取
Js.AlertGet=function(id,type){
	try{
		if($(id)!=null){
			var obj=null;
			type=(type==null)?"info":type;
			switch(type.toLowerCase()){
				case "title":
					obj=$(id).childNodes[0].childNodes[0].childNodes[0];
				break;
				default:
					obj=$(id).childNodes[0].childNodes[1];
				break;
			}
			if(obj!=null){
				return obj;
			}
		}
	}
	catch(e){Js.Log("Js.AlertGet:" + id);}
}

//层
Js.AlertId=function(id){
	try{
		if($(id)!=null){
			var wid=Js.Get("Att_WinId",id);
			if(wid==null){
				wid="Win_" + id;
			}
			var at_wt=new Object();
			at_wt.id=wid;
			at_wt.submits="";
			at_wt.width=Js.Get("Att_Swidth",id);
			at_wt.height=Js.Get("Att_Sheight",id);
			at_wt.ckclose=(Js.Get("Att_CkClose",id)=="true")?true:false;
			at_wt.ckmove=(Js.Get("Att_CkMove",id)=="true")?true:false;
			Js.Alert(Js.Get("Att_WinTitle",id),Js.ViewHtm(id),at_wt);
			//Js.Alert(Js.Get("Att_WinTitle",id),Js.ViewHtm(id),wid,"",Js.Get("Att_Swidth",id),Js.Get("Att_Sheight",id),CkClose,CkMove);
		}
	}
	catch(e){Js.Log("Js.AlertId:" + id)}
}

Js.AlertIdExists=function(id){
	var ck=false;
	try{
		var wid=Js.Get("Att_WinId",id);
		if(wid==null){
			wid="Win_" + id;
		}
		if($(wid)!=null){
			ck=true;
		}
	}
	catch(e){Js.Log("Js.AlertIdExists:" + id)}
	return ck;
}

Js.AlertIdClose=function(id){
	try{
		Js.AlertClose("Win_" + id);
	}
	catch(e){Js.Log("Js.AlertIdClose:" + id)}
}

//将不再使用
//upform函数(form,lock,obj_id,endobj)升级(form的id，结束后执行，结束前执行，提交层id，锁定多少层)
Js.Upform = function (form, endobj, endlobj, obj_id, lock) {
    try {
        if ($(form) != null) {
            lock = Js.ChkId(lock, 0, 100, 40);
            var div_id = "Upform_" + Js.ChangeNow();
            var obj = document.body;
            if (obj_id !== "" && obj_id != null) { obj = $(obj_id); }
            if (endobj == null) endobj = "";
            if (endlobj != "" && endlobj != null && endlobj.substr(endlobj.length - 1, endlobj.length) != ";") {
                endlobj += ";";
            }
            var lockobj = "";
            if (lock > 0) {//锁定层
                //创建层
                var obj_lock = document.createElement("div");
                obj_lock.id = div_id + "_lock";
                obj_lock.style.width = "100%";
                obj_lock.style.height = "100%";
                obj_lock.style.position = "absolute";
                obj_lock.style.left = "0px";
                obj_lock.style.top = "0px";

                obj_lock.style.zIndex = "1000000000";
                obj_lock.style.backgroundColor = "#ffffff";
                obj_lock.style.filter = "alpha(opacity=" + lock + ")";
                //FF
                obj_lock.style.MozOpacity = lock / 100;
                obj_lock.style.opacity = lock / 100;
                obj.appendChild(obj_lock);

                lockobj = "if($('" + div_id + "_lock')!=null){" + div_id + "_lock.parentNode.removeChild(" + div_id + "_lock);}"; //关闭操作
            }
            //
            var obj_form = document.createElement("div");
            obj_form.id = "Div_Js_" + div_id;
            obj_form.innerHTML = "<iframe id=\"" + div_id + "\" src=\"about:blank\" width=\"0\" height=\"0\" name=\"" + div_id + "\" frameborder=\"0\" onload=\"" + endlobj + "+this.parentNode.parentNode.removeChild(this.parentNode);" + lockobj + endobj + "\" onreadystatechange=\"if(this.readyState=='complete'){" + endlobj + "+this.parentNode.parentNode.removeChild(this.parentNode);" + lockobj + endobj + ";this.onload=function(){return false;};}\"></iframe>";
            document.body.appendChild(obj_form);
            $(form).method = "post";
            //$(form).target="_blank";
            alert(div_id);
            $(form).target = div_id;
            $(form).submit();
        }
    }
    catch (e) { Js.Log("Js.Upform:" + e.message); }
}

///ajax
//单线保存，不返回
Js.Ajax_Save=function(url,sendmsg,obj,id){
	try{
		Js.Ajax_Submit(url,sendmsg,id,null,null,obj);
	}
	catch(e){Js.Log("Js.Ajax_Save:"+url);}
}

//地址，上传资料，提交id号，提交对象(锁屏用)，锁的层次，执行完毕时的执行函数（传回信息），最后两个为默认，不设置
Js.Ajax_Submit = function(url, sendmsg, id, obj, lock, oobj, ckerr, i) {
    try {
        //进行锁屏
        lock = Js.ChkId(lock, 0, 100, 40);
        i = Js.ChkId(i, 0, "", 0);
        if (typeof (sendmsg) != "string") { sendmsg = null; }
        id = (id != null) ? id : ("AjaxSubmit_" + Js.ChangeNow());
        //if (id != null && lock > 0 && $(id + "_lock") == null) {
            //Js.Lock(id + "_lock", document.body, lock);
            //创建层
            //var obj_lock = document.createElement("div");
            //obj_lock.id						= id + "_lock";
            //obj_lock.style.width			= "100%";
            //obj_lock.style.height			= "100%";
            //obj_lock.style.position			= "absolute";
            //obj_lock.style.left				= "0px";
            //obj_lock.style.top				= "0px";

            //obj_lock.style.zIndex			= "1000000000";
            //obj_lock.style.backgroundColor	= "#fff";
            //obj_lock.style.filter			="alpha(opacity=" + lock + ")";
            ////FF
            //obj_lock.style.MozOpacity =lock/100;
            //obj_lock.style.opacity =lock/100;
            //if(typeof(obj)!="object"){obj=document.body;}
            //obj=document.body;//暂时默认，考虑考虑
            //obj.appendChild(obj_lock);
        //}
        //提交进度条(i)===
        if (i == 0) {
            //展示进度条，创建。。。
			Loading.Create(id + "_Loading",lock);
        }
        Js.Ajax(url, setstr, "501", sendmsg, true ,loadobj);
        function setstr(str) {
			//alert("str");
            //str返回，$100|331$反馈信息$<script>
            //错误记录，循环3次
            if (str == null || str == "") { str = "$256$"; }
            var stri = str.match(/\d+/g);
            if (stri.length > 0 && stri[0] >= 300 && stri[0] < 700) {
                if (i <= 3) {
                    if (i == "" || i == null) {
                        i = 0;
                    }
                    i++;
                    Js.Ajax_Submit(url, sendmsg, id, obj, lock, oobj, ckerr, i);
                }
                else {
                    if (ckerr != false) { ckerr = true; }
                    //解除锁屏
                    //Js.LockClose(id + "_lock");
					Loading.Set(id + "_Loading",100,"处理完成！");
                    if (ckerr) {
                        Js.Alert("错误提示", "错误代码：Err[" + stri[0] + "]<br>错误描述：操作失败，请联系系统管理员！");
                    } else if (typeof (oobj) == "function") {
                        oobj(str, stri[0]);
                    }
                }
            }
            else {
                //解除锁屏
                //Js.LockClose(id + "_lock");
				Loading.Set(id + "_Loading",100,"处理完成！");
                var strspilt = str.split("$");
                if (str == "$256$") {
                    var at_err = new Object();
                    at_err.id = id;
                    Js.Alert("失败提示", "[返回空信息错误！Err:256]", at_err);
                    //Js.Alert("失败提示","[返回空信息错误！Err:256]",id);
                }
                if (strspilt.length > 5 && strspilt[2] != null && strspilt[2] != "") {
                    var at_erri = new Object();
                    at_erri.id = id;
                    if (strspilt[4] != null && strspilt[4] != "") {
                        at_erri.submits = unescape(strspilt[4]);
                    }
                    Js.Alert(((stri[0] >= 200) ? "失败" : "成功") + "提示", unescape(strspilt[2]), at_erri);
                }
                if (typeof (oobj) == "function") {
                    if (strspilt.length > 5 && strspilt[2] != null && strspilt[2] != "") {
                        oobj(str, stri[0], strspilt[3]);
                    }
                    else {
                        oobj(str, stri[0]);
                    }
                }
            }
        }
		
		function loadobj(type){
			switch(type){
			  case 1:
				  Loading.Set(id + "_Loading",10,((i>0)?"提交异常，第 " + (i+1) + "/3 次尝试提交..." : "正在提交..."));
				  break;
			  case 2:
				  Loading.Set(id + "_Loading",60,"提交完成，正在处理...");
				  break;
			  case 3:
				  Loading.Set(id + "_Loading",80,"处理完成，正在解析...");
				  break;
			  case 4:
				  Loading.Set(id + "_Loading",95,"解析完成，处理结束...");
				  break;
			  }
			  /*if($(loadobj)!="" && $(loadobj) != null){
				  $(loadobj).innerHTML=type;
			  }*/
		  }
		
    }
    catch (e) { Js.Log("Js.Ajax_Submit:" + url + sendmsg); }
}

//整体更新
//提交地址，结束执行，错误展示，提交内容，提交类型，提交进度条obj,endobj,errmsg,sendmsg,async,loadobj,readcode(取htm页面用Get)
Js.Ajax=function(obj,endobj,errmsg,sendmsg,async,loadobj,readcode){
	try{
		var ck=true;
		var method="POST";
		if(typeof(obj)=="object"){
			url=obj.url;
			endobj=obj.endobj;
			errmsg=obj.errmsg;
			sendmsg=obj.sendmsg;
			async=obj.async;
			loadobj=obj.loadobj;
			readcode=obj.readcode;
			method=(obj.method!="" && obj.method!=null && obj.method.toUpperCase()=="GET")?"GET":"POST";
		}
		else{
			url=obj;
		}
		if(url == null || url == ""){
			if(endobj!=null && typeof(endobj) == "function" && errmsg != "" && errmsg != null){endobj(errmsg)};
			ck=false;
		}
		if(ck){
			var http_request = Js.Ajax_createHttpRequest();
			//状态
			loading(0);//0初始化0%，1载入10%，2载入完成60%，3交互并解析80%，4解析完成99%（建议）
			//创建军请求结果处理
			http_request.onreadystatechange = function(){
				loading(http_request.readyState)
				if(http_request.readyState!=null && http_request.readyState==4){
					loading(http_request.status);
					if (http_request.status==200){
						view(http_request.responseText);
						http_request=null;
						delete http_request;
						try { CollectGarbage(); } catch (e) { }
					}
					else{
						if(errmsg == null){
							errmsg="";
						}
						view(errmsg);
						http_request=null;
						delete http_request;
						try { CollectGarbage(); } catch (e) { }
					}
				}
			}
			// 确定发送请求的方式和URL以及是否同步执行下段代码
			if(sendmsg==null || sendmsg ==""){sendmsg=null;}
			sendmsg=(typeof(sendmsg)=="object")?Js.ObjToStr(sendmsg,220):sendmsg;
			if(async!=false){async=true;}
			//打开连接, true 表示异步提交POST，或者get
			http_request.open(method, url, async);
			//post提交设置项
			if(sendmsg!=null){
				http_request.setRequestHeader("content-length",sendmsg.length);//post提交设置项
			}
			//http_request.setRequestHeader("If-Modified-Since", "0");///
			//当方法为post时需要如下设置Http
			//http_request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
			http_request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			//代码不缓存
			http_request.setRequestHeader("Cache-Control","no-cache");
			//http_request.setRequestHeader("Connection", "close");
			//发送数据
			http_request.send(sendmsg);
			//返回状态
			return http_request;
			//清空状态
			//http_request.abort();
			//清空信息
			delete http_request;
		}
		delete ck;
		try { CollectGarbage(); } catch (e) { }
		
		//赋值。。。
		function view(msg){
			if(endobj!="" && endobj!=null){
				switch(typeof(endobj)){
					case "function":
						try{endobj(msg,readcode);}catch(e){}
					break;
					case "object":
						try{endobj.innerHTML=msg;}catch(e){}
					break
					default:
						try{$(endobj).innerHTML=msg;}catch(e){}
				}
			}
		}
		
		//进度展示
		function loading(type){
			if(type==null){
				type=1;
			}
			switch(typeof(loadobj)){
				case "function":
					loadobj(type);
				break;
				case "object":
					loadobj.innerHTML=type;
				break;
				default:
					if(loadobj!="" && loadobj !=null){
					  switch(type){
						case 1:
							Loading.Set(loadobj,10,"正在载入...");
							break;
						case 2:
							Loading.Set(loadobj,60,"载入完成，正在交互...");
							break;
						case 3:
							Loading.Set(loadobj,80,"交互完成，正在解析...");
							break;
						case 4:
							Loading.Set(loadobj,95,"解析完成，准备展示...");
							break;
						}
						/*if($(loadobj)!="" && $(loadobj) != null){
							$(loadobj).innerHTML=type;
						}*/
					}
			}
		}
	}
	catch(e){Js.Log("Js.Ajax:" + url+ "|ErrMsg:" + e.message);}
}

//获取内容,提供内容，错误提示
Js.AjaxMsg=function(str,ErrCk){
	try{
		var type=256;
		var htm="";
		var out="";
		var submits="";
		if(str ==null || str ==""){str="$256$";}
		var stri=str.match(/\d+/g);
		var strspilt=str.split("$");
		if(str=="$256$"){
			Js.Alert("失败提示","[返回空信息错误！Err:256]");
		}
		ErrCk=ErrCk?true:false;
		if(ErrCk){
			var ErrMsg="";
			switch(stri[0]){
				case 251:
					ErrMsg="您无权操作！";
				break;
				default:
				break;
			}
			if(ErrMsg!=""){
				Js.Alert("失败提示","[" + ErrMsg + " ErrId:" + stri[0] + "]");
			}
		}
		if(strspilt.length>5){
			type=Js.ChkId(stri[0]);
			htm=(strspilt[2] != null && strspilt[2] !="")?unescape(strspilt[2]):"";
			out=(strspilt[3] != null && strspilt[3] !="")?unescape(strspilt[3]):"";
			submits=strspilt[4];
		}
		return {
			type:type,
			htm:htm,
			out:out,
			submits:submits
		}
	}
	catch(e){Js.Log("Js.AjaxMsg:" + str + "|ErrMsg:" + e.message);}
}
//================脚本处理相关===============
Js.Child={
	removeAllChild:function(o){
		try{
			o=(typeof(o)=="object")?o:$(o);
			while(o.hasChildNodes()){//当div下还存在子节点时 循环继续
				o.removeChild(o.firstChild);
			}
		}
		catch(e){Js.Log("Js.Child.removeAllChild:" + o + "|ErrMsg:" + e.message);}
	}
}

//================表格相关===================
Js.Table={
	//表单移动，移动对象，当前行，移动行
	MoveRow:function(tab,line1,line2){
		try{
			tab.rows[line1].swapNode(tab.rows[line2])
		}
		catch(e){Js.Log("Js.Table.MoveRow");}
	}
}

//================选项卡相关==================

//选项卡点击，选项卡对象，相中id
Js.STabCheck=function(obj,vi){
	try{
		//非自身
		vi=Js.ChkId(vi);
		if(obj.className!="on"){
			var tobj=obj.parentNode;
			var Infoobj=tobj.parentNode.parentNode;
			var oi=0;
			for(var i=0;i<tobj.childNodes.length;i++){
				if(tobj.childNodes[i]==obj){
					tobj.childNodes[i].className="on";
					if(vi>0 && Infoobj.childNodes.length>(vi+i)){
						Infoobj.childNodes[vi+i].style.display="";
					}
				}
				else{
					tobj.childNodes[i].className="";
					if(vi>0 && Infoobj.childNodes.length>(vi+i)){
						Infoobj.childNodes[vi+i].style.display="none";
					}
				}
			}
		}
	}
	catch(e){Js.Log("Js.STabCheck:" + obj);}
}


//================移动相关=====================

//列表移动,,<div id="divPhoto" onmousedown="Js.DivLiMove(this)"></div>//当前层或者移动层id，空
Js.DivLiMove={
	Init:function(obj){
		try{
			if(typeof(obj)!="object" && obj!="" && obj!=null){
				obj=$(obj);
			}
			if(obj!=null && typeof(obj)=="object"){
				//禁止选中
				obj.onselectstart = function(){return false;}
				//鼠标按下
				obj.onmousedown=function(evt){
					//获取列表顺序
					Js.DivLiMove.isMove = false;
					//var lis = obj.getElementsByTagName("li");
					var lis=obj.childNodes;
					for(var i = 0; i < lis.length; i++){
						lis[i]["pos"] = Js.DivLiMove.getElementPos(lis[i]);
						lis[i]["size"] = Js.DivLiMove.getElementSize(lis[i]);
					}
					var evt=evt?evt:(window.event?window.event:null);
					var nt = evt.target || evt.srcElement;
					var t=nt;
					while(t.tagName.toLowerCase()!="li" && t!=document.body){
						t=t.parentNode;
					}
					if(t.tagName.toLowerCase() == "li"){
						var p = Js.GetXY(evt);
						var el = t.cloneNode(true);
						el.className += " IndexNo_Edit_Move";
						try{
							el.style.left = t.pos.x + "px"; //t.pos.x + 3 + "px"
							el.style.top = t.pos.y - obj.scrollTop + "px";//t.pos.y + 3 - obj.scrollTop
							el.style.width = t.size.width + "px"; 
							el.style.height = t.size.height + "px";
						}
						catch(e){}
						el.style.zIndex = GetzIndex();
						el.style.cursor = "default";
						el.onselectstart = function(){return false;}
						document.body.appendChild(el);
						
						var Mdiv = document.createElement("div");
						Mdiv.style.width = "100%";
						Mdiv.style.height = "1px";
						Mdiv.style.fontSize = "0";
						Mdiv.style.background = "red"; 
						
						document.onmousemove = function(evt){
							var evt=evt?evt:(window.event?window.event:null);
							var current = Js.GetXY(evt);
							try{
								el.style.left =t.pos.x + current.X - p.X + "px"; 
								el.style.top =t.pos.y + current.Y - p.Y - obj.scrollTop + "px";
							}
							catch(e){}
							//判断插入点 
							for(var i = 0; i < lis.length; i++){
								if(lis[i].tagName.toLowerCase() == "li"){
									if(current.X > lis[i]["pos"]["x"] && current.X < lis[i]["pos"]["x"] + lis[i]["size"]["width"] && (current.Y + obj.scrollTop) > lis[i]["pos"]["y"] && (current.Y + obj.scrollTop) < lis[i]["pos"]["y"] + lis[i]["size"]["height"]/2){
										if(t != lis[i]){
											Js.DivLiMove.isMove = true;
											obj.insertBefore(Mdiv,lis[i]);
										}
									}
									else if(current.X > lis[i]["pos"]["x"] && current.X < lis[i]["pos"]["x"] + lis[i]["size"]["width"] && (current.Y + obj.scrollTop) > lis[i]["pos"]["y"] + lis[i]["size"]["height"]/2 && (current.Y + obj.scrollTop) < lis[i]["pos"]["y"] + lis[i]["size"]["height"]){
										if(t != lis[i]){
											Js.DivLiMove.isMove = true;
										}
									}
								}
							}
							
						}
						
						//移除事件
						document.onmouseup = function(evt){
							var evt=evt?evt:(window.event?window.event:null);
							document.onmousemove = null;
							if(Js.DivLiMove.isMove){
								try{
									obj.replaceChild(t,Mdiv);
									Js.DivLiMove.isMove = false;
								}
								catch(e){}
							}
							else{
								//未移动，单击动作
								try{
									nt.click();
								}
								catch(e){}
							}
							if(el!=null){
								document.body.removeChild(el);
							}
							el = null;
							document.onmouseup = null;
						}
					}
				}
			}
			
		}
		catch(e){Js.Log("Js.DivLiMove.Init:" + obj);}
	},
	
	//获取对象位置
	getElementPos:function(el){ 
			//alert(el.scrollTop);
		return { 
			x : (el.offsetParent ? el.offsetLeft + arguments.callee(el.offsetParent)["x"] : el.offsetLeft), 
			y : (el.offsetParent ? el.offsetTop + arguments.callee(el.offsetParent)["y"] : el.offsetTop)
		}
	},
	
	//获取对象宽高
	getElementSize:function(el){
		return {
			width : el.offsetWidth, 
			height : el.offsetHeight
		}
	}

}

//=================日期时间模块================
Js.DateTime={

	//初始化界面，传入id或obj，传入时间(空为当前时间)，类型date-日期time-时间stime-短时间时分（0）日期时间，返回格式（yyyy：4位年，MM：2位月份，dd：2位日期，HH：2位24小时，hh2位12小时，mm：2位分钟，ss：2位秒，单字母则表示小于0显示一位数，空则返回标准格式:yyyy-MM-dd HH:mm:ss；样式）
	Open:function(Obj){
		var RHtm="";
		try{
			var ReturnId=(Obj["ReturnId"]==null || Obj["ReturnId"]=="")?"":Obj["ReturnId"];
			var ReturnType=(Obj["ReturnType"]==null || Obj["ReturnType"]=="")?"value":Obj["ReturnType"];
			var Value=(Obj["Value"]==null || Obj["Value"]=="")?Js.ChangeNow():Obj["Value"]; 
			var Typeid=(Obj["Typeid"]==null || Obj["Typeid"]=="")?"datetime":Obj["Typeid"].toLowerCase();
			Typeid=(Typeid=="date" || Typeid=="time" || Typeid=="stime")?Typeid:"datetime";
			var Format=(Obj["Format"]==null || Obj["Format"]=="")?"yyyy-MM-dd HH:mm:ss":Obj["Format"];
			var Classname=(Obj["Classname"]==null || Obj["Classname"]=="")?"":Obj["Classname"];
			var Width=(Js.ChkId(Obj["Width"])<=400)?400:Js.ChkId(Obj["Width"]);
			var CloseObj=(Obj["CloseObj"]==null || Obj["CloseObj"]=="")?"":Obj["CloseObj"];

			var Vi = Value.match(/\d+/g);
			Vi[1]=Vi[1]-1;

			var Vi = (Value+":8888:8888:8888:8888:8888:8888:8888").match(/\d+/g);
			Vi[1]=Vi[1]-1;
			Vi[0]=Js.ChkId(Vi[0],1900,2099,Js.Now.getFullYear());
			Vi[1]=Js.ChkId(Vi[1],1,12,Js.Now.getMonth());
			Vi[2]=Js.ChkId(Vi[2],1,31,Js.Now.getDate());
			Vi[3]=Js.ChkId(Vi[3],0,23,Js.Now.getHours());
			Vi[4]=Js.ChkId(Vi[4],0,59,Js.Now.getMinutes());
			Vi[5]=Js.ChkId(Vi[5],0,59,Js.Now.getSeconds());


			var D=new Date(Vi[0],Vi[1],Vi[2],Vi[3],Vi[4],Vi[5]);
			Value=D.Format(Format);
			//alert(new Date(Vi[0],Vi[1],1).getDay());
			RHtm="<div class=\""+Classname+"\" style=\"width:"+Width+"px;\">";

			RHtm+="<ul class=\"DateTime_Title\"><li onclick=\"Js.DateTime.GetDates(this.nextElementSibling,-1);\">&lt;</li><li style=\"width:"+(Width-90)+"px;\" class=\"DateTime_YearMonth\" value=\""+(Vi[0]*12+Vi[1])+"\" vyear=\""+Vi[0]+"\" vmonth=\""+Vi[1]+"\" vday=\""+Vi[2]+"\" ondate=\""+(Vi[0]*10000+Vi[1]*100+Vi[2]*1)+"\" onclick=\"Js.DateTime.GetDates(this,2);\">"+Vi[0]+"年"+(Vi[1]+1)+"月</li><li  onclick=\"Js.DateTime.GetDates(this.previousElementSibling,1);\">&gt;</li></ul>";
			RHtm+="<ul class=\"DateTime_Date\">"+Js.DateTime.GetDateList(Vi[0],Vi[1],Vi[0]*10000+Vi[1]*100+Vi[2]*1)+"</ul>";
			RHtm+="<ul class=\"DateTime_Time\"><div class=\"Changes\" style=\"width:"+(Width-20)+"px; display:none;\"></div><div><li>时间：</li><li class=\"DT\" onClick=\"Js.DateTime.ChangeTime(this,1);\">"+Vi[3]+"</li><li>:</li><li class=\"DT\" onClick=\"Js.DateTime.ChangeTime(this,3);\">"+Vi[4]+"</li><li>:</li><li class=\"DT\" onClick=\"Js.DateTime.ChangeTime(this,5);\">"+Vi[5]+"</li></div></ul>";
			RHtm+="<ul class=\"DateTime_Sub\"><input class=\"Msg\" style=\"width:"+(Width-216)+"px;\" type=\"text\" Format=\""+escape(Format)+"\" value=\""+Value+"\" placeholder=\"请按照格式填写\" ><input type=\"button\" value=\"当前\" onClick=\"Js.DateTime.CheckNow(this);\"><input type=\"button\" value=\"确定\" onClick=\"Js.Set('"+ReturnType+"','"+ReturnId+"',this.previousElementSibling.previousElementSibling.value);"+CloseObj+"\"><input type=\"button\" value=\"取消\" onClick=\""+CloseObj+"\"></ul>";

			RHtm+="</div>";
		}
		catch(e){Js.Log("Js.DateTime.Open!Errmsg:" + e.message);}
		return RHtm;
	},

	//获取日历表
	GetDates:function(Vobj,T){
		var RHtm="";
		try{
			var Val=Js.ChkId(Js.Get("Att_value",Vobj));
			var vyear=Js.ChkId(Js.Get("Att_vyear",Vobj));
			var vmonth=Js.ChkId(Js.Get("Att_vmonth",Vobj));//显示+1
			var vday=Js.ChkId(Js.Get("Att_vday",Vobj));
			var ondate=Js.ChkId(Js.Get("Att_ondate",Vobj));
			var sy=0;
			var syear=0;
			var smonth=0;
			var run=true;
			//处理Val内容
			if(T==-1){
				//向上
				Val=Val-1;
			}
			else if(T==1){
				//向后
				Val=Val+1;
			}
			else if(T==2){
				//上级
				Val=Val>10000?parseInt(Val/12):(Val>1900?parseInt(Val/10):(Val>190?parseInt(Val/10):Val));
			}
			run=(Val==19 || Val==20 || (Val>=190 && Val<=209) || (Val>=1900 && Val<=2099) || (Val>=22800 && Val<=25200)) &&  (Val!=Js.ChkId(Js.Get("Att_value",Vobj)) || T==0);
			if(run){
				Js.Set("Att_value",Vobj,Val);
				var HtmObj=Vobj.parentNode.nextElementSibling;
				HtmObj.className=Val>10000?"DateTime_Date":"DateTime_YM";
				if(Val>10000){
					syear=parseInt(Val/12);
					smonth=Val%12;
					Js.Set("htm",Vobj,syear+"年"+(smonth+1)+"月");
					RHtm+=Js.DateTime.GetDateList(syear,smonth,ondate);
				}
				else if(Val>=1900){
					//月份选择
					syear=Val;
					Js.Set("htm",Vobj,syear+"年");
					for(var i=0;i<12;i++){
						RHtm+="<li style=\"width: 25%;\"><div class=\""+(syear==vyear && vmonth==i?"On":"")+"\" onClick=\"Js.DateTime.GetDateChange(this,"+(syear*12+i)+");\">"+(i+1)+"月</div></li>";
					}
				}
				else if(Val>=190){
					//年份选择
					Val=Val*10;
					Js.Set("htm",Vobj,Val+"-"+(Val+9));
					for(var i=Val;i<Val+10;i++){
						RHtm+="<li style=\"width: 20%;\"><div class=\""+(vyear==i?"On":"")+"\" onClick=\"Js.DateTime.GetDateChange(this,"+i+");\">"+i+"</div></li>";
					}
				}
				else{
					//10年份选择
					Val=Val*10;
					Js.Set("htm",Vobj,Val*10+"-"+(Val*10+99));
					for(var i=Val;i<Val+10;i++){
						RHtm+="<li style=\"width: 50%;\"><div class=\""+(parseInt(vyear/10)==i?"On":"")+"\" onClick=\"Js.DateTime.GetDateChange(this,"+i+");\">"+(i*10+"-"+(i*10+9))+"</div></li>";
					}
				}
				Js.Set("htm",HtmObj,RHtm);
			}
		}
		catch(e){Js.Log("Js.DateTime.GetDates!Errmsg:" + e.message);}
		return RHtm;
	},

	//日期列表
	GetDateList:function(syear,smonth,ondate){
		var RHtm="";
		try{
			RHtm+="<li class=\"WeekTitle\">日</li><li class=\"WeekTitle\">一</li><li class=\"WeekTitle\">二</li><li class=\"WeekTitle\">三</li><li class=\"WeekTitle\">四</li><li class=\"WeekTitle\">五</li><li class=\"WeekTitle\">六</li>";
			//根据年月，取当日周几，然后前面补几个
			for(var i=(1-new Date(syear,smonth,1).getDay());i<=Js.Time_GetDays(smonth+1,syear);i++){
				RHtm+=i>0?"<li><div class=\"Date "+((syear*10000+smonth*100+i==ondate)?"DateOn":"")+"\" onClick=\"Js.DateTime.ChangeDay(this,"+i+");\">"+i+"</div></li>":"<li>&nbsp;</li>";
			}
		}
		catch(e){Js.Log("Js.DateTime.GetDateList!Errmsg:" + e.message);}
		return RHtm;
	},

	//选中处理
	GetDateChange:function(Obj,Val){
		try{
			var DObj=Obj.parentNode.parentNode.previousElementSibling.childNodes[1];
			Js.Set("Att_value",DObj,Val);
			if(Val>=22800){
				Js.Set("Att_vyear",DObj,parseInt(Val/12));
				Js.Set("Att_vmonth",DObj,Val%12);
				Js.DateTime.GetDates(DObj,0);
			}
			else if(Val>=1900){
				Js.Set("Att_vyear",DObj,Val);
				Js.DateTime.GetDates(DObj,0);
			}
			else if(Val>=190){
				Js.DateTime.GetDates(DObj,0);
			}
		}
		catch(e){Js.Log("Js.DateTime.GetDateChange!Errmsg:" + e.message);}
	},

	//选中日期
	ChangeDay:function(Obj,Val){
		try{
			var DObj=Obj.parentNode.parentNode.previousElementSibling.childNodes[1];
			Js.Set("Att_vday",DObj,Js.ChkId(Val));
			var VObj=$(".Date");
			for(var i=0;i<VObj.length;i++){
				VObj[i].className="Date";
			}
			Obj.className="Date DateOn";
			Js.DateTime.SetInput(Obj.parentNode.parentNode.parentNode);
		}
		catch(e){Js.Log("Js.DateTime.ChangeDay!Errmsg:" + e.message);}
	},

	//选择时间
	ChangeTime:function(Obj,Typeid){
		try{
			var HObj=Obj.parentNode.previousElementSibling;
			if(HObj.style.display==""){
				HObj.style.display="none";
			}
			else{
				var Htm="";
				var SVal=60;
				var mT="-325px";
				var Title="";
				if(Typeid==1){
					//小时
					SVal=24;
					mT="-190px";
					Title="24小时选择";
				}
				else if(Typeid==3){
					Title="60分钟选择";
				}
				else{
					Title="60秒选择";
				}
				Htm="<li class=\"title\">"+Title+"</li>";
				for(var i=0;i<SVal;i++){
					Htm+="<li><div class=\""+(Js.ChkId(Obj.innerHTML)==i?"On":"")+"\" onclick=\"Js.DateTime.CheckTime(this,"+Typeid+")\">"+i+"</div></li>";
				}
				HObj.style.marginTop=mT;
				Js.Set("htm",HObj,Htm);
				HObj.style.display="";
			}
		}
		catch(e){Js.Log("Js.DateTime.ChangeTime!Errmsg:" + e.message);}
	},

	//选中时间
	CheckTime:function(Obj,Typeid){
		try{
			var Val=Js.ChkId(Obj.innerHTML);
			Obj=Obj.parentNode.parentNode;
			Obj.innerHTML="";
			Obj.style.display="none";
			var FObj=Obj.nextElementSibling.getElementsByTagName("li")[Typeid];
			Js.Set("htm",FObj,Val>=10?Val:("0"+Val));
			Js.DateTime.SetInput(Obj.parentNode.parentNode);
		}
		catch(e){Js.Log("Js.DateTime.CheckTime!Errmsg:" + e.message);}
	},

	//当前时间
	CheckNow:function(Obj){
		try{
			var JN=new Date();
			try{JN=Js.Now;}catch(e){}
			//日期
			var DObj=Obj.parentNode.previousElementSibling.previousElementSibling.childNodes[0].childNodes[0];
			Js.Set("Att_ondate",Obj.parentNode.parentNode.childNodes[0].childNodes[1],JN.getFullYear()*10000+JN.getMonth()*100+JN.getDate());
			Js.Set("Att_vday",Obj.parentNode.parentNode.childNodes[0].childNodes[1],JN.getDate());
			Js.DateTime.GetDateChange(DObj,JN.getFullYear()*12+JN.getMonth());
			//var DObj=Obj.parentNode.parentNode.childNodes[0].childNodes[1];
			//Js.Set("Att_value",DObj,JN.getFullYear()*12+JN.getMonth());
			//Js.Set("Att_vyear",DObj,JN.getFullYear());
			//Js.Set("Att_vmonth",DObj,JN.getMonth());
			//Js.Set("Att_vmonth",DObj,JN.getDate());
			//Js.DateTime.GetDates(DObj,0);
			//时间
			var FObj=Obj.parentNode.previousElementSibling.getElementsByTagName("li");
			Js.Set("htm",FObj[1],JN.getHours()>=10?JN.getHours():("0"+JN.getHours()));
			Js.Set("htm",FObj[3],JN.getMinutes()>=10?JN.getMinutes():("0"+JN.getMinutes()));
			Js.Set("htm",FObj[5],JN.getSeconds()>=10?JN.getSeconds():("0"+JN.getSeconds()));

			//更新输入框
			Js.DateTime.SetInput(Obj.parentNode.parentNode);
		}
		catch(e){Js.Log("Js.DateTime.CheckNow!Errmsg:" + e.message);}
	},

	//输入框内
	SetInput:function(Obj){
		try{
			var IObj=Obj.getElementsByTagName("input")[0];
			var DObj=Obj.childNodes[0].childNodes[1];
			var y=Js.ChkId(Js.Get("Att_vyear",DObj));
			var M=Js.ChkId(Js.Get("Att_vmonth",DObj));
			var d=Js.ChkId(Js.Get("Att_vday",DObj));
			var TObj=Obj.childNodes[2].getElementsByTagName("li");//1,3,5
			var H=Js.ChkId(TObj[1].innerHTML);
			var m=Js.ChkId(TObj[3].innerHTML);
			var s=Js.ChkId(TObj[5].innerHTML);
			var V=Js.Get("Att_Format",IObj);
			IObj.value=new Date(y,M,d,H,m,s).Format(unescape(V));
		}
		catch(e){Js.Log("Js.DateTime.SetInput!Errmsg:" + e.message);}
	}

}

//=================IM相关，提升处理=============
Js.Color={
	
	//打开颜色
	Init:function(obj,fun){
		try{
			if(obj!=null){
				var CObj=obj.nextSibling;
				//没有内容，生成内容
				if(CObj.innerHTML==""){
					//CObj.style.marginTop=(obj.height+1) + "px";
					//CObj.style.marginLeft=((-1)*obj.width -5) + "px";
					//生成内容
					var ColorHex=new Array('00','33','66','99','CC','FF');
					var SpColorHex=new Array('FF0000','00FF00','0000FF','FFFF00','00FFFF','FF00FF');
					var colorTable="<table cellspacing=\"0\" cellpadding=\"0\">";
					var color="000000";
					colorTable+="<tr style=\"height:20px;\"><td colspan=\"21\" style=\"font:12px tahoma; padding:0px 2px 0px 2px; width:337px;\">";
					colorTable+="<span style=\" float:left; border:#000 1px solid; width:35px; height:16px;\"  onclick=\"Js.Color.doclick(this,true);" + ((fun!=null && fun!="")?(fun + "(this.style.backgroundColor);"):"") + "\">&nbsp</span>";
					colorTable+="<span style=\" float:left; width:166px; text-align:center;\"></span>";
					colorTable+="<span style=\" float:right; cursor:pointer;\" onclick=\"Js.Color.Close(this);\">×关闭</span>";
					colorTable+="</td></tr>";
					for(var r=0;r<12;r++){
						colorTable+="<tr>";
						for(var d=0;d<21;d++){
							//begion
							if(d==0 || d == 2){
								color="000000";
							}
							else if(d==1){
								if(r<6){
									color=ColorHex[r]+ColorHex[r]+ColorHex[r];
								}
								else{
									color=SpColorHex[r-6];
								}
							}
							else{
								if(r<6){
									color=ColorHex[parseInt((d-3)/6)]+ColorHex[(d-3)%6]+ColorHex[r];
								}
								else{
									color=ColorHex[parseInt((d-3)/6)+3]+ColorHex[(d-3)%6]+ColorHex[r-6];
								}
							}
							//end
							colorTable+="<td style=\"background-color:#" + color + ";\" title=\"#" + color + "\"   onMouseOver=\"Js.Color.MouseOver(this);\" onclick=\"Js.Color.doclick(this);" + ((fun!=null && fun!="")?(fun + "(this.style.backgroundColor);"):"") + "\"></td>";
						}
						colorTable+="</tr>";
					}
					CObj.innerHTML=colorTable;
					CObj.className="ColorInfo";
				}
				CObj.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].style.backgroundColor=obj.style.backgroundColor;
				CObj.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[1].innerHTML=obj.style.backgroundColor.toString().toUpperCase();
				if(CObj.style.display==""){
					CObj.style.display="none";//close
				}
				else{
					CObj.style.display="";
				}
				
			}
		}
		catch(e){Js.Log("Js.Color.Init!ErrMsg:"+e.message);}
	},
	
	//鼠标上颜色
	MouseOver:function(obj){
		try{
			//定位到父位置
			var FObj=obj.parentNode.parentNode;
			FObj.childNodes[0].childNodes[0].childNodes[0].style.backgroundColor=obj.style.backgroundColor;
			FObj.childNodes[0].childNodes[0].childNodes[1].innerHTML=obj.style.backgroundColor.toString().toUpperCase();
			//obj.className="on";
			
			obj.onmouseout=function(){
				//obj.className="";
				//alert(FObj.parentNode.parentNode.className);
			}
		}
		catch(e){Js.Log("Js.Color.MouseOver!ErrMsg:"+e.message);}
	},
	
	//选择颜色
	doclick:function(obj,ck){
		try{
			var Nobj=obj.parentNode.parentNode.parentNode.parentNode;
			ck=(ck)?true:false;
			if(ck){
				Nobj=Nobj.parentNode;
			}
			Nobj.previousSibling.style.backgroundColor=obj.style.backgroundColor;
			Nobj.style.display="none";
		}
		catch(e){Js.Log("Js.Color.doclick!ErrMsg:"+e.message);}
	},
	
	//取消关闭
	Close:function(obj){
		try{
			obj.parentNode.parentNode.parentNode.parentNode.parentNode.style.display="none";
		}
		catch(e){Js.Log("Js.Color.Close!ErrMsg:"+e.message);}
	},

	//随机取色
	getRandomColor:function(){
		try{
			return '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).substr(-6);
		}
		catch(e){Js.Log("Js.Color.getRandomColor!ErrMsg:"+e.message);}
	}
}

///Face表情
Js.Face={
	
	//打开表情
	Init:function(obj,objid,type){
		try{
			if(obj!=null){
				var FObj=obj.nextSibling;
				//没有内容，生成内容
				if(FObj.innerHTML==""){
					//FObj.style.marginTop=(obj.height+1) + "px";
					//FObj.style.marginLeft=((-1)*obj.width -5) + "px";
					//获取内容
					if(objid==null){
						objid=Js.Get("Att_SetId",obj);
					}
					if(type==null){
						type=Js.Get("Att_vtype",obj);
					}
					//生成内容
					var faceTable="";
					faceTable+="<div class=\"faceInfoTitle\">";
					faceTable+="<span style=\" float:left; color:#666666;\">请选择表情</span>";
					faceTable+="<span style=\" float:right; cursor:pointer;\" onclick=\"Js.Face.Close(this);\">×关闭</span>";
					faceTable+="</div>";
					faceTable+="<div class=\"faceInfoView\">";
					faceTable+="<table cellspacing=\"0\" cellpadding=\"0\" vtype=\"" + type + "\" objid=\"" + objid + "\">";
					for(var i=1;i<=112;i++){
						if(parseInt(i%10)==1){
							faceTable+="<tr>";
						}
						faceTable+="<td onClick=\"Js.Face.doclick(this," + i + ");\"><img src=\"OA/Image/IM/Face/" + i + ".gif\"></td>";
						if(parseInt(i%10)==0){
							faceTable+="</tr>";
						}
					}
					faceTable+="</table>";
					faceTable+="</div>";
					FObj.innerHTML=faceTable;
					FObj.className="FaceInfo";
				}
				if(FObj.style.display==""){
					FObj.style.display="none";//close
				}
				else{
					FObj.style.display="";
				}
			}
		}
		catch(e){Js.Log("Js.Face.Init");}
	},
	
	//鼠标上表情
	MouseOver:function(obj){
		try{
			//定位到父位置
			var FObj=obj.parentNode.parentNode;
			//FObj.childNodes[0].childNodes[0].childNodes[0].style.backgroundColor=obj.style.backgroundColor;
			//FObj.childNodes[0].childNodes[0].childNodes[1].innerHTML=obj.style.backgroundColor.toString().toUpperCase();
			//obj.className="on";
			
			obj.onmouseout=function(){
				//obj.className="";
				//alert(FObj.parentNode.parentNode.className);
			}
		}
		catch(e){Js.Log("Js.Face.MouseOver");}
	},
	
	//选择表情
	doclick:function(obj,si){
		try{
			var id=obj.parentNode.parentNode.parentNode.getAttribute("objid");
			var vtype=obj.parentNode.parentNode.parentNode.getAttribute("vtype");
			if(vtype=="" || vtype == null){
				vtype="htm";
			}
			//var id=obj.parentNode.parentNode.parentNode.parentNode.parentNode.previousSibling.getAttribute("doclickid");
			if($(id)!=null){
				Js.insertAtCursor($(id),"<img src=\"OA/Image/IM/Face/" + si + ".gif\" width=\"24\" height=\"24\" border=\"0\">",vtype);
			}
			this.Close(obj.parentNode.parentNode.parentNode);
		}
		catch(e){Js.Log("Js.Face.doclick");}
	},
	
	//取消关闭
	Close:function(obj){
		try{
			obj.parentNode.parentNode.style.display="none";
		}
		catch(e){Js.Log("Js.Face.Close");}
	}
}

/*
//文件属性（含文件上传中心）,当前文件对象，所在文件夹（仅上传用），所在文件夹名称（仅上传用）
Js.File={
	Att:function(obj,FolderId,FolderTitle){
		try{
			var title="";
			var sf=($("File_Win_Info")!=null)?"":"self.parent.";
			var info="<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" class=\"File_WinAttTable\"><tr class=\"WinTabTitle\"><td class=\"TitleMenu\"><span class=\"on\" onClick=\"Js.STabCheck(this,1);\">属性</span><span onClick=\"Js.STabCheck(this,1);\">共享</span><span onClick=\"Js.STabCheck(this,1);\">备注</span></td><td style=\"width:136px;\">&nbsp;</td></tr><tr><td colspan=\"2\" class=\"FileInfo\"><table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" class=\"WinTable File_WinAttTableInfo\" style=\"border-top:0px;border-left:0px;\"><form id=\"Stock_Win_Edit_Form\" action=\"OA/FrameWork/File/FileUpLoad.ashx\"><tr><td class=\"cap\">文件名</td><td><input id=\"File_Name\" name=\"File_Name\" type=\"text\" style=\"width:140px;\"><input class=\"submit\" type=\"button\" value=\"选择文件\" style=\"border-left:0px;\" hidefocus onClick=\"" + sf + "Js.File.UpLoad.OpenInit(this);\"/></td></tr><tr><td class=\"cap\">所在文件夹</td><td><input id=\"File_Folder\" name=\"File_Folder\" type=\"hidden\"><div class=\"File_Select\" title=\"点击选择文件夹\" onClick=\"Js.ChangeView(this.nextSibling,'change');\"><li id=\"File_Folder_Select\" class=\"Folder\">我的网盘</li><li class=\"img\"></li></div><div class=\" Dm_select Dm_select_diyinfo\" style=\" margin:19px 0 0 -216px; width:216px; height:180px; overflow:auto; display:none;\"></div></td></tr><tr><td class=\"cap\">类型</td><td><span id=\"File_Ext_View\" class=\"File_Ext \"></span><input id=\"File_Ext\" name=\"File_Ext\" type=\"hidden\" style=\"border:0px;\" readonly></td></tr><tr><td class=\"cap\">有效期</td><td><div class=\"File_Select\" style=\"margin-top:1px; width:80px;\" title=\"点击选择有效期\" onClick=\"Js.ChangeView(this.nextSibling,'change');\"><li>永久有效</li><li class=\"img\"></li></div><div class=\"Dm_select Dm_select_info\" style=\" margin:20px 0 0 -80px; width:80px; display:none;\"><li onMouseMove=\"this.className='oncheck';\" onMouseOut=\"this.className='';\" onClick=\"" + sf + "Js.File.UpLoad.onChangeDate(this,'0');\">永久有效</li><li onMouseMove=\"this.className='oncheck';\" onMouseOut=\"this.className='';\" onClick=\"" + sf + "Js.File.UpLoad.onChangeDate(this,'7day');\">七天有效</li><li onMouseMove=\"this.className='oncheck';\" onMouseOut=\"this.className='';\" onClick=\"" + sf + "Js.File.UpLoad.onChangeDate(this,'1month');\">一月有效</li><li onMouseMove=\"this.className='oncheck';\" onMouseOut=\"this.className='';\" onClick=\"" + sf + "Js.File.UpLoad.onChangeDate(this,'1year');\">一年有效</li><li onMouseMove=\"this.className='oncheck';\" onMouseOut=\"this.className='';\" onClick=\"" + sf + "Js.File.UpLoad.onChangeDate(this);\">(自定义)</li></div><input id=\"File_ExTime\" name=\"File_ExTime\" type=\"text\" style=\"display:none;\" value=\"2000-01-01 00:00:00\"></td></tr><tr><td class=\"cap\">大小</td><td>读取中...</td></tr><tr><td class=\"cap\">创建者</td><td>读取中...</td></tr><tr><td class=\"cap\">创建时间</td><td>读取中...</td></tr><tr><td class=\"cap\">处理时间</td><td>读取中...</td></tr><tr><td class=\"cap\" style=\"border-bottom:0px;\">管理员</td><td style=\"border-bottom:0px;\">读取中...</td></tr></table></td></tr><tr style=\"display:none;\"><td colspan=\"2\" class=\"FileInfo\" style=\"text-align:center;\">暂不支持共享</td></tr><tr style=\"display:none;\"><td colspan=\"2\" class=\"FileInfo\"><textarea name=\"File_Info\" class=\"File_Info_Class\"></textarea></td></tr></form></table>";
			var submits="";
			if(obj!="" && obj!=null && Js.ChkId(Js.Get("Att_FileId",obj))>0){
				//属性修改
				title="文件属性";
				submits="<input type=\"button\" value=\"确认\" hidefocus onClick=\"Js.File.AttSave('Stock_Win_Edit_Form');\"/>";
			}
			else{
				//上传
				title="文件上传";
				submits="<input type=\"button\" value=\"上传\" hidefocus onClick=\"Js.File.UpLoad.Save('Stock_Win_Edit_Form');\"/>";
			}
			submits+="<input type=\"button\" value=\"取消\" hidefocus onClick=\"Js.AlertIdClose('File_Att');\"/>";
			//打开内容
			Js.Alert(title,info,{id:"File_Att",submits:submits,width:315,height:280});
		}
		catch(e){Js.Log("Js.File.Att:"+obj+"|"+FolderId+"|"+FolderTitle);}
	},
	
	AttSave:function(){
	},
	
	AttView:function(){
	},
	
	Change:function(obj,Att){
		try{
			if($("File_Win_Info")!=null){
				Js.File.Change(obj,Att);
			}
			else{
				self.parent.Js.File.Change(obj,Att);
			}
		}
		catch(e){Js.Log("Js.File.Change");}
	}
	
}
*/

Js.Img={
	//饼图处理,html5+css3专用,this(ck:true)或{}
	//obj包括{id:画图id号;ctx:2d或者3d;width:圆宽度;fillcolor:颜色区分;strokecolor:边框颜色;data:占比;font:字体}
	drawCircle:function(obj,ck){
		try{
			var iwidth=0;
			var iheight=0;//不启用
			var ctx="2d";
			var font="";
			var lineWidth=0;
			
			ck=ck?true:false;
			if(obj!=null){
				obj.id=(obj.id==null || obj.id=="")?"":obj.id;//画布对象id
				if(ck){
					//obj.ctx=Js.Get("")
				}
				obj.ctx=(obj.ctx==null || obj.ctx=="")?"2d":obj.ctx;//平面图
				iwidth=Js.ChkId(obj.width);//圆图宽度
				iheight=Js.ChkId(obj.width);//圆图高度
				lineWidth=Js.ChkId(obj.lineWidth);//圆图边框半径，0为全半径
				ifont=obj.font!=null?obj.font:"";
			}
			if(obj.id!=""){
				var canvas = document.getElementById(obj.id);
				canvas.width=iwidth;
				canvas.height=iheight;
				var ctx = canvas.getContext(obj.ctx);
				var OPI = Math.PI*2;
				var startPoint= -(1 / 2 * Math.PI);//开始角度
				var stopPoint=0;
				for(var i=0;i<obj.data.length;i++){
					stopPoint= startPoint + (obj.data[i]*OPI)/100; //结束角度 
	                ctx.fillStyle = obj.fillcolor[i];
	                //ctx.fillStyle="#000000";
	                //ctx.strokeStyle = obj.strokecolor[i];
	                ctx.strokeStyle="#000000";
	                if(lineWidth>0){
	                	ctx.lineWidth = lineWidth;
	                }
	                ctx.beginPath();
	                ctx.moveTo(parseInt(iwidth/2),parseInt(iwidth/2));
	                //圆的中心的 x 坐标，圆的中心的 y 坐标，圆的半径，起始角，结束角，可选。规定应该逆时针还是顺时针绘图。False = 顺时针，true = 逆时针。
	                ctx.arc(parseInt(iwidth/2),parseInt(iwidth/2),parseInt(iwidth/2-4*lineWidth),startPoint,stopPoint,false);
	                //ctx.lineTo(parseInt(iwidth/2),parseInt(iwidth/2));
	                if(lineWidth>0){
	                	ctx.stroke();
	                }
	                ctx.title=obj.title[i];
	                ctx.fill();	                
	                ctx.closePath();
	                startPoint = stopPoint;
	                //绘制图例
	                //ctx.fillRect(360, 50+18*i,16,16);
	                //ctx.fillStyle="#000000";
	                //ctx.fillText(obj.text[i], 380, 62+18*i );
	        	}
	        }
		}
		catch(e){Js.Log("Js.Img.drawCircle:"+e.message);}
	},

	ReadErr:function(obj,url){
		try{
			obj.onerror=function(){return false;};
			obj.src=url;
		}
		catch(e){}
	}
	
}

//文件发送选择
Js.FileChange={
	//打开远程文件选择
	Open:function(obj,Att){
		try{
			if($("File_Win_Info")!=null){
				Js.File.Change(obj,Att);
			}
			else{
				self.parent.Js.File.Change(obj,Att);
			}
		}
		catch(e){Js.Log("Js.FileChange.Open");}
	},
	
	//打开本地文件上传
	LocalOpen:function(){
	},
	
	Over:function(str){
		try{
		}
		catch(e){Js.Log("Js.FileChange.Over");}
	}
}



/////================================Tree升级(待升级)=======================
Tree={
	
	//onClick_T临时使用
	onClick_T:function(obj){
		try{
			if(obj!=null){
				var msgobj=$(obj.id+"_msg");
				if(msgobj!=null){
					if(msgobj.style.display=="none"){
						msgobj.style.display="";
					}
					else{
						msgobj.style.display="none";
					}
				}
			}
		}
		catch(e){Js.Log("Tree.onClick");}
	},
	
	//点击打开关闭
	onClick:function(obj,ck){
		try{
			if(obj!=null){
				if(obj.parentNode.childNodes.length>=3 && (obj.parentNode.getElementsByTagName("ul")).length >=1){
					//将obj定位到第一个，即状态部分
					obj=obj.parentNode.childNodes[0];
					//确认有子文件夹
					var MObj=(obj.parentNode.getElementsByTagName("ul"))[0];
					ck=Js.ChkId(ck);
					ck=(ck==0 && MObj.style.display=="none")?1:ck;
					if(ck==1){
						//关闭状态打开
						MObj.style.display="";
						obj.style.backgroundPosition="-20px 0";
					}
					else{
						//打开状态关闭
						MObj.style.display="none";
						obj.style.backgroundPosition="";
					}
					delete MObj;
					try { CollectGarbage(); } catch (e) { }
				}
			}
		}
		catch(e){Js.Log("Tree.onClick");}
	},
	
	
	//单击延时
	onClickT:function(obj){
		try{
			//延时处理，150ms
			var wt=setTimeout(function(){Tree.onClick(obj)},150);
			Js.Set("Att_Wt",obj,wt);
		}
		catch(e){Js.Log("Tree.onClickT");}
	},
	
	//双击取消单击???
	ondbClick:function(obj){
		try{
			var wt=Js.Get("Att_Wt",obj);
			if(wt!=null && wt !=""){
				clearTimeout(wt);
			}
		}
		catch(e){Js.Log("Tree.ondbClick");}
	},
	
	//鼠标移入移出
	onMouse:function(obj,i){
		try{
			if(i==1){
				obj.style.Color="";
			}
			else{
				obj.style.Color="#4273ca";
			}
		}
		catch(e){Js.Log("Tree.onMouse");}
	},
	
	//默认点击
	DefOnclick:function(obj){
		try{
			var Tobj=obj.parentNode;
			var re=false;
			while(Tobj!=document.body){
				if(Tobj.className.indexOf("DM_Tree")>=0){
					re=true;
					break;
				}
				Tobj=Tobj.parentNode;
			}
			var setMsg=Js.Get("Att_setMsg",Tobj);
			if(setMsg!="" && setMsg!=null){
				var setMsgi=setMsg.split("$");
				var str="";
				for(var i=0;i<setMsgi.length;i++){
					var setMsgip=setMsgi[i].split("|");
					if(setMsgip.length>=3 && $(setMsgip[1])!=null){
						str="";
						switch(setMsgip[2].toLowerCase()){
							case "id":
								str=Js.Get("Att_Treeid",obj);
							break;
							case "htm":
							default:
								str=unescape(Js.Get("Att_TreeInfo",obj));
							break;
						}
						switch(setMsgip[0].toLowerCase()){
							case "value":
								Js.Set("DefAtt_value",setMsgip[1],str);
							break;
							case "htm":
								Js.Set("DefAtt_innerHTML",setMsgip[1],str);
							break;
							default:
							break;
						}
						//alert(obj.innerHTML);
					}
				}
			}
			//alert(Tobj.parentNode.parentNode.parentNode.innerHTML);
			Tobj.parentNode.parentNode.parentNode.style.display="none";
		}
		catch(e){Js.Log("Tree.DefOnclick");}
	}
}
