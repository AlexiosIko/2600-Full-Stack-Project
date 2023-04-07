import React from 'react';
import { useState, useRef } from 'react';
import axios from 'axios';
import Helped from '../models/helped.js';

const TempMarker = props => {
    const usernameRef = useRef();
    const descriptionRef = useRef();
    const latRef = useRef();
    const lngRef = useRef();
    
    const handleRemoveMarker = () => {
        const markerToFind = {
            username: usernameRef.current.innerHTML,
            description: descriptionRef.current.innerHTML,
            lat: +latRef.current.innerHTML,
            lng: +lngRef.current.innerHTML,
        };
        const foundMarker = props.markerList.find((marker) => {
            return (
                marker.title === markerToFind.username &&
                marker.position.lat() === markerToFind.lat &&
                marker.position.lng() === markerToFind.lng
            );
        })
        if (foundMarker == null)
            return;

        // Remove marker from database
        axios.post('/removemarker', ({
            username: foundMarker.title,
            lat: foundMarker.position.lat(),
            lng: foundMarker.position.lng(),
        })).catch((error) => {
            console.log(error);
            return;
        });

        // Remove from map
        foundMarker.setMap(null);

        // Create new list WITHOUT the foundMarker that we want to delete 
        const newMarkerList = props.markerList.filter(marker => marker !== foundMarker);

        // Assign list and the new list
        props.setMarkerList(newMarkerList);



        // Add helper to helper Database
        // Mongoose database
        axios.post('/addhelped', {
            username: markerToFind.username,
            time: new Date()
        })
        .then((response) => {
            console.log('Uploaded to /helped successfully');
            props.setHelperUseEffectSwitch(!props.helperUseEffectSwitch);
        })
        .catch((error) => {
            console.error("Error uploaduing to helpers, reason: invalid input");
        });
    }
    return (
        <>
            <div className='temp-container'>
                <div className='input-row'>
                    <label>Name</label>
                    <p id="temp-username" ref={usernameRef} className='text-box' type="text" placeholder="Name for Marker"></p>
                </div>
                <div className='input-row'>
                    <label>Description</label>
                    <p id="temp-description" ref={descriptionRef} className='block-box' type="text" placeholder="Enter description of your needs"></p>
                </div>
                <div className='input-row'>
                    <label>Latitude</label>
                    <p id="temp-lat" ref={latRef} className='text-box' type="text" placeholder="Latitude"></p>
                </div>
                <div className='input-row'>
                    <label>Longitude</label>
                    <p id="temp-lng" ref={lngRef} className='text-box' type="text" placeholder="Longitude"></p>
                </div>
                <button onClick={handleRemoveMarker}>Remove Marker</button>
            </div>
        </>
    )
}
export default TempMarker;