var genal={
	show:function(fn){	
		genal.ips();	
	},
	ips:function(){
		var scrol = $(".unfold:eq(0) .round");
		var bar = $(".unfold:eq(0) .slider-selection");
		var slider = $(".unfold:eq(0) .slider");
		var mini = $(".unfold:eq(0) .mini");
		var flag = false;
		scrollbar.init(scrol,bar);
		scrollbar.assign(0,300,0);
		slider.mousedown(function(e) {			
			var track = $(".unfold:eq(0) .slider-track");
			var x = track.offset().left,px = e.pageX,w =parseInt(slider.css("width"));
			var a = px-x,per=0;
			if(a>0&&a<w){
				per = a/w;
			}else if(a<=0){
				per =0;
			}else if(a>=w){
				per =1;
			}
			scrollbar.scro(scrol,bar,per);
			scrollbar.assign(per,300,0);
			flag = true;
		});
		slider.mouseup(function(e) {
			flag = false;
		});
		slider.mousemove(function(e) {
			var track = $(".unfold:eq(0) .slider-track");
			var x = track.offset().left,px = e.pageX,w =parseInt(slider.css("width"));
			var a = px-x,per=0;
			if(a>0&&a<w){
				per=a/w;
			}else if(a<=0){
				per=0;
			}else if(a>=w){
				per=1;
			}
			if(flag){
				scrollbar.scro(scrol,bar,per);
				scrollbar.assign(per,300,0);
			}
		});
		mini.blur(function(){
		
			if(mini.val()>300){
				mini.val(300);
			}
			if(mini.val()<0){
				mini.val(0);
			}
			var per = mini.val()/300;
			scrollbar.scro(scrol,bar,per);
			scrollbar.assign(per,300,0);
			console.log(per)
		});
		
	},
	

};
var scrollbar={
	
	init:function(scrol,bar,fn){
		bar.css("width","0%");
		scrol.css("left","0%");
	},
	scro:function(scrol,bar,per){
		bar.css("width",""+per*100+"%");
		scrol.css("left",""+per*100+"%");
	},
	assign:function(per,max,index){
		var pris = $(".unfold:eq("+index+") .price");
		var mini = $(".unfold:eq("+index+") .mini");
		if(index==0){
			var price =Math.round(per*max);
			pris.children("div").remove();
			mini.val(price);
			if(price==0){
				pris.append("<div>¥<span>"+0+"</span>/月</div>");
			}
			if(price==1){
				pris.append("<div>¥<span>"+20+"</span>/月</div>");
			}
			if(price==2){
				pris.append("<div>¥<span>"+41+"</span>/月</div>");
			}
			if(price==3){
				pris.append("<div>¥<span>"+63+"</span>/月</div>");
			}
			if(price==4){
				pris.append("<div>¥<span>"+86+"</span>/月</div>");
			}
			if(price==5){
				pris.append("<div>¥<span>"+112+"</span>/月</div>");
			}
			if(price>5){
				pris.append("<div>¥<span>"+((price-5)*71+112)+"</span>/月</div>");
			}
		}
		
	}
}