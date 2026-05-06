import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-page-wrapper">
      {/* 1. ÜST HEADER BÖLÜMÜ */}
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
            <p className="satisfy-text">en çok tercih edilen menüler</p>
            <h2>Acıktıran Kodlara Doyurucu Lezzetler</h2>
          </div>

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

      {/* 5. ANA FOOTER BÖLÜMÜ */}
      <footer className="main-footer">
        <div className="container footer-content">
          {/* İletişim Bilgileri */}
          <div className="footer-info">
            <h3>Teknolojik <br /> Yemekler</h3>
            <p><img src="/pictures/icon-1.png" alt="" /> 341 Londonderry Road, İstanbul Türkiye</p>
            <p><img src="/pictures/icon-2.png" alt="" /> aciktim@teknolojikyemekler.com</p>
            <p><img src="/pictures/icon-3.png" alt="" /> +90 216 123 45 67</p>
          </div>

          {/* Menü Linkleri */}
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

          {/* Instagram Grid */}
          <div className="footer-insta">
            <h4>Instagram</h4>
            <div className="insta-grid">
              <img src="/assets/iteration-2/footer/insta/li-0.png" alt="" />
              <img src="/assets/iteration-2/footer/insta/li-1.png" alt="" />
              <img src="/assets/iteration-2/footer/insta/li-2.png" alt="" />
              <img src="/assets/iteration-2/footer/insta/li-3.png" alt="" />
              <img src="/assets/iteration-2/footer/insta/li-4.png" alt="" />
              <img src="/assets/iteration-2/footer/insta/li-5.png" alt="" />
            </div>
          </div>
        </div>

        <hr className="footer-divider" />

        {/* Alt Telif ve Sosyal Medya Şeridi */}
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

export default Home;