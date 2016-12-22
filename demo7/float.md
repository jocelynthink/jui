float：
起源：让文字环绕图片

特性：

1. 设置为float的元素会生成一个块级上下文BFC

	其他具有BFC的元素有：
	
	display:inline-block/table-cell/...
	position:absolute/fixed/sticky
	overflow:hidden/scroll
	
2. 将破坏父元素的高度

   其他会破坏父元素的高度的元素有：
   
   display:none
   position:absolute/fixed/sticky
   
浮动的原本作用仅仅是为了**实现文字环绕效果
**

### 清除浮动

### 浮动的效果
元素block块状化(砖头化)
破坏性造成的紧密排列特性（去空格化）


给css使用的class采用`_`来间隔，前面要有前缀
给js使用的class和id采用驼峰命名