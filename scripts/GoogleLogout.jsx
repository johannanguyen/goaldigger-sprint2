import { GoogleLogout } from 'react-google-login';
import * as React from 'react';
import { useHistory } from "react-router-dom";
import { clientSocket } from './Socket';
import Cookies from 'js-cookie'

export function GoogleOut() {
  const history = useHistory();

  function logout() {
    Cookies.set("isLoggedIn", false)
    Cookies.remove("user")
    history.push('/');
  }

  return (
    <div>
      <GoogleLogout
          // clientId="1062054290390-k78ra3cikp1topp72a1s8bo02m965adi.apps.googleusercontent.com"
        // clientId="245094184019-ci1igbp4nmmhme8jqto843ld7lic25s8.apps.googleusercontent.com"
        clientId="791115456005-sqrq5ha01c9bmcbe7c7u6lco4p9l4r1b.apps.googleusercontent.com"
        buttonText="Logout"
        onLogoutSuccess={logout}
      />
    </div>
  );
}