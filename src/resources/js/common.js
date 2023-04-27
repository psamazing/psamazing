var UI = UI || {};

var Utils = {
  getMediaQuery: function (type) {
    return {
      pc: window.matchMedia('(min-width:1024px)'),
      tablet: window.matchMedia('(min-width:768px) and (max-width:1023px)'),
      mobile: window.matchMedia('all and (max-width:767px)'),
    }[type];
  },
};
UI.matchMedia = {
    init: function () {
      var _this = this;
      var pcMQ = Utils.getMediaQuery('pc');
      var tabletMQ = Utils.getMediaQuery('tablet');
  
      if (pcMQ.matches) {
        _this.matchedIsPC();
      } else {
        tabletMQ.matches ? _this.matchedIsTablet() : _this.matchedIsMobile();
      }
      pcMQ.addListener(function (mql) {
        document.location.reload();
        mql.matches && _this.matchedIsPC();
      });
  
      tabletMQ.addListener(function (mql) {
        document.location.reload();
        mql.matches
          ? _this.matchedIsTablet()
          : pcMQ.matches
            ? _this.matchedIsPC()
            : _this.matchedIsMobile();
      });
    },
    matchedIsPC: function () {
      //console.log('pc');
      UI.pcAni.init();
    },
    matchedIsTablet: function () {
      //console.log('tablet');
      UI.tabletAni.init();
    },
    matchedIsMobile: function () {
      //console.log('mobile');
      UI.mAni.init();
    },
  };
  
  // pc
  UI.pcAni = {
    init: function () {
      $('#fullpage').fullpage({
        autoScrolling: true,
        fitToSection: false,
        anchors: ['sec01', 'sec02', 'sec03', 'sec04'],
        menu:'#menu',
        navigation: true,
        responsive: true,
        resize: true,
        scrollOverflow: false,
        onLeave: function (index, destination, direction) {

        },
        afterLoad: function (anchorLink, index) {
        },
        afterResize: function () {
          var win = $(window).width();
          if (win > 865) {
          }
          $.fn.fullpage.setAllowScrolling(true);
        },
      });

      //레이어팝업 스크롤 이벤트
      $('.port-cont-wrap').mCustomScrollbar({
          // 가로
          horizontalScroll:false,
          // 테마
          theme:"light",
          // 마우스휠 속도
          mouseWheelPixels:300
      }); 	
    },
  };
  
  //tablet
  UI.tabletAni = {
    init: function () {
      $('#fullpage').fullpage({
        autoScrolling: false,
        fitToSection: false,
        navigation: true,
        responsive: true,
        resize: true,
        scrollOverflow: false,
        onLeave: function (index, destination, direction) {
        
  
        },
        afterLoad: function (anchorLink, index) {
        },
        afterResize: function () {
          var win = $(window).width();
          if (win > 865) {
          }
          $.fn.fullpage.setAllowScrolling(true);
        },
      });
    },
  };
  // mo
  UI.mAni = {
    init: function () {
      $(window)
        .on('scroll', function () {
          var sTop = $(this).scrollTop();
          if (sTop > $('.section1').offset().top - $('.section1').height() / 1.5) {
            $('.section1').addClass('active');
          }
          if (sTop > $('.section2').offset().top - $('.section2').height() / 1.5) {
            $('.section2').addClass('active');
          }
          if (sTop > $('.section3').offset().top - $('.section3').height() / 1.5) {
            $('.section3').addClass('active');
          }
          if (sTop > $('.section4').offset().top - $('.section4').height() / 1.5) {
            $('.section4').addClass('active');
          }
        })
        .trigger('scroll');
    }
  };
  function mainTop() {
    vw = window.innerWidth;
    if (vw < 767) {
      $('html, body').animate({ scrollTop: 0 }, '300');
    } else {
      $.fn.fullpage.moveTo(1);
    }
  }
  function matchMediaInit() {
    UI.matchMedia.init();

    $.ajax({
      type:"get",
      url:"../templates/data.json",
      dataType:"json",
      success: function(data){

          var str =""
          $.each(data, function(i, item){
              str +="<div class='slidewrap'>"
              str += "<div class='port-img'>"
              str += "<img src='../resources/images/"+item.img+"' alt="+item.name+"/>"
              str += "</div>"
              str += "<div class='port-infotxt'>"
              str += "<div>"
              str += "<h2 class='port-tit'>"+item.portTit+"</h2>"
              str += "<p class='port-subtit'>"+item.portSubTit+"</p>"
              str += "<ul class='port-keyword'>"


              for(let i=0; i<item.portKeyword.length; i++){
                str += "<li>#" + item.portKeyword[i] + "</li>"
              }

              str += "</ul></div>"
              str += "<div class='btn-area'><button type='button' class='port-more' onclick='portDetailOpen("+ item.id + ")'>상세보기</button></div>"
              str += "</div></div>";
          });

          $(".portfolio-wrap").append(str);

          $(".portfolio-wrap").slick({
            dots: true,
            arrows:true,
            infinite: true,
            autoplay:false,
            slidesToShow: 1,
            fade:true,
            speed:2000
          });
      },
      error:function(){
          console.log("통신에러");
      }
  });
};

function portDetailOpen(idx){
  if ( $('.fp-enabled').length ) {
      // Destroy all  
      $.fn.fullpage.setAllowScrolling(false);
  }else{
    
  }
  $(".port-detail-back.detail"+idx).addClass("on");
  $(".port-detail-wrap").addClass("on");
}
function portDetailClose(idx){
  if ( $('.fp-enabled').length ) {
    $.fn.fullpage.setAllowScrolling(true);
  }
  $(".port-detail-back.detail"+idx).removeClass("on");
  $(".port-detail-wrap").removeClass("on");
} 