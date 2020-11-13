import { GoogleLogout } from 'react-google-login';
import * as React from 'react';
import { clientSocket } from './Socket';

function logout() {
  location.href = '/';
  // <button  onclick="ChangePage()">index.html</button>
}

export function GoogleOut() {
  return (
    <div>
      <GoogleLogout
          // clientId="1062054290390-k78ra3cikp1topp72a1s8bo02m965adi.apps.googleusercontent.com"
        clientId="1054986958378-occ0i46u818t41nptv82m2ompremrnkh.apps.googleusercontent.com"
        buttonText="Logout"
        onLogoutSuccess={logout}
      />
    </div>
  );
}
