define(function () {

    function MapUtils() {
        'use strict';

        var self = this;

//        self.Create = function (map) {
//
//            var gmap = new google.maps.Map(document.getElementById(map), {
//                zoom:5,
//                center:new google.maps.LatLng(0, 0),
//                mapTypeId:google.maps.MapTypeId.ROADMAP
//            });
//
//            return gmap;
//        };

        self.Create = function (mapElement, latitude, longitude) {

            var self = this;
            var markersArray = [];

            var map = new GMaps({
                div:mapElement,
                lat:parseFloat(latitude),
                lng:parseFloat(longitude)
            });

            var editableMarker;

            self.updateLocation = function () {
                map.fitBounds(markersArray);
            };

            self.setCenter = function (lat, lng, callback) {
                map.setCenter(lat, lng, callback);
            };

            self.setZoom = function (value) {
                map.setZoom(value);
            };

            self.addMarker = function (latitude, longitude, title, url) {

                var marker = {
                    lat:parseFloat(latitude),
                    lng:parseFloat(longitude),
                    title:title,
                    click:function (e) {
                        location.href = url;
                    }
                };

                map.addMarker(marker);

                var newMarker = new google.maps.LatLng(parseFloat(latitude), parseFloat(longitude));
                markersArray.push(newMarker);
            };

            self.addEditableMarker = function (latitude, longitude, title, url) {

                var pinColor = "10aa14";
                var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
                    new google.maps.Size(21, 34),
                    new google.maps.Point(0, 0),
                    new google.maps.Point(10, 34));
                var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
                    new google.maps.Size(40, 37),
                    new google.maps.Point(0, 0),
                    new google.maps.Point(12, 35));

                editableMarker = new google.maps.Marker({
                    draggable:true,
                    icon:pinImage,
                    shadow:pinShadow,
                    lat:parseFloat(latitude()),
                    lng:parseFloat(longitude()),
                    dragend:function () {
                        var pos = this.getPosition();
                        latitude(pos.lat());
                        longitude(pos.lng());
                    }
                });

                map.addMarker(editableMarker);
            };

            self.removeEditableMarker = function () {

                var indexOfMarker;
                for (var i = 0, marker; marker = map.markers[i]; i++) {
                    if (marker.draggable == true)
                    {
                        marker.setMap(null);
                        indexOfMarker = i;
                    }
                }

                if(indexOfMarker)
                    map.markers.splice(indexOfMarker, 1);
            };

            self.updateEditableMarker = function (latitude, longitude) {

                var pos = new google.maps.LatLng(latitude, longitude);
                for (var i = 0, marker; marker = map.markers[i]; i++) {
                    if (marker.draggable == true)
                        marker.setPosition(pos);
                }
            };
        };

        self.CreateWithMarker = function (mapElement, draggable, longitude, latitude, title, content) {

            var pinColor = "FE7569";
            var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
                new google.maps.Size(21, 34),
                new google.maps.Point(0, 0),
                new google.maps.Point(10, 34));
            var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
                new google.maps.Size(40, 37),
                new google.maps.Point(0, 0),
                new google.maps.Point(12, 35));

            var marker = {
                draggable:draggable,
                icon:pinImage,
                shadow:pinShadow,
                lat:parseFloat(latitude()),
                lng:parseFloat(longitude()),
                title: title,
                dragend:function () {
                    var pos = this.getPosition();
                    latitude(pos.lat());
                    longitude(pos.lng());
                }
            };

            var map = new GMaps({
                div:mapElement,
                lat:parseFloat(latitude()),
                lng:parseFloat(longitude())
            });
            map.addMarker(marker);

            return map;
        };

        self.Point = function (map, name, lat, lng) {
            this.name = name;
            this.lat = ko.observable(lat);
            this.lng = ko.observable(lng);

            var marker = new google.maps.Marker({
                position:new google.maps.LatLng(lat, lng),
                title:name,
                map:map,
                draggable:true
            });

            // if you need the position while dragging
            google.maps.event.addListener(marker, 'drag', function () {
                var pos = marker.getPosition();
                this.lat(pos.lat());
                this.lng(pos.lng());
            }.bind(this));

            // if you just need to update it when the user is done dragging
            google.maps.event.addListener(marker, 'dragend', function () {
                var pos = marker.getPosition();
                this.lat(pos.lat());
                this.lng(pos.lng());
            }.bind(this));
        };

    }

    return new MapUtils();
});