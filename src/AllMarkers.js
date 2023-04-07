import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AllMarkers = props => {
    useEffect(() => {
        // This will run becuase we don't want to update the show selected nodes
        // if the user hasnt yet chose to show them
        if (document.getElementById('showAllMarkersDiv').hasChildNodes() == false)
            return;

        handleShowAllMarkers();
    }, [props.markerList])

    
    const handleOnMarkerDivClick = (marker) => {
        // Set map to marker                                                    
        props.mapRef.current.setCenter({lat: marker.lat, lng: marker.lng});                                                 

        // Set zoom level as well               // COPIED CODE                                           
        props.mapRef.current.setZoom(12);       // COPIED CODE                                           
    }
    const handleShowAllMarkers = () => {

        axios.get('/markers')
            .then(response => {
                // Delete previous information if currently exists
                handleRemoveAllMarkers();
                response.data.forEach(marker => {

                    const markerDiv = document.createElement('div');
                    markerDiv.classList.add('markerInfoDiv');
                    markerDiv.addEventListener('click', () => {
                        handleOnMarkerDivClick(marker);
                    })

                    let usernameDiv = document.createElement('div');
                    usernameDiv.textContent = marker.username;
                    markerDiv.appendChild(usernameDiv);

                    document.getElementById('showAllMarkersDiv').appendChild(markerDiv);
                })
            })
            .catch(error => {
                console.log(error);
                console.log("error getting markers");
            });
    }
    const handleRemoveAllMarkers = () => {
        const markerDivs = document.getElementsByClassName('markerInfoDiv');

        // For every div (which contains the player information), remove that div
        for (let i = markerDivs.length - 1; i >= 0; i--) {
            markerDivs[i].remove();
        }
    }

    return (<>
        <button onClick={handleShowAllMarkers} >Show All Markers</button>
        <button onClick={handleRemoveAllMarkers}>Hide All Markers</button>
        <div id='showAllMarkersDiv'></div>
    </>)   
}

export default AllMarkers;