import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import axios from 'axios';

const Map = props => {
    // Initialize map
    useEffect(() => {
        const loader = new Loader({
            apiKey: 'AIzaSyAgvKPGFPixih0fE9ZM75DBIbrkHt4LYQk',
            version: 'weekly',
            libraries: ['places'],
        });

    
        loader.load().then(() =>                                                                // COPIED CODE
        {                                                                                       // COPIED CODE
            const map = new google.maps.Map(props.mapRef.current, {                             // COPIED CODE
                center: { lat: 49.25, lng: -123 },                                              // COPIED CODE
                zoom: 8,                                                                        // COPIED CODE
            });                                                                                 // COPIED CODE
                                                                                                // COPIED CODE
            // Store the current reference to the google map                                    // COPIED CODE
            props.mapRef.current = map;                                                         // COPIED CODE
            // This creates a search box textfield for locations                                // COPIED CODE
            const searchBox = new google.maps.places.SearchBox(props.searchInputRef.current);   // COPIED CODE
            // When the map bounds changes, update the bounds                                   // COPIED CODE
            map.addListener('bounds_changed', () => {                                           // COPIED CODE
                searchBox.setBounds(map.getBounds());                                           // COPIED CODE
            });                                                                                 // COPIED CODE
            // When click the map, update setMarker state                                                     
            map.addListener('click', event => {                                                                                     
                document.getElementById("lat-text").value = event.latLng.lat();                                                                                     
                document.getElementById("lng-text").value = event.latLng.lng();                                                                                     
                                                                                           
            });                                                                                     
                                                                                                // COPIED CODE
            searchBox.addListener('places_changed', () => {                                     // COPIED CODE
                const places = searchBox.getPlaces();                                           // COPIED CODE
                                                                                                // COPIED CODE
                if (places.length === 0) {                                                      // COPIED CODE
                                                                                                // COPIED CODE
                }                                                                               // COPIED CODE
                                                                                                // COPIED CODE
                const bounds = new google.maps.LatLngBounds();                                  // COPIED CODE
                                                                                                // COPIED CODE
                places.forEach((place) => {                                                     // COPIED CODE
                    if (!place.geometry || !place.geometry.location) {                          // COPIED CODE
                        console.log('Returned place contains no geometry');                     // COPIED CODE
                        return;                                                                 // COPIED CODE
                    }                                                                           // COPIED CODE

                    const marker = new google.maps.Marker({                                     // COPIED CODE
                        map,                                                                    // COPIED CODE
                        title: place.username,                                                  // COPIED CODE
                        position: place.geometry.location,                                      // COPIED CODE
                    });                                                                         // COPIED CODE

                    if (place.geometry.viewport) {                                              // COPIED CODE
                        bounds.union(place.geometry.viewport);                                  // COPIED CODE
                    } else {                                                                    // COPIED CODE
                        bounds.extend(place.geometry.location);                                 // COPIED CODE
                    }                                                                           // COPIED CODE
                });                                                                             // COPIED CODE
                map.fitBounds(bounds);                                                          // COPIED CODE
            });                                                                                 // COPIED CODE

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
            });
    }, []);

    return (
        <div id="map">
            <div ref={props.mapRef} style={{ height: '100%', width: '100%' }} />
        </div>
    );
}

export default Map;