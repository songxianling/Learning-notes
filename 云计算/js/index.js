// JavaScript Document
var sspaas_index = {
	init : function (){
		//导航
		this.index_nav();
		
		//第一屏
		this.page1();
		
		//第二屏
		this.page2();
		
		//第三屏
		this.page3();
		
		//第四屏
		this.page4();
		
		//第五屏
		this.page5();
	},
	index_nav : function (){
		//导航
		var n1 = 0;
		$('.nav_nav_center ul li').hover(function(){
			n1 = 0;
			$('.nav_nav_center ul li span').stop().animate({
				left:'50%',
				width:'0'
			},200);
			$('.nav_nav_center ul li a').css('color','#58789a');
			$('span',this).stop().css('height','5px');
			$('a',this).stop().css('color','#fff');
			$('span',this).animate({
				left:'0',
				width:'100%',
				right:'0'
			},200);
		},function(){
			if(n1){
				$('span',this).stop().animate({
					left:'50%',
					width:'0'
				},200);
			};
			
		});

		// 导航下 悬浮框  10月25 修月超
			$(".nav_product_list ul li").mouseenter(function(){
				$(".nav_product_list ul li").removeClass("nav_list_color");
				$(this).addClass("nav_list_color");
			});
			$(".nav_solve_list ul li").mouseenter(function(){
				$(".nav_solve_list ul li").removeClass("nav_list_color");
				$(this).addClass("nav_list_color");
			});
			$(".nav_market_list ul li").mouseenter(function(){
				$(".nav_market_list ul li").removeClass("nav_list_color");
				$(this).addClass("nav_list_color");
			});
			$(".nav_partner_list ul li").mouseenter(function(){
				$(".nav_partner_list ul li").removeClass("nav_list_color");
				$(this).addClass("nav_list_color");
			});
			$(".nav_support_list ul li").mouseenter(function(){
				$(".nav_support_list ul li").removeClass("nav_list_color");
				$(this).addClass("nav_list_color");
			});
			$(".nav_partner_partner ul li").mouseenter(function(){
				$(".nav_partner_partner ul li").removeClass("nav_list_color");
				$(this).addClass("nav_list_color");
			});
			$(".nav_partner_list ul li").mouseenter(function(){
				$(".nav_partner_list ul li").removeClass("nav_list_color");
				$(this).addClass("nav_list_color");
			});
			$(".nav_api_list ul li").mouseenter(function(){
				$(".nav_api_list ul li").removeClass("nav_list_color");
				$(this).addClass("nav_list_color");
			});


			$(".nav_product_inter ul li").mouseenter(function(){
				$(".nav_product_inter ul li").removeClass("nav_list_color");
				$(this).addClass("nav_list_color");
				event.stopPropagation();
			});
			$(".nav_product_content ul li").mouseenter(function(){
				$(".nav_product_content ul li").removeClass("nav_list_color");
				$(this).addClass("nav_list_color");
				event.stopPropagation();
			});
			$(".nav_product_cunchu ul li").mouseenter(function(){
				$(".nav_product_cunchu ul li").removeClass("nav_list_color");
				$(this).addClass("nav_list_color");
				event.stopPropagation();
			});
			$(".nav_product_cnd ul li").mouseenter(function(){
				$(".nav_product_cnd ul li").removeClass("nav_list_color");
				$(this).addClass("nav_list_color");
				event.stopPropagation();
			});
			$(".nav_product_play ul li").mouseenter(function(){
				$(".nav_product_play ul li").removeClass("nav_list_color");
				$(this).addClass("nav_list_color");
				event.stopPropagation();
			});
			$(".nav_product_im ul li").mouseenter(function(){
				$(".nav_product_im ul li").removeClass("nav_list_color");
				$(this).addClass("nav_list_color");
				event.stopPropagation();
			});
			
			function hualeng(){
				$(".nav_float").stop().animate({"height":"460px"},500)
			}
			function nohua(){
				$(".nav_float").stop().animate({"height":"0"},500)
			}
			// 合作与生态下的
			$(".nav_partner_ziy ul li").mouseenter(function(){
				$(".nav_partner_ziy ul li").removeClass("nav_list_color");
				$(this).addClass("nav_list_color");
				event.stopPropagation();
			});
			$(".nav_partner_fire ul li").mouseenter(function(){
				$(".nav_partner_fire ul li").removeClass("nav_list_color");
				$(this).addClass("nav_list_color");
				event.stopPropagation();
			});
			$(".nav_partner_new ul li").mouseenter(function(){
				$(".nav_partner_new ul li").removeClass("nav_list_color");
				$(this).addClass("nav_list_color");
				event.stopPropagation();
			});
						
					// 产品
			$("#nav_product").mouseenter(function(){
				hualeng();
				$('.nav_float>*').css({"display":"none"});
				$('.nav_float .index_nav_product').css({"display":"block"});
			});
					//解决方案 
			$("#nav_solve").mouseenter(function(){
				hualeng();
				$('.nav_float>*').css({"display":"none"});
				$('.nav_float .index_nav_solve').css({"display":"block"});

			});
					//云超市
			$("#nav_market").mouseenter(function(){
				hualeng();
				$('.nav_float>*').css({"display":"none"});					
				$('.nav_float .index_nav_market').css({"display":"block"});
			});
					//合作伙伴
			$("#nav_partner").mouseenter(function(){
				hualeng();
				$('.nav_float>*').css({"display":"none"});					
				$('.nav_float .index_nav_partner').css({"display":"block"});
			});
					//文档
			$("#nav_api").mouseenter(function(){
				hualeng();
				$('.nav_float>*').css({"display":"none"});						
				$('.nav_float .index_nav_api').css({"display":"block"});
			});
					//支持
			$("#nav_support").mouseenter(function(){
				hualeng();
				$('.nav_float>*').css({"display":"none"});						
				$('.nav_float .index_nav_support').css({"display":"block"});
			});

					//离开事件 
			$('.nav_main .nav_float').mouseleave(function(){
				nohua();
				$('.nav_float>*').css({"display":"none"});
				n1=1;
				$('.nav_nav_center li span').stop().animate({
					left:'50%',
					width:'0'
				},200);
				$('.nav_nav_center li a').css('color','#58789a');				
			});
				function controlshow(){
					$(".index_nav_product>*").hide();
					$(".nav_product_list").show();
					$(".nav_left_title").show();
				};
				// 合作与生态的切换
				$("#js_zy_center").mouseenter(function(){
					$("#hezuo_la>*").hide();
					$(".nav_partner_partner").show();
				});
				$("#js_zy_suan").mouseenter(function(){
					$("#hezuo_la>*").hide();
					$(".nav_partner_ziy").show();
				});
				$("#js_zy_fire").mouseenter(function(){
					$("#hezuo_la>*").hide();
					$(".nav_partner_fire").show();
				});
				$("#js_zy_new").mouseenter(function(){
					$("#hezuo_la>*").hide();
					$(".nav_partner_new").show();
				});
				// 产品 子层浮动切换
				$("#js_zi_yun").mouseenter(function(){
					 controlshow();
					$(".nav_product_content").show();
				});
				$("#js_zi_cun").mouseenter(function(){
					 controlshow();
					$(".nav_product_cunchu").show();
				});
				$("#js_zi_inter").mouseenter(function(){
					 controlshow();
					$(".nav_product_inter").show();
				});
				$("#js_zi_cdn").mouseenter(function(){
					 controlshow();
					$(".nav_product_cnd").show();
				});
				$("#js_zi_bo").mouseenter(function(){
					 controlshow();
					$(".nav_product_play").show();
				});
				$("#js_zi_im").mouseenter(function(){
					 controlshow();
					$(".nav_product_im").show();
				});
		// 鼠标浮动 end
	},
	page1 : function (){
		var index_num = 0;
		var index_num_max = $('.index_banner li').length-1;
		$('.index_banner li').eq(index_num).addClass('cur').fadeIn().siblings().fadeOut().removeClass('cur');
		
		$('.index_banner .jian_left').click(function(e) {
			index_num --;
			if(index_num < 0){				
				index_num = index_num_max;
			}					
			$('.index_banner li').eq(index_num).fadeIn().addClass('cur').siblings().removeClass('cur');
		});
		
		$('.index_banner .jian_right').click(function(e) {
			index_num ++;
			if(index_num > index_num_max){
				index_num = 0;
				$('.index_banner li').eq(index_num).fadeIn().addClass('cur').siblings().removeClass('cur');
			}else{				
				$('.index_banner li').eq(index_num).fadeIn().addClass('cur').siblings().removeClass('cur');
			}
			
		});
		
		$('.index_banner li').mousemove(function(ev) {
			var iX=parseInt(ev.clientX-$(this).offset().left);
			var iOld=parseInt($('.index_banner li').css('WebkitPerspectiveOrigin'));
			var iTimer=Math.abs(iOld-iX);
			iTimer=iTimer<30?0:parseInt(iTimer);
			$('.index_banner li').css({
				'transition':iTimer+'ms',
				'itPerspectiveOrigin': iX+'px center',
				'WebkTransition':iTimer+'ms',
				'WebkitPerspectiveOrigin': iX+'px center',
				'MozTransition':iTimer+'ms',
				'MozPerspectiveOrigin': iX+'px center',
				'MsTransition':iTimer+'ms',
				'MsPerspectiveOrigin': iX+'px center',
				'OTransition':iTimer+'ms',
				'OPerspectiveOrigin': iX+'px center',
			})
			
		});
		
	},
	
	page2 : function (){
		
	},
	page3 : function (){
		var index_num_three = 0;
		var index_num_max = $('.index_banner_three li').length-1;
		
		$('.index_banner_three li').eq(index_num_three).addClass('cur').fadeIn().siblings().fadeOut().removeClass('cur');		
		$('.index_banner_three .jian_left_three').click(function(e) {
			index_num_three --;
			if(index_num_three < 0){				
				index_num_three = index_num_max;				
			}
			$('.bottom_three span').eq(index_num_three).addClass('sele').siblings().removeClass('sele');
			$('.index_banner_three li').eq(index_num_three).fadeIn().addClass('cur').siblings().removeClass('cur');
		});
		
		$('.index_banner_three .jian_right_three').click(function(e) {
			index_num_three ++;
			if(index_num_three > index_num_max){				
				index_num_three = 0;
				$('.bottom_three span').eq(index_num_three).addClass('sele').siblings().removeClass('sele');
				$('.index_banner_three li').eq(index_num_three).fadeIn().addClass('cur').siblings().removeClass('cur');
			}else{
				$('.bottom_three span').eq(index_num_three).addClass('sele').siblings().removeClass('sele');
				$('.index_banner_three li').eq(index_num_three).fadeIn().addClass('cur').siblings().removeClass('cur');			
			}
			
		});
		
		
		$('.bottom_three span').click(function () {
			var _this = $(this).index();
			$('.bottom_three span').eq(_this).addClass('sele').siblings().removeClass('sele');
			$('.index_banner_three li').eq(_this).fadeIn().addClass('cur').siblings().removeClass('cur');
		});
		
		
	},

	page4 : function (){
		for(var i=0; i<$('.sp_box ul li').length; i++){
			$('.sp_box ul li')[i].n=1;
			$('.sp_box ul li')[i].tiemr = null;
		}
		
		$('.sp_box ul li').mouseenter(function(e) {
			
			var thatj = this;
			var that = $(this);
			
			if(this.n){
				this.n=0;
				that.find('.point2').show();
				that.find('.list_2,.point2,.line_2').fadeIn();
				that.find('.line_2').stop().animate({'width':'50%'},200,function(){
					that.find('.list_2').stop().animate({'height':'100%'},300);
					thatj.n=1;
				})
				
			}
		});
		
		$('.sp_box ul li').mouseleave(function(e) {
			clearTimeout(this.timer);
			
			var thatj = this;
			var that = $(this);
			
			if(this.n){
				this.n=0;
				init()
			}else{		
				this.timer = setTimeout(init,1000)
					
			}
			function init(){
				that.find('.list_2').animate({'height':'0'},500,function(){
					that.find('.line_2').animate({'width':'0'},300,function(){
						that.find('.point2').hide();
					});
					thatj.n=1;
				});
			}
		})
	},
	page5 : function (){

	}	
};

sspaas_index.init();

