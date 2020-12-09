import { GoogleLogin } from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
import * as React from 'react';
import { clientSocket } from './Socket';
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie'


const responseGoogle = (response) => {
  console.log('Could not log in: ', response);
};

export default function GoogleButton() {
  const history = useHistory();

//emit new google user triggers this on server
//server_socket.emit("google info received", personal_profile, request.sid)
//server_socket.emit("user goals", personal_goals, r

  function get_info(google_user) {
    clientSocket.emit('new google user', {
      id_token: google_user.profileObj.googleId,
      email: google_user.profileObj.email,
      username: google_user.profileObj.name,
      image: google_user.profileObj.imageUrl,
    });
    console.log("onSuccess being run")
    Cookies.set("isLoggedIn", true)
    history.push('/home');
    //ChangePage();
  }
  
  function logout() {
    Cookies.remove("isLoggedIn")
    Cookies.remove("user")
    Cookies.remove("userObj")
    history.push('/');
  }


  return (
    <div>
    {Cookies.get("isLoggedIn")?
    <div>
      <GoogleLogout 
        clientId="1054986958378-occ0i46u818t41nptv82m2ompremrnkh.apps.googleusercontent.com"
        buttonText="Logout"
        onLogoutSuccess={logout}>
      </GoogleLogout>
    </div>
    :<div>
    <GoogleLogin
        // clientId="1062054290390-k78ra3cikp1topp72a1s8bo02m965adi.apps.googleusercontent.com"
        clientId="1054986958378-occ0i46u818t41nptv82m2ompremrnkh.apps.googleusercontent.com"
        
        buttonText="Login"
        onSuccess={get_info}
        isSignedIn={Cookies.get("isSignedIn")}
        onFailure={responseGoogle}
        cookiePolicy="single_host_origin"
      />
      </div>
    }
    </div>
  );
}