import React, { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import axios from 'axios';
const Marker = props => {
    const [marker, setMarker] = useState({});
    const [imageSrc, setImageSrc] = useState();
    const username = useRef();
    const description = useRef();

    // Events
    useEffect(() => {
        // This is to bypass the initial run
        if (!props.marker)
            return;
        
        document.getElementById("lat-text").value = props.marker.lat;
        document.getElementById("lng-text").value = props.marker.lng;
    }, [props.marker])

    const handleSetImage = event => {
        if (imageSrc == event.target.id)
            setImageSrc(null);
        else
            setImageSrc(event.target.id);
    }


    const handleSubmit = event => {
        event.preventDefault();

        // Set current name
        if (username.current.value == "")
            marker.username = "No username";
        else
            marker.username = username.current.value;

        // Set current description
        if (description.current.value == "")
            marker.description = "No description";
        else
            marker.description = description.current.value;

        // I PUT THIS PLUS HERE BECAUSE IF NOT IT WOULD BE A STRING AND
        // I WAS SO CONFUSED OMG
        marker.lat = +document.getElementById('lat-text').value;
        marker.lng = +document.getElementById('lng-text').value;

       
        // Mongoose database
        axios.post('/markers', {
            description: marker.description,
            lat: marker.lat,
            lng: marker.lng,
            username: marker.username
        })
        .then((response) => {
            console.log('Uploaded to /markers successfully');
            props.initializeMarkerToMap(marker);
        })
        .catch((error) => {
            console.error("Error uploaduing to markers, reason: invalid input");
        });
    }
    return (
        <div>
            <form className='rectangle' onSubmit={handleSubmit}>
                <div className='input-container'>
                    <div className='input-row'>
                        <label>Name</label>
                        <input className='text-box' ref={username} type="text" placeholder="Name for Marker" maxLength={15}></input>
                    </div>
                    <div className='input-row'>
                        <label>Description</label>
                        <input className='block-box' ref={description} type="text" placeholder="Enter description of your needs"></input>
                    </div>
                    <div className='input-row'>
                        <label>Latitude</label>
                        <input className='text-box' id="lat-text"  type="text" placeholder="Latitude"></input>
                    </div>
                    <div className='input-row'>
                        <label>Longitude</label>
                        <input className='text-box' id="lng-text"  type="text" placeholder="Longitude"></input>
                    </div>
                </div>
                    <button type="submit" ><span>Set Mark </span></button>
            </form>
    </div>
    )
}

export default Marker;