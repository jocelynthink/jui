$(document).ready(function(){

	var nav = $('#nav');
	var nav_brand = $('#nav').find('.navbar-brand');
	var nav_lias = $('#nav').find('.nav-ul').find('li').find('a');

	$(document).scroll(function(){
		if(window.scrollY > 100){
			nav.css({
				"padding":10,
				"backgroundColor":"rgba(255,255,255,.9)",
				"color": "#000"
			});
			nav_brand.css({
				"color": "#000"
			});
			for (var i = 0,len = nav_lias.length; i < len; i++) {
				if (nav_lias[i].classList.contains("active")) {
					nav_lias[i].classList = "active top";
				}else{
					nav_lias[i].classList = "top";
				}
			}
		}else{
			nav.css({
				"padding": 30,
				"backgroundColor":"transparent"
			});
			nav_brand.css({
				"color": "#fff"
			});
			// 更改回原来的状态
			for (var i = 0,len = nav_lias.length; i < len; i++) {
				if (nav_lias[i].classList.contains("active")) {
					nav_lias[i].classList = "active";
				}else{
					nav_lias[i].classList = "";
				}
			} 
		}
	});

	/**
	 * 给导航添加active效果
	 */
	var nav_ul = $('#nav').find('.nav-ul');
	nav_ul.click(function(event){
		// 先清除之前的class
		for (var i = 0 ,len = nav_lias.length; i < len; i ++){
			nav_lias[i].className = "";	
		}
		// 为当前选中的class 加上 active
			for (var i = 0 ,len = nav_lias.length; i < len; i ++){
			if (event.target == nav_lias[i]) {
				nav_lias[i].className = "active";
			}
		}
	});


});