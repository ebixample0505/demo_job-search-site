//var define



$(document).ready(function(){
  // マウスオーバー
  $(document).on('mouseover', '.rollover', function(){
    $(this).attr("src",$(this).attr("src").replace("_off.", "_on."));
  });

  $(document).on('mouseout', '.rollover', function(){
    $(this).attr("src",$(this).attr("src").replace("_on.", "_off."));
  });

  $(document).on('mouseover', '.bg_rollover', function(){
    $(this).css("background-image",$(this).css("backgroundImage").replace("_off.", "_on."));
  });

  $(document).on('mouseout', '.bg_rollover', function(){
    $(this).css("background-image",$(this).css("backgroundImage").replace("_on.", "_off."));
  });

  $(document).on('mouseover', '.ro', function(){
    $(this).find('img').attr("src",$(this).find('img').attr("src").replace("_off.", "_on."));
  });

  $(document).on('mouseout', '.ro', function(){
    $(this).find('img').attr("src",$(this).find('img').attr("src").replace("_on.", "_off."));
  });

  // スクロール
  $(document).on('click', 'a.scroll', function() {
    var speed = 400;
    var href= $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top
    if(!isSP()){
      position -= $("header#site-header").outerHeight();
    }

    $('body,html').animate({scrollTop:position}, speed, 'swing');
    return false;
  });

  // totop
  $(".totop").on('click', function() {
    $('body,html').animate({scrollTop:0}, 400, 'swing');
    return false;
  });

  //pageごとのSCRIPT
  if($("body#page-home").length > 0){
    document.fonts.ready.then(function(fontFaceSet) {
      // フォント読み込み完了後に実行される
      $("body").addClass("shown");
      $("section.kv").addClass("shown");
    });

    //menu
    $(".js-menu-opener").on("click",function(){
      $("header#site-header").toggleClass("opened");
    });
    $(".menu li a").on('click', function() {
      $("header#site-header").removeClass("opened");
    });

    if(isSP()) {
      $("div.member").on("click",function(){
        $(this).toggleClass("opened");
        $(".member:not(.opened) .description").stop().slideUp();
        $(".opened .description").stop().slideDown();
      });
    }

  }


  //scroll監視
  var watchScroll = setInterval(function(){
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    //fade処理
    $(".fade-up-PC,.fade-up-SP").each(function(){
      var imgPos = $(this).offset().top;
      var fadeLimit;
      if(isSP()) {
        //SPでは25%
        fadeLimit = imgPos - windowHeight + (windowHeight/4);
      }else{
        //PCでは66%
        fadeLimit = imgPos - windowHeight + (windowHeight/4);
      }

      if (scroll > fadeLimit){
        $(this).addClass("fade-shown");
        //sub fadeが兄弟にあればそれも
        $(this).siblings(".sub-fade").addClass("fade-shown");
      }
    });

    //messageのみ個別で調整
    $(".fade-up-PC-find,.fade-up-SP-find").each(function(){
      var imgPos = $(this).offset().top;
      var fadeLimit;
      if(isSP()) {
        //SPでは25%
        fadeLimit = imgPos - windowHeight + (windowHeight/8);
      }else{
        //PCでは66%
        fadeLimit = imgPos- windowHeight;
      }
      if (scroll > fadeLimit){
        $(this).addClass("fade-shown");
        //sub fadeが兄弟にあればそれも
        $(this).siblings(".sub-fade").addClass("fade-shown");
      }
    });

    //SPでのみ画面内に入ったら発動するアンカー
    $(".js-animation-anchor-SP").each(function(){
      var imgPos = $(this).offset().top;
      var fadeLimit = imgPos - windowHeight;

      if (scroll > fadeLimit && isSP()){
        //rel-anchor-idと同じrel-anchor-target-idを持つ要素をfade-shown
        $("[rel-anchor-target-id="+$(this).attr("rel-anchor-id")+"]").addClass("fade-shown");
      }
    });

    //PCでのみ、画面66％に入ったら発動するアンカー
    $(".js-animation-anchor-PC50").each(function(){
      var imgPos = $(this).offset().top;
      var fadeLimit = imgPos - windowHeight + (windowHeight/4);

      if (scroll > fadeLimit && !isSP()){
        //rel-anchor-idと同じrel-anchor-target-idを持つ要素をfade-shown
        $("[rel-anchor-target-id="+$(this).attr("rel-anchor-id")+"]").addClass("fade-shown");
      }
    });


    //SPでのみ、画面25％に入ったら発動するアンカー
    $(".js-animation-anchor-SP25").each(function(){
      var imgPos = $(this).offset().top;
      var fadeLimit = imgPos - windowHeight + (windowHeight/4);

      if (scroll > fadeLimit && isSP()){
        //rel-anchor-idと同じrel-anchor-target-idを持つ要素をfade-shown
        $("[rel-anchor-target-id="+$(this).attr("rel-anchor-id")+"]").addClass("fade-shown");
      }
    });

    //手書きのwriting in
    $("section.member .member").each(function(){
      var imgPos = $(this).offset().top;
      var fadeLimit = imgPos - windowHeight;

      if (scroll > fadeLimit){
        //rel-anchor-idと同じrel-anchor-target-idを持つ要素をfade-shown
        $(this).find(".name-info .tegaki").addClass("shown");
      }
    });

    //小さいエントリーを隠す
    var adjust = 0;
    if(isSP()) adjust = $("section.requirement a.entry").outerHeight();
    if (scroll > $("section.requirement a.entry").offset().top - adjust - windowHeight){
      $("a.entry.small-entry").addClass("hidden");
    }else{
      $("a.entry.small-entry").removeClass("hidden");
    }

    //PCでのみ、スクロールされたらヘッダーの背景を白くする
    $("header#site-header").each(function(){

      if (scroll > 0 && !isSP()){
        $(this).addClass("scrolled");
      }else{
        $(this).removeClass("scrolled");
      }
    });



  },100);

});


////////////////////////////////////////////
// FUNCTIONS
////////////////////////////////////////////
function isSP(){
  if(window.matchMedia('(max-width: 1024px)').matches){
    return true;
  }else{
    return false;
  }
}

////////////////////////////////////////////
// GLOBAL, DEBUG, TOOLS
////////////////////////////////////////////




