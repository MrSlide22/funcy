'use strict';
(function() {

    $('#articles').on('click', '.anuncio-article', function() {

        console.log(navigator.onLine);
        if (navigator.onLine) {

            var id = $(this).attr('id').split('-')[1];

            window.service.anuncio.getAnuncio(id)
                .then(function(anuncio) {

                    return new Promise(function(res, rej) {

                        var modal = $('#myModal');

                        //main image
                        var mainImg = '<picture>';
                        mainImg += '<source srcset="' +
                            anuncio.images.xs[0] +
                            '" media="(max-width: 768px)">';
                        mainImg += '<source srcset="' +
                            anuncio.images.md[0] +
                            '"  media="(min-width: 769px) and (max-width: 1200px)">';
                        mainImg += '<img class="img-responsive" src="' + anuncio.images.lg[0] + '"';
                        mainImg += '</picture>';
                        modal.find('#modal-main-image').html(mainImg);

                        // images
                        var images = $('#modal-images');
                        images.html('');
                        for (var i = 0; i < anuncio.images.xs.length; i++) {

                            var img = '<picture>';
                            img += '<source srcset="' +
                                anuncio.images.xs[i] +
                                '" media="(max-width: 768px)">';
                            img += '<source srcset="' +
                                anuncio.images.md[i] +
                                '"  media="(min-width: 769px) and (max-width: 1200px)">';
                            img += '<img class="img-responsive" src="' + anuncio.images.lg[i] + '"';
                            img += '</picture>';
                            images.append(img);
                        }

                        // description
                        modal.find('#modal-description').html(anuncio.description);

                        // name
                        modal.find('#modal-name').html(anuncio.name);

                        // price
                        modal.find('#modal-price').html(anuncio.price);

                        // currency
                        modal.find('#modal-currency').html(anuncio.currency);

                        // likes
                        modal.find('#modal-likes').html(anuncio.likes);

                        modal.modal('show');
                        res();
                    });
                });

            window.service.anuncio.getRelatedAnuncios()
                .then(function(anuncios) {

                    var relates = '';
                    for (var i = 0; i < anuncios.length; i++) {

                        relates += '<div class="col-sm-3">';
                        relates += '<div class="panel">';
                        relates += '<div class="panel-heading">';
                        relates += '<picture>';
                        relates += '<source srcset="' +
                            anuncios[i].images.xs[0] +
                            '" media="(max-width: 768px)">';
                        relates += '<source srcset="' +
                            anuncios[i].images.md[0] +
                            '" media="(min-width: 769px) and (max-width: 1200px)">';
                        relates += '<img class="img-responsive" src="' + anuncios[i].images.lg[0] + '">';
                        relates += '</picture>';
                        relates += '</div>';
                        relates += '<div class="panel-body">';
                        relates += '<h4 class="truncate">' + anuncios[i].name + '</h4>';
                        relates += '<div class="footer-price">';
                        relates += '<span class="label label-primary pull-right anuncio-price">$' +
                            anuncios[i].price +
                            '</span>';
                        relates += '</div>';
                        relates += '</div>';
                        relates += '</div>';
                        relates += '</div>';
                    }

                    $('#related').html(relates);
                });
        }
    });
})();