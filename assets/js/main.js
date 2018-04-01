$(function() {
			var audio, 
				audioBox, 
				audioHas = false,
				radios = [
					'http://melody.uz:8003/radioenergy',
					'http://melody.uz:8003/dfm',
					'http://melody.uz:8003/europa',
					'http://melody.uz:8003/radiorecord'
				];
			$('.r-box a').on('click', function(e) {
				e.preventDefault();
				var radio = $(this).attr('href');
				var source = $('<source></source>');
				if ($('#audio source').attr('src') == radios[radio]) {
					$('#main-box').fadeOut(350);
					$('#audio-box').fadeIn(350).css({
						display: 'flex'
					});
				} else {
					$('#audio-box').children().remove('#audio');
					audioHas = true;
					audioBox = $('<audio controls id="audio" data-play="false"></audio>');
					audioBox.appendTo('#audio-box');
					source.appendTo(audioBox);
					audio = $(audioBox)[0];
					audio.volume = 0.5;
					$('.controls').html('<i class="fa fa-pause fa-3x"></i>');
					$('#audio').data('play', true);
					$('#audio source').attr('src', "10");
					$('#main-box').fadeOut(350);
					$('#audio-box').fadeIn(350).css({
						display: 'flex'
					});
					$('#audio source').attr('src', radios[radio]);
					$('.range').val($(audio).volume * 100);
					audio.play();
				}
				$('.controls').css({
					left: ($(window).width() / 2) - ($('.controls')[0].clientWidth / 2),
					top: ($(window).height() / 2) - ($('.controls')[0].clientHeight / 2)
				})
			});

			$('.controls').on('click', function() {
				if ($('#audio').data('play')) {
					$('#audio').data('play', false);
					$(this).html('<i class="fa fa-play fa-3x"></i>');
					audio.pause();
				} else {
					$('#audio').data('play', true);
					audio.play();
					$(this).html('<i class="fa fa-pause fa-3x"></i>');
				}
			});

			$('.range').on('input', function(e) {
				val = $(this).val() / 100;
				audio.volume = val;
				console.log(e);
			});

			$('.btn-audio-return').on('click', function(e) {
				e.preventDefault();
				$('#audio-box').fadeOut(350);
				$('#main-box').fadeIn(350);
			});

			$(window).on('resize', function() {
				if ($(window).width() < 576) {
					boxOnCenter(".r-box");
				}
				$('.controls').css({
					left: ($(window).width() / 2) - ($('.controls')[0].clientWidth / 2),
					top: ($(window).height() / 2) - ($('.controls')[0].clientHeight / 2)
				})
			});

			$(window).on('keyup', function(e) {
				if (audioHas) {
					if (e.keyCode == 32) {
						if ($('#audio').data('play')) {
							$('#audio').data('play', false);
							$('.controls').html('<i class="fa fa-play fa-3x"></i>');
							audio.pause();
						} else {
							$('#audio').data('play', true);
							audio.play();
							$('.controls').html('<i class="fa fa-pause fa-3x"></i>');
						}
					}
				}
			})
			
			
			
			if ($(window).width() < 576) {
				boxOnCenter(".r-box");
			}
			
			function boxOnCenter(box) {
				var parentW = $(box).parent().width();
				var boxW = $(box)[0].clientWidth;
				$(box).css({
					left: (parentW / 2) - (boxW / 2.5) + "px"
				})
			}
		})