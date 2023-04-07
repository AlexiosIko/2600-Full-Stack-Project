import React, { useEffect, useRef, useState } from 'react';
import Map from './Map.js';
import Marker from './Marker.js';
import axios from 'axios';
import TempMarker from './TempMarker.js';
import AllMarkers from './AllMarkers.js';
import HelpedMarkers from './HelpedMarkers.js';

function App() {
    const searchInputRef = useRef(null);
    const mapRef = useRef();
    const [markerList, setMarkerList] = useState([]);
    const [helperUseEffectSwitch, setHelperUseEffectSwitch] = useState(false);

    const handleClickMarker = (marker) => {
        axios.get('/marker', { params: { username: marker.username, lat: marker.lat, lng: marker.lng } })
            .then(response => {
                console.log(response);
                // Set temporary parameters
                document.getElementById('temp-username').innerHTML = response.data[0].username;
                document.getElementById('temp-description').innerHTML = response.data[0].description;
                document.getElementById('temp-lat').innerHTML = response.data[0].lat;
                document.getElementById('temp-lng').innerHTML = response.data[0].lng;
        })
        .catch(error => {
            console.log(error);
            console.log("error getting markers in app.js");
        });
    }

    const initializeMarkerToMap = (marker) => {
        if (marker == null)
            return;
        const markerInstance = new google.maps.Marker({
            position: { lat: marker.lat, lng: marker.lng },
            map: mapRef.current,
            title: marker.username,
        });
        markerInstance.addListener('click', event => {
            handleClickMarker(marker);
        });
        const infoWindow = new google.maps.InfoWindow({
            content: marker.username,
        })
        markerInstance.addListener('mouseover', () => {
            infoWindow.open(mapRef.current, markerInstance);
        });
        markerInstance.addListener('mouseout', () => {
            infoWindow.close();
        });

        // Add to markersArray
        setMarkerList(prevMarkerList => [...prevMarkerList, markerInstance]);
    }
    return (
        <>
            <div className='container'>
                <div>
                    <div className='form-row'>
                        <p>Mechanic 2 GO</p>
                    </div>
                    <div className='form-row'>
                        <input className='flex-item flex-item' id="search-box" type="text" ref={searchInputRef} placeholder="Search for a location" />
                    </div>
                    <Marker mapRef={mapRef} searchInputRef={searchInputRef} initializeMarkerToMap={initializeMarkerToMap} />
                    <TempMarker markerList={markerList} setMarkerList={setMarkerList}
                        setHelperUseEffectSwitch={setHelperUseEffectSwitch} helperUseEffectSwitch={helperUseEffectSwitch}/>   
                    <AllMarkers  mapRef={mapRef} markerList={markerList}/>             
                    <HelpedMarkers helperUseEffectSwitch={helperUseEffectSwitch} setHelperUseEffectSwitch={setHelperUseEffectSwitch} />
                </div>
                <Map mapRef={mapRef}
                    searchInputRef={searchInputRef}
                    initializeMarkerToMap={initializeMarkerToMap} />
            </div>
        </>
    );
}

export default App;