import * as React from 'react';
import GoogleButton from '../scripts/GoogleButton'
import Cookies from 'js-cookie'
import './styles.css';

export default function LandingPage() {
  console.log(Cookies.get())
  return (
    <div className="root_container">
      <div className="button_container">
      <GoogleButton />
      </div>

      <div className="content_container">
        <br />
        <br />
        <br />
        <h1>G O A L  D I G G E R</h1>
        <p>Achieve more, together.</p>
        <img src="https://i.ibb.co/PDn92m7/featured-stories.png" />
      </div>
    </div>
  );
}
