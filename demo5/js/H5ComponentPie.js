
/* 柱状图组件对象 */

var H5ComponentPie = function( name, cfg ){
	
	var component = new H5ComponentBase(name, cfg);
	var w  = cfg.width;
	var h = cfg.height;

	// 加入一个画布(网格线的背景)，背景层
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	$(cns).css('zIndex',1);
	component.append(cns);

	var r = w/2;
	var step = cfg.data.length;

	// 绘制背景层
	ctx.beginPath();
	ctx.fillStyle='#ccc';
	ctx.strokeStyle='#eee';
	ctx.lineWidth =  1;
	ctx.arc(r,r,r,0,2*Math.PI);
	ctx.fill();
	ctx.stroke();
	
	// 绘制数据层
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	$(cns).css('zIndex',2);
	component.append(cns);

	var colors = ['red','green','blue','pink','yellow'];

	var sAngle = 1.5 * Math.PI;// 设置开始的角度在12点位置
	var eAngle = 0; // 结束角度
	var aAngle = Math.PI * 2; // 100%的圆结束的角度2pi = 360


	var step = cfg.data.length;
	for (var i = 0;i < step; i++){
		var item = cfg.data[i];

		var color = item[2] || (item[2] = colors.pop());
		eAngle = sAngle + aAngle * item[1];
		
		ctx.beginPath();
		ctx.fillStyle= color;
		ctx.strokeStyle= color;
		ctx.lineWidth =  1;

		ctx.moveTo(r,r);
		ctx.arc(r,r,r,sAngle,eAngle);
		ctx.fill();
		ctx.stroke();
		sAngle = eAngle;

		// 加入所有的项目文本以及百分比
		var text = $('<div class="text">');
		text.text(cfg.data[i][0]);
		var per = $('<div class="per">');
		per.text(cfg.data[i][1]*100 + '%');
		text.append(per);

		var x = r + Math.sin(.5* Math.PI - sAngle) * r;
		var y = r + Math.cos(.5 * Math.PI - sAngle) * r;
		if (x > w/2) {
			text.css('left',x/2);
		}else{
			text.css('right',(w-x)/2);
		}
		if (y > h/2) {
			text.css('top',y/2);
		}else{
			text.css('bottom',(h-y)/2);
		}
		if (cfg.data[i][2]) {
			text.css('color',cfg.data[i][2]);
		}
		text.css('opacity',0);
		component.append(text);
	}

	// 加入一个蒙板层
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	$(cns).css('zIndex',3);
	component.append(cns);

	var r = w/2;
	var step = cfg.data.length;

	// 绘制背景层
	ctx.beginPath();
	ctx.fillStyle='#eee';
	ctx.strokeStyle='#eee';
	ctx.lineWidth =  1;
	
	var draw = function(per){
		ctx.clearRect(0,0,w,h);
		ctx.beginPath();
		ctx.moveTo(r,r);
		if (per <= 0) {
			ctx.arc(r,r,r,0,2*Math.PI);
			component.find('.text').css('opacity',0);

		}else {
			ctx.arc(r,r,r,sAngle, sAngle + 2*Math.PI * per,true);		
		}

		if (per >= 1) {
			component.find('.text').css('opacity',1);
		}
		ctx.fill();
		ctx.stroke();
	}
	component.on('onLoad',function(){
		// 雷达图扩展生长动画
		var s = 0;
		for(i = 0;i < 100;i ++){
			setTimeout(function(){
				s += .01;
				draw(s);
			}, i*10+500);
		}
	});

	component.on('onLeave',function(){
		// 雷达图退场动画
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
