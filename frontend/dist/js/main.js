var BED={gestures:{click:"undefined"!=typeof Hammer?"tap":"click"},mq:{mobile:"only screen and (max-width: 40em)",desktop:"only screen and (min-width: 40.063em)"},whitelisted:["www.shire.com","shire.com"],skrollr:{inst:null,ani:{"prevalence-header":{"data-bottom-top":"opacity: 0; transform: translate3d(0px,-50px,0px)","data-bottom-bottom":"opacity: 1; transform: translate3d(0px,0,0px)"},"prevalence-map":{"data-bottom-top":"opacity: 0; transform: scale(0.5);","data-center-center":"opacity: 1; transform: scale(1);"},"prevalence-asterisk":{"data-bottom-top":"opacity: 0; transform: translate3d(100px,0px,0px)","data-center-center":"opacity: 1; transform: translate3d(0px,0,0px)"},"neurobiology-header":{"data-bottom-top":"opacity: 0; transform: translate3d(0px,-50px,0px)","data-bottom-bottom":"opacity: 1; transform: translate3d(0px,0,0px)"},"neurobiology-reward":{"data-bottom-top":"opacity: 0; transform: translate3d(100px,0px,0px)","data--10p-bottom":"opacity: 1; transform: translate3d(0px,0,0px)"},"neurobiology-dysregulation":{"data-bottom-top":"opacity: 0; transform: translate3d(-100px,0px,0px)","data--10p-bottom":"opacity: 1; transform: translate3d(0px,0,0px)"},"neurobiology-endogeneous":{"data-bottom-top":"opacity: 0; transform: translate3d(100px,0px,0px)","data--10p-bottom":"opacity: 1; transform: translate3d(0px,0,0px)"},"neurobiology-risk":{"data-bottom-top":"opacity: 0; transform: translate3d(-100px,0px,0px)","data--10p-bottom":"opacity: 1; transform: translate3d(0px,0,0px)"},"neurobiology-risk-2":{"data-bottom-top":"opacity: 0; transform: translate3d(100px,0px,0px)","data--10p-bottom":"opacity: 1; transform: translate3d(0px,0,0px)"}}},lastScrollPos:-1,scrollSections:[],init:function(){BED.scrollSections=_.map($(".section"),function(a){return $(a).data("section")}),bowser.mobile||bowser.tablet||(_.each(BED.skrollr.ani,function(a,b){var c=$('[data-skrollr="'+b+'"]');c.length>0&&c.attr(a)}),BED.skrollr.inst=skrollr.init({smoothScrolling:!0,forceHeight:!0,beforerender:function(){},render:function(){}})),$(window).on("scroll",function(){var a=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,b=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight,c=a/2,d=b*(2/3),e=$("._is_open"),f=e.css("display");e.css("display","none");var g=document.elementFromPoint(c,d);f?e.css("display",f):e.css("display","block");var h=$(g).closest(".section"),i=h.next(".section");h&&(BED.currentPage=h.data("section"),$(".page-nav a.active").removeClass("active"),$('.page-nav a[href="/#'+h.data("section")+'"]').addClass("active"),$(".bar--next, .pagination__item").removeClass("active"),$(".pagination__item").eq(h.index()).addClass("active")),i&&$(".bar--next.bar--"+i.data("section")).addClass("active")}).trigger("scroll").on("resize",function(){var a=$(".page-wrapper").offset().left;$(".slideout").css({left:a,right:a}),$(".modal__outer").css({width:window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,height:window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight}),$(".pagination").css("right",a+8)}).trigger("resize"),$(document.body).hammer({stop_browser_behavior:!1}).on("click","a[href]:not(.button--ok)",function(a){var b=parseUri(window.location.href),c=parseUri($(this).prop("href"));if(b.host===c.host)b.path===c.path&&(a.preventDefault(),c.anchor&&$('[id="'+c.anchor+'"],[name="'+c.anchor+'"]').eq(0).velocity("scroll",{duration:250}));else if(_.contains(BED.whitelisted,c.host));else{a.preventDefault();var d=$(".modal--interstitial");d.find("a.button--ok").prop("href",c.source),d.velocity("fadeIn",{duration:250})}}).on(BED.gestures.click,".modal__inner",function(a){a.stopPropagation()}).on(BED.gestures.click,".modal .modal__outer, .modal .modal__close, .modal a.button",function(){$(this).closest(".modal").velocity("fadeOut",{duration:250})}).on(BED.gestures.click,"a[data-slideout]",function(){BED.slideout.toggle($(this).data("slideout"))}).on(BED.gestures.click,".slideout",function(){BED.slideout.close($(this))}).on(BED.gestures.click,".slideout .close",function(){BED.slideout.close($(this).closest(".slideout"))}).on(BED.gestures.click,".slideout .slideout__inner",function(a){a.stopPropagation()}).on(BED.gestures.click,"[data-video]",function(){var a=$(this).find("p").text(),b=$(".modal--video");b.find("h3").text(a),b.velocity("fadeIn",{duration:250})}).on(BED.gestures.click,".page-nav a",function(){BED.slideout.close($(".slideout--menu"))}).on(BED.gestures.click,".tab-container",function(){$(this).toggleClass("open"),$(".closed-text").toggleClass("hidden")})},slideout:{open:function(a){$(".slideout._is_open").exists(function(){BED.slideout.close($(this))});var b=a,c=b.find(".slideout__inner"),d=function(a){var b={right:"transition.slideRightIn",left:"transition.slideLeftIn"};return b[a]||"fadeIn"},e=d(b.data("direction"));b.addClass("_is_animating"),b.velocity("fadeIn",{complete:function(){b.addClass("_is_open").removeClass("_is_animating")},duration:300}),c.velocity(e,{duration:300})},close:function(a){var b=a,c=b.find(".slideout__inner"),d=function(a){var b={right:"transition.slideRightOut",left:"transition.slideLeftOut"};return b[a]||"fadeOut"},e=d(b.data("direction"));b.addClass("_is_animating"),b.velocity("fadeOut",{complete:function(){b.removeClass("_is_open _is_animating")},duration:300}),c.velocity(e,{duration:300})},toggle:function(a){var b=$(".slideout--"+a);b.hasClass("_is_open")?BED.slideout.close(b):BED.slideout.open(b)}}};