(function() {
    function initMap() {
        // El navegador soporta geolocalización
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                successHandler, // manejador de respuesta correcta
                function() {}, // manejado de errores 
                {} // opciones
            );
        }
    }

    function successHandler(data) {
        var coords = data.coords;

        var map;

        var position = { lat: coords.latitude, lng: coords.longitude };

        var styledMapType = new google.maps.StyledMapType(getBWMapStyle(), { name: 'Styled Map' });

        map = new google.maps.Map(document.getElementById('map'), {
            center: position,
            zoom: 15,
            disableDefaultUI: true,
            mapTypeControlOptions: {
                mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                    'styled_map'
                ]
            }
        });

        map.mapTypes.set('styled_map', styledMapType);
        map.setMapTypeId('styled_map');

        var marker = new google.maps.Marker({
            map: map,
            position: position
        });
    }

    function getBWMapStyle() {
        return [{
                'featureType': 'administrative',
                'elementType': 'all',
                'stylers': [{
                    'saturation': '-100'
                }]
            },
            {
                'featureType': 'administrative.province',
                'elementType': 'all',
                'stylers': [{
                    'visibility': 'off'
                }]
            },
            {
                'featureType': 'landscape',
                'elementType': 'all',
                'stylers': [{
                        'saturation': -100
                    },
                    {
                        'lightness': 65
                    },
                    {
                        'visibility': 'on'
                    }
                ]
            },
            {
                'featureType': 'poi',
                'elementType': 'all',
                'stylers': [{
                        'saturation': -100
                    },
                    {
                        'lightness': '50'
                    },
                    {
                        'visibility': 'simplified'
                    }
                ]
            },
            {
                'featureType': 'road',
                'elementType': 'all',
                'stylers': [{
                    'saturation': '-100'
                }]
            },
            {
                'featureType': 'road.highway',
                'elementType': 'all',
                'stylers': [{
                    'visibility': 'simplified'
                }]
            },
            {
                'featureType': 'road.arterial',
                'elementType': 'all',
                'stylers': [{
                    'lightness': '30'
                }]
            },
            {
                'featureType': 'road.local',
                'elementType': 'all',
                'stylers': [{
                    'lightness': '40'
                }]
            },
            {
                'featureType': 'transit',
                'elementType': 'all',
                'stylers': [{
                        'saturation': -100
                    },
                    {
                        'visibility': 'simplified'
                    }
                ]
            },
            {
                'featureType': 'water',
                'elementType': 'geometry',
                'stylers': [{
                        'hue': '#ffff00'
                    },
                    {
                        'lightness': -25
                    },
                    {
                        'saturation': -97
                    }
                ]
            },
            {
                'featureType': 'water',
                'elementType': 'labels',
                'stylers': [{
                        'lightness': -25
                    },
                    {
                        'saturation': -100
                    }
                ]
            }
        ];
    }
})();