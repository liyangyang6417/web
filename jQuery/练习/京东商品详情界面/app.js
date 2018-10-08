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