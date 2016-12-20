require.config({
	paths: {
		jquery: 'lib/jquery-3.1.1',
		jqueryUI: 'lib/jquery-ui-1.12.1/jquery-ui'
	}
});
require( ['jquery', 'window'], function($, w) {
	$('#a').click(function() {
		var win = new w.Window()
		win.alert({
			title: "提示",
			content: "welcome",
			width: 300,
			height: 150,
			y: 50,
			handler4AlertBtn: function() {
				alert("you click the alert button");
			},
			handler4CloseBtn: function() {
				alert("you click the close button");
			},
			skinClassName: "window_skin_a",
			dragHandler: ".window_header",
			isDragable: true
		}).on("alert", function() {
			alert("the second alert handler");
		}).on("alert", function() {
			alert("the third alert handler");
		}).on("close", function() {
			alert("the second close handler");
		});

	});

	$('#b').click(function() {
		var win = new w.Window()
		win.confirm({
			title: "确认",
			content: "hahahaha",
			width: 300,
			height: 150,
			y: 50,
			handler4ConfirmBtn: function() {
				alert("you click the alert button");
			},
			handler4CancelBtn: function() {
				alert("you click the close button");
			},
			skinClassName: "window_skin_a",
			dragHandler: ".window_header",
			isDragable: true
		}).on("confrim", function() {
			alert("the second confrim handler");
		}).on("cancel", function() {
			alert("the third cancel handler");
		});
	});
	$('#c').click(function() {
		var win = new w.Window()
		win.prompt({
			title: "请输入名字",
			content: "我们将会为你保密",
			width: 300,
			height: 150,
			y: 50,
			handler4PromptBtn: function() {
				alert("you click the alert button");
			},
			handler4CancelBtn: function() {
				alert("you click the close button");
			},
			skinClassName: "window_skin_a",
			dragHandler: ".window_header",
			isDragable: true,
			text4PromptBtn: "输入",
			defaultValue4PromptInput:"张三"

		}).on("prompt", function() {
			alert("the second confrim handler");
		});
	});
});