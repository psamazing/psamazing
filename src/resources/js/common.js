var UI = UI || {};

var Utils = {
  getMediaQuery: function (type) {
    return {
      pc: window.matchMedia('(min-width:1025px)'),
      tablet: window.matchMedia('(min-width:768px) and (max-width:1024px)'),
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
      console.log('pc');
      UI.pcAni.init();
    },
    matchedIsTablet: function () {
      console.log('tablet');
      UI.tabletAni.init();
    },
    matchedIsMobile: function () {
      console.log('mobile');
      UI.mAni.init();
    },
  };
  
  // pc
  UI.pcAni = {
    init: function () {
      $('#fullpage').fullpage({
        autoScrolling: true,
        fitToSection: false,
        navigation: true,
        responsive: true,
        resize: true,
        scrollOverflow: false,
        onLeave: function (index, destination, direction) {
          //FOOTER PAGINATION STYLE
          if (destination == 5) {
            $('#fp-nav ul li').eq(3).children('a').addClass('show');
            $('#fp-nav').addClass('slide_down');
          } else {
            $('#fp-nav ul li').eq(3).children('a').removeClass('show');
            $('#fp-nav').removeClass('slide_down');
          }
  
          $('.section [data-aos]').removeClass('aos-animate');
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
  
  //tablet
  UI.tabletAni = {
    init: function () {
      $('#fullpage').fullpage({
        autoScrolling: true,
        fitToSection: false,
        navigation: true,
        responsive: true,
        resize: true,
        scrollOverflow: false,
        onLeave: function (index, destination, direction) {
          //FOOTER로 인한 SECTION-TITLE 변경
          if (destination == 5 && direction == 'down') {
            $('.sec3 .interval').addClass('slide_down');
          } else {
            $('.sec3 .interval').removeClass('slide_down');
          }
  
          // SECTION별 로고, NAV색 변경
          if (destination == 2 || destination == 3) {
            $('header').addClass('top_active');
            $('#fp-nav ul li a span').addClass('dark');
          } else {
            $('header').removeClass('top_active');
            $('#fp-nav ul li a span').removeClass('dark');
          }
  
          //FOOTER PAGINATION STYLE
          if (destination == 5) {
            $('#fp-nav ul li').eq(3).children('a').addClass('show');
            $('#fp-nav').addClass('slide_down');
          } else {
            $('#fp-nav ul li').eq(3).children('a').removeClass('show');
            $('#fp-nav').removeClass('slide_down');
          }
  
          $('.section [data-aos]').removeClass('aos-animate');
        },
        afterLoad: function (anchorLink, index) {
          $('.section.active [data-aos]').addClass('aos-animate');
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
            console.log(sTop,$('.section1').offset().top,$('.section1').height() / 1.5)
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

    $(".portfolio-wrap").slick({
        dots: true,
        arrows:true,
        infinite: true,
        autoplay:false,
        slidesToShow: 1,
        speed:2000
    });
  };