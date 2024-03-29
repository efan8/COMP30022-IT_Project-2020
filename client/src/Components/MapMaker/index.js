/* Uses ol (open layers) to display a map so the user can visually see a location*/

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import Vector from 'ol/source/Vector';
import {fromLonLat} from 'ol/proj';
import Feature from 'ol/Feature';
import Circle from 'ol/geom/Circle';
import Point from 'ol/geom/Point';
import React from 'react';
import '../../style.css';

// Makes the map
function MapMaker(props) {
    console.log(props);
    let conversion = [0,0];

    // Converts Lat and long to the format ol maps needs
    if(props.location){
        const longlat = [Number(props.location.long), Number(props.location.lat)]
        conversion = fromLonLat(longlat)
        console.log(conversion)

    };

    // Creates a circle and point
    let circle = new Circle(conversion, 300000);
    let point = new Point(conversion);
    let pointFeature = new Feature(point);
    let circleFeature = new Feature(circle);

    // Source and vector layer
    let vectorSource = new Vector({
        projection: 'EPSG:4326',
        features: [pointFeature, circleFeature]
    });

    console.log(vectorSource);
    let vectorLayer = new VectorLayer({
        source: vectorSource
    })

    // The maps values
    new Map({
        target: "map",
        layers: [
            new TileLayer({
                source: new OSM()
            }),
            vectorLayer
        ],
        view: new View({
            center: conversion,
            zoom: 5,
            minZoom: 5,
            maxZoom: 5
        })
    });

    // The map component returned by the function
    return(
        <div id="map" className="map"></div>
    );
}

export default MapMaker;
