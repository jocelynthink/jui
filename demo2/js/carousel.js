;(function($) {
	var Carousel = function(poster) {
		var self = this;
		// 保存单个旋转木马对象
		this.poster = poster;
		this.posterItemMain = poster.find("ul.poster-list");
		this.nextBtn = poster.find("div.poster-next-btn");
		this.prevBtn = poster.find("div.poster-prev-btn");
		this.posterItems = poster.find("li.poster-item");
		if (this.posterItem.size() % 2 == 0 ) {

		}
		this.posterFirstItem = this.posterItems.first();
		this.posterLastItem = this.posterItems.last();
		this.rotateFlag = true;
		// 默认配置参数
		this.setting = {
			"width" : 1000,
			"height" : 270,
			"posterWidth": 640,
			"posterHeight": 270,
			"scale": .9,
			"speed": 500,
			"autoPaly": false,
			"delay": 5000,
			"verticalAlgin": "middle"
		};
		$.extend(this.setting, this.getSetting());

		// 设置配置参数值
		this.setSettingValue();
		this.setPosterPos();
		// 左旋转按钮
		this.nextBtn.click(function() {
			if (self.rotateFlag) {
				self.rotateFlag = false;
				self.CarouseRotate("left");
			}
		});
		// 右旋转按钮
		this.prevBtn.click(function() {
			if (self.rotateFlag) {
				self.rotateFlag = false;
				self.CarouseRotate("right");
			}
		});
		// 是否开启自动播放
		if (this.setting.autoPaly) {
			this.autoPaly();
			this.poster.hover(function(){
				window.clearInterval(self.timer);
			},function() {
				self.autoPaly();
			})
		}
	};
	Carousel.prototype = {
		autoPaly: function(){
			var self = this;
			this.timer = window.setInterval(function() {
				self.nextBtn.click();
			},this.setting.delay);

		},
		// 旋转
		CarouseRotate: function(){
			var _this_ = this;
			var zIndexArr = [];
			// 左旋转
			if (dir === "left") {
				this.posterItems.each(function() {
					prev = self.prev().get(0)?self.prev():_this_.posterLastItem,
					width = prev.width(),
					height = prev.height(),
					zIndex = prev.css("zIndex"),
					opacity = prev.css("opacity"),
					left = prev.css("left"),

				})
			}
		},
		setPosterPos: function(){

		},
		// 设置配置参数值去控制基本的宽度高度
		setSettingValue: function(){
			this.poster.css({
				width: this.setting.width,
				height: this.setting.height
			});
			this.posterItemMain.css({
				width: this.setting.width,
				height: this.setting.height
			});
			var w = (this.setting.width-this.setting.posterWidth)/2;
			this.nextBtn.css({
				width: w,
				height: this.setting.height,
				zIndex: Math.ceil(this.posterItems.size()/2)
			});
			this.prevBtn.css({
				width:w,
				height: this.setting.height,
				zIndex: Math.ceil(this.posterItems.size()/2)
			});
			this.posterFirstItem.css({
				width: this.setting.posterWidth,
				height: this.setting.posterHeight,
				left: w,
				top: 0,
				zIndex: Math.floor(this.posterItems.size()/2)
			});
		}, 
		// 获取人工配置参数
		getSetting: function(){
			var setting = this.poster.attr("data-setting");
			if (setting && setting != "") {
				return $.parseJSON(setting);
			}else{
				return {};
			}
		}

	}
	Carousel.init = function(posters) {
		var _this_ = this;
		posters.each(function() {
			new _this_($(this));
		});
	}
	window["Carousel"] = Carousel;
})(jQuery);