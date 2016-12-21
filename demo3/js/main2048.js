var board = new Array();
var hasConflicted = new Array();
var score = 0;
const NUMBER = 4;

var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;

$(document).ready(function(){
	prepareForMoblie();
	newgame();
});
function prepareForMoblie(){
	if (documentWidth > 500)  {
		gridContainerWidth = 500;
		cellSideLength = 100;
		cellSpace = 20;
	}
	$('#grid-container').css('width',gridContainerWidth - 2 * cellSpace);
	$('#grid-container').css('height',gridContainerWidth - 2 * cellSpace);
	$('#grid-container').css('padding', cellSpace);
	$('#grid-container').css('border-radius', 0.02*gridContainerWidth);
	$('.grid-cell').css('width',cellSideLength);
	$('.grid-cell').css('height',cellSideLength);
	$('.grid-cell').css('border-radius',0.02*cellSideLength);
}
function newgame(){
	// 初始化棋盘格
	init();
	// 在随机两个格子生成数字
	generateOneNumber();
	generateOneNumber();
	updateBoardView();
}
function init(){
	for (var i = 0;i < NUMBER;i ++){
		for (var j = 0; j < NUMBER; j++){
			var gridCell = $('#grid-cell-' + i + '-' + j);
			gridCell.css('top',getPosTop(i,j) + 'px');
			gridCell.css('left',getPosLeft(i,j) + 'px');
		}
	}
	// 将board变成二维数组
	for (var i = 0; i < NUMBER; i++) {
		board[i] = new Array();
		hasConflicted[i]  = new Array();
		for (var j= 0; j < NUMBER; j++) {
			board[i][j]  = 0;
			hasConflicted[i][j]= false;
		}
	}
	updateBoardView(); 
	score = 0;
}


function updateBoardView(){
	$('.number-cell').remove();
	for (var i = 0; i < NUMBER; i++) {
		for (var j = 0; j < NUMBER; j++) {
			$('#grid-container').append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"</div>');
			var theNumberCell = $('#number-cell-' + i + '-' + j);

			if (board[i][j] == 0){
				theNumberCell.css('width', '0px');
				theNumberCell.css('height', '0px');
				theNumberCell.css('top',getPosTop(i,j) + cellSideLength/2 + 'px');
				theNumberCell.css('left',getPosLeft(i,j) + cellSideLength/2 + 'px');
			} else {
				theNumberCell.css('width', cellSideLength + 'px');
				theNumberCell.css('height', cellSideLength + 'px');
				theNumberCell.css('top',getPosTop(i,j));
				theNumberCell.css('left',getPosLeft(i,j));
				theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
				theNumberCell.css('color',getNumberColor(board[i][j]));
				theNumberCell.text(board[i][j]);
			}

			hasConflicted[i][j] = false;
		}
		$('.number-cell').css('line-height',cellSideLength + 'px');
		$('.number-cell').css('font-size',0.6*cellSideLength + 'px');
	}
}
/**
 * 随机生成一个位置
 */
function generateOneNumber(){
	if(nospace(board)){
		return false;
	}

	// 随机一个位置
	var randx = parseInt(Math.floor(Math.random() * 4)),
		randy = parseInt(Math.floor(Math.random() * 4));
	var times = 0;

	while (times < 50) {
		if (board[randx][randy] == 0){
			break;
		}
		randx = parseInt(Math.floor(Math.random() * 4));
		randy = parseInt(Math.floor(Math.random() * 4));
	
		// 直到产生了一个新的合法的坐标
		times ++;
	}

	if (times == 50){
		for(var i = 0 ;i <4; i++){
			for(var j = 0;j < 4;j ++){
				if (board[i][j] == 0){
					randx = i;
					randy = j;
				}
			}
		}
	}
 	// 随机一个数字
	// 以50%的概率生成2 以50%的概率生成4
	var randNumber = Math.random() < 0.5 ? 2 : 4; 

	board[randx][randy] = randNumber;
	showNumberWithAnimation(randx, randy, randNumber);
	return true;
}


$(document).keydown(function(event){
	switch(event.keyCode) {
		case 37: //left
			event.preventDefault();
			if (moveLeft()){
				setTimeout('generateOneNumber()',210);
				setTimeout('isgameover()',300);
			}
			break;
		case 38: // up
			event.preventDefault();
			if (moveUp()) {
				setTimeout('generateOneNumber()',210);
				setTimeout('isgameover()',300);
			}
			break;
		case 39: // right
			event.preventDefault();
			if (moveRight()) {
				setTimeout('generateOneNumber()',210);
				setTimeout('isgameover()',300);
			}
			break;
		case  40: // down
			event.preventDefault();
			if (moveDown()) {
				setTimeout('generateOneNumber()',210);
				setTimeout('isgameover()',300);
			}
			break;
		default: 
			break;
	}
});


document.addEventListener('touchstart',function(event){
	startx = event.touches[0].pageX;
	starty =  event.touches[0].pageY;
});
document.addEventListener('touchend',function(event){
	endx = event.changedTouches[0].pageX;
	endy = event.changedTouches[0].pageY;

	var deltax = endx - startx;
	var deltay = endy - starty;

	if (Math.abs(deltax) < 0.3 *documentWidth && Math.abs(deltay)< 0.3 * documentWidth) {
		return;
	}
	// 在x轴滑动
	if (Math.abs(deltax) >= Math.abs(deltay)) {
		if (deltax > 0) {
			// right
			if (moveRight()) {
				setTimeout('generateOneNumber()',210);
				setTimeout('isgameover()',300);
			}
		}else{
			// left
			if (moveLeft()){
				setTimeout('generateOneNumber()',210);
				setTimeout('isgameover()',300);
			}
		}

	}else {
		// 在y轴滑动
		if (deltay > 0) {
			// down
			if (moveDown()) {
				setTimeout('generateOneNumber()',210);
				setTimeout('isgameover()',300);
			}
		}else{
			// up
			if (moveUp()) {
				setTimeout('generateOneNumber()',210);
				setTimeout('isgameover()',300);
			}
		}
	}
	
});
function isgameover(){
	if (nospace(board) && nomove(board)) {
		gameover();
	}
}

function gameover(){
	updateBoardView();
	console.log('gameover!');
}
/*
 * 对每一个数字的左侧位置进行判断，看是否可能为落脚点
 * 落脚的位置是否为空
 * 落脚位置数字是否和待判定元素相等
 * 移动的路径中是否有障碍物
 */			

function moveLeft() {
	if (!canMoveLeft(board)) {
		return false;
	}
	for (var i = 0; i < 4;i ++){
		for (var j = 1;j < 4; j++){
			if (board[i][j] !=0) {
				for (var k = 0; k < j; k++){
					if(board[i][k] == 0 && noBlockHorizontal(i,k,j,board) ){
						showMoveAnimation(i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j]  = 0;
						continue;
					} else if (board[i][k] == board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConflicted[i][k]){
						showMoveAnimation(i, j, i, k);
						board[i][k] += board[i][j];
						board[i][j]  = 0;
						score += board[i][k];
						updateScore(score);

						hasConflicted[i][k] = true;
						continue;
					}
				}
			}
		}
	}
	setTimeout('updateBoardView()',200);
	// moveLeft逻辑
	return true;
}

function moveRight(){
	if (!canMoveRight(board)) {
		return false;
	}
	for (var i = 0; i < 4;i ++){
		for (var j = 2;j >= 0 ; j--){
			if (board[i][j] !=0) {
				for (var k = 3; k > j; k--){
					if(board[i][k] == 0 && noBlockHorizontal(i,j,k,board)){
						showMoveAnimation(i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j]  = 0;
						continue;
					} else if (board[i][k] == board[i][j] && noBlockHorizontal(i,j,k,board) &&!hasConflicted[i][k]){
						showMoveAnimation(i, j, i, k);
						board[i][k] += board[i][j];
						board[i][j]  = 0;
						score += board[i][k];
						updateScore(score);
						hasConflicted[i][k] = true;
						continue;
					}
				}
			}
		}
	}
	setTimeout('updateBoardView()',200);
	return true;
}


function moveUp(){
	if (!canMoveUp(board)) {
		return false;
	}
	for (var j = 0; j < 4;j ++){
		for (var i = 1;i < 4; i++){
			if (board[i][j] !=0) {
				for (var k = 0; k < i; k++){
					if(board[k][j] == 0 && noBlockVertical(j,k,i,board)){
						showMoveAnimation(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j]  = 0;
						continue;
					} else if (board[k][j] == board[i][j] && noBlockVertical(j,k,i,board) &&!hasConflicted[i][k]){
						showMoveAnimation(i, j, k, j);
						board[k][j] += board[i][j];
						board[i][j]  = 0;
						score += board[k][j];
						updateScore(score);
						hasConflicted[i][k] = true;
						continue;
					}
				}
			}
		}
	}
	setTimeout('updateBoardView()',200);
	// moveLeft逻辑
	return true;
}


function moveDown(){
	if (!canMoveDown(board)) {
		return false;
	}
	for (var j = 0; j < 4;j ++){
		for (var i = 2;i >= 0; i--){
			if (board[i][j] !=0) {
				for (var k = 3; k > i; k--){
					if(board[k][j] == 0 && noBlockVertical(j,i,k,board)){
						showMoveAnimation(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j]  = 0;
						continue;
					} else if (board[k][j] == board[i][j] && noBlockVertical(j,i,k,board) &&!hasConflicted[i][k]){
						showMoveAnimation(i, j, k, j);
						board[k][j] += board[i][j];
						board[i][j]  = 0;
						score += board[k][j];
						updateScore(score);
						hasConflicted[i][k] = true;
						continue;
					}
				}
			}
		}
	}
	setTimeout('updateBoardView()',200);
	return true;
}