+(function ($) {

  page('/marina', show('marina'), marina);
  page('/:user', show('user'), noop);
  page('/', show('welcome'), noop);

  page('*', function () {
    page.redirect('/')
  })

  page({
    hashbang: true
  });

  $(document).on('click', '[data-start]', openCamera)

  function noop () {}

  function show (pageName) {
    return function (ctx, next) {
      console.log('hide', $('section:not(.'+pageName+')'));
      console.log('show', $('section.'+pageName));
      $('section:not(.'+pageName+')').hide();
      $('section.'+pageName).show();
      next();
    }
  }

  function openCamera () {
    var check = setInterval(proceed, 500);
    Webcam.attach('#my_camera');

    function proceed() {
      if (Webcam.video) {
        clearInterval(check);
        page('/marina');
      }
    }
  }

  function marina () {
    console.log("Marina");
    setTimeout(marinaStatic, 4000);
  }

  function marinaStatic() {
    $('.marina.anim').removeClass('anim');
  }


  function take_snapshot() {
    Webcam.snap( function(data_uri) {
      document.getElementById('my_result').innerHTML = '<img src="'+data_uri+'"/>';
    });
  }


}(jQuery));