$(function() {
	$('.p_item').each(function() {
		var poster = $(this).attr('data-poster');

		if (poster) (new Image()).src = poster;
	});

	$('.d_item')
		.on('mouseenter', function(e) {
			var id = $(this).attr('class').split(' ')[1];

			$('.p_item, .d_item').not('.' + id).addClass('hover');
		})
		.on('mouseleave', function(e) {
			$('.p_item, .d_item').removeClass('hover');
		})
		.on('click', function(e) {
			if ($(this).hasClass('select')) {
				$('.p_item, .d_item').removeClass('active select');
				return false;
			}

			$(this).addClass('select');

			$('.p_item, .d_item').filter('.hover').addClass('active');
		});

	$('.p_item')
		.on('mouseenter', function(e) {
			var poster = $(this).attr('data-poster');

			if (poster) $('.poster').css('background-image', 'url(' + poster + ')')
		})
		.on('mouseleave', function(e) {
			$('.poster').removeAttr('style');
		});
});