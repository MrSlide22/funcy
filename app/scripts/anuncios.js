'use strict';

(function() {

    function loadAnuncios() {
        return window.service.anuncio.getAnuncios()
            .then(function(anuncios) {
                return anuncios;
            });
    }

    function renderHTML(anuncios) {
        return fetch('../templates/anuncio.html')
            .then(function(response) {
                return response.text();
            }).then(function(html) {

                var anunciosRendered = anuncios.map(function(anuncio, index) {
                    return renderAnuncio(anuncio, html, index);
                });

                return anunciosRendered;
            });
    }

    function renderAnuncio(anuncio, html, index) {

        var anuncioHTML = document.createElement('div');

        if (index % 3 === 0) {
            $(anuncioHTML).addClass('col-sm-12');
        } else {
            $(anuncioHTML).addClass('col-sm-6');
        }
        $(anuncioHTML).append(html);

        $(anuncioHTML).find('article').attr('id', 'an-' + anuncio.id);

        var images = '<picture>';
        images += '<source srcset="' + anuncio.images.xs[0] + '" media="(max-width: 768px)">';
        images += '<source srcset="' + anuncio.images.md[0] + '" media="(min-width: 769px) and (max-width: 1200px)">';
        images += '<img class="img-responsive" src="' + anuncio.images.lg[0] + '">';
        images += '</picture>';
        $(anuncioHTML).find('.anuncio-image').html(images);

        $(anuncioHTML).find('.anuncio-title').html(anuncio.name);
        $(anuncioHTML).find('.anuncio-price').html('<strong>' + anuncio.price + '</strong>' + anuncio.currency);

        return anuncioHTML;
    }

    function appendHTML(html) {
        $('#anuncios-list').html(html);
    }

    loadAnuncios()
        .then(renderHTML)
        .then(appendHTML);
})();