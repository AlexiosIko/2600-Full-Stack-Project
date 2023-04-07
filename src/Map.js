import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import axios from 'axios';

const Map = props => {
    const crosshairRef = useRef(null);
    
    // Initialize map
    useEffect(() => {
        const loader = new Loader({
            apiKey: 'AIzaSyAgvKPGFPixih0fE9ZM75DBIbrkHt4LYQk',
            version: 'weekly',
            libraries: ['places'],
        });

        loader.load().then(() =>
        {
            const map = new google.maps.Map(props.mapRef.current, {
                center: { lat: 49.25, lng: -123 },
                zoom: 8,
            });
      
            // Store the current reference to the google map
            props.mapRef.current = map;
            // This creates a search box textfield for locations
            const searchBox = new google.maps.places.SearchBox(props.searchInputRef.current);
            // When the map bounds changes, update the bounds
            map.addListener('bounds_changed', () => {
                // Reset crosshair
                crosshairRef.current.style.top  = 0;
                crosshairRef.current.style.left = 0;
                
                searchBox.setBounds(map.getBounds());
            });
            // When click the map, update setMarker state
            map.addListener('click', event => {
                document.getElementById("lat-text").value = event.latLng.lat();
                document.getElementById("lng-text").value = event.latLng.lng();

            });

            searchBox.addListener('places_changed', () => {
                const places = searchBox.getPlaces();

                if (places.length === 0) {
    
                }

                const bounds = new google.maps.LatLngBounds();

                places.forEach((place) => {
                    if (!place.geometry || !place.geometry.location) {
                        console.log('Returned place contains no geometry');
                        return;
                    }

                    const marker = new google.maps.Marker({
                        map,
                        title: place.username,
                        position: place.geometry.location,
                    });

                    if (place.geometry.viewport) {
                        bounds.union(place.geometry.viewport);
                    } else {
                        bounds.extend(place.geometry.location);
                    }
                });
                map.fitBounds(bounds);
            });

            // Get exising markers from mongooseDb and add to map
            console.log()
            axios.get('/markers')
                .then(response => {
                    response.data.forEach(marker => {
                        props.initializeMarkerToMap(marker);
                    })
                })
                .catch(error => {
                    console.log(error);
                    console.log("error getting markers");
                });
                // Set crosshair
                crosshairRef.current = document.getElementById("crosshair");
                document.getElementById("map").appendChild(crosshairRef.current);
                crosshairRef.current.style.position = 'absolute';
                crosshairRef.current.style.top  = 0;
                crosshairRef.current.style.left = 0;
            });
    }, []);

    return (
        <div id="map">
            <div ref={props.mapRef} style={{ height: '100%', width: '100%' }} />
            <img id="crosshair" src="./resources/crosshair.png" width="20" height="20"></img>
        </div>
    );
}

export default Map;