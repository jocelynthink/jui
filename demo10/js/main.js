$(document).ready(function() {

	/**
	 * 加入野狗
	 */
	var config = {
		authDomain: "danmuj.wilddogio.com",
		syncURL: "https://danmuj.wilddogio.com"
	};
	wilddog.initializeApp(config);
	var ref = wilddog.sync().ref();
	/**
	 * 数组中存放需要显示的弹幕数据
	 */
  var arr = [];

	// 获取需要操作的 div
	var danmu = document.getElementById('danmu');
	/**
	 * [getRamdomColor 获取一个随机的颜色]
	 * @return {[type]} [description]
	 */
	// function getRamdomColor() {
	// 	var colorArray = ['#008000','#F0F8FF','#FAEBD7','#FF0000',
	// 										'#F5F5DC','	#008000','#0000FF','#FF8C00',
	// 										'#E9967A','#7B68EE','	#000080	'];
	// 	var randomIndex = Math.floor(Math.random() * 10);
	// 	return colorArray[randomIndex];
	// }
	function getRamdomColor() {
		return '#' + (function(h){
			return new Array(7 - h.length).join("0") + h;
		}((Math.random() * 0x1000000 << 0).toString(16)))
	}
	/**
	 * [getRandomFontSize 获取一个随机的字体大小]
	 * @return {[type]} [description]
	 */
	function getRandomFontSize() {
		var fontSizeArray = ['24','26','16','18','20','22'];
		var randomFontSizeIndex = Math.floor(Math.random() * 6);
		return fontSizeArray[randomFontSizeIndex];
	}
	/**
	 * 创建一个弹幕字，并向右滑动
	 */
	function createDanmu(text){
		var textObj = document.createElement('div');
		textObj.innerText = text;
		textObj.className  = 'danmu-text';
		textObj.style.right = 0 + 'px';
		textObj.style.top = Math.floor(Math.random() * 300) + 'px';
		textObj.style.color = getRamdomColor();
		textObj.style.fontSize = getRandomFontSize() + 'px';
		danmu.appendChild(textObj);
		// 让弹幕动起来
		var rightNumber = 0;
		var danmuWidth = danmu.clientWidth  + textObj.clientWidth;
		var danmuTextTimer = setInterval(function(){
			textObj.style.right = rightNumber + 'px';
			if (rightNumber > danmuWidth) {
				if (danmu.contains(textObj)) {
					danmu.removeChild(textObj);
				}
				clearInterval(danmuTextTimer);
			}
			rightNumber += 5;

		}, 50);
	}


	/**
	 * 去出数组中数据，让弹幕运动
	 */
	var getAndRun = function() {
		if (arr.length) {
			// 随机去除一个arr数组中的数据
			var n = Math.floor(Math.random() * arr.length);
			createDanmu(arr[n]);
		}
		setTimeout(getAndRun, 3000);
	}


	/**
	 * 为按钮点击添加事件
	 */
	var text = document.getElementById('text');
	var sentBtn = document.getElementById('sent');
	var resetBtn = document.getElementById('reset');
	sentBtn.addEventListener('click', function(){
		arr.push(text.value);
		ref.child('message').push(text.value);
		createDanmu(text.value);
		text.value = "";
		// 将数据添加的野狗
	}, false);
	text.addEventListener('keypress', function(){
		if (event.keyCode === 13) {
			arr.push(text.value);
			createDanmu(text.value);
			text.value = "";
		}
	}, false);
	resetBtn.addEventListener('click', function(){
		arr = [];
		ref.remove();
		var danmuTexts = Array.prototype.slice.call(danmu.childNodes);
		for(var i = 0, len = danmuTexts.length; i < len; i++){
			danmu.removeChild(danmuTexts[i]);
		}
	}, false);
	// 云端添加了数据
	ref.child('message').on('child_added', function(snapshot){
		var text = snapshot.val();
		arr.push(text)
	})

	getAndRun();
});