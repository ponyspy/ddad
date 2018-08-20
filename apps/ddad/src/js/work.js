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

});