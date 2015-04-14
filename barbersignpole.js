(function($) {
	$.fn.barbersignpole = function( options ){
		var $obj = $(this);
		var one = 0;//一連のアニメーションの幅（パーセント）0-1
		var maxpatern;
		var gradient = "";
		var gradientid = "";
		function init() {
			gradientid = "x"+Math.floor(Math.random() * 9007199254740992);
			maxpatern = setting.patern.length;
			for (var k=0;k<maxpatern;k++) {one += setting.patern[k].width;}
			one = one/100;
			console.log(one);
			$obj.css({"position":"relative","overflow":"hidden"});
			gradient = generategradient(one,setting.patern);
			
			$(window).on('load resize', function(){
				drawsprite();
			});
		}
		function generategradient(one,patern) {
			var i = 0;
			var width = 0;
			var gradient = "";
			do {
				var thispatern = patern[i%maxpatern];
				var nextpatern = patern[(i+1)%maxpatern];	//グラデーション抑止用に次のパターン
				var virtualWidth = Math.floor(100*width/(1+one))/100;//拡張した分を縮小
				if (i === 0) gradient += thispatern.color+","+nextpatern.color+" "+(virtualWidth+0.01)+"%";
				else gradient += ","+thispatern.color+" "+virtualWidth+"%"+","+nextpatern.color+" "+(virtualWidth+0.005)+"%";
				width += thispatern.width;
				i ++;
			} while(width < (1+one)*100);
			return gradient;
		}
		function drawsprite() {
			var parentWidth = $obj.width();
			var parentHeight = $obj.height();
			console.log(parentWidth+":"+parentHeight);
			var boxsize = Math.round(Math.max(parentWidth,parentHeight)*(1+one));
			var boxminsize = Math.round(Math.max(parentWidth,parentHeight)*one);
			var styleSheet = document.styleSheets[0];
			var backgroundVects = {7:"135deg",3:"315deg",9:"45deg",1:"225deg"};
			var translate;
			if (setting.vect === 3) translate = {"fromX":-boxminsize,"fromY":-boxminsize,"toX":0,"toY":0};
			else if (setting.vect === 1) translate = {"fromX":0,"fromY":-boxminsize,"toX":-boxminsize,"toY":0};
			else if (setting.vect === 9) translate = {"fromX":-boxminsize,"fromY":0,"toX":0,"toY":-boxminsize};
			else translate = {"fromX":0,"fromY":0,"toX":-boxminsize,"toY":-boxminsize};//if (setting.vect === 7)

			var keyframes = "@keyframes";
			if (CSSRule.WEBKIT_KEYFRAMES_RULE) keyframes = "@-webkit-keyframes";// WebKit
			else if (CSSRule.MOZ_KEYFRAMES_RULE) keyframes = "@-moz-keyframes";// Mozilla

			keyframes +=
				" g"+gradientid+" {\n" +
					"0% {transform:translate("+translate.fromX+"px, "+translate.fromY+"px); }\n" +
					"100% {transform:translate("+translate.toX+"px, "+translate.toY+"px); }\n" +
//					"0% {background-position:"+translate.fromX+"px "+translate.fromY+"px; }\n" +
//					"100% {background-position:"+translate.toX+"px "+translate.toY+"px; }\n" +
				"}";
				console.log(keyframes);
			styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
			var mystyle = {
				width : boxsize + "px",
				height : boxsize + "px",
				position : "absolute",
				top : 0 + "px",
				left : 0 + "px",
				zIndex : -10,
				backgroundImage : "linear-gradient("+backgroundVects[setting.vect]+", "+gradient+")",
				animation : "g"+gradientid+" "+setting.speed+"s linear infinite normal"
			};
			if ($("#"+gradientid)[0]) $("#"+gradientid).css(mystyle);
			else $obj.append($("<div>").attr("id",gradientid).css(mystyle));
		}
		
		var defaults = {
			'speed' : 3,
			'vect' : 7,
			'patern' : [
				{color:"#F00",width:5},
				{color:"#FFF",width:5},
				{color:"#00F",width:5},
				{color:"#FFF",width:5}
			]
		};

		var setting = $.extend( defaults, options );

		init();
		return this;
	};
})(jQuery);