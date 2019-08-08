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
  $('#tariff-5').click(function() {
    $('#tariff-option').val("Тариф S-Безлимит");
    $('#tariff-5').addClass('tariff-active');
    $('#tariff-8').removeClass('tariff-active');
    $('#tariff-20').removeClass('tariff-active');
    $('#tariff-40').removeClass('tariff-active');
    $('#tariff-option-5').addClass('a-tariff-active');
    $('#tariff-option-8').removeClass('a-tariff-active');
    $('#tariff-option-20').removeClass('a-tariff-active');
    $('#tariff-option-40').removeClass('a-tariff-active');
  });
  $('#tariff-8').click(function() {
    $('#tariff-option').val("Тариф M-Безлимит");
    $('#tariff-8').addClass('tariff-active');
    $('#tariff-5').removeClass('tariff-active');
    $('#tariff-20').removeClass('tariff-active');
    $('#tariff-40').removeClass('tariff-active');
    $('#tariff-option-8').addClass('a-tariff-active');
    $('#tariff-option-5').removeClass('a-tariff-active');
    $('#tariff-option-20').removeClass('a-tariff-active');
    $('#tariff-option-40').removeClass('a-tariff-active');
  });
  $('#tariff-20').click(function() {
    $('#tariff-option').val("Тариф L-Безлимит");
    $('#tariff-20').addClass('tariff-active');
    $('#tariff-8').removeClass('tariff-active');
    $('#tariff-5').removeClass('tariff-active');
    $('#tariff-40').removeClass('tariff-active');
    $('#tariff-option-20').addClass('a-tariff-active');
    $('#tariff-option-8').removeClass('a-tariff-active');
    $('#tariff-option-5').removeClass('a-tariff-active');
    $('#tariff-option-40').removeClass('a-tariff-active');
  });
  $('#tariff-40').click(function() {
    $('#tariff-option').val("Тариф XL-Безлимит");
    $('#tariff-40').addClass('tariff-active');
    $('#tariff-8').removeClass('tariff-active');
    $('#tariff-20').removeClass('tariff-active');
    $('#tariff-5').removeClass('tariff-active');
    $('#tariff-option-40').addClass('a-tariff-active');
    $('#tariff-option-8').removeClass('a-tariff-active');
    $('#tariff-option-20').removeClass('a-tariff-active');
    $('#tariff-option-5').removeClass('a-tariff-active');
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
});