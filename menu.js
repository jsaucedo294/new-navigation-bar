$(document).ready(function($){
	//if you change this breakpoint in the style.css file (or _layout.scss if you use SASS), don't forget to update this value as well
	var MqL = 1200;

	//move nav element position according to window width
	moveNavigation();
	$(window).on('resize', function(){
		(!window.requestAnimationFrame) ? setTimeout(moveNavigation, 300) : window.requestAnimationFrame(moveNavigation);
	});

	//mobile - open lateral menu clicking on the menu icon
	$('.cd-nav-trigger').on('click', function(event){
		event.preventDefault();
		if( $('.cd-main-content').hasClass('nav-is-visible') ) {
			closeNav();
			$('.cd-overlay').removeClass('is-visible');
		} else {
			$('.cd-main-content').addClass("cd-main-content-z-index");
			$(this).addClass('nav-is-visible');
			$('.cd-primary-nav').addClass('nav-is-visible');
			$('.cd-main-header').addClass('nav-is-visible');
			$('.cd-main-content').addClass('nav-is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				$('body').addClass('overflow-hidden');
			});
			$('.cd-overlay').addClass('is-visible');
			$('.s-back-to-top').css({'right':'280px','left': 'auto'});
		}
	});


	//close lateral menu on mobile
	$('.cd-overlay').on('click', function(){
		if($('.cd-primary-nav').hasClass('nav-is-visible')) {
			closeNav();
			$('.cd-overlay').removeClass('is-visible');
		}
	});
	$('.nav-on-left .cd-overlay').on('swipeleft', function(){
		if($('.cd-primary-nav').hasClass('nav-is-visible')) {
			closeNav();
			$('.cd-overlay').removeClass('is-visible');
		}
	});
	$('.cd-overlay').on('click', function(){
		closeNav();
		$('.cd-overlay').removeClass('is-visible');
		toggleTransparentMenu();
	});


	//prevent default clicking on direct children of .cd-primary-nav
	$('.cd-primary-nav').children('.has-children').children('a').on('click', function(event){
		event.preventDefault();
	});

	if(window.location.href.indexOf("about") > -1) {
		$('.singlepage').children('li').children('a').on('click', function(event){
			closeNav();
			$('.cd-overlay').removeClass('is-visible');
			toggleTransparentMenu();
		});
    }

	//open submenu
	$('.has-children').children('a').on('click', function(event){
		if( !checkWindowWidth() ) event.preventDefault();
		var selected = $(this);
		if( selected.next('ul').hasClass('is-hidden') ) {
			//desktop version only
			selected.addClass('selected').next('ul').removeClass('is-hidden').end().parent('.has-children').parent('ul').addClass('moves-out');
			selected.addClass('moves-out').end();

			selected.parent('.has-children').siblings('.has-children').children('ul').addClass('is-hidden').end().children('a').removeClass('selected');
			$('.cd-overlay').addClass('is-visible');
			toggleTransparentMenu();
		} else {
			selected.removeClass('selected').next('ul').addClass('is-hidden').end().parent('.has-children').parent('ul').removeClass('moves-out');
			selected.removeClass('moves-out');
			$('.cd-overlay').removeClass('is-visible');
			toggleTransparentMenu();
		}
	});

	//submenu items - go back link
	$('.go-back').on('click', function(){
		$(this).parent('ul').addClass('is-hidden').parent('.has-children').parent('ul').removeClass('moves-out');
		$(this).parent('ul').parent('.has-children').children('a').removeClass('moves-out');
	});

	function toggleTransparentMenu() {

		var menu = $('.cd-main-header');

		if ( $("div.cd-overlay").hasClass("is-visible") || menu.hasClass("scrolled-in") ) {
			menu.removeClass('transparent-header');
		} else {

			if( menu.hasClass('transparent-menu-enabled') && !menu.hasClass('scrolled-in')) {
				var menuEnabled = $('.cd-main-header.transparent-menu-enabled');
				if( menuEnabled.hasClass('transparent-header') ) {
					// do nothing
				} else {
					// add class
					menu.addClass('transparent-header');
				}
			}

		}
	}

	function closeNav() {

		$('.cd-nav-trigger').removeClass('nav-is-visible');
		$('.cd-main-header').removeClass('nav-is-visible');
		$('.cd-primary-nav').removeClass('nav-is-visible');
		$('.has-children ul').addClass('is-hidden');
		$('.has-children a').removeClass('selected');
		$('.moves-out').removeClass('moves-out');
		$('.cd-main-content').removeClass('nav-is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			$('body').removeClass('overflow-hidden');
			$('.cd-main-content').removeClass('cd-main-content-z-index');
		});
		$('.s-back-to-top').removeAttr("style");
	}

	function checkWindowWidth() {
		//check window width (scrollbar included)
		var e = window,
            a = 'inner';
        if (!('innerWidth' in window )) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        if ( e[ a+'Width' ] >= MqL ) {
			return true;
		} else {
			return false;
		}
	}

	function moveNavigation() {
		var navigation = $('.cd-nav');
  		var desktop = checkWindowWidth();
        if ( desktop ) {
			navigation.detach();
			navigation.insertBefore('.cd-header-buttons');
		} else {
			navigation.detach();
			navigation.insertAfter('.cd-main-content');
		}
	}

	function getDivHeight(divClass) {
	  var divHeight = "";
	  if (divClass != "") {
	  	 divHeight = $(divClass).height();
	  } else {
	  	 divHeight = null;
	  }
	  return divHeight;
	}

	$(window).scroll(function() {
		var menu = $('.cd-main-header');
		var height = getDivHeight('.menu-switch');
		if (height == null) {
	    	height = $('.page-banner').height();
		}
		var scrollTop = $(window).scrollTop();

		if (scrollTop >= height - 80) {
			menu.addClass('scrolled-in');
		} else {
			menu.removeClass('scrolled-in');
		}
		toggleTransparentMenu();
	});

});
