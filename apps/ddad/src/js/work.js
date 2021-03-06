$(function() {

	$('.image_gallery').each(function() {
		var $this = $(this);

		var gallery = new Swiper($this.children('.swiper-container'), {
			keyboardControl: true,
			nextButton: $this.find('.swiper-button-next'),
			prevButton: $this.find('.swiper-button-prev'),
			spaceBetween: 40,
			autoHeight: true,
			slidesPerView: 1
		});
	});

	$('.image').children('img')
	.each(function() {
		var img_original = $(this).data('original');

		if (img_original) (new Image()).src = img_original;
	})
	.on('mouseenter', function(e) {
		var path = $(this).data('original');

		$('.preview').addClass('show');
		$('<img/>', { src: path }).appendTo('.preview');
	})
	.on('mouseleave', function(e) {
		$('.preview').removeClass('show').empty();
	})
	.on('mousemove', function(e) {
		var $this = $(this);
		var $preview = $('.preview');

		var percentY = (e.pageY - $this.offset().top) / $this.height() * 1.1 - 0.30;
		var percentX = (e.pageX - $this.offset().left) / $this.width() * 1.1 - 0.30;

		$preview.scrollTop($preview.children('img').height() * percentY);
		$preview.scrollLeft($preview.children('img').width() * percentX);
	});

});