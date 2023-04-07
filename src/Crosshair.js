import React, { useRef } from 'react';

const Crosshair = props => {
    // Get the map element
    var map = document.getElementById('map');

    // Create a crosshair element
    var crosshair = document.createElement('div');
    crosshair.id = 'crosshair';
    crosshair.style.display = 'none';
    map.appendChild(crosshair);

    // Add an event listener for clicks on the map
    map.addEventListener('click', function(e) {
        // Show the crosshair element
        crosshair.style.display = 'block';
        
        // Position the crosshair at the click coordinates
        crosshair.style.top = e.clientY - (crosshair.offsetHeight / 2) + 'px';
        crosshair.style.left = e.clientX - (crosshair.offsetWidth / 2) + 'px';
        
        // Hide the crosshair after 1 second
        setTimeout(function() {
            crosshair.style.display = 'none';
        }, 1000);
    });
}
export default Crosshair;