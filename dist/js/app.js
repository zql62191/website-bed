window.onerror=function(){return!0};var BED={gestures:{down:"touchstart mousedown",up:"touchend mouseup",click:"click"},init:function(){$(window).on("resize",function(){$(".page-nav").css({left:$(".page-wrapper").offset().left})}).trigger("resize"),$(document.body).hammer({stop_browser_behavior:!1}).on(BED.gestures.click,"a",function(a){a.preventDefault()}).on(BED.gestures.down,"[data-highlight], .bar--next, nav a",function(){$(this).addClass("highlight")}).on(BED.gestures.up,function(){$(".highlight").removeClass("highlight")}).on(BED.gestures.click,'a[href^="#"]',function(a){a.preventDefault();var b=$(this).attr("href");$(b).velocity("scroll",{duration:250})}).on(BED.gestures.click,".btn--menu",BED.nav.toggle).on(BED.gestures.click,".page-nav a",BED.nav.tap).on(BED.gestures.click,".mask--nav",BED.nav.close)},nav:{open:function(){$(".mask--nav").velocity("fadeIn",{duration:250}),$(".page-nav nav").velocity("transition.slideLeftIn",{duration:150,delay:100,display:"inline-block",complete:function(){$(".page-nav").addClass("_is_open")}})},close:function(){$(".mask--nav").velocity("fadeOut",{duration:150,delay:100}),$(".page-nav nav").velocity("transition.slideLeftOut",{duration:250,complete:function(){$(".page-nav").removeClass("_is_open")}})},toggle:function(){$(".page-nav").hasClass("_is_open")?BED.nav.close():BED.nav.open()},tap:function(){$(".page-nav a.active").removeClass("active"),$(this).addClass("active"),BED.nav.close()}}};
//# sourceMappingURL=app.map