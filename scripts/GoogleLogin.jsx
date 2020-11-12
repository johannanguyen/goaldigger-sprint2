import { clientSocket } from './Socket';
import { GoogleLogin } from 'react-google-login';
import * as React from 'react';


const responseGoogle = (response) => {
  console.log("Could not log in: ", response);
}

function get_info(google_user) {

    clientSocket.emit('new google user', {
        'id_token': google_user.profileObj.googleId,
        'email': google_user.profileObj.email,
        'username': google_user.profileObj.name,
        'image': google_user.profileObj.imageUrl,
    });
}

export function GoogleButton() {
    return (
        <div>
            <GoogleLogin
            clientId="1062054290390-k78ra3cikp1topp72a1s8bo02m965adi.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={get_info}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            />
        </div>
    );
}
