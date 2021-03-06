/*
	Brett Michael Orr
    Based on the original snow-core by Jatin Soni

	File:           js/carbon-core.js
	Version:        Snow 1.4
	Description:    JavaScript helpers for SnowFlat theme

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
	GNU General Public License for more details.
*/
$(document).ready(function () {

	/**
	 * Account menu box toggle script
	 */
	$('#qam-account-toggle').click(function (e) {
		e.stopPropagation();
		$(this).toggleClass('account-active');
		$('.qam-account-items').slideToggle(100);
	});

	$(document).click(function () {
		$('#qam-account-toggle.account-active').removeClass('account-active');
		$('.qam-account-items:visible').slideUp(100);
	});

	$('.qam-account-items').click(function (event) {
		event.stopPropagation();
	});

	/**
	 * Main navigation toggle script
	 */
	$('.qam-menu-toggle').click(function () {
		$('.qa-nav-main').slideToggle(100);
		$(this).toggleClass('current');
	});

	/*
	 * Sidepannel Toggle Click Function
	 */
	$('#qam-sidepanel-toggle').click(function () {
		$('#qam-sidepanel-mobile').toggleClass('open');
		$(this).toggleClass('active');
		$(this).find('i').toggleClass('icon-right-open-big');
	});

	/**
	 * Toggle search box for small screen
	 */
	$('#qam-search-mobile').click(function () {
		$(this).toggleClass('active');
		$('#the-top-search').slideToggle('fast');
	});


	/*
	 * Add wrapper to users point on users list
	 */
	$('.qa-top-users-score').wrapInner('<div class="qam-user-score-icon"></div>');

	/*
	 * add wrapper to the message sent note 'td'
	 */
	$('.qa-part-form-message .qa-form-tall-ok').wrapInner('<div class="qam-pm-message"></div>');

	// fix the visible issue for main nav, top search-box
	$(window).resize(function () {
		if (window.matchMedia('(min-width: 980px)').matches) {
			$(".qam-search.the-top .qa-search").hide();
			$(".qa-nav-main").show('fast', function() { $(this).css('display','inline-block'); });
		} else {
			$(".qam-search.the-top .qa-search").show();
			$(".qa-nav-main").hide();
			$('.qam-menu-toggle').removeClass('current');
		}
	});
    
    $("#delete-btn").click(function(){
		vex.dialog.confirm({
		  message: 'Are you sure you want to delete this group? This action cannot be reversed?',
		  callback: function(value) {
			  if(value == true){
				window.location.href = "?delete";
			  }
		  }
		});
	});

    $("#leave-group-btn").click(function(){
		vex.dialog.buttons.YES.text = 'Yes'
		vex.dialog.buttons.NO.text = 'No'
		vex.dialog.confirm({
		  message: 'Are you sure you want to leave this group?',
		  callback: function(value) {
			  if(value == true){
				window.location.href = "?leave_group";
			  }
		  }
		});
	});

    $(".removeMemberBtn").click(function(){
        me = $(this);
        vex.dialog.confirm({
		  message: 'Remove this user?',
		  callback: function(value) {
			  if(value == true){
				window.location.href = "?remove=" + me.data("userid");
			  }
		  }
		});
	});

});
