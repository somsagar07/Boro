import React, { useState, useEffect} from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'
import './style.css';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import axios from 'axios';

export default function Mapp() {

    
    var [map] = useState({});
    var [currentLocation, currentLoc] = useState([]);
    var collection = {};

    //useEffect for GET request
    useEffect(() => {
        // setInterval(() => getServerInfo());
        getServerInfo();
    }, []);

    
    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiYmx1ZS1taXN0IiwiYSI6ImNrbWh6dGN3bDA4OXEyd256MGprOHF4bnUifQ.ZvTRA2jTEsROVG7wnL2fwg';
        navigator.geolocation.getCurrentPosition(success, error);

        function success(pos) {
            currentLoc(
                prevState => [pos.coords.latitude, pos.coords.longitude]
            )
            launchMap([pos.coords.longitude, pos.coords.latitude]);
        }

        function error() {
            console.log('error');
        }
    }, [])
    
    function getServerInfo() {
        axios.get('http://localhost:5000/posts')
            .then(Response => {
                console.log(Response.data, 'inside axios');
                collection = Response.data;
            if(collection!=null){
                var mark = [collection[0].longitude, collection[0].lattitude]
                launchMap(mark);
            }
                
            })
            .catch(error => console.log(error));
        
    }


    var mapstyle = 'mapbox://styles/mapbox/dark-v10';//default

    function dark(){
        mapstyle = 'mapbox://styles/mapbox/dark-v10'
        getServerInfo()
    }
    function light(){
        mapstyle = 'mapbox://styles/mapbox/streets-v11'
        getServerInfo()
    }

          
    function getdist(lat1,lon1,lat2,lon2) {
        var p = 0.017453292519943295;    // Math.PI / 180
        var c = Math.cos;
        var a = 0.5 - c((lat2 - lat1) * p)/2 + 
                c(lat1 * p) * c(lat2 * p) * 
                (1 - c((lon2 - lon1) * p))/2;
      
        return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
      }
      
   function reset(){
        window.location.reload(false);
   }

   function launchMap(center) {

        map = new mapboxgl.Map({
            container: 'map', 
            style: mapstyle, 
            center: center, 
            zoom: 10 
        });
        var geolocate = new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        });
        var nav = new mapboxgl.NavigationControl();
        var directions = new MapboxDirections({
            accessToken: 'pk.eyJ1IjoiYmx1ZS1taXN0IiwiYSI6ImNrbWh6dGN3bDA4OXEyd256MGprOHF4bnUifQ.ZvTRA2jTEsROVG7wnL2fwg',
            unit: 'metric',
            profile: 'mapbox/driving'
        });

        map.addControl(nav, 'top-right');
        map.addControl(geolocate,'top-right');
        map.addControl(directions, 'top-left');  

        
        var i,mark,tooltip,popup;
        var c1= "#FFFFFF";
        var c2 = "#00A300";
        var c3 = "#8AFF8A"; 
        var num;
        var setcolor
          for(i=0; i < collection.length; i++){

            mark = [collection[i].longitude, collection[i].lattitude]
            num=getdist(mark[1],mark[0],center[1],center[0])
           // console.log(num)
            if(mark[0] === center[0] && mark[1] === center[1]){
                setcolor=c2
            }
            else{
                setcolor=c3
            }
            if(Number(num)<200){
                if(collection[i].class === 'A')
               {
                try {
                     tooltip = new mapboxgl.Marker({
                        color: c1,
                        draggable: false
                        })
                    .setLngLat(mark)
                    .addTo(map);
                   //console.log(mark) 
                } catch (error) {
                    console.log('No data/line 201');
                }     
               }
               else
               {
                try {
                     tooltip = new mapboxgl.Marker({
                        color: setcolor,
                        draggable: false
                        })
                    .setLngLat(mark)
                    .addTo(map);
                   
                    popup = new mapboxgl.Popup({ closeOnClick: false})//adding popup
                    .setLngLat(mark)
                    .setHTML('<p>item :'+ collection[i].name+ '</p><p>Description :' 
                            + collection[i].query+ '</p><p>Phone number :' 
                            + collection[i].phoneNumber + '</p>')
                    .addTo(map)

                } catch (error) {
                    console.log('No data/line 201');
                }   
               } 
            }
               
          }
          
    }


    return (
        <div>
            <a href="./dash" class="dash aa">Pin It</a>
            <a href='../' class="logout aa">Logout</a>
            <div id='map'></div>
            <div onClick={reset} class="theme reset"></div>
            <div onClick={dark} class="theme dark"></div><div onClick={light} class="theme light"></div>
        </div>
    )
}