import React from 'react';
import { Link } from 'react-router-dom';
import Home1 from './Home1';

function Home() {
  return (
    <div className="home-page-wrapper">
      <header className="main-header">
        <div className="container">
          <img src="/pictures/logo.svg" alt="Teknolojik Yemekler Logo" className="main-logo" />
          <div className="hero-content">
            <p className="satisfy-text">fırsatı kaçırma</p>
            <h1>KOD ACIKTIRIR <br /> PİZZA, DOYURUR</h1>
            {/* Sipariş Formuna Giden Buton */}
            <Link to="/pizza">
              <button className="hero-btn">ACIKTIM</button>
            </Link>
          </div>
        </div>
      </header>

      {/* 2. KATEGORİ NAVİGASYON BARI */}
      <nav className="category-nav">
        <div className="container">
          <div className="nav-item"><img src="/pictures/1.svg" alt="" /> YENİ! Kore</div>
          <div className="nav-item active"><img src="/pictures/2.svg" alt="" /> Pizza</div>
          <div className="nav-item"><img src="/pictures/3.svg" alt="" /> Burger</div>
          <div className="nav-item"><img src="/pictures/4.svg" alt="" /> Kızartmalar</div>
          <div className="nav-item"><img src="/pictures/5.svg" alt="" /> Fast Food</div>
          <div className="nav-item"><img src="/pictures/6.svg" alt="" /> Gazlı İçecekler</div>
        </div>
      </nav>

      {/* 3. REKLAM KAMPANYA KARTLARI ALANI */}
      <main className="container content-area">
        <section className="campaign-cards">
          {/* Sol Büyük Kırmızı Kart */}
          <div className="card red-card">
            <h2>Özel <br /> Lezzetler</h2>
            <p>Position Absolute Acı Burger</p>
            <Link to="/pizza"><button className="order-link">SİPARİŞ VER</button></Link>
          </div>
          
          {/* Sağ İki Küçük Kartın Sütunu */}
          <div className="side-cards">
            {/* Siyah Kart */}
            <div className="card black-card">
              <h3>Hackathlon <br /> Burger Menü</h3>
              <Link to="/pizza"><button className="order-link">SİPARİŞ VER</button></Link>
            </div>
            {/* Beyaz Kart */}
            <div className="card white-card">
              <h3><span>Çooook</span> hızlı <br /> npm gibi kurye</h3>
              <Link to="/pizza"><button className="order-link">SİPARİŞ VER</button></Link>
            </div>
          </div>
        </section>

        {/* 4. MENÜ ÜRÜNLERİ SEKSİYONU */}
        <section className="menu-section">
          <div className="menu-header">
            <p className="satisfy-text">en çok paketlenen menüler</p>
            <h2>Acıktıran Kodlara Doyuran Lezzetler</h2>
          </div>

          <nav class="menu-tabs">
            <button className="tab-btn"><img src="../pictures/1.svg" alt=""/> Ramen</button>
            <button className="tab-btn"><img src="../pictures/2.svg" alt=""/> Pizza</button>
            <button className="tab-btn"><img src="../pictures/3.svg" alt=""/> Burger</button>
            <button className="tab-btn"><img src="../pictures/4.svg" alt=""/> French fries</button>
            <button className="tab-btn"><img src="../pictures/5.svg" alt=""/> Fast food</button>
            <button className="tab-btn"><img src="../pictures/6.svg" alt=""/> Soft drinks</button>
        </nav>

          {/* Ürün Kartları Grid Yapısı */}
          <div className="product-grid">
            {/* 1. Ürün */}
            <div className="product-card">
              <img src="/pictures/food-1.png" alt="Terminal Pizza" />
              <h4>Terminal Pizza</h4>
              <div className="product-info">
                <span>4.9</span>
                <span>(200)</span>
                <span className="price">60₺</span>
              </div>
            </div>

            {/* 2. Ürün */}
            <div className="product-card">
              <img src="/pictures/food-2.png" alt="Position Absolute Pizza" />
              <h4>Position Absolute Pizza</h4>
              <div className="product-info">
                <span>4.9</span>
                <span>(928)</span>
                <span className="price">85₺</span>
              </div>
            </div>

            {/* 3. Ürün */}
            <div className="product-card">
              <img src="/pictures/food-3.png" alt="useEffect Tavuklu Burger" />
              <h4>useEffect Tavuklu Burger</h4>
              <div className="product-info">
                <span>4.9</span>
                <span>(462)</span>
                <span className="price">75₺</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Home1 />
    </div>
    
  );
}

export default Home;