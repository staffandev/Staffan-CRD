(function ($) {
  $(function () {
  $('.scrollspy').scrollSpy();
    $('.button-collapse').sideNav();
    $('.parallax').parallax();
    $('.carousel.carousel-slider').carousel({ fullWidth: true });
    var nav = $('#main-menu-container');

    $(window).scroll(function () {
      if ($(this).scrollTop() > 400) {
        nav.addClass("f-nav");
      } else {
        nav.removeClass("f-nav");
      }

    });
  
  }); // end of document ready
})(jQuery); // end of jQuery name space