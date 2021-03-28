import axios from 'axios';
import Particles from 'react-particles-js';
import './style.css';
export default function Login() {
    function test(e) {
        axios.post('http://localhost:5000/posts/verifyUser', {
            userName: e.target.userName.value,
            passWord: e.target.passWord.value
        }).then(res => {
            if (res.data === 'verified') document.getElementById('linkToMap').click();
        })
            .catch(error =>console.log(error));
        
    }
    return (
        <div class="loginbg">
            <Particles />
            <br/>
            <a href="./map" id ='linkToMap' style={{display : 'none'}}>Map</a>
            
            <div class="overlay">

            <center>  <h1>BORO MAP</h1> </center>
           <center>   
             <form onSubmit={test}>
                <label htmlFor="userName" class="ln1">User</label>  
                <input type="text" id='userName' /> <br/>
                <label htmlFor="passWord" class="ln2">Password</label> 
                <input type="password" id='passWord'/> <br/>
                <button type='submit' class="btn">Submit</button> 
            </form>
           </center>

            </div>
        </div>
    )
}