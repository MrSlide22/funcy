'use strict';

(function() {

    $(document).on('load', function() {
        document.addEventListener('offline', function() {

            updateOnlineStatus();
        });

        document.addEventListener('online', function() {
            updateOnlineStatus();
        });

    });

    updateOnlineStatus();

    function updateOnlineStatus() {
        console.log('updating');
        var condition = navigator.onLine ? 'ONLINE' : 'OFFLINE';
        if (condition === 'OFFLINE') {

            $('.anuncio-article').unbind('click');
            $('body').addClass('offline');
        } else {
            $('body').removeClass('offline');
        }
    }
})();