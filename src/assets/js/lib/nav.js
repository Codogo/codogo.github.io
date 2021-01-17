$(function( $ ) {
    // --------------------- Site -------------------- //
    $('.navbar-panel-button').click(function() {
        if ($('.navbar-panel.site').hasClass('open')) {
            $('.navbar-panel-button').removeClass('open');
            $('.navbar-panel.site').removeClass('open');
        } else {
            $('.navbar-panel-button').addClass('open');
            $('.navbar-panel.site').addClass('open');
        }
    });

    // --------------------- Global -------------------- //
    $('.navbar-header .dropdown-arrow').click(function() {
        if ($('.navbar-panel.global').hasClass('open')) {
            $('.navbar-panel.global').removeClass('open');
        } else {
            $('.navbar-panel.global').addClass('open');
        }
    });

    // --------------------- Opening sub li in menu -------------------- //
    $('.navbar-panel .dropdown-arrow').click(function() {
        if ($(this).hasClass('open')) {
            $(this).removeClass('open');
            $(this).siblings('.dropdown-content').slideUp();
        } else {
            $(this).addClass('open');
            $(this).siblings('.dropdown-content').slideDown();
        }
    });
});