/**
 * 第二副场景页面
 *
 */
function pageC() {
    this.element = $(".page-c");
    this.$window   = $(".page-c .window");
    this.$leftWin  = this.$window.find(".window-left");
    this.$rightWin = this.$window.find(".window-right");
    this.$sceneBg  = this.$window.find(".window-scene-bg");
    this.$closeBg  = this.$window.find(".window-close-bg");
    this.$deer = this.element.find(".deer");

    // 背景切换
    this.$sceneBg.transition({
        opacity: 0,
    }, 3000);
    this.$closeBg.css("transform", "translateZ(0)")
    this.$closeBg.transition({
        opacity: 1
    }, 5000);

    //关门动作

    this.closeWindow(this.run);
    
}

/**
 * 关闭窗
 * @return {[type]} [description]
 */
pageC.prototype.closeWindow = function(callback) {
    var count = 1;
    var complete = function() {
        ++count
        if (count === 2) {
            callback && callback();
        }
    }
    var bind = function(data) {
        data.one("transitionend webkitTransitionEnd", function(event) {
            complete();
        })
    }
    bind(this.$leftWin.addClass("close"));
    bind(this.$rightWin.addClass("close"));
}

/**
 * 运行下一个动画
 * @return {Function} [description]
 */
pageC.prototype.next = function(options) {
    var dfd = $.Deferred();
    this.$deer.transition(options.style, options.time, "linear",function() {
        dfd.resolve()
    });
    return dfd;
}

/**
 * 路径
 * @return {[type]} [description]
 */
pageC.prototype.run = function(callback){
    var that = this;
    var next = function() {
        return this.next.apply(this, arguments)
    }.bind(this)
    this.$deer.addClass('deer-go');
    next({
        "time": 7000,
        "style": {
          "top": "5rem",
          "right": "-4.5rem",
          "scale": "0.8"
        }
    })
    .then(function() {
       return next({
            "time":500,
            "style": {
               "rotateY" : "-180",
               "scale": "0.7"
            }
        })
    })    
    .then(function(){
        return next({
            "time":10000,
            "style":{
              "top": "0.1rem",
              "right": "10rem",
              "scale": "0.1"
            }
        })
    }).then(function(){
      that.$deer.remove();
    })

}
