/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 function initMap() {
                var myLatLng = {lat: 10.78, lng: 106.65};
                map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 12,
                    center: myLatLng
                });

                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (pos) {
                        locateOnMap(pos);
                    }, function (errMsg) {
                        console.log(JSON.stringify(errMsg));
                        navigator.geolocation.getCurrentPosition(function (pos) {
                            locateOnMap(pos);
                        }, function (errMsg) {
                            console.log(JSON.stringify(errMsg));
                        }, {
                            enableHighAccuracy: true,
                            timeout: 6 * 1000 * 2,
                            maximumAge: 1000 * 60 * 10
                        });
                    }, {
                        enableHighAccuracy: false,
                        timeout: 6 * 1000,
                        maximumAge: 1000 * 60 * 10
                    });
                } else {
                    alert("Do not support Geolocation");
                }
            }

            function locateOnMap(pos) {
                $("#lonlat").val(pos.coords.latitude + ";" + pos.coords.longitude);
                var lonlat = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
                var marker = new google.maps.Marker({
                    position: lonlat,
                    map: map,
                    draggable: true,
                    animation: google.maps.Animation.DROP,
                    title: "Di chuyển để xác định đúng vị trí"
                });
                map.setCenter(lonlat);
                map.setZoom(15);
                google.maps.event.addListener(marker, "dragend", function (event) {
                    $("#lonlat").val(event.latLng.lat() + ';' + event.latLng.lng());
                });
            }

            $(document).ready(function () {
                initMap();
                
                 google.maps.event.addListener(map, "click", function (event) {
                 var latitude = event.latLng.lat();
                 var longitude = event.latLng.lng();
                 $("#lonlat").val(latitude + ';' + longitude);
                 console.log( latitude + ';' + longitude );
                 });
                 
            });

