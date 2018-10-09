/*
 1. 鼠标移入显示,移出隐藏
 目标: 手机京东, 客户服务, 网站导航, 我的京东, 去购物车结算, 全部商品
 2. 鼠标移动切换二级导航菜单的切换显示和隐藏
 3. 输入搜索关键字, 列表显示匹配的结果
 4. 点击显示或者隐藏更多的分享图标
 5. 鼠标移入移出切换地址的显示隐藏
 6. 点击切换地址tab

 7. 鼠标移入移出切换显示迷你购物车
 8. 点击切换产品选项 (商品详情等显示出来)

 9. 点击向右/左, 移动当前展示商品的小图片
 10. 当鼠标悬停在某个小图上,在上方显示对应的中图
 11. 当鼠标在中图上移动时, 显示对应大图的附近部分区域
 */

/*
1. 对哪个/些元素绑定什么监听?
2. 对哪个/些元素进行什么DOM操作?
 */
$(function(){
	showHide()
	hoverSubMenu()
	search()
	share()
	address()
	clickTabs()
	hoverMinicart()
	clickProductTabs()
	moveMiniImg()
	hoverMiniImg()
	bigImg()
/*11. 当鼠标在中图上移动时, 显示对应大图的附近部分区域*/
	function bigImg () {
		var $maskTop = $('#maskTop')
		var $mask = $('#mask')//小黄块
		var maskWidth = $mask.width()
		var maskHeight = $mask.height()
		var maskTopWidth = $maskTop.width()
		var maskTopHeight = $maskTop.height()
		var mediumImgWidth = $('#mediumImg').width()
		var mediumImgHeight = $('#mediumImg').height()
		var $mediumImg = $('#mediumImg')
		var $largeImgContainer = $('#largeImgContainer')//大图的容器
		var $loading = $('#loading')//加载图
		var $largeImg = $('#largeImg')//大图
		$maskTop.hover(function(){
			$mask.show()//显示小黄块
			//2.大图
			var largeImgSrc = $mediumImg.attr('src').replace('-m.','-l.')
			$largeImg.attr('src',largeImgSrc)
			$largeImgContainer.show()
			$largeImg.on('load',function(){//大图加载完
				$largeImgContainer.css({
					width:$largeImg.width()/2,
					height:$largeImg.height()/2
				})
				$largeImg.show()//显示大图
				$loading.hide()
				//添加鼠标移动监听
				$maskTop.mousemove(function(event){//添加鼠标移动监听
					var left = 0
					var top = 0
					left = event.offsetX - $mask.width()/2
					top = event.offsetY -$mask.height()/2 
					//设置小黄块滑动边界
					if(left < 0){
						left = 0
					}else if(left > mediumImgWidth-maskWidth){
						left = mediumImgWidth-maskWidth
					}
					if(top < 0 ){
						top = 0
					}else if(top > mediumImgHeight-maskHeight){
						top = mediumImgHeight-maskHeight
					}
					$mask.css({//移动小黄块
						left:left,
						top:top
					})
					$largeImg.css({//移动大图 只显示¼
						left:-left * $largeImg.width()/maskTopWidth,
						top:-top * $largeImg.height()/maskTopHeight
					})
				})
			})
		},function(){
			$mask.hide()
			$largeImgContainer.hide()
			$largeImg.hide()
		})
	}

	
/*10. 当鼠标悬停在某个小图上,在上方显示对应的中图*/
	function hoverMiniImg () {
		$('#icon_list>li').hover(function(){
			var $img = $(this).children()
			var src = $img.attr('src').replace('.jpg','-m.jpg')
			$img.addClass('hoveredThumb')
			$('#mediumImg').attr('src',src)
		},function(){
			var $img = $(this).children()
			$(this).children().removeClass('hoveredThumb')
		})
	}
/*9. 点击向右/左, 移动当前展示商品的小图片*/
	function moveMiniImg () {
		var $as = $('#preview>h1>a')
		var $backward = $as.first()//左按钮
		var $forward = $as.last()//右按钮
		var moveCount = 0
		var SHOW_COUNT = 5
		var imgCount = $('#icon_list>li').length//图片个数
		var $ul = $('#icon_list')
		var li_length = 	$('#icon_list>li:first').width()
		
		if(imgCount > SHOW_COUNT){//初始化向右按钮
			$forward.attr('class','forward')	
		}
		$backward.click(function(){
			if(moveCount == 0){
				return
			}
			moveCount--
			$forward.attr('class','forward')
			$ul.css('left', -moveCount * li_length )
			if(moveCount == 0){
				$backward.attr('class','backward_disabled')
			}
		})
		$forward.click(function(){
			if(moveCount === imgCount-SHOW_COUNT){
				return
			}
			$backward.attr('class','backward')
			moveCount++
			if(moveCount === imgCount-SHOW_COUNT){
				$forward.attr('class','forward_disabled')
			}
			$ul.css('left', -moveCount * li_length )
			
		})
	}
/*8. 点击切换产品选项 (商品详情等显示出来)*/
	function clickProductTabs () {//current
		var $li = $('#product_detail>ul>li')
		var $contents = $('#product_detail>div:not(:first)')
		$li.click(function(){
			$li.removeClass('current')
			this.className = 'current'
			$contents.hide()
			var index = $(this).index()
			$contents.eq(index).show()
		})
	}
/*7. 鼠标移入移出切换显示迷你购物车*/
	function hoverMinicart () {
		$('#minicart').hover(function(){
			this.className = 'minicart'
			$(this).children(':last').show()
		},function(){
			this.className = ''
			$(this).children(':last').hide()
		})
	}
/*6. 点击切换地址tab*/
	function clickTabs () {
		var $li = $('#store_tabs>li')
		$li.click(function(){
			$li.removeClass('hover')
			$(this).addClass('hover')
		})
	}
/*5. 鼠标移入移出切换地址的显示隐藏*/
	function address () {
		var $select = $('#store_select')
		$select.hover(function(){
			$(this).children(':gt(0)').show()
		},function(){
			$(this).children(':gt(0)').hide()
		})
		.children(':last')
		.click(function(){
			$select.children(':gt(0)').hide()
		})
	}
/*4. 点击显示或者隐藏更多的分享图标*/
	function share(){
		var isOpen = false
		var $shareMore = $('#shareMore')
		var $parent = $shareMore.parent()
		var $as = $shareMore.prevAll(':lt(2)')
		var $b = $shareMore.children()
		$('#shareMore').click(function(){
			if(isOpen){//去关闭
				$parent.width('155')
				$as.hide()
				$b.removeClass('backword')
			}else{//去打开
				$parent.width('200')
				$as.show()
				$b.addClass('backword')
			}
			isOpen = !isOpen
		})
		 
	}
/*3. 输入搜索关键字, 列表显示匹配的结果*/
	function search (){
		$('#txtSearch')
			.on('keyup focus',function(){
				var txt = this.value.trim()
				if(txt){
					$('#search_helper').show()					
				}
			})
			.blur(function(){
				$('#search_helper').hide()
			})
	}

/*2. 鼠标移动切换二级导航菜单的切换显示和隐藏*/
	function hoverSubMenu (){
		$('#category_items>div').hover(function(){
			$(this).children(':last').show()
		},function(){
			$(this).children(':last').hide()
		})
	}
/* 1. 鼠标移入显示,移出隐藏 ，目标: 手机京东, 客户服务, 网站导航, 我的京东, 去购物车结算, 全部商品*/	
	function showHide(){
		$('[name = show_hide]').hover(function(){
		var id = this.id +'_items'
		$('#'+ id).show()
	},function(){
		var id = this.id +'_items'
		$('#'+ id).hide()
	})
	}
	
})