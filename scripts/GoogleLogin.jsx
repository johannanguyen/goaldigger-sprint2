import { clientSocket } from './Socket';
import { GoogleLogin } from 'react-google-login';
import * as React from 'react';


const responseGoogle = (response) => {
  console.log("Could not log in: ", response);
}

function get_info(google_user) {
    var id_token = google_user.getAuthResponse().id_token;
    let email = google_user.profileObj.email;
    let username = google_user.profileObj.name;
    let image = google_user.profileObj.imageUrl;
    let is_signed_in = google_user.isSignedIn();
    
    //console.log('Sent the following google user info to server!' + id_token + email + username + image + is_signed_in);
    
    
    clientSocket.emit('new google user', {
        'id_token': id_token,
        'email': email,
        'username': username,
        'image': image,
        'is_signed_in': is_signed_in
    });
    
    ChangePage();
}

function ChangePage() {
    location.href="/HomePage" 
    //<button  onclick="ChangePage()">index.html</button>
}

export function GoogleButton() {
    return (
        <div>
            <GoogleLogin
            clientId="1054986958378-occ0i46u818t41nptv82m2ompremrnkh.apps.googleusercontent.com"
            //clientId="791115456005-sqrq5ha01c9bmcbe7c7u6lco4p9l4r1b.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={get_info}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            />
        </div>
    );
}
