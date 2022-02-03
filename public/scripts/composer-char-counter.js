$(document).ready(function() {
  $("#tweet-text").on('input', function(event) {
    const maxLength = 140;
    const currentLength = $(this).val().length;
    const counter = $(this).parent().find('.counter');

    if (currentLength > maxLength) {
      counter.addClass('max-reached');
      $(".alert-long").slideDown();
    } else {
      counter.removeClass('max-reached');
      $(".alert-long").slideUp();
      $(".alert-short").slideUp();
    }
    //ternary operator
    //condition ? true : false
    //currentLength > maxLength ? counter.addClass('max-reached') : counter.removeClass('max-reached');
    counter.text(maxLength - currentLength);
  });
});