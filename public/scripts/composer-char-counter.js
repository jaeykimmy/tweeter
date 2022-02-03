$(document).ready(function() {
  $("#tweet-text").on('input', function(event) { //same as on(change)
    //console.log(this); //The this keyword is a reference to the button as a DOM element
    //console.log(event); // the event object that is being triggered
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

  //on double down arrow click, have new tweet text box show up
  $(".fa-angle-double-down").on('click', function(event) {
    $('.new-tweet-text-box').slideToggle();
    $('html, body').animate({
      scrollTop: 0
    }, 500);
    $('#tweet-text').select();
  });
});