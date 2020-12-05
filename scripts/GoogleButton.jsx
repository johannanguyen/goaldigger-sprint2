import { GoogleLogin, GoogleLogout } from 'react-google-login';
import * as React from 'react';
import { clientSocket } from './Socket';
import Cookies from 'js-cookie';


export default function GoogleButton() {
  const [ isLoggedIn, setLogIn ] = React.useState(Cookies.get('isLoggedIn'))
  
  function get_info(google_user) {
    clientSocket.emit('google login', {
      id_token: google_user.profileObj.googleId,
      email: google_user.profileObj.email,
      username: google_user.profileObj.name,
      image: google_user.profileObj.imageUrl,
    });
    clientSocket.on('google info received', (data)=>{
      Cookies.set("user_id", data.user_id)
      Cookies.set("isLoggedIn", true)
      setLogIn(true)
    })
  }
  
  const responseGoogle = (response) => {
    console.log('Could not log in: ', response);
  };
  
  function logout(data){
    Cookies.remove("isLoggedIn")
    Cookies.remove("user_id")
    setLogIn(false)
  }
  
  return (
    <div>
      {isLoggedIn?
      <GoogleLogout clientId="1054986958378-occ0i46u818t41nptv82m2ompremrnkh.apps.googleusercontent.com"
      buttonText="Logout"
      onLogoutSuccess={logout}>
      </GoogleLogout>
      :<GoogleLogin
        // clientId="1062054290390-k78ra3cikp1topp72a1s8bo02m965adi.apps.googleusercontent.com"
        clientId="1054986958378-occ0i46u818t41nptv82m2ompremrnkh.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={get_info}
        isSignedIn={false}
        onFailure={responseGoogle}
        cookiePolicy="single_host_origin" />}
    </div>
  );
}
