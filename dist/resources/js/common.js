var UI=UI||{},Utils={getMediaQuery:function(t){return{pc:window.matchMedia("(min-width:1024px)"),tablet:window.matchMedia("(min-width:768px) and (max-width:1023px)"),mobile:window.matchMedia("all and (max-width:767px)")}[t]}};function mainTop(){vw=window.innerWidth,vw<767?$("html, body").animate({scrollTop:0},"300"):$.fn.fullpage.moveTo(1)}function matchMediaInit(){UI.matchMedia.init(),$.ajax({type:"get",url:"../templates/data.json",dataType:"json",success:function(t){var e="";$.each(t,(function(t,i){e+="<div class='slidewrap'>",e+="<div class='port-img'>",e+="<img src='../resources/images/"+i.img+"' alt="+i.name+"/>",e+="</div>",e+="<div class='port-infotxt'>",e+="<div>",e+="<h2 class='port-tit'>"+i.portTit+"</h2>",e+="<p class='port-subtit'>"+i.portSubTit+"</p>",e+="<ul class='port-keyword'>";for(let t=0;t<i.portKeyword.length;t++)e+="<li>#"+i.portKeyword[t]+"</li>";e+="</ul></div>",e+="<div class='btn-area'><button type='button' class='port-more' onclick='portDetailOpen("+i.id+")'>상세보기</button></div>",e+="</div></div>"})),$(".portfolio-wrap").append(e),$(".portfolio-wrap").slick({dots:!0,arrows:!0,infinite:!0,autoplay:!1,slidesToShow:1,fade:!0,speed:2e3})},error:function(){console.log("통신에러")}})}function portDetailOpen(t){$(".fp-enabled").length&&$.fn.fullpage.setAllowScrolling(!1),$(".port-detail-back.detail"+t).addClass("on"),$(".port-detail-wrap").addClass("on")}function portDetailClose(t){$.fn.fullpage.setAllowScrolling(!0),$(".port-detail-back.detail"+t).removeClass("on"),$(".port-detail-wrap").removeClass("on")}UI.matchMedia={init:function(){var t=this,e=Utils.getMediaQuery("pc"),i=Utils.getMediaQuery("tablet");e.matches?t.matchedIsPC():i.matches?t.matchedIsTablet():t.matchedIsMobile(),e.addListener((function(e){document.location.reload(),e.matches&&t.matchedIsPC()})),i.addListener((function(i){document.location.reload(),i.matches?t.matchedIsTablet():e.matches?t.matchedIsPC():t.matchedIsMobile()}))},matchedIsPC:function(){UI.pcAni.init()},matchedIsTablet:function(){UI.tabletAni.init()},matchedIsMobile:function(){UI.mAni.init()}},UI.pcAni={init:function(){$("#fullpage").fullpage({autoScrolling:!0,fitToSection:!1,anchors:["sec01","sec02","sec03","sec04"],menu:"#menu",navigation:!0,responsive:!0,resize:!0,scrollOverflow:!1,onLeave:function(t,e,i){},afterLoad:function(t,e){},afterResize:function(){$(window).width();$.fn.fullpage.setAllowScrolling(!0)}})}},UI.tabletAni={init:function(){$("#fullpage").fullpage({autoScrolling:!1,fitToSection:!1,navigation:!0,responsive:!0,resize:!0,scrollOverflow:!1,onLeave:function(t,e,i){},afterLoad:function(t,e){},afterResize:function(){$(window).width();$.fn.fullpage.setAllowScrolling(!0)}})}},UI.mAni={init:function(){$(window).on("scroll",(function(){var t=$(this).scrollTop();console.log(t,$(".section1").offset().top,$(".section1").height()/1.5),t>$(".section1").offset().top-$(".section1").height()/1.5&&$(".section1").addClass("active"),t>$(".section2").offset().top-$(".section2").height()/1.5&&$(".section2").addClass("active"),t>$(".section3").offset().top-$(".section3").height()/1.5&&$(".section3").addClass("active"),t>$(".section4").offset().top-$(".section4").height()/1.5&&$(".section4").addClass("active")})).trigger("scroll")}};