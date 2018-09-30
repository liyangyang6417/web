/*
 功能说明:
 1. 点击向右(左)的图标, 平滑切换到下(上)一页
 2. 无限循环切换: 第一页的上一页为最后页, 最后一页的下一页是第一页
 3. 每隔3s自动滑动到下一页
 4. 当鼠标进入图片区域时, 自动切换停止, 当鼠标离开后,又开始自动切换
 5. 切换页面时, 下面的圆点也同步更新
 6. 点击圆点图标切换到对应的页

 bug: 快速点击下一页时, 有问题
 */
$(function(){
	//1. 点击向右(左)的图标, 平滑切换到下(上)一页
	var TIME = 400
	var TIME_ = 1500
	var ITEM_TIME = 20
	var PAGE_WIDTH = 600
	var $container = $('#container') 
	var $list = $('#list')
	var $points = $('#pointsDiv>span')
	var imgCount = $points.length
	//向前翻页
	$('#prev').click(function(){
		nextPage(false)	
	})
	//向后翻页
	$('#next').click(function(){
		nextPage(true)
	})
	
	function nextPage(next){
		var currLeft = 0 
		var poistion = $list.position().left
		var targetLeft = poistion+(next?-PAGE_WIDTH:PAGE_WIDTH)
		var itemOffset = 0
		var intervalId = setInterval(function(){
			itemOffset += PAGE_WIDTH/(TIME/ITEM_TIME)
			currLeft = next?poistion-itemOffset:poistion+itemOffset
			if(currLeft == targetLeft){
				if(currLeft == -(imgCount+1)*PAGE_WIDTH){
					currLeft = -PAGE_WIDTH
				}else if(currLeft == 0){
					currLeft = -imgCount*PAGE_WIDTH
				}
				clearInterval(intervalId)//取消定时器
			}
			
			$list.css('left',currLeft)
			updatePoints(targetLeft)//圆点更新
		},ITEM_TIME)
	}
	//3. 每隔3s自动滑动到下一页
	var intervalId = setInterval(function(){
		nextPage(true)
	},TIME_)
	//4. 当鼠标进入图片区域时, 自动切换停止, 当鼠标离开后,又开始自动切换
	$container.hover(function(){
		clearInterval(intervalId)
	},function(){
		intervalId = setInterval(function(){
		nextPage(true)
	},TIME_)
	})
	//5.切换页面时, 下面的圆点也同步更新
	function updatePoints(targetLeft){
		var pageNum = -targetLeft/PAGE_WIDTH
		pageNum = (pageNum == 0)?imgCount-1:((pageNum == imgCount+1)?0:pageNum-1	)//计算point位置
		console.log(pageNum)
		$points.each(function(index){
			if(index == pageNum){
				$(this).addClass('on')
			}else{
				$(this).removeClass('on')
			}
		})
	}
})