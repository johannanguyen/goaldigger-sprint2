import { GoogleLogout } from 'react-google-login';
import * as React from 'react';
import { useHistory } from "react-router-dom";
import { clientSocket } from './Socket';


export function GoogleOut() {
  const history = useHistory();

  function logout() {
    history.push('/');
  }

  return (
    <div>
      <GoogleLogout
          // clientId="1062054290390-k78ra3cikp1topp72a1s8bo02m965adi.apps.googleusercontent.com"
        clientId="245094184019-ci1igbp4nmmhme8jqto843ld7lic25s8.apps.googleusercontent.com"
        buttonText="Logout"
        onLogoutSuccess={logout}
      />
    </div>
  );
}