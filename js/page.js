(function () {
	$(document).ready(function (e) {
		function stopDefault( e ) {
	        //阻止默认浏览器动作(W3C)
	        if ( e && e.preventDefault )
	            e.preventDefault();
	        //IE中阻止函数器默认动作的方式
	        else
	    		window.event.returnValue = false;
	        return false;
	    }

	    $("body").on("click","a[href='#']",function(e){
			stopDefault( e );
		});
	
		var tongjiObj = {
			tongji_share_all:function(){
				//总转发数统计接口调用
				$.get("http://appapi.people.com.cn/views/projectvotes?pjcode=201603_lkq&datatype=1&optionid=1");
			},
			tongji_share_appMessage:function(){
				//转发朋友数统计接口调用
				$.get("http://appapi.people.com.cn/views/projectvotes?pjcode=201603_lkq&datatype=1&optionid=2");
			},
			tongji_share_timeline:function(){
				//转发朋友圈数统计接口调用
				$.get("http://appapi.people.com.cn/views/projectvotes?pjcode=201603_lkq&datatype=1&optionid=3");
			},
			tongji_PV:function(){
				//页面访问量统计接口调用
				$.get("http://appapi.people.com.cn/views/projectvotes?pjcode=201603_lkq&datatype=1&optionid=4");
			},
			tongji_playAudio:function(){
				//音频播放次数统计接口调用
				$.get("http://appapi.people.com.cn/views/projectvotes?pjcode=201603_lkq&datatype=1&optionid=5");
			},
			tongji_readKeyword:function(){
				//看关键词详情次数统计接口调用
				$.get("http://appapi.people.com.cn/views/projectvotes?pjcode=201603_lkq&datatype=1&optionid=6");
			}
		}
		
		tongjiObj.tongji_PV();
		
		var lineLink = window.location.href;
		lineLink = lineLink.indexOf("?") > 0 ? lineLink.split("?")[0] : lineLink;
		lineLink = lineLink.indexOf("#") > 0 ? lineLink.split("#")[0] : lineLink;
		
		var imgUrl = lineLink+shareData.imgUrl,
		shareTitle = shareData.shareTitle,
		descContent = shareData.descContent,
		shareLink = shareData.shareLink;
		
		intWeixin();
		function intWeixin(){
		var curUrl=window.location.href.split('#')[0];
		curUrl =  encodeURIComponent(curUrl);
		$.ajax({
		    type : "get",
		    url : "http://rmrbapi.people.cn/static/weixin/jssdk.php?url="+curUrl,
		    dataType : "jsonp",
		    jsonp: "callback",
		    jsonpCallback:"success_jsonpCallback",
		    success : function(data){
		        wx.config({
		        //debug: true,
				appId: data.appId,
				timestamp: data.timestamp,
				nonceStr: data.nonceStr,
				signature: data.signature,
				jsApiList: [
				"onMenuShareTimeline",
				"onMenuShareAppMessage"
				]
				});
				},
                error:function(data){
                }
				});
			}
			
			wx.ready(function (){
				wx.onMenuShareAppMessage({
				title: shareTitle,
				desc: descContent,
				link: shareLink,
				imgUrl: imgUrl,
				success:function(){
					tongjiObj.tongji_share_all();
					tongjiObj.tongji_share_appMessage();
				}
				});
				wx.onMenuShareTimeline({
				title: shareTitle,
				link: shareLink,
				imgUrl: imgUrl,
				success:function(){
					tongjiObj.tongji_share_all();
					tongjiObj.tongji_share_timeline();
				}
				});
			});
		
		var _height = $(window).height(),
		_width = $(window).width();
		
		
		function fakeClick(fn) {
				var $a = $('<a href="#" id="fakeClick"></a>');
					$a.bind("click", function(e) {
						e.preventDefault();
						fn();
					});
				
				$("body").append($a);
						
				var evt, 
					el = $("#fakeClick").get(0);
				
				if (document.createEvent) {
					evt = document.createEvent("MouseEvents");
					if (evt.initMouseEvent) {
						evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
						el.dispatchEvent(evt);
					}
				}
				
				$(el).remove();
			}
		
		var musicCtrl = {
				audioDiv:$("#audio_bg"),
				audio:$("#audio").get(0),
				init:function(){
					musicCtrl.audio.addEventListener("playing", function () {
						musicCtrl.audioDiv.removeClass("stop");
						tongjiObj.tongji_playAudio();
					});
					musicCtrl.audio.addEventListener("pause", function () {
						musicCtrl.audioDiv.addClass("stop");
					});
					musicCtrl.audioDiv.on("touchend",
						function(t) {
							var o = $(this);
							if(o.hasClass("stop")){
								musicCtrl.audio.currentTime = 0;
								musicCtrl.audio.play();
								o.removeClass("stop");
							}else{
								musicCtrl.audio.pause();
								o.addClass("stop");
							}
							return false;
						});
				}
			}
		
		var mySwiper = new Swiper("#swiper-container", {
				direction : 'vertical',
				initialSlide :0,//初始化的显示页面
				effect : 'fade',
				onlyExternal:true,
				width: window.innerWidth,
				height: window.innerHeight,
				onInit: function(swiper){
					swiperAnimateCache(swiper);
				},
				onSlideChangeStart: function(swiper){
					swiperAnimate(swiper);
			    }
			});
			
			function ImgLoader(a) {
			  function b(a, b, c) {
				var d = new Image;
				d.onload = b, d.onerror = c, d.src = a, j[a] = d
			  }
			  function c() {
				var a = this.getAttribute("src");
				j[a].loaded = !0, h++, h + i == g ? "function" == typeof e && e(g, h, i) : "function" == typeof f && f(g, h, i)
			  }
			  function d() {
				var a = this.getAttribute("src");
				j[a].loaded = !1, i++, h + i == g ? "function" == typeof e && e(g, h, i) : "function" == typeof f && f(g, h, i)
			  }
			  var e, f, g, h = 0,
				  i = 0,
				  j = {},
				  k = {},
				  l = [];
			  "string" == typeof a ? (g = 1, l[0] = a) : (g = a.length, l = a), this.assets = j, this.asset = k, this.completed = function(a) {
				e = a
			  }, this.progress = function(a) {
				f = a
			  }, this.start = function() {
				for (var a = 0; g > a; a++) b(l[a], c, d);
				return j
			  }
			}
			
			function loadingPage() {
				var a = this,
					b = ["css/img/bg_1.png","css/img/bg_2.png","css/img/bg_page.png","css/img/txt1.png","css/img/pic_zl.png","css/img/pic_head.png"],
					c = new ImgLoader(b);
				return c.progress(function(a, b, c) {
				}), c.completed(function() {
					$("#loadding").addClass("animated fadeOut");
					
				}), c.start(), a
			  }
			
			//页面加载完成
			loadingPage();
			
			$("#loadding").one("webkitAnimationEnd", function () {
				afterLoading(); //加载完成之后
			});
			
			
			function afterLoading(){
				mySwiper.slideTo(0,0);
				$("#device").addClass("show");
				swiperAnimate(mySwiper);
				musicCtrl.init(); //初始化音乐播放
			}
			
			//摇一摇
			var shakeAction = {
				speed:10,
				x:0,
				y:0,
				z:0,
				lastX:0,
				lastY:0,
				lastZ:0,
				liTime:0,
				curTime:0,
				isLisenShake:0,
				init:function(callback){
				
					if(window.DeviceMotionEvent){
						window.addEventListener('devicemotion',function(){
							
							shakeAction.liTime = new Date().getTime();
							
							if(shakeAction.curTime > 10000 && (shakeAction.liTime - shakeAction.curTime) > 480){
								shakeAction.curTime = 0;
								if(mySwiper.activeIndex==1){
								callback();
								}
							}
							
							var acceleration =event.accelerationIncludingGravity;
				
							shakeAction.x = acceleration.x;
							
							shakeAction.y = acceleration.y;
							
							if(Math.abs(shakeAction.x-shakeAction.lastX) > shakeAction.speed || Math.abs(shakeAction.y-shakeAction.lastY) > shakeAction.speed) {
								shakeAction.curTime = new Date().getTime();
								shakeAction.liTime = shakeAction.curTime;
							}
					
							shakeAction.lastX = shakeAction.x;
							
							shakeAction.lastY = shakeAction.y;
						},false);
					}else{
						return false;
					}
				}
				
			};
			
			
			var keywordCtrl = {
				keywordIndex:0,
				keywordGroup:null,
				isChanged:false,
				keywordChange:function(){
					var group = keywordCtrl.keywordGroup.group_data.slice(keywordCtrl.keywordIndex,keywordCtrl.keywordIndex+5);
					if(group.length >0){
						var html = template("keywordTpl",{group_data:group});
						$("#keyword").html(html);
						if(keywordCtrl.isChanged){
							swiperAnimate(mySwiper);
						}else{
							keywordCtrl.isChanged = true;
						}
					}
					keywordCtrl.keywordIndex+=5;
					if(keywordCtrl.keywordIndex > keywordCtrl.keywordGroup.group_data.length){
					keywordCtrl.keywordIndex=0;
					}
				}
			}
			
			
			//var baseUrl ="http://appapi.people.com.cn/content"; //测试
			var baseUrl ="http://rmrbapi.people.cn/content"; //正式
			
			$.ajax({
				type: "GET",
				url: baseUrl+"/getcontentlist?categoryid=22&systype=cms",
				data:{categoryid:22,systype:'cms'},
				dataType: "json",
				success: function(json) {
					keywordCtrl.keywordGroup = json.data[0];
					keywordCtrl.keywordChange();
					shakeAction.init(keywordCtrl.keywordChange);
				}
			});
			
			
			
			var getDetail = {
				getdata:function(id){
					tongjiObj.tongji_readKeyword();
					$.ajax({
						type: "GET",
						url: baseUrl+"/getdetail",
						data:{articleid:id},
						dataType: "json",
						success: function(json) {
							var html = template("titleTpl",json);
							$("#titleHtml").html(html);
							$("#audio").attr("src",json.data.medias[1].source_url);
							var htmlDetail = template("detailTpl",json);
							$("#detail").html(htmlDetail);
							var htmlTotalk = template("totalkTpl",json);
							$("#totalkHtml").html(htmlTotalk);
							var text_bg_obj = $("#text_bg").get(0);
							if(text_bg_obj.offsetHeight < text_bg_obj.scrollHeight){
								$("#text_bg_warp").removeClass("hideDown");
							}else{
								$("#text_bg_warp").addClass("hideDown");
							}
						}
					});
				}
			}
			
			$("body").on("touchend","#btn_yiy",function(){
				keywordCtrl.keywordChange();
			});
			
			$("#toPageOne,#close").on("touchend",function(){
				mySwiper.slideTo(1,500);
				$("#text_bg").removeClass("talkingOver talking").scrollTop(0);
				musicCtrl.audio.pause();
			});
			
			$("#keyword").on("touchend","a[data-id]",function(){
				mySwiper.slideTo(2,500);
				getDetail.getdata($(this).attr("data-id"));
			});
			
			$("body").on("touchend","#btn_totalk",function(){
				$("#text_bg").removeClass("talkingOver").addClass("talking");
			});
			
			$("body").on("touchend","#options_list li",function(){
				$(this).addClass("selected").siblings("li").removeClass("selected");
			});
			
			$("body").on("touchend","#btn_ok",function(){
				var text = $("#options_list .selected").text();
				$("#my_talk").text(text);
				$("#text_bg").addClass("talkingOver").removeClass("talking");
			});
	});

})();