$(document).ready(function() {
  //on double down arrow click, have new tweet text box show up
  $(".fa-angle-double-down").on('click', function(event) {
    $('.new-tweet-text-box').slideToggle();
    $('html, body').animate({
      scrollTop: 0
    }, 500);
    $('#tweet-text').select();
  });
});