$(function () {
  $('.vr-img').one('load', function() {
    $(this).addClass('loaded');
    var hei = $('.vr-frame').height() + 200;
    $(this).height(hei);
    var wid = $(this).width();
    $(this).css({
      'marginLeft': -1*wid/2+'px',
      'marginTop': -1*hei/2+'px',
    });

    var panorama = new dcPanorama('.vr-frame', '.vr-img',{
      compassRange: 90,
      betaRange: 30
    })
  }).each(function() {
    if(this.complete) $(this).load();
  });
})

