(function(){
	'use strict';
	var Util = (function() {
		var prefix = 'html5_reader_';
		var StorageGetter = function(key) {
			 return localStorage.getItem(prefix + key);
		}
		var StorageSetter = function(key, val) {
			return localStorage.setItem(prefix + key, val);
		}
		/** 获取jsonp的数据
		 *  url: 请求的url
		 *  callback：回调函数
		 */
		var getJSONP = function(url, callback) {
			return $.jsonp({
				url: url,
				cache: true,
				callback:'duokan_fiction_chapter',
				success: function(result) {
					// debugger
					var data = $.base64.decode(result); //是一个json的数据
					var json = decodeURIComponent(escape(data));
					callback(json);
				}
			})
		}
		return {
			StorageGetter: StorageGetter,
			StorageSetter: StorageSetter,
			getJSONP: getJSONP
		}
	})();
	var Dom = {
		top_nav: $('#top_nav'),
		bottom_nav: $('.bottom_nav'),
		font_container: $('.nav-pannel-container'),
		body: $('body')
	}
	var Win = $(window);
	var Doc = $(document);
	var initFontSize = Util.StorageGetter('font-size');
	var initBg = Util.StorageGetter('bg_color');
	var RootContainer = $('#fiction_container');
	var readerModel;
	var readerUI;

	initFontSize = parseInt(initFontSize);
	if (!initFontSize) {
		initFontSize = 14;
	}
	RootContainer.css('font-size',initFontSize);

	if (!initBg) {
		initBg = '#e9dfc7';
	}
	Dom.body.css('background-color',initBg);

	function main(){
		// todo 整个项目的入口函数
		readerModel = ReaderModel();
		readerUI = ReaderBaseFrame(RootContainer);
		readerModel.init(function(data){
			readerUI(data);
		});
		EventHanlder(); 
	}
	
	function ReaderModel(){
		// todo 实现和阅读器相关的数据交互方法
		var Chapter_id;
		var ChapterTotal;
		var init = function(UIcallback) {
			// 传统回调
			// getFictionInfo(function(){
			// 	getCurChapterContent(Chapter_id,function(data){
			// 		//  数据渲染
			// 		UIcallback && UIcallback(data);
			// 	});
			// });

			// 使用Promise优化
			getFictionInfoPromise().then(function(d){
				return getCurChapterContentPromise(); // 继续返回一个promise对象，才可以继续调用then
			}).then(function(data){
				UIcallback && UIcallback(data);
			})
		}
		// 获取章节列表的信息
		var getFictionInfo = function(callback){
			$.get('./chapter.json',function(data){
				// 获取章节信息之后的回调
				Chapter_id = Util.StorageGetter('last_chapter_id');
				if (Chapter_id == null) {
					Chapter_id = data.chapters[1].chapter_id;
				}
				ChapterTotal = data.chapters.length;

				callback && callback();
			},'json');
		}
		// 获取章节的内容
		var getCurChapterContent = function(chapter_id, callback) {
			$.get('./data/data' + chapter_id + '.json',function(data){
				if(data.result == 0) {
					var url = data.jsonp;
					Util.getJSONP(url, function(data) {
						callback && callback(data);
					});	
				}
			},'json');
		}
		var prevChapter = function(UIcallback){	
			Chapter_id = parseInt(Chapter_id, 10);
			if (Chapter_id == 0){
				return ;
			}
			Chapter_id  -= 1;
			getCurChapterContent(Chapter_id,UIcallback);
			Util.StorageSetter('last_chapter_id',Chapter_id);
		}
		var nextChapter = function(UIcallback){
			Chapter_id = parseInt(Chapter_id, 10);
			if (Chapter_id == ChapterTotal) {
				return ;
			}
			Chapter_id += 1;
			getCurChapterContent(Chapter_id, UIcallback);
			Util.StorageSetter('last_chapter_id',Chapter_id);
		}

		var getFictionInfoPromise = function(data){
			return new Promise(function(resolve, reject){
				$.get('./chapter.json',function(data){
					// 获取章节信息之后的回调
					if (data.result == 0) {
						Chapter_id = Util.StorageGetter('last_chapter_id');
						if (Chapter_id == null) {
							Chapter_id = data.chapters[1].chapter_id;
						}
						ChapterTotal = data.chapters.length;
						resolve();
					}else {
						reject();
					}
				},'json');
			});
		}
		var getCurChapterContentPromise = function(data) {
			return new Promise(function(resolve, reject){
				$.get('./data/data' + Chapter_id + '.json',function(data){
					if(data.result == 0) {
						var url = data.jsonp;
						Util.getJSONP(url, function(data) {
							//callback && callback(data);
							resolve(data);
						});	
					} else {
						reject({msg: 'failed'});
					} 
				},'json');
			});
		}
		return {
			init: init,
			prevChapter: prevChapter,
			nextChapter: nextChapter
		}
	}

	function ReaderBaseFrame(container){
		// todo 渲染基本的UI结果
		function parseChapterData(jsonData){
			var jsonObj = JSON.parse(jsonData);
			var html = '<h4>' + jsonObj.t + '</h4>';
			for (var i = 0, len = jsonObj.p.length ;i < len; i++) {
				html += '<p>' + jsonObj.p[i] + '</p>';
			}
			return html;
		}
		return function(data){
			container.html(parseChapterData(data));
		}
	}

	function EventHanlder() {
		// todo 交互的事件绑定
		$('#action_mid').click(function(){
			if(Dom.top_nav.css('display') == 'none'){
				Dom.bottom_nav.show();
				Dom.top_nav.show();
			} else {
				Dom.bottom_nav.hide();
				Dom.top_nav.hide();
				Dom.font_container.hide();
				Dom.font_container.removeClass('current');
			}
		});
		$('#font_button').click(function(){
			if (Dom.font_container.css('display') == 'none') {
				Dom.font_container.show();
				Dom.font_container.addClass('current');
			}else{
				Dom.font_container.hide();
				Dom.font_container.removeClass('current');
			}
		});
		$('#large_font').click(function() {
			if (initFontSize > 20) {
				return;
			}
			initFontSize++;
			RootContainer.css('font-size',initFontSize);
			Util.StorageSetter('font-size',initFontSize);
		});
		$('#small_font').click(function(){
			if (initFontSize < 12) {
				return
			}
			initFontSize--;
			RootContainer.css('font-size',initFontSize);
			Util.StorageSetter('font-size',initFontSize);

		});
		$('.bk-container').click(function(){
			$('.bk-container-current').hide();
			var $target = $(event.target);
			$target.children().show();
			initBg = $target.css('background-color');
			Dom.body.css('background-color',initBg);
			Util.StorageSetter('bg_color',initBg);
		});
		$('#night_button').click(function(){
			var day_icon = $('#day_icon');
			var day_text = $('#day_text');
			if (!day_icon.hasClass('night')) {	
				day_text.html('夜间');
				day_icon.addClass("night");
				initBg = "#000";
				Dom.body.css('background-color',initBg);
				Util.StorageSetter('bg_color',initBg);
				$('.bk-container-current').hide();
				$('#color_night').show();

			}else{
				day_text.html('日间');
				day_icon.removeClass('night');
				initBg = "#e9dfc7";
				Dom.body.css("background-color",initBg);
				Util.StorageSetter('bg_color',initBg);
				$('.bk-container-current').hide();
				$('#color_day').show();
			}
		});
		$('#prev').click(function(){
			// 获取章节的翻页数据
			readerModel.prevChapter(function(data){
				readerUI(data);
			});
		});
		$('#next').click(function(){
			readerModel.nextChapter(function(data){
				readerUI(data);
			});
		});
		Win.scroll(function(){
			Dom.bottom_nav.hide();
			Dom.top_nav.hide();
			Dom.font_container.hide();
			Dom.font_container.removeClass('current');
		});
	}
	main();
})();