import React from 'react';
import { Link } from 'react-router-dom';


function Home1() {
  return (
    <div>
      <footer className="main-footer">
        <div className="container footer-content">
          <div className="footer-info">
            <h3>Teknolojik <br /> Yemekler</h3>
            <p><img src="/pictures/icon-1.png" alt="" /> 341 Londonderry Road, İstanbul Türkiye</p>
            <p><img src="/pictures/icon-2.png" alt="" /> aciktim@teknolojikyemekler.com</p>
            <p><img src="/pictures/icon-3.png" alt="" /> +90 216 123 45 67</p>
          </div>
          <div className="footer-nav">
            <h4>Sıcak Menüler</h4>
            <ul>
              <li>Terminal Pizza</li>
              <li>5 Kişilik Hackathlon Pizza</li>
              <li>useEffect Tavuklu Burger</li>
              <li>Beyaz Console Frosty</li>
              <li>Testler Geçti Mutlu Burger</li>
              <li>Position Absolute Pizza</li>
            </ul>
          </div>
          <div className="footer-insta">
            <h4>Instagram</h4>
            <div className="insta-grid">
              <img src="/pictures/li-0.png" alt="" />
              <img src="/pictures/li-1.png" alt="" />
              <img src="/pictures/li-2.png" alt="" />
              <img src="/pictures/li-3.png" alt="" />
              <img src="/pictures/li-4.png" alt="" />
              <img src="/pictures/li-5.png" alt="" />
            </div>
          </div>
        </div>
        <hr className="footer-divider" />
        <div className="container footer-bottom">
          <p>© 2023 Teknolojik Yemekler.</p>
          <div className="social-icons">
            <a href="#link"><i className="fab fa-twitter"></i></a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home1;