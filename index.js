+(function ($) {

  var camera_sel = '#my_camera';

  page('/:user/open-camera', openCamera, function (ctx) {
    page.redirect('/'+ctx.params.user+'/is-present');
  });

  page('/the-artist/is-present', show('marina'), marina, done);

  page('/:user', show('welcome'), done);

  page('*', function () {
    page.redirect('/the-artist')
  })

  page({
    hashbang: true
  });

  $(document).on('click', '[data-start]', function () {
    page.redirect(page.current + '/open-camera');
  });

  function done () {}

  function show (pageName) {
    return function (ctx, next) {
      $('section:not(.'+pageName+')').hide();
      $('section.'+pageName).show();
      next();
    }
  }

  function openCamera (ctx, next) {
    Webcam.on('live', next);
    Webcam.on('error', prev);

    Webcam.attach(camera_sel);

    function prev() {
      alert("Please allow access to your camera.");

      Webcam.off('live', next);
      Webcam.off('error', prev);

      page.redirect('/'+ctx.params.user);
    }
  }

  function marina () {
    console.log("Marina");
    setTimeout(marinaStatic, 4000);
  }

  function marinaStatic() {
    $('.full.marina.anim').removeClass('anim');
  }

  function marinaAnim() {
    $('.full.marina').addClass('anim');
  }

  function take_snapshot() {
    Webcam.snap( function(data_uri) {
      document.getElementById('my_result').innerHTML = '<img src="'+data_uri+'"/>';
    });
  }


}(jQuery));