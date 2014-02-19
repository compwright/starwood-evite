$(function()
{
	//jQuery.fx.interval = 100;

	/* Play music */
	$("#player").jPlayer({
		ready: function () {
			$(this).jPlayer('setMedia', {
				m4a: "/la-lune.mp4"
			});
			$(this).jPlayer('play');
		},
		swfPath: "/js/",
		supplied: "m4a"
	});

	/* Scale page vertically to fit on screen if < 870px */
	if ($(window).height() < 870) {
		var scale = $(window).height() / 870;
		if ($('body').hasClass('lt-ie9')) {
			// IE8
			$('body').css({ zoom : scale });
		} else {
			$('body').css('-webkit-transform', 'scale('+scale+')');
			$('body').css('-moz-transform', 'scale('+scale+')');
			$('body').css('-ms-transform', 'scale('+scale+')');
			$('body').css('transform', 'scale('+scale+')');
		}
	}

	/* Fade from day to night */
	$('.intro-daylight').delay(1500).fadeOut(5000);

	/* Pulse the three words once */
	var pulse_speed = 1000;
	$('.intro-sprite.word-discover').animate({ opacity: 0.9 }, pulse_speed).animate({ opacity: 0.1 }, pulse_speed, function() {
		$('.intro-sprite.word-feast').animate({ opacity: 0.9 }, pulse_speed).animate({ opacity: 0.1 }, pulse_speed, function () {
			$('.intro-sprite.word-frolic').animate({ opacity: 0.9 }, pulse_speed).animate({ opacity: 0.1 }, pulse_speed, function() {
				// Zoom into the tent
				$('#starfield').hide();
				$('#intro').animate(
					{ borderSpacing: 3 },
					{
						step: function(now) {
							if (now > 1.0)
							{
								$(this).css('-webkit-transform', 'scale('+now+')');
								$(this).css('-moz-transform', 'scale('+now+')');
								$(this).css('-ms-transform', 'scale('+now+')');
								$(this).css('transform', 'scale('+now+')');
							}
						},
						duration: 2000,
						complete : function() {
							// Fade out the intro
							$('#main').hide();
							$('#intro').fadeOut(1000).delay(1000, function() {
								$('#main, #starfield').fadeIn(1000);
							});

							// Cycle through the words
							var i = 0;
							var cycle = setInterval(function() {
								$('dt, dd').removeClass('active');
								$('dt').eq(i % 3).addClass('active');
								$('dd').eq(i % 3).addClass('active');
								i++;
							}, 2000);
						}
					}
				);
			});
		});
	});

	/* Skip intro animation */
	$('.intro-skip').click(function() {
		$('.intro-daylight').finish();
		$('.intro-sprite').finish();
		$('#intro').finish();
	});

	/* Show the descriptions for the three words on hover */
	/*
	$('dt').hover(
		function() {
			var rel = $(this).attr('rel');
			$('dd[rel="' + rel + '"]').css('visibility', 'visible');
		},
		function() {
			var rel = $(this).attr('rel');
			$('dd[rel="' + rel + '"]').css('visibility', 'hidden');
		}
	);
	*/

	/* Accept button submit */
	$('button.accept').click(function(e) {
		$('input').attr('required', 'required');
		$('input[name="response"]').val('accept');
		if (this.form.checkValidity()) {
			$('input[type="submit"]').click();
		} else {
			alert('Please fill in all fields before submitting your response.');
		}
	});

	/* Decline button submit */
	$('button.decline').click(function(e) {
		$('input').removeAttr('required');
		$('input[name="first_name"]').attr('required', 'required');
		$('input[name="last_name"]').attr('required', 'required');
		$('input[name="response"]').val('decline');
		if (this.form.checkValidity()) {
			$('input[type="submit"]').click();
		} else {
			alert('Please fill in the first and last name fields before submitting your response.');
		}
	});

	/* HTML5 form validation polyfill */
	var registration_form = document.getElementById("registration_form");
	if (registration_form) {
		H5F.setup(registration_form);
	}

	/* Starry, starry night */
	function scatterStars(imageSrc, count, size) {
		
		var maxHeight = 800,
			maxWidth = 1150,
			i, img, top, left, delay, rotation;
		
		for (i=0; i < count; i++) {
			
			top = Math.floor(Math.random() * maxHeight);
			left = Math.floor(Math.random() * maxWidth);
			delay = Math.floor(Math.random() * 100) / 100;
			rotation = Math.floor(Math.random() * 360);

			img = $(document.createElement('img'));
			img.addClass('star')
			   .css('top', top)
			   .css('left', left)
			   .css('width', size + 'px')
			   .css('height', size + 'px')
			   .css('-moz-transform', 'rotate(' + rotation + 'deg)')
			   .css('-webkit-transform', 'rotate(' + rotation + 'deg)')
			   .css('-ms-transform', 'rotate(' + rotation + 'deg)')
			   .css('transform', 'rotate(' + rotation + 'deg)')
			   .attr('src', imageSrc);
			
			$("#starfield").append(img);
		};

		/* Twinkle, twinkle little star */
		$('.star').each(function(i, el) {
			var timer;
			var animate = function() {
				var opacity = Math.floor((Math.random() * 40) + 60) / 100; // 60-100% opacity
				var duration = Math.floor((Math.random() * 10) + 3) * 100; // change every 300-1000ms
				$(el).css('opacity', opacity)
				     .css('filter', 'alpha(opacity=' + (opacity * 100) + ')');
				timer = setTimeout(animate, duration);
			};
			animate();
		});
	}

	scatterStars('img/star-5point.png', 2, 18);
	scatterStars('img/star-5point.png', 2, 16);
	scatterStars('img/star-5point.png', 20, 12);
	scatterStars('img/star-9point.png', 15, 12);
	scatterStars('img/star-5point.png', 30, 5);
	scatterStars('img/star-5point.png', 20, 3);

});
