$(document).ready(function(){
  var arr = window.location.pathname.split('/');
  var loc = arr[arr.length - 1];
  if (loc == 'index.html' || loc == 'index.php') {
    $("a").on('click', function(event) {
      if (this.hash !== "") {
        event.preventDefault();
        var hash = this.hash;
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 500, function(){
          window.location.hash = hash;
        });
      }
    });
  }

  $('#header').find('a').each(function() {
      if ($(this).attr('href') == loc) {
          $(this).toggleClass('active', $(this).attr('href') == loc);
        }
  });

  $('.tariff').each(function() {
    $(this).click(function() {
      $('#tariff-option').val($(this).data('val'));
      $(this).addClass('tariff-active');
      $('.tariff').not(this).removeClass('tariff-active');
    });
  });

  $('#submit-button').click(function() {
  	var option = $('#tariff-option').val();
  	if (!$('#privacy-checkbox').prop("checked")) {
      event.preventDefault();
    } else if (!option.localeCompare("Тариф") || $('#sub-name').val() == "" || $('#sub-phone').val() == "" || $('#sub-email').val() == "" || $('#sub-company').val() == "") {
    	event.preventDefault();
    	$('#sub-info').text('Пожалуйста, выберите тариф и заполните всю информацию в заявке');
    	$('#sub-info').css('color', '#f44336');
    	$('#sub-info').css('font-size', '18px');
    }
  });

  $('#privacy-checkbox').click(function() {
    $('#submit-button').toggleClass('input-enabled');
  });

  $(window).bind('scroll',function(e){
      parallaxScroll();
  });

  function parallaxScroll(){
    var scrolled = $(window).scrollTop();
    if(scrolled > 333) {
      $('#mars').css('top',(-400+(scrolled*.9))+'px');
    } else {
      $('#mars').css('top',('-100px'));
    }
    
    $('#sub-title').css('top',(334-(scrolled*.05))+'px');
  }
});