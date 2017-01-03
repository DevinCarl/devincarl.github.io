function dcPanorama(frame, el, opt) {
  this.$frame = $(frame);
  this.$el = $(el);
  if (this.$frame.length < 1 || this.$el.length < 1) {
    return
  }

  var that = this;

  this.frame_w = this.$frame.width();
  this.frame_h = this.$frame.height();

  this.el_w = this.$el.width();
  this.el_h = this.$el.height();

  this.compassRang = opt && opt.compassRange || 180;
  this.compassRang = this.compassRang > 180 ? 180 : this.compassRang < 0 ? 0 : this.compassRang;

  this.betaRange = opt && opt.betaRange || 90;
  this.betaRange = this.betaRange > 90 ? 90 : this.betaRange < 0 ? 0 : this.betaRange;

  var d_w = (this.el_w - this.frame_w)/2;
  var d_h = (this.el_h - this.frame_h)/2;
  var max_c, min_c;

  this.orientation = new dcOrientation();
  this.orientation.onOrientationChange = function (or) {
    if (max_c == undefined) {
      max_c = or.o_compass + that.compassRang;
    } 
    if (min_c == undefined) {
      min_c = or.o_compass - that.compassRang;
    }

    var com = Math.round(or.compass);
    if (min_c < 0 && com > or.o_compass + 180) {
      com -= 360;
    }
    if (max_c > 360 && com < or.o_compass - 180) {
      com += 360;
    }
    var d_com = Math.round(or.o_compass - com);
    d_com = d_com > that.compassRang ? that.compassRang : d_com < -1*that.compassRang ? -1*that.compassRang : d_com;

    var d_beta = Math.round(or.orientation.beta - 90);
    d_beta = d_beta > that.betaRange ? that.betaRange : d_beta < -1*that.betaRange ? -1*that.betaRange : d_beta;

    var dx = Math.round(d_com * d_w/that.compassRang);
    var dy = Math.round(d_beta * d_h/that.betaRange);

    that.$el.css('transform', 'translate3d('+dx+'px,'+dy+'px,0');

    $('.info-val.o_compass').text(Math.round(or.o_compass));
    // $('.info-val.compass').text(com);
    // $('.info-val.d_com').text(d_com);
    // $('.info-val.dx').text(dx);
    // $('.info-val.dy').text(dy);
  }

}
