'use strict';

(function() {

    var anuncio = {
        getAnuncio: getAnuncio,
        getAnuncios: getAnuncios,
        getRelatedAnuncios: getRelatedAnuncios
    };

    function getAnuncio(id) {
        return fetch('../mocks/list.json')
            .then(function(response) {
                return response.json();
            }).then(function(anuncios) {

                return findAnuncio(anuncios, id);
            });
    }

    function findAnuncio(anuncios, id) {
        for (var i = 0; i < anuncios.length; i++) {
            // look for the entry with a matching `code` value
            if (parseInt(anuncios[i].id) === parseInt(id)) {
                return anuncios[i];
            }
        }
    }

    function getAnuncios() {

        return fetch('../mocks/list.json')
            .then(function(response) {
                return response.json();
            }).then(function(data) {
                return data;
            });
    }

    function getRelatedAnuncios() {

        return fetch('../mocks/list.json')
            .then(function(response) {
                return response.json();
            }).then(function(data) {

                var ret = [];
                for (var i = 0; i < 4; i++) {

                    var anuncio = findAnuncio(data, Math.floor((Math.random() * 8) + 1));
                    ret.push(anuncio);
                }
                return ret;
            });
    }

    window.service = window.service || {};
    window.service.anuncio = anuncio;

})();