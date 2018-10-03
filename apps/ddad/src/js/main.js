$(function() {
	$('.p_item').each(function() {
		var poster = $(this).attr('data-poster');

		if (poster) (new Image()).src = poster;
	});

	$('.d_item')
		.on('click', function(e) {
			if ($(this).hasClass('select')) {
				$('.p_item, .d_item').removeClass('hover select');
				return false;
			}

			var id = $(this).attr('class').split(' ')[1];

			$('.d_item').removeClass('select').filter(this).addClass('select');

			$('.p_item, .d_item').removeClass('hover').not('.' + id).addClass('hover');
		});

	$('.p_item').not('.hover')
		.on('mouseenter', function(e) {
			if ($(this).hasClass('hover')) return false;

			var poster = $(this).attr('data-poster');

			if (poster) $('.poster').css('background-image', 'url(' + poster + ')');
		})
		.on('mouseleave', function(e) {
			$('.poster').removeAttr('style');
		});
});