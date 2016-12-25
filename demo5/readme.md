### web App开发流程
1. 产品功能设计(PM,ProductManager,MDR)-->设觉/交互设计(UI,UE)
2. 技术规划(PM,PojectManager,产品需求是否合理，产品代码是否可以复用，复杂项目是否可以拆分)-->前端开发(FE,FrontEnd developer engineer,网页HTML)-->后端开发(Research engineer)
3. 测试(QA,对网页代码进行功能/性能测试)-->上线(PO,代码部署到发布)


#### 内容组织类:H5
作用：

1. 组织H5报告的内容结构
2. 设置H5报告的切换效果（fullpage.js）,当页切换时，通	知页内所以的组件
方法： 
1. 添加一个页 addPage
2. 添加一个组件 addCompoent
3. 展现所以页面 loader

#### 图文组件类：H5CompoentBase

作用：输出一个DOM,内容可以是图片或者文字
事件：	当页面载入onLoad
		当页面移除onLeave
基本图文组件（图、文设置）
接受onLoad、onLeave事件
开发方法：独立模块化开发
		
#### 图标组件类：H5Compoent???

作用：在H5CompoentBase的基础之上插入DOM结构或CANVAS图形

事件：当页面载入、移除onLoad、onLeave
     图标组件本身的生长动画
     
     
