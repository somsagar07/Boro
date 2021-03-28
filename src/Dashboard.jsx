import React, { useState, useEffect } from 'react';
import axios from 'axios';
export default function Dashboard() {

    //Extracting Current Location
    var [currentLocation, currentLoc] = useState([]);
    useEffect(() => {
        extractLocation();
    }, [extractLocation])

    function extractLocation() {
        navigator.geolocation.getCurrentPosition(success, error);

        function success(pos) {
            currentLoc(
                prevState => [pos.coords.latitude, pos.coords.longitude]
            )
            // console.log(currentLocation);
        }
        function error() {
            console.log('error');
        }
    }
    
    //Post Function for Registering
    function register (e) {
        e.preventDefault();
        // console.log(e.target.userName.value, e.target.query.value);
        axios.post('http://localhost:5000/posts', {
            lattitude: currentLocation[0],
            longitude: currentLocation[1],
            class: 'A'
        }).then(res => console.log(res.data))
            .catch(error => console.log(error)); 
        
    }

    //Post function for Renting
    function postServerInfo (e) {
        e.preventDefault();
        // console.log(e.target.userName.value, e.target.query.value);
        axios.post('http://localhost:5000/posts', {
            query: e.target.query.value,
            name: e.target.userName.value,
            lattitude: currentLocation[0],
            longitude: currentLocation[1],
            class: 'B',
            phoneNumber: e.target.phoneNumber.value
        }).then(res => console.log(res.data,'response after POST'))
            .catch(error => console.log(error));
        
    }
    return (
        <div  class="dashboard">
            <div class="split left">
                <center class="center">
                    <p class="left-heading">Not Sure Yet!!</p>
                    <p class="left-content">Just register yourself and see what you can find to borrow from people around you.</p>
                    <br />
                    <button class="left-btn" onClick={register}>Register</button>
                </center>
            </div>

            <div class="split right">
                <center>
                    <a class="right-btn-log-out" href='../'>Log-Out</a>
                    <a class="right-btn-map" href="./map">Map</a>
                    <br/>
                    <p class="right-heading">Post Your Request</p>
                    <form class="right-form" onSubmit={postServerInfo}>        
                        <label for='userName'>Item Name:&nbsp;</label><br/>       
                        <input class="input" id='userName' name='userName' type='text' required/>
                        <br/><br/>
                        <label for='query'>Details:&nbsp;</label><br/>       
                        <input class="input" name='query' type='text' id='query' required/>
                        <br/><br/>
                        <label for='phoneNumber'>Phone Number:&nbsp;</label><br/>       
                        <input class="input" name='phoneNumber' type='tel' pattern="[0-9]{10}" id='phoneNumber' required/>
                        <br/>
                        <br/>
                        <center>
                            <button class="submit" type='submit' >Submit</button>
                        </center>
                    </form>
                </center>
            </div>
        </div>
    )
}