(function($){
	"use strict";


	$('[data-bg-image]').each(function(){
		$(this).css({ 'background-image': 'url('+$(this).data('bg-image')+')' });
	});

	$('[data-bg-color]').each(function(){
		$(this).css({ 'background-color': $(this).data('bg-color') });
	});

	$('[data-width]').each(function(){
		$(this).css({ 'width': $(this).data('width') });
	});

	$('[data-height]').each(function(){
		$(this).css({ 'height': $(this).data('height') });
	});


	// mobile menu
	$('#mobile-menu').on('click', function(){
		if( $(window).width()<992 ){
			$('nav.main-nav').addClass('show-mobile-menu');
		}
	});
	$('#close-menu').on('click', function(){
		$('nav.main-nav.show-mobile-menu').removeClass('show-mobile-menu');
		return false;
	});


	// <<< one page menu
	$('ul.one-page-menu a').on('click', function(){
		var $this = $(this);
		var href = $this.attr('href') + '';
		href = href.replace('#', '');

		var $row_c = $('div[data-onepage-slug="'+href+'"]');
		if( $row_c.length ){
			var otop = $row_c.offset().top;
			otop = otop - $('header').height();
			if(otop<0){ otop = 0; }
			$("html, body").animate({ scrollTop: otop }, "slow");
		}
		return false;
	});
	// one page menu >>>



	// one page sticky menu
	if( $('ul.one-page-menu').length ){
		$('ul.one-page-menu').find('li').eq(0).addClass('current-menu-item');

		$(window).scroll(function(e){
			var st = $(this).scrollTop();
			if( st > 400 ){
				$('header#header').addClass('sticky-menu');
			}
			else{
				$('header#header').removeClass('sticky-menu');
			}

			// current-menu-item
			$('div[data-onepage-slug]').each(function(){
				var _div = $(this);
				var _slug = _div.data('onepage-slug');
				var _start = _div.offset().top-150;
				var _end = _start + _div.height();

				if(  st>= _start && st<=_end ){
					$('ul.one-page-menu').find('li.current-menu-item').find('a').blur();
					$('ul.one-page-menu').find('li.current-menu-item').removeClass('current-menu-item');
					$('ul.one-page-menu').find('a[href="#'+_slug+'"]').parent().addClass('current-menu-item');
				}
			});
		});
	}





	// post format improvements
	// video
	$('.blog-item.blog-single.format-video .entry-excerpt video, .blog-item.blog-single.format-video .entry-excerpt iframe').each(function(index){
		if(index==0){
			$(this).remove();
		}
	});
	// audio
	$('.blog-item.blog-single.format-audio .entry-excerpt audio, .blog-item.blog-single.format-audio .entry-excerpt iframe').each(function(index){
		if(index==0){
			$(this).remove();
		}
	});
	// quote
	$('.blog-item.blog-single.format-quote .entry-excerpt blockquote').each(function(index){
		if(index==0){
			$(this).remove();
		}
	});
	// gallery
	$('body.single-format-gallery .blog-item .entry-excerpt .gallery').each(function(index){
		if(index==0){
			$(this).remove();
		}
		else{
			var $this = $(this);
			var _gallery = $('<div class="gallery-masonry row"><div class="gallery-viewport"></div></div>');
			$this.find('.gallery-item').each(function(){
				var _item = $(this);
				_gallery.find('.gallery-viewport').append( $('<div class="col-sm-4 gitem"></div>').append(_item.find('a')) );
			});
			$this.replaceWith(_gallery);
		}
	});



	$(document).ready(function(){


		// Gallery slideshow
		$('.gallery-slideshow').each(function(){
			var _gallery = $(this);

			_gallery.find('.gallery-container').swiper({
			    nextButton: _gallery.find('.swiper-button-next'),
			    prevButton: _gallery.find('.swiper-button-prev')
			});
		});


		// Video Element
		$('.video-element').each(function(){
			var _video = $(this);
			_video.magnificPopup({
				delegate: 'a',
				type: 'iframe'
			});
		});

		$('a.video-play').each(function(){
			var _video = $(this);
			_video.magnificPopup({
				type: 'iframe'
			});
		});

		
		$('.image-link').each(function(){
			var $this = $(this);
			$this.magnificPopup({
				type:'image'
			});
		});



		setTimeout(function(){


			// carousel travel
			$('.carousel-travel').each(function(){
				var $this = $(this);
				var _col = $this.data('columns');
				var _space = $this.data('space');
				$this.find('.swiper-container').swiper({
					slidesPerView: _col,
					spaceBetween: _space,
					nextButton: $this.find('.swiper-button-next'),
				    prevButton: $this.find('.swiper-button-prev'),
				    breakpoints: {
				    	996: {
				    		slidesPerView: 3
				    	},
				    	767: {
				    		slidesPerView: 2
				    	},
				    	500: {
				    		slidesPerView: 1
				    	}
				    }
				});

				$this.addClass('loaded');
			});



			// fullwidth post slider
			$('.carousel-testimonials').each(function(){
				var $this = $(this);
				$this.find('.swiper-container').swiper({
					nextButton: $this.find('.swiper-button-next'),
				    prevButton: $this.find('.swiper-button-prev'),
				    pagination: $this.find('.swiper-pagination'),
				    paginationClickable: true,
				    slidesPerView: 1
				});
			});



			$('.carousel-headings').each(function(){
				var $this = $(this);
				$this.find('.swiper-container').swiper({
					nextButton: $this.find('.swiper-button-next'),
				    prevButton: $this.find('.swiper-button-prev'),
				    pagination: $this.find('.swiper-pagination'),
				    paginationClickable: true,
				    slidesPerView: 1
				});
			});
			


			
		}, 1000);

	});


	$(window).load(function(){

		
		$('.travel-grid').each(function(){
			var $this = $(this);
			var _col_class = $this.data('col-class');

			$this.find('.grid-container').isotope({
				itemSelector: '.masonry-item',
				masonry: {
                    columnWidth: _col_class
                }
			});

			$this.find('.filter a').on('click', function(){
				$this.find('.grid-container').isotope({ filter: $(this).data('filter') });
				$this.find('.filter a.active').removeClass('active');
				$(this).addClass('active');
			});
		});



		$('.gallery-masonry').each(function(){
			var $this = $(this);

			$this.find('.gallery-viewport').isotope({
				itemSelector: '.gitem',
				masonry: {
                    columnWidth: 1
                }
			});

			$this.find('.gallery-viewport').magnificPopup({
				delegate: '.gitem a',
				type: 'image',
				gallery:{
					enabled:true
				}
			});

		});


	});


})(jQuery);