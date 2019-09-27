import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {fromLonLat} from 'ol/proj';
import Point from 'ol/geom/Point';
import React from 'react';
import '../../style.css';


function MapMaker(props) {
    console.log(props);

    let conversion = [0,0];
    if(props.location){
        const longlat = [props.location.long, props.location.lat]
        conversion = fromLonLat(longlat)
        console.log(conversion)
    };

    new Map({
        target: "map",
        layers: [
            new TileLayer({
                source: new OSM()
            })
        ],
        view: new View({
            center: conversion,
            zoom: 5,
            minZoom: 3,
            maxZoom: 13
        })
    });
    

    return(
        <div id="map" className="map"></div>
    );
    

}
    
export default MapMaker;
