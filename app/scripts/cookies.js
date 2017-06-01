'use strict';

(function() {

    checkCookies();

    function checkCookies() {

        var cookies = localStorage.getItem('cookies');

        if (!cookies) {
            showCookies();
        }
    }

    function showCookies() {
        $('#cookies-bar').addClass('show');
    }

    function addCookie() {

        localStorage.setItem('cookies', '1');
    }

    $('#cookies-bar').on('click', function() {
        addCookie();
        $('#cookies-bar').removeClass('show');
    });
})();