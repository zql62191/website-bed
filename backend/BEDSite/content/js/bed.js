var BED=function(){var a=!1,b=function(){$(".slideout").css({position:"absolute",bottom:0});var a=$(".section"),b=$(".bar--next");$(".next-section, .next-section .content-wrap").css({position:"absolute",height:0,width:0,top:0,left:0,right:0}),setTimeout(function(){$(window).scrollTop(9999999)},1),setTimeout(function(){$(window).scrollTop(0)},500),$(".pagination").hide(),b.each(function(b,c){$(c).css({position:"absolute",display:"block",top:a.eq(b+1).offset().top})}),$(document.body).on("click.snag",function(){b.each(function(b,c){$(c).css({position:"absolute",display:"block",top:a.eq(b+1).offset().top})})})},c=function(){a||(a=!0,BED.HomeVideoPlayer.init(),BED.Analytics.init(),BED.Skrollr.init(),BED.UI.init(),BED.SlideOut.init(),BED.Modal.init(),BED.VideoPlayer.init(),BED.AudioPlayer.init(),"undefined"!=typeof parseUri(window.location.href).queryKey.snag&&$(window).load(b),$("input, textarea").placeholder(),$("[data-load]").each(function(a,b){$(b).load($(b).data("load"))}),$(document).ready(function(){$(".profile-button").on("click touch",function(){var a=$(this).data("target");$(".profile-button").removeClass("active-profile-button"),$(this).addClass("active-profile-button"),$(".profile").removeClass("active-profile"),$("."+a).addClass("active-profile")}).hover(function(){$(this).addClass("hover")},function(){$(this).removeClass("hover")});var a=function(a){switch($(".arrow").removeClass("inactive"),a){case 1:$(".arrow-prev").addClass("inactive");break;case 4:$(".arrow-next").addClass("inactive")}},b=548;$(".arrow").on("click touch",function(){var c=parseInt($(".active-profile").data("profile-num"));$(this).hasClass("arrow-next")&&!$(this).hasClass("inactive")?($(".active-profile").removeClass("active-profile").next().addClass("active-profile"),$(".profile").css("transform","translateX( -"+c*b+"px)"),a(++c)):$(this).hasClass("arrow-prev")&&!$(this).hasClass("inactive")&&($(".active-profile").removeClass("active-profile").prev().addClass("active-profile"),$(".profile").css("transform","translateX( -"+(c-2)*b+"px)"),a(--c))}),$(".video-nav li").on("click touch",function(){if(!$(this).hasClass("mobile-dropdown")){var a=$(this).add("."+$(this).data("target"));$(".video-section, .video-nav li").removeClass("active"),$(a).addClass("active"),window.matchMedia(BED.UI.mediaQueries.mobile).matches&&($(".video-nav").removeClass("mobile-open"),$(".video-nav li").removeClass("second-row third-row"))}}),$(".mobile-dropdown").on("click touch",function(a){$(this).parent().addClass("mobile-open");var b=$(".video-nav li").not($(".video-nav li.active")).not(".mobile-dropdown"),c=1;b.each(function(){switch(c){case 1:$(this).addClass("second-row"),c++;break;case 2:$(this).addClass("third-row"),c++}})})}))};return{init:c}}();"undefined"==typeof BED&&(window.BED={}),BED.UI=function(){var a=["www.shire.com","shire.com","www.bingeeatingdisorder.com"],b={mobile:"only screen and (max-width: 40em)",desktop:"only screen and (min-width: 40.063em)"},c="",d=!1,e=!1,f=!1,g=function(){d||(d=!0,$("#"+document.location.hash.slice(2)).exists(function(){$(window).scrollTop($(this).offset().top)}),$.history.init(j,{unescape:",/"}),$("input, textarea").placeholder(),$(window).on("scroll.ui",h).on("resize.ui",i),h(),i(),FastClick.attach(document.body),$(document.body).on("click.ui","a[href]:not(.button--ok)",k).on("click.ui",".tab-container",function(a){$(this).toggleClass("open"),$(".closed-text").toggleClass("hidden")}))},h=function(a){setTimeout(function(){var a=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,b=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight,d=a/2,e=.5*b,g=$("._is_open");g.css("display","none");var h=document.elementFromPoint(d,e);g.css("display","block");var i=$(h).closest(".section"),j=i.next(".section");i.exists(function(){c=i.data("section"),f||$.history.load("/"+c),$(".page-nav a.active").removeClass("active"),$('.page-nav a[href="/#/'+i.data("section")+'"]').addClass("active"),$(".bar--next, .pagination__item").removeClass("active"),$(".pagination__item").eq(i.index()).addClass("active")}),j.exists(function(){$('.bar--next[data-section="'+j.data("section")+'"]').addClass("active")})},1)},i=function(a){var b=$(".page-wrapper").offset().left;$(".pagination").css("right",b+8)},j=function(a){e||(l(a),e=!0)},k=function(b){var c=parseUri(window.location.href),d=parseUri($(this).prop("href"));if(c.host===d.host){if(c.path===d.path&&(b.preventDefault(),d.anchor)){$.history.load(d.anchor);var e=d.anchor.slice(1);l(e)}}else _.contains(a,d.host)||(b.preventDefault(),BED.Modal.open("interstitial",d.source))},l=function(a){var b=function(){f=!1};f=!0,$('[id="'+a+'"],[name="'+a+'"]').eq(0).velocity("scroll",{duration:250}),setTimeout(b,250)};return{init:g,mediaQueries:b}}(),"undefined"==typeof BED&&(window.BED={}),BED.SlideOut=function(){var a=0,b=!1,c=!1,d=function(){b||(b=!0,$(window).on("resize.slideout",e),e(),$(document.body).on("click.slideout","a[data-slideout]",function(a){h($(this).data("slideout"))}).on("click.slideout",".slideout",function(a){c||g($(this))}).on("click.slideout",".slideout .close",function(a){g($(this).closest(".slideout"))}).on("click.slideout",".slideout .slideout__inner",function(a){a.stopPropagation()}).on("click.slideout",".page-nav a",function(a){g($(".slideout--menu"))}).on("focus.slideout",".slideout input, .slideout select",function(a){c=!0}).on("blur.slideout",".slideout input, .slideout select",function(a){setTimeout(function(){c=!1},1)}).on("click.slideout",".slideout .optin",function(){$(this).blur()}),bowser.ios&&($('.slideout input[type="text"]').css("pointer-events","none"),$(".slideout").on("click.iosfix",function(a){$('.slideout input[type="text"]').css("pointer-events","all");var b=$(document.elementFromPoint(a.clientX,a.clientY));$('.slideout input[type="text"]').css("pointer-events","none"),b.is("input")&&b.focus()})))},e=function(a){var b=$(".page-wrapper").offset().left;$(".slideout").css({left:b,right:b})},f=function(b){a=$("body").scrollTop(),$(".submit").removeClass("disabled"),$(".slideout._is_open").exists(function(){g()});var c="string"==typeof b?$(".slideout--"+b):b,d=c.find(".slideout__inner"),e=function(a){var b={right:"transition.slideRightIn",left:"transition.slideLeftIn"};return b[a]||"fadeIn"},f=e(c.data("direction"));c.addClass("_is_animating"),c.velocity("fadeIn",{complete:function(){c.addClass("_is_open").removeClass("_is_animating")},duration:300}),d.velocity(f,{duration:300}),$("body").css("overflow","hidden")},g=function(b){var c=$(".slideout._is_open"),d=c.find(".slideout__inner"),e=function(a){var b={right:"transition.slideRightOut",left:"transition.slideLeftOut"};return b[a]||"fadeOut"},f=e(c.data("direction"));c.addClass("_is_animating"),c.velocity("fadeOut",{complete:function(){c.removeClass("_is_open _is_animating")},duration:300}),d.velocity(f,{duration:300}),$("body").css("overflow",""),$("body").scrollTop(a)},h=function(a){var b=$(".slideout--"+a);b.hasClass("_is_open")?g(b):f(b)};return{init:d,open:f,close:g,toggle:h}}(),"undefined"==typeof BED&&(window.BED={}),BED.Modal=function(){var a=!1,b=function(){a||(a=!0,$(window).on("resize.modal",c),c(),$(document.body).on("click.modal",".modal__inner",function(a){a.stopPropagation()}).on("click.modal",".modal .modal__outer, .modal .modal__close, .modal a.button",function(a){e()}))},c=function(a){$(".modal__outer").css({width:window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,height:window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight})},d=function(a,b){var c=$("string"==typeof a?".modal--"+a:a);c.is(".modal--interstitial")&&c.find("a.button--ok").prop("href",b),c.velocity("fadeIn",{duration:250,complete:function(a){$(this).addClass("_is_open")}})},e=function(){$(".modal._is_open").velocity("fadeOut",{duration:250,complete:function(a){$(this).removeClass("_is_open")}})};return{init:b,open:d,close:e}}(),"undefined"==typeof BED&&(window.BED={}),BED.Skrollr=function(){var a={"prevalence-header":{"data-bottom-top":"opacity: 0; transform: translate3d(0px,-50px,0px)","data-bottom-bottom":"opacity: 1; transform: translate3d(0px,0,0px)"},"prevalence-map":{"data-bottom-top":"opacity: 0; transform: scale(0.5);","data-center-center":"opacity: 1; transform: scale(1);"},"prevalence-asterisk":{"data-bottom-top":"opacity: 0; transform: translate3d(100px,0px,0px);","data-center-center":"opacity: 1; transform: translate3d(0px,0,0px);"},"prevalence-mf-text-1":{"data-bottom-top":"opacity: 0; transform: translate3d(0px,100px,0px);","data-center":"opacity: 1; transform: translate3d(0px,0px,0px)"},"prevalence-mf-text-2":{"data-bottom-top":"opacity: 0; transform: translate3d(0px,100px,0px)","data-center":"opacity: 1; transform: translate3d(0px,0px,0px)"},"prevalence-male-graphic":{"data-bottom-top":"opacity: 0; transform: translate3d(500px,0px,0px)","data-450-top-top":"opacity: 1; transform: translate3d(0px,0,0px)"},"prevalence-female-graphic":{"data-bottom-top":"opacity: 0; transform: translate3d(-500px,0px,0px)","data-450-top-top":"opacity: 1; transform: translate3d(0px,0,0px)"},"prevalence-blurb-2":{"data-bottom-top":"opacity: 0; transform: translate3d(0px,100px,0px)","data-center":"opacity: 1; transform: translate3d(0px,0,0px)"},"patient-1":{"data-bottom-top":"transform: translate3d(-800px,0px,0px);","data--25p-bottom":"transform: translate3d(0px,0px,0px);"},"patient-2":{"data-bottom-top":"transform: translate3d(-800px,0px,0px);","data--20p-bottom":"transform: translate3d(0px,0px,0px);"},"patient-3":{"data-bottom-top":"transform: translate3d(-800px,0px,0px);","data--15p-bottom":"transform: translate3d(0px,0px,0px);"},"patient-4":{"data-bottom-top":"transform: translate3d(-800px,0px,0px);","data--10p-bottom":"transform: translate3d(0px,0px,0px);"},"neurobiology-header":{"data-bottom-top":"opacity: 0; transform: translate3d(0px,-50px,0px)","data-center":"opacity: 1; transform: translate3d(0px,0,0px)"},"neurobiology-header-2":{"data-bottom-top":"opacity: 0;","data-center":"opacity: 1;"},"neurobiology-reward":{"data-bottom-top":"opacity: 0; transform: translate3d(100px,0px,0px)","data-center":"opacity: 1; transform: translate3d(0px,0,0px)"},"neurobiology-dysregulation":{"data-bottom-top":"opacity: 0; transform: translate3d(-100px,0px,0px)","data-center":"opacity: 1; transform: translate3d(0px,0,0px)"},"neurobiology-endogeneous":{"data-bottom-top":"opacity: 0; transform: translate3d(100px,0px,0px)","data-center":"opacity: 1; transform: translate3d(0px,0,0px)"},"neurobiology-risk":{"data-bottom-top":"opacity: 0; transform: translate3d(-100px,0px,0px)","data-center":"opacity: 1; transform: translate3d(0px,0,0px)"},"neurobiology-risk-2":{"data-bottom-top":"opacity: 0; transform: translate3d(100px,0px,0px)","data-center":"opacity: 1; transform: translate3d(0px,0,0px)"},"course-title":{"data-bottom-top":"opacity: 0; transform: translate3d(0px,-50px,0px)","data-center":"opacity: 1; transform: translate3d(0px,0,0px)"},"course-21-numbers":{"data--10p-bottom":"transform: translate3d(732px,0px,0px);","data--20p-bottom":"transform: translate3d(0px,0px,0px); opacity: 1;","data--40p-bottom":"opacity: 0;"},"course-21-copy":{"data--20p-bottom":"opacity: 0; transform: scale(0);","data--30p-bottom":"opacity: 1; transform: scale(1);"},"course-80":{"data-bottom-top":"opacity: 0; transform: scale(0.5);","data-450-top-top":"opacity: 1; transform: scale(1);"},"course-49":{"data-bottom-top":"opacity: 0; transform: scale(0.5);","data-450-top-top":"opacity: 1; transform: scale(1);"},"effects-title":{"data-bottom-top":"opacity: 0; transform: translate3d(0px,-50px,0px)","data-center":"opacity: 1; transform: translate3d(0px,0,0px)"},"effects-63":{"data-bottom-top":"opacity: 0; transform: scale(0.5);","data-center":"opacity: 1; transform: scale(1);"},"effects-19":{"data-bottom-top":"opacity: 0; transform: scale(0.5);","data-center":"opacity: 1; transform: scale(1);"},"diagnosis-circle":{"data-bottom-top":"transform: rotate(-180deg);","data-center":"transform: rotate(0deg);"},"diagnosis-50":{"data-bottom-top":"opacity: 0;","data-center":"opacity: 1;"},"diagnosis-50-caption":{"data-bottom-top":"opacity: 0;","data-center":"opacity: 1;"},"diagnosis-19":{"data-bottom-top":"opacity: 0; transform: scale(0.5);","data-center":"opacity: 1; transform: scale(1);"},"diagnosis-36":{"data-bottom-top":"opacity: 0; transform: scale(0.5);","data-center":"opacity: 1; transform: scale(1);"},"resources-signup":{"data-bottom-top":"opacity: 0;","data-center":"opacity: 1;"}},b=null,c=!1,d=function(){c||(c=!0,bowser.mobile||bowser.tablet||bowser.msie||($("[data-skrollr]").each(function(b,c){var d=$(c).data("skrollr"),e=a[d];e&&$(c).attr(e)}),b=window.skrollr.init({smoothScrolling:!0,forceHeight:!0,beforerender:function(a){return"up"!==a.direction},render:function(a){}})))};return{init:d,instance:function(){return b}}}(),"undefined"==typeof BED&&(window.BED={}),BED.VideoPlayer=function(){var a={grilo2:"//d2ly9zedmmzqz4.cloudfront.net/BED-S02969.mp4",kornstein8:"//d2ly9zedmmzqz4.cloudfront.net/BED-S03012.mp4",grilo7:"//d2ly9zedmmzqz4.cloudfront.net/BED-S03011.mp4",bulik12:"//d2ly9zedmmzqz4.cloudfront.net/BED-S03016.mp4",grilo5:"//d2ly9zedmmzqz4.cloudfront.net/BED-S02972.mp4",kornstein6:"//d2ly9zedmmzqz4.cloudfront.net/BED-S02973.mp4",kornstein14:"//d2ly9zedmmzqz4.cloudfront.net/BED-S03018.mp4",bulik4:"//d2ly9zedmmzqz4.cloudfront.net/BED-S03323.mp4",bulik3:"//d2ly9zedmmzqz4.cloudfront.net/BED-S03322.mp4",wilfley10:"//d2ly9zedmmzqz4.cloudfront.net/BED-S03014.mp4",wilfley9:"//d2ly9zedmmzqz4.cloudfront.net/BED-S03013.mp4",wilfley13:"//d2ly9zedmmzqz4.cloudfront.net/BED-S03017.mp4",chapter1:"//d2ly9zedmmzqz4.cloudfront.net/BED-S02868.mp4",chapter2:"//d2ly9zedmmzqz4.cloudfront.net/BED-S03499.mp4",chapter3:"//d2ly9zedmmzqz4.cloudfront.net/BED-S03500.mp4",chapter4:"//d2ly9zedmmzqz4.cloudfront.net/BED-S03501.mp4",chapter5:"//d2ly9zedmmzqz4.cloudfront.net/BED-S03502.mp4",chapter6:"//d2ly9zedmmzqz4.cloudfront.net/BED-S03503.mp4"},b={grilo2:"How does the prevalence of BED compare",kornstein8:"Does BED occur in both women and men?",grilo7:"How does the prevalence of BED compare among races/ethnicities?",bulik12:"What is the clinical course of BED?",grilo5:"What psychiatric disorders are commonly associated with BED?",kornstein6:"What is thought to cause BED?",kornstein14:"How can clinicians begin an effective conversation",bulik4:"What are the essential features for a diagnosis of BED?",bulik3:"What are the functional consequences of BED in adults?",wilfley10:"How is BED distinct from bulimia nervosa?",wilfley9:"How is BED distinct from overeating and obesity?",wilfley13:"What is the relationship between obesity and BED in adults?",chapter1:"Living with B.E.D.",chapter2:"Diagnostic criteria for B.E.D.",chapter3:"Possible causes of B.E.D.",chapter4:"Recognizing adult patients with B.E.D.",chapter5:"Functional consequences of B.E.D.",chapter6:"Diagnosing B.E.D. in adult patients"},c=[],d="bulik4",e="",f=!1,g=!1,h=!1,i=!1,j=!1,k=!1,l=null,m=!1,n=function(){m||(m=!0,$(".video-thumb").each(function(f,g){c.push($(g).data("video")),0===f&&(d=c[f],e=b[d],$("#videoPlayer source").attr("src",document.location.protocol+a[d]),$(g).addClass("active"))}),$("#videoPlayer").attr({width:window.matchMedia(BED.UI.mediaQueries.mobile).matches?536:800,height:window.matchMedia(BED.UI.mediaQueries.mobile).matches?315:450}).mediaelementplayer({pauseOtherPlayers:!1,iPadUseNativeControls:!0,iPhoneUseNativeControls:!0,AndroidUseNativeControls:!0,success:o,error:p}),$(document.body).on("click.videoplayer",".video-thumb[data-video]",function(a){t($(this).data("video"))}).on("click.videoplayer",".video-player .arrow-left",function(a){v()}).on("click.videoplayer",".video-player .arrow-right",function(a){u()}))},o=function(b,c){b.pause(),l=b,$(l).on("loadeddata",q).on("timeupdate",r).on("ended",s),$(".mejs-container.svg").removeClass("svg").addClass("no-svg"),l.setSrc(document.location.protocol+a[d]),l.load()},p=function(){},q=function(a){f=g=h=i=j=k=!1},r=function(a){var b=l.currentTime/l.duration*100;0!==b&&(b>=0&&!f?(f=!0,BED.Analytics.videoOnPlay(e)):b>=25&&!g?(g=!0,BED.Analytics.videoOnPercentage(e,25)):b>=50&&!h?(h=!0,BED.Analytics.videoOnPercentage(e,50)):b>=75&&!i?(i=!0,BED.Analytics.videoOnPercentage(e,75)):b>=90&&!j?(j=!0,BED.Analytics.videoOnComplete(e)):b>=99&&!k&&(k=!0,BED.Analytics.videoOnPercentage(e,100)))},s=function(a){f=g=h=i=j=k=!1},t=function(c){var f=$(".video-playlist li"),g=f.filter('[data-video="'+c+'"]');f.removeClass("active"),g.addClass("active"),d=c,e=b[d],$(".video-player").velocity("scroll",{duration:250,offset:"-"+($(".page-header").height()+20)}),l.setSrc(document.location.protocol+a[d]),l.load(),l.play()},u=function(){var a=_.indexOf(c,d),b=function(){var b;return b=a===c.length-1?0:a+1}();t(c[b])},v=function(){var a=_.indexOf(c,d),b=function(){var b;return b=0===a?c.length-1:a-1}();t(c[b])};return{init:n,instance:function(){return l}}}(),"undefined"==typeof BED&&(window.BED={}),BED.Analytics=function(){var a=!1,b=function(){a||(a=!0)},c=function(a){"undefined"!=typeof window.mediaPlayHandler&&window.mediaPlayHandler("Video > "+a)},d=function(a,b){"undefined"!=typeof window.mediaMilestoneHandler&&window.mediaMilestoneHandler("Video > "+a,b)},e=function(a){"undefined"!=typeof window.mediaCompleteHandler&&window.mediaCompleteHandler("Video > "+a)},f=function(a){"undefined"!=typeof window.formCompleteHandler&&window.formCompleteHandler(a)};return{init:b,videoOnPlay:c,videoOnPercentage:d,videoOnComplete:e,formOnComplete:f}}(),"undefined"==typeof BED&&(window.BED={}),BED.HomeVideoPlayer=function(){var a=!1,b=function(){function b(a){document.cookie="videoIndex  = "+a}function c(a){for(var b=a+"=",c=document.cookie.split(";"),d=0;d<c.length;d++){for(var e=c[d];" "===e.charAt(0);)e=e.substring(1);if(0===e.indexOf(b))return e.substring(b.length,e.length)}return""}function d(a){var b;return $("#heroPlayer").mediaelementplayer({pauseOtherPlayers:!1,startVolume:0,features:[],autoRewind:!1,success:function(c){b=c,c.setSrc(document.location.protocol+f[a-1]),c.load(),c.setVolume(0),c.play(),b=c},error:function(){}}),b}function e(a){var b;if(window.matchMedia(BED.UI.mediaQueries.desktop).matches||$("html").hasClass("eq-ie"))switch(g&&$(".content-wrap").addClass("quick"),$(".home-video").removeClass("active"),$(".home-video-container").removeClass("video-1 video-2 video-3 video-4").addClass("video-"+a),a){case 1:case 2:case 3:case 4:b=d(a);break;default:b=d(1)}else $(".section--home").addClass("mobile-bg mobile-bg-"+a);$(".section--home .content-wrap").addClass("active")}if(!a){a=!0;var f=["//view.vzaar.com/2552732/video","//view.vzaar.com/2552735/video","//view.vzaar.com/2552736/video","//view.vzaar.com/2552737/video"],g=!1;$("#heroPlayer").ready(function(){/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)&&(g=!0,$("#heroPlayer").hide(),$(".section--home .content-wrap").addClass("active"))});var h=c("videoIndex");$(".home-video").ready(function(){var a;""===h?(b(1),e(1)):4===parseInt(h,10)?(a=1,b(a),e(a)):(a=parseInt(h,10)+1,b(a),e(a))}),$("#heroPlayer").on("ended",function(){$(this).fadeOut(500)})}};return{init:b,instance:function(){return instance}}}(),"undefined"==typeof BED&&(window.BED={}),BED.AudioPlayer=function(){var a=!1,b=function(a,b){a.load(),$(b).hasClass("audio-sample1")?$(".play-sample1").click(function(){$(this).data("target");$(".audio-sample1 .mejs-play").trigger("click")}):$(b).hasClass("audio-sample2")&&$(".play-sample2").click(function(){$(this).data("target");$(".audio-sample2 .mejs-play").trigger("click")})},c=function(){function c(){window.matchMedia(BED.UI.mediaQueries.desktop).matches?($(".audio-sample1").mediaelementplayer({audioWidth:229,pauseOtherPlayers:!0,features:["playpause","current","progress","duration"],success:b}),$(".audio-sample2").mediaelementplayer({audioWidth:229,pauseOtherPlayers:!0,features:["playpause","current","progress","duration"],success:b})):($(".audio-sample1").mediaelementplayer({audioWidth:509,audioHeight:60,pauseOtherPlayers:!0,iPadUseNativeControls:!1,iPhoneUseNativeControls:!1,AndroidUseNativeControls:!1,features:["playpause","current","progress","duration"],success:b}),$(".audio-sample2").mediaelementplayer({audioWidth:509,audioHeight:60,pauseOtherPlayers:!0,iPadUseNativeControls:!1,iPhoneUseNativeControls:!1,AndroidUseNativeControls:!1,features:["playpause","current","progress","duration"],success:b}))}a||(a=!0,c())};return{init:c,instance:function(){return instance}}}();