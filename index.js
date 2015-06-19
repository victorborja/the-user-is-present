+(function ($) {

  setTimeout(marinaStatic, 4000);

  function marinaStatic() {
    $('.marina.anim').removeClass('anim');
  }

  Webcam.attach( '#my_camera' );

  function take_snapshot() {
    Webcam.snap( function(data_uri) {
      document.getElementById('my_result').innerHTML = '<img src="'+data_uri+'"/>';
    } );
  }

  


}(jQuery));