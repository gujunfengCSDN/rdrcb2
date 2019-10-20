$(function(){
  $(window).click(function(){
    window.AppOp.callFunction("click");
  });
  $(window).on('touchstart', function (e) {
    window.AppOp.callFunction("click");
  });
  $(window).on('touchend', function (e) {
    window.AppOp.callFunction("click");
  });
});
