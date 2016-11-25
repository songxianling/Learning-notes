var genal={
	show:function(fn){			
		genal.sto();
		genal.ips();
		genal.hard();
	},
	sto:function(){
		var btn = $(".unfold:eq(0) .silbtn");
		var des = $(".unfold:eq(0) .des")
		var sil = 5000;
		var scrol = $(".unfold:eq(0) .round");
		var bar = $(".unfold:eq(0) .slider-selection");
		var slider = $(".unfold:eq(0) .slider");
		var mini = $(".unfold:eq(0) .mini");
		scrollbar.init(scrol,bar);
		scrollbar.assign(0,sil,0);
		var flag = false;
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
			scrollbar.assign(per,sil,0);
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
				scrollbar.assign(per,sil,0);
			}
		});
	    mini.blur(function(){
			if(mini.val()>5000){
				mini.val(5000);
			}
			if(mini.val()<0){
				mini.val(0);
			}
			var per = mini.val()/5000;
			scrollbar.scro(scrol,bar,per);
			scrollbar.assign(per,sil,0);
		});
	},
	ips:function(){
		var scrol = $(".unfold:eq(1) .round");
		var bar = $(".unfold:eq(1) .slider-selection");
		var slider = $(".unfold:eq(1) .slider");
		var mini = $(".unfold:eq(1) .mini");
		var flag = false;
		scrollbar.init(scrol,bar);
		scrollbar.assign(0,300,1);
		slider.mousedown(function(e) {			
			var track = $(".unfold:eq(1) .slider-track");
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
			scrollbar.assign(per,300,1);
			flag = true;
		});
		slider.mouseup(function(e) {
			flag = false;
		});
		slider.mousemove(function(e) {
			
			var track = $(".unfold:eq(1) .slider-track");
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
				scrollbar.assign(per,300,1);
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
			scrollbar.assign(per,300,1);
			
		});
		
	},
	hard:function(){
		var btn = $(".unfold:eq(2) .silbtn");
		var des = $(".unfold:eq(2) .des")
		var silHard = 5000;
		var scrol = $(".unfold:eq(2) .round");
		var bar = $(".unfold:eq(2) .slider-selection");
		var slider = $(".unfold:eq(2) .slider");
		var mini = $(".unfold:eq(2) .mini");
		scrollbar.init(scrol,bar);
		scrollbar.assign(0,silHard,2);
		var flag = false;
		slider.mousedown(function(e) {
			var track = $(".unfold:eq(2) .slider-track");
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
			scrollbar.assign(per,silHard,2);
			flag = true;
		    });
		slider.mouseup(function(e) {
			flag = false;
		    });
		slider.mousemove(function(e) {
			var track = $(".unfold:eq(2) .slider-track");
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
				scrollbar.assign(per,silHard,2);
			}
		});
	    mini.blur(function(){
			if(mini.val()>5000){
				mini.val(5000);
			}
			if(mini.val()<0){
				mini.val(0);
			}
			var per = mini.val()/5000;
			scrollbar.scro(scrol,bar,per);
			scrollbar.assign(per,silHard,2);
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
			/*if(price*10<100){
				pris.append("<div>¥<span>"+26+"</span>/月</div>");
				document.getElementById("bandwidthId").value="100";
			}else{
				pris.append("<div>¥<span>"+(price*2.6).toFixed(1)+"</span>/月</div>");
			}*/
		}
		if(index==1){		
			var price =Math.round(per*max);
			pris.children("div").remove();
			mini.val(price);
			/*if(price==0){
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
			}*/
		}
		if(index==2){			
			var price =Math.round(per*max);
			pris.children("div").remove();			
			mini.val(price);
		}
	
	}
}