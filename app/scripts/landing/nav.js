(function() {
    $('#navBtn').on('click', function() {

        if ($('.nav-items').hasClass('menu-open')) {
            $('.nav-items').removeClass('menu-open');

        } else {
            $('.nav-items').addClass('menu-open');
            $('.nav-items').addClass('menu-open');
        }
    });


    $('#back-menu').on('click', function() {
        $('.nav-items').removeClass('menu-open');
    });
})();