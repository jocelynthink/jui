
/* 柱状图组件对象 */

var H5ComponentPolyline = function( name, cfg ){
	
	var component = new H5ComponentBase(name, cfg);
	var w  = cfg.width;
	var h = cfg.height;

	// 加入一个画布(网格线的背景)，背景层
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;

	// 水平网格线 100 份 -->10分
	var step = 10;
	ctx.beginPath();
	ctx.lineWidth = 2;
	ctx.strokeStyle="#AAA";

	window.ctx = ctx;
	for (var i = 0; i < step + 1; i++) {
		var y = (h/step) * i;
		ctx.moveTo(0,y);
		ctx.lineTo(w,y);
	}
	// 垂直网格线的制作
	step = cfg.data.length + 1;
	var text_w = w /step;
	for (var i = 0; i < step + 1; i++) {
		var x = (w/step)*i;
		ctx.moveTo(x,0);
		ctx.lineTo(x,h);
		if(cfg.data[i]){
			var text = $('<div class="text">');
			text.css('width',text_w/2).css('left', x/2 );
			text.text(cfg.data[i][0]);
			component.append(text);
		}
	}
	ctx.stroke();
	component.append(cns);

	// 绘制折线数据
	// 加入画布数据
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	component.append(cns);

	function draw(per){

		ctx.clearRect(0,0,w,h);
		ctx.beginPath();
		ctx.lineWidth = 2;
		ctx.strokeStyle="red";
		var x = 0;
		var y = 0;
		var row_w = ( w /(cfg.data.length + 1));
		// 画点
		for(var i in cfg.data){
			var item = cfg.data[i];
			x =   row_w * i + row_w;
			y =  h * (1 - item[1]*per) ;
			ctx.moveTo(x,y);
			// ctx.arc(x,y,5,0,2*Math.PI);

		}	
		// 连线
		// 移动画笔到第一个数据的点的位置
		
		ctx.moveTo(row_w ,h *(1 - cfg.data[0][1]*per));
		
		// ctx.arc(row_w ,h *(1 - cfg.data[0][1]), 10,0,2*Math.PI);
		for (var i in cfg.data){
			var item = cfg.data[i];
			 x= row_w * i + row_w;
			 y = h * (1-item[1]*per);
			 ctx.lineTo(x,y);
		}

		ctx.lineTo(x,h);
		ctx.lineTo(row_w,h);
		ctx.fillStyle = 'rgba(255,136,120,.2)' ;
		ctx.fill();
		// 写数据
		for (i in cfg.data){
			var item = cfg.data[i];
			 x= row_w * i + row_w;
			 y = h * (1-item[1]*per);
			 if (per >= 1) {
			 	ctx.fillStyle = item[2] ? item[2] : '#595959';
			 	ctx.fillText(((item[1] * 100)>>2) + '%',x-10,y-10);
			 }
		}
		// 绘制阴影

		ctx.stroke();
	}


	component.on('onLoad',function(){
		// 扩展生长动画
		var s = 0;
		for(i = 0;i < 100;i ++){
			setTimeout(function(){
				s += .01;
				draw(s);
			}, i*10+500);
		}
	});

	component.on('onLeave',function(){
		var s = 1;
		for(i = 0;i < 100;i ++){
			setTimeout(function(){
				 s -= .01;
				 draw(s);
			},i * 10);
		}
	})
	return component;
}
