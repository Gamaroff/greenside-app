/*
 Usage:

 // latitude and longitude are observables

 <div id="SiteMap"  style="width: 420px; height: 240px"  data-bind="GoogleMap: {latitude: latitude, longitude:longitude, zoom: 9, draggableMarker: true}">
 </div>
 */

define(['lib/knockout'], function (ko) {

    ko.bindingHandlers.GoogleMap = {
        init:function (element, valueAccessor, allBindingsAccessor, viewModel) {

            var options = ko.utils.unwrapObservable(valueAccessor());
            var zoom = options.zoom ? options.zoom : 9;
            var draggable = options.draggableMarker ? options.draggableMarker : false;
            var latitude = options.latitude;
            var longitude = options.longitude;
            viewModel.map = createMap(element, latitude(), longitude(), zoom);

            var pinColor = "FE7569";
            var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
                new google.maps.Size(21, 34),
                new google.maps.Point(0, 0),
                new google.maps.Point(10, 34));
            var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
                new google.maps.Size(40, 37),
                new google.maps.Point(0, 0),
                new google.maps.Point(12, 35));

            var position = new google.maps.LatLng(latitude, longitude);

            var marker = new google.maps.Marker({
                map:viewModel.map,
                position:position,
                icon:pinImage,
                shadow:pinShadow,
                title:name,
                draggable:draggable
            });

            setMarkerEvents(marker, options.latitude, options.longitude);

            viewModel.locationMarker = marker;
        },
        update:function (element, valueAccessor, allBindingsAccessor, viewModel) {

            var options = ko.utils.unwrapObservable(valueAccessor());
            var latlng = new google.maps.LatLng(options.latitude(), options.longitude());
            viewModel.locationMarker.setPosition(latlng);
            viewModel.map.setCenter(latlng);
        }
    };

    function createMap(element, latitude, longitude, zoom) {
        var myOptions = {
            zoom:zoom,
            center:new google.maps.LatLng(latitude, longitude),
            mapTypeId:google.maps.MapTypeId.ROADMAP
        };
        return new google.maps.Map(element, myOptions);
    }

    function setMarkerEvents(marker, latitude, longitude) {
        google.maps.event.addListener(marker, 'dragend', function (evt) {
            var latlng = new google.maps.LatLng(evt.latLng.lat(), evt.latLng.lng());
            latitude(evt.latLng.lat());
            longitude(evt.latLng.lng());
        });

        google.maps.event.addListener(marker, 'dragstart', function (evt) {

        });
    }
});