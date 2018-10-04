$(function() {
	$(document)
		.on('mouseup touchend', function(e) {
			if ($(e.target).closest('.d_item.select, .p_item:not(.hover)').length) return;

			if ($('.d_item').hasClass('select')) {
				$('.p_item, .d_item').removeClass('hover select');
				return false;
			}

			e.stopPropagation();
		});

	$('.p_item').each(function() {
		var $this = $(this);
		var poster = $this.attr('data-poster');

		if (poster) (new Image()).src = poster;

		if (localStorage.getItem($this.attr('data-id'))) {
			$this.addClass('back');
		}
	});

	$('.d_item')
		.on('click', function(e) {
			var $this = $(this);

			if ($this.hasClass('select')) {
				$('.p_item, .d_item').removeClass('hover select');
				return false;
			}

			var id = $this.attr('class').split(' ')[1];

			$('.d_item').removeClass('select').filter(this).addClass('select');

			$('.p_item, .d_item').removeClass('hover').not('.' + id).addClass('hover');
		});

	$('.p_item')
		.on('click', function(e) {
			var $this = $(this);
			var id = $this.attr('data-id');

			$this.addClass('back');

			localStorage.setItem(id, 'w_id');
		})
		.on('mouseenter', function(e) {
			var $this = $(this);

			if ($this.hasClass('hover')) return false;

			var poster = $this.attr('data-poster');

			if (poster) $('.poster').css('background-image', 'url(' + poster + ')');
		})
		.on('mouseleave', function(e) {
			$('.poster').removeAttr('style');
		});
});