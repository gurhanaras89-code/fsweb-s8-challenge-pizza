import React from 'react';
import { Link } from 'react-router-dom'; // Link bileşenini import ettik

function Home() {
  return (
    <div className="home-container">
      <h2>Anasayfa</h2>
      {/* Kullanıcıyı /pizza sayfasına yönlendiren buton */}
      <Link to="/pizza">
        <button id="order-pizza">ACIKTIM</button>
      </Link>
    </div>
  );
}

export default Home;