function fDice() {
	//nRoll：掷骰子次数  nPolys:最大点数投骰子
	var nRoll = 0 , nPolys = 0;
	//单击获取选取的Roll和Polyhedron的选单数值（即掷骰子次数和最大点数的值）
	$(".dice").find(".dropdown-menu a").click(
		function() {
			var i = parseInt($(this).html()),
			//根据字符串长度判断是Roll还是Polyhedron的选单
			j = $(this).html().length;
			(j < 12) ? nRoll = i : nPolys = i;
			//单击Roll和Polyhedron时，更新#rolldice显示结果
			var obj = $("#rolldice").find("span")
			obj.eq(0).html("Pols:"+nPolys);
			obj.eq(1).html("; Roll:"+nRoll);
		}
	);

	$("#Start").click(
		function() {
			var nTimes = nRoll;
			//为.result.clear中没有输出数字的空白部分，填上占位符"?"
			$(".result").find("span").html("?");
			//在.result.clear中投骰子，占用和掷骰子次数同等的窗格
			for(var i = 0; i < nRoll; i++){
				//遍历.result的每一个窗格给他们赋值
				$(".result").find("span").eq(i)
					.html(fRandom(nPolys,1,0))
			}
		}
	);
};

function fRandom(area,tupling,add) {
	//nMaxno：随机数的取值范围，d为倍率，add为增加的值
	var num = (Math.floor( Math.random()*area+1 ))*tupling+add;
	return num;
}

//被$(document).ready的setInterval()调用
function flow(i,m) {
	//160为每次滚动的距离
	i > -960 ? i -= 160 : i = 0;
	$(".dice").find("i").animate({backgroundPosition: + i + 'px'},m);
	return i;
}

function fCreateTab(){
	$("#OneKeyPress").click(
		function() {
			var nTd = $("table").find("td");
			var aArr = [];
			//遍历table的td给他们赋值
			for(var i = 0; i < 5; i++){
				aArr[i]=fRandom(6,3,0);
				nTd.eq(2*i+1).html(aArr[i])
			}
			for(var i = 5; i < 7; i++){
				aArr[i]=fRandom(6,2,6);
				nTd.eq(2*i+1).html(aArr[i])
			}
			for(var i = 7; i < 8; i++){
				aArr[i]=fRandom(6,3,3);
				nTd.eq(2*i+1).html(aArr[i])
			}
			if (aArr[0] > aArr[5] && aArr[3] > aArr[5]) {
				aArr[8] = 9;
			}else if (aArr[0] < aArr[5] && aArr[3] < aArr[5]) {
				aArr[8] = 7;
			}else{
				aArr[8] = 8;
			};

			nTd.eq(17).html(aArr[8]);
			nTd.eq(22).html(Math.floor((aArr[1]+aArr[5])/2));
			nTd.eq(23).html(aArr[2]);
			nTd.eq(24).html(aArr[2]*5);
			nTd.eq(25).html(aArr[2]*5);
		}
	)
}

$(document).ready(function() {
	fDice();
	fCreateTab();
	setInterval(
		function() {
			if (typeof(i)=="undefined") {
				i = 0;
			};
			//图片轮播，i不断变化，为基于图片原位置的位移，m为图片滚动的触发间隔
			i = flow(i,300);
		}
	,"5000");
});
