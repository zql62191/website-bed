var BED=function(){var a=!1,b=function(){$(".slideout").css({position:"absolute",bottom:0});var a=$(".section"),b=$(".bar--next");$(".next-section, .next-section .content-wrap").css({position:"absolute",height:0,width:0,top:0,left:0,right:0}),setTimeout(function(){$(window).scrollTop(9999999)},1),setTimeout(function(){$(window).scrollTop(0)},500),$(".pagination").hide(),b.each(function(b,c){$(c).css({position:"absolute",display:"block",top:a.eq(b+1).offset().top})}),$(document.body).on("click.snag",function(){b.each(function(b,c){$(c).css({position:"absolute",display:"block",top:a.eq(b+1).offset().top})})})},c=function(){a||(a=!0,BED.Analytics.init(),BED.Skrollr.init(),BED.UI.init(),BED.SlideOut.init(),BED.Modal.init(),BED.VideoPlayer.init(),"undefined"!=typeof parseUri(window.location.href).queryKey.snag&&$(window).load(b),$("input, textarea").placeholder(),$("[data-load]").each(function(a,b){$(b).load($(b).data("load"))}))};return{init:c}}();"undefined"==typeof BED&&(window.BED={}),BED.UI=function(){var a=["www.shire.com","shire.com"],b={mobile:"only screen and (max-width: 40em)",desktop:"only screen and (min-width: 40.063em)"},c="",d=!1,e=!1,f=!1,g=function(){d||(d=!0,$("#"+document.location.hash.slice(2)).exists(function(){$(window).scrollTop($(this).offset().top)}),$.history.init(j,{unescape:",/"}),$("input, textarea").placeholder(),$(window).on("scroll.ui",h).on("resize.ui",i),h(),i(),FastClick.attach(document.body),$(document.body).on("click.ui","a[href]:not(.button--ok)",k).on("click.ui",".tab-container",function(){$(this).toggleClass("open"),$(".closed-text").toggleClass("hidden")}))},h=function(){setTimeout(function(){var a=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,b=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight,d=a/2,e=.5*b,g=$("._is_open");g.css("display","none");var h=document.elementFromPoint(d,e);g.css("display","block");var i=$(h).closest(".section"),j=i.next(".section");i.exists(function(){c=i.data("section"),f||$.history.load("/"+c),$(".page-nav a.active").removeClass("active"),$('.page-nav a[href="/#/'+i.data("section")+'"]').addClass("active"),$(".bar--next, .pagination__item").removeClass("active"),$(".pagination__item").eq(i.index()).addClass("active")}),j.exists(function(){$('.bar--next[data-section="'+j.data("section")+'"]').addClass("active")})},1)},i=function(){var a=$(".page-wrapper").offset().left;$(".pagination").css("right",a+8)},j=function(a){e||(l(a),e=!0)},k=function(b){var c=parseUri(window.location.href),d=parseUri($(this).prop("href"));if(c.host===d.host){if(c.path===d.path&&(b.preventDefault(),d.anchor)){$.history.load(d.anchor);var e=d.anchor.slice(1);l(e)}}else _.contains(a,d.host)||(b.preventDefault(),BED.Modal.open("interstitial",d.source))},l=function(a){var b=function(){f=!1};f=!0,$('[id="'+a+'"],[name="'+a+'"]').eq(0).velocity("scroll",{duration:250}),setTimeout(b,250)};return{init:g,mediaQueries:b}}(),"undefined"==typeof BED&&(window.BED={}),BED.SlideOut=function(){var a=!1,b=!1,c=function(){a||(a=!0,$(window).on("resize.slideout",d),d(),$(document.body).on("click.slideout","a[data-slideout]",function(){g($(this).data("slideout"))}).on("click.slideout",".slideout",function(){b||f($(this))}).on("click.slideout",".slideout .close",function(){f($(this).closest(".slideout"))}).on("click.slideout",".slideout .slideout__inner",function(a){a.stopPropagation()}).on("click.slideout",".page-nav a",function(){f($(".slideout--menu"))}).on("focus.slideout",".slideout input, .slideout select",function(){b=!0}).on("blur.slideout",".slideout input, .slideout select",function(){setTimeout(function(){b=!1},1)}),bowser.ios&&($('.slideout input[type="text"]').css("pointer-events","none"),$(".slideout").on("click.iosfix",function(a){$('.slideout input[type="text"]').css("pointer-events","all");var b=$(document.elementFromPoint(a.clientX,a.clientY));$('.slideout input[type="text"]').css("pointer-events","none"),b.is("input")&&b.focus()})))},d=function(){var a=$(".page-wrapper").offset().left;$(".slideout").css({left:a,right:a})},e=function(a){$(".slideout._is_open").exists(function(){f()});var b="string"==typeof a?$(".slideout--"+a):a,c=b.find(".slideout__inner"),d=function(a){var b={right:"transition.slideRightIn",left:"transition.slideLeftIn"};return b[a]||"fadeIn"},e=d(b.data("direction"));b.addClass("_is_animating"),b.velocity("fadeIn",{complete:function(){b.addClass("_is_open").removeClass("_is_animating")},duration:300}),c.velocity(e,{duration:300})},f=function(){var a=$(".slideout._is_open"),b=a.find(".slideout__inner"),c=function(a){var b={right:"transition.slideRightOut",left:"transition.slideLeftOut"};return b[a]||"fadeOut"},d=c(a.data("direction"));a.addClass("_is_animating"),a.velocity("fadeOut",{complete:function(){a.removeClass("_is_open _is_animating")},duration:300}),b.velocity(d,{duration:300})},g=function(a){var b=$(".slideout--"+a);b.hasClass("_is_open")?f(b):e(b)};return{init:c,open:e,close:f,toggle:g}}(),"undefined"==typeof BED&&(window.BED={}),BED.Modal=function(){var a=!1,b=function(){a||(a=!0,$(window).on("resize.modal",c),c(),$(document.body).on("click.modal",".modal__inner",function(a){a.stopPropagation()}).on("click.modal",".modal .modal__outer, .modal .modal__close, .modal a.button",function(){e()}))},c=function(){$(".modal__outer").css({width:window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,height:window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight})},d=function(a,b){var c=$("string"==typeof a?".modal--"+a:a);c.is(".modal--interstitial")&&c.find("a.button--ok").prop("href",b),c.velocity("fadeIn",{duration:250,complete:function(){$(this).addClass("_is_open")}})},e=function(){$(".modal._is_open").velocity("fadeOut",{duration:250,complete:function(){$(this).removeClass("_is_open")}})};return{init:b,open:d,close:e}}(),"undefined"==typeof BED&&(window.BED={}),BED.Skrollr=function(){var a={"prevalence-header":{"data-bottom-top":"opacity: 0; transform: translate3d(0px,-50px,0px)","data-bottom-bottom":"opacity: 1; transform: translate3d(0px,0,0px)"},"prevalence-map":{"data-bottom-top":"opacity: 0; transform: scale(0.5);","data-center-center":"opacity: 1; transform: scale(1);"},"prevalence-asterisk":{"data-bottom-top":"opacity: 0; transform: translate3d(100px,0px,0px);","data-center-center":"opacity: 1; transform: translate3d(0px,0,0px);"},"prevalence-mf-text-1":{"data-bottom-top":"opacity: 0; transform: translate3d(0px,100px,0px);","data-center":"opacity: 1; transform: translate3d(0px,0px,0px)"},"prevalence-mf-text-2":{"data-bottom-top":"opacity: 0; transform: translate3d(0px,100px,0px)","data-center":"opacity: 1; transform: translate3d(0px,0px,0px)"},"prevalence-male-graphic":{"data-bottom-top":"opacity: 0; transform: translate3d(500px,0px,0px)","data-450-top-top":"opacity: 1; transform: translate3d(0px,0,0px)"},"prevalence-female-graphic":{"data-bottom-top":"opacity: 0; transform: translate3d(-500px,0px,0px)","data-450-top-top":"opacity: 1; transform: translate3d(0px,0,0px)"},"prevalence-blurb-2":{"data-bottom-top":"opacity: 0; transform: translate3d(0px,100px,0px)","data-center":"opacity: 1; transform: translate3d(0px,0,0px)"},"patient-1":{"data-bottom-top":"transform: translate3d(-800px,0px,0px);","data--25p-bottom":"transform: translate3d(0px,0px,0px);"},"patient-2":{"data-bottom-top":"transform: translate3d(-800px,0px,0px);","data--20p-bottom":"transform: translate3d(0px,0px,0px);"},"patient-3":{"data-bottom-top":"transform: translate3d(-800px,0px,0px);","data--15p-bottom":"transform: translate3d(0px,0px,0px);"},"patient-4":{"data-bottom-top":"transform: translate3d(-800px,0px,0px);","data--10p-bottom":"transform: translate3d(0px,0px,0px);"},"neurobiology-header":{"data-bottom-top":"opacity: 0; transform: translate3d(0px,-50px,0px)","data-center":"opacity: 1; transform: translate3d(0px,0,0px)"},"neurobiology-header-2":{"data-bottom-top":"opacity: 0;","data-center":"opacity: 1;"},"neurobiology-reward":{"data-bottom-top":"opacity: 0; transform: translate3d(100px,0px,0px)","data-center":"opacity: 1; transform: translate3d(0px,0,0px)"},"neurobiology-dysregulation":{"data-bottom-top":"opacity: 0; transform: translate3d(-100px,0px,0px)","data-center":"opacity: 1; transform: translate3d(0px,0,0px)"},"neurobiology-endogeneous":{"data-bottom-top":"opacity: 0; transform: translate3d(100px,0px,0px)","data-center":"opacity: 1; transform: translate3d(0px,0,0px)"},"neurobiology-risk":{"data-bottom-top":"opacity: 0; transform: translate3d(-100px,0px,0px)","data-center":"opacity: 1; transform: translate3d(0px,0,0px)"},"neurobiology-risk-2":{"data-bottom-top":"opacity: 0; transform: translate3d(100px,0px,0px)","data-center":"opacity: 1; transform: translate3d(0px,0,0px)"},"course-title":{"data-bottom-top":"opacity: 0; transform: translate3d(0px,-50px,0px)","data-center":"opacity: 1; transform: translate3d(0px,0,0px)"},"course-21-numbers":{"data--10p-bottom":"transform: translate3d(732px,0px,0px);","data--20p-bottom":"transform: translate3d(0px,0px,0px); opacity: 1;","data--40p-bottom":"opacity: 0;"},"course-21-copy":{"data--20p-bottom":"opacity: 0; transform: scale(0);","data--30p-bottom":"opacity: 1; transform: scale(1);"},"course-80":{"data-bottom-top":"opacity: 0; transform: scale(0.5);","data-450-top-top":"opacity: 1; transform: scale(1);"},"course-49":{"data-bottom-top":"opacity: 0; transform: scale(0.5);","data-450-top-top":"opacity: 1; transform: scale(1);"},"effects-title":{"data-bottom-top":"opacity: 0; transform: translate3d(0px,-50px,0px)","data-center":"opacity: 1; transform: translate3d(0px,0,0px)"},"effects-63":{"data-bottom-top":"opacity: 0; transform: scale(0.5);","data-center":"opacity: 1; transform: scale(1);"},"effects-19":{"data-bottom-top":"opacity: 0; transform: scale(0.5);","data-center":"opacity: 1; transform: scale(1);"},"diagnosis-circle":{"data-bottom-top":"transform: rotate(-180deg);","data-center":"transform: rotate(0deg);"},"diagnosis-50":{"data-bottom-top":"opacity: 0;","data-center":"opacity: 1;"},"diagnosis-50-caption":{"data-bottom-top":"opacity: 0;","data-center":"opacity: 1;"},"diagnosis-19":{"data-bottom-top":"opacity: 0; transform: scale(0.5);","data-center":"opacity: 1; transform: scale(1);"},"diagnosis-36":{"data-bottom-top":"opacity: 0; transform: scale(0.5);","data-center":"opacity: 1; transform: scale(1);"},"resources-signup":{"data-bottom-top":"opacity: 0;","data-center":"opacity: 1;"}},b=null,c=!1,d=function(){c||(c=!0,bowser.mobile||bowser.tablet||bowser.msie||($("[data-skrollr]").each(function(b,c){var d=$(c).data("skrollr"),e=a[d];e&&$(c).attr(e)}),b=window.skrollr.init({smoothScrolling:!0,forceHeight:!0,beforerender:function(a){return"up"!==a.direction},render:function(){}})))};return{init:d,instance:function(){return b}}}(),"undefined"==typeof BED&&(window.BED={}),BED.VideoPlayer=function(){var a={grilo2:"//d2ly9zedmmzqz4.cloudfront.net/BED-S02969.mp4",kornstein8:"//d2ly9zedmmzqz4.cloudfront.net/BED-S03012.mp4",grilo7:"//d2ly9zedmmzqz4.cloudfront.net/BED-S03011.mp4",bulik12:"//d2ly9zedmmzqz4.cloudfront.net/BED-S03016.mp4",grilo5:"//d2ly9zedmmzqz4.cloudfront.net/BED-S02972.mp4",kornstein6:"//d2ly9zedmmzqz4.cloudfront.net/BED-S02973.mp4",kornstein14:"//d2ly9zedmmzqz4.cloudfront.net/BED-S03018.mp4"},b={grilo2:"How does the prevalence of BED compare",kornstein8:"Does BED occur in both women and men?",grilo7:"How does the prevalence of BED compare among races/ethnicities?",bulik12:"What is the clinical course of BED?",grilo5:"What psychiatric disorders are commonly associated with BED?",kornstein6:"What is thought to cause BED?",kornstein14:"How can clinicians begin an effective conversation"},c=[],d="",e="",f=!1,g=!1,h=!1,i=!1,j=!1,k=!1,l=null,m=!1,n=function(){m||(m=!0,$(".video-playlist li").each(function(f,g){c.push($(g).data("video")),0===f&&(d=c[f],e=b[d],$("#videoPlayer source").attr("src",document.location.protocol+a[d]),$(g).addClass("active"))}),$("#videoPlayer").attr({width:window.matchMedia(BED.UI.mediaQueries.mobile).matches?560:800,height:window.matchMedia(BED.UI.mediaQueries.mobile).matches?315:450}).mediaelementplayer({iPadUseNativeControls:!0,iPhoneUseNativeControls:!0,AndroidUseNativeControls:!0,success:o,error:p}),$(document.body).on("click.videoplayer",".video-playlist li[data-video]",function(){t($(this).data("video"))}).on("click.videoplayer",".video-player .arrow-left",function(){v()}).on("click.videoplayer",".video-player .arrow-right",function(){u()}))},o=function(b){l=b,$(l).on("loadeddata",q).on("timeupdate",r).on("ended",s),$(".mejs-container.svg").removeClass("svg").addClass("no-svg"),l.setSrc(document.location.protocol+a[d]),l.load()},p=function(){},q=function(){f=g=h=i=j=k=!1},r=function(){var a=l.currentTime/l.duration*100;0!==a&&(a>=0&&!f?(f=!0,BED.Analytics.videoOnPlay(e)):a>=25&&!g?(g=!0,BED.Analytics.videoOnPercentage(e,25)):a>=50&&!h?(h=!0,BED.Analytics.videoOnPercentage(e,50)):a>=75&&!i?(i=!0,BED.Analytics.videoOnPercentage(e,75)):a>=90&&!j?(j=!0,BED.Analytics.videoOnComplete(e)):a>=99&&!k&&(k=!0,BED.Analytics.videoOnPercentage(e,100)))},s=function(){f=g=h=i=j=k=!1},t=function(c){var f=$(".video-playlist li"),g=f.filter('[data-video="'+c+'"]');f.removeClass("active"),g.addClass("active"),d=c,e=b[d],$(".mejs-container").velocity("scroll",{duration:250,offset:"-"+($(".page-header").height()+20)}),l.setSrc(document.location.protocol+a[d]),l.load(),l.play()},u=function(){var a=_.indexOf(c,d),b=function(){var b;return b=a===c.length-1?0:a+1}();t(c[b])},v=function(){var a=_.indexOf(c,d),b=function(){var b;return b=0===a?c.length-1:a-1}();t(c[b])};return{init:n,instance:function(){return l}}}(),"undefined"==typeof BED&&(window.BED={}),BED.Analytics=function(){var a=!1,b=function(){a||(a=!0)},c=function(a){"undefined"!=typeof window.mediaPlayHandler&&window.mediaPlayHandler("Video > "+a)},d=function(a,b){"undefined"!=typeof window.mediaMilestoneHandler&&window.mediaMilestoneHandler("Video > "+a,b)},e=function(a){"undefined"!=typeof window.mediaCompleteHandler&&window.mediaCompleteHandler("Video > "+a)},f=function(a){"undefined"!=typeof window.formCompleteHandler&&window.formCompleteHandler(a)};return{init:b,videoOnPlay:c,videoOnPercentage:d,videoOnComplete:e,formOnComplete:f}}();