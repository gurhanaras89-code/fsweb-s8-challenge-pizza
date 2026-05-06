import React, { useState } from 'react';

function OrderForm() {
  // Form verilerini tek bir state içinde topluyoruz
  const [formData, setFormData] = useState({
    size: '',          // Boyut Seçimi
    thickness: '',     // Hamur Seçimi
    ingredients: [],   // Ek Malzemeler (Dizi olarak tutulacak)
    note: ''           // Sipariş Notu
  });

  // Pizza adet sayacı
  const [quantity, setQuantity] = useState(1);

  // Sabit fiyatlar (Senin tasarıma göre)
  const basePrice = 85.50;
  const ingredientPrice = 5.00;

  // Listelenecek ek malzemeler
  const availableIngredients = [
    "Pepperoni", "Domates", "Biber", "Sosis", "Mısır", 
    "Sucuk", "Kanada Jambonu", "Ananas", "Turşu", "Zeytin", 
    "Jalapeno", "Sarımsak", "Mantar", "Ançüvez"
  ];

  // Genel input değişim fonksiyonu
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Checkbox (Malzeme) değişim fonksiyonu
  const handleIngredientChange = (event) => {
    const { value, checked } = event.target;
    let updatedList = [...formData.ingredients];

    if (checked) {
      if (updatedList.length < 10) { // En fazla 10 malzeme sınırı
        updatedList.push(value);
      } else {
        alert("En fazla 10 malzeme seçebilirsiniz!");
        return;
      }
    } else {
      updatedList = updatedList.filter(item => item !== value);
    }

    setFormData({ ...formData, ingredients: updatedList });
  };

  // Adet değiştirme
  const changeQuantity = (type) => {
    if (type === 'inc') setQuantity(quantity + 1);
    if (type === 'dec' && quantity > 1) setQuantity(quantity - 1);
  };

  // Dinamik Fiyat Hesaplama
  const totalSelectionsPrice = formData.ingredients.length * ingredientPrice;
  const grandTotal = (basePrice + totalSelectionsPrice) * quantity;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sipariş Gönderildi:", { ...formData, quantity, grandTotal });
  };

  return (
    <div className="order-form-page">
      {/* 1. SAYFA BAŞLIĞI / LOGO BANTU */}
      <header className="main-header">
        <div className="container">
          <img src="/pictures/logo.svg" alt="Teknolojik Yemekler" className="main-logo" />
        </div>
      </header>

      {/* 2. ANA İÇERİK ALANI (Senin CSS sınıflarınla sarmalandı) */}
      <main className="container content-area">
        
        {/* Pizza Tanıtım Kartı */}
        <section className="pizza-detail">
          <img src="/assets/iteration-2/pictures/pizzabaner.png" alt="Position Absolute Pizza" className="banner-img" />
          <h2>Position Absolute Pizza</h2>
          
          <div className="product-info">
            <span className="price">{basePrice.toFixed(2)}₺</span>
            <div className="rating-info">
              <span>4.9</span>
              <span>(928)</span>
            </div>
          </div>
          
          <p className="description">
            Frontent Dev olarak hala mikrososisle lezzetli bir pizza yiyemediyseniz, bu pizza tam size göre. 
            Position Absolute kurallarına göre özel olarak dizayn edilmiş kenarları ve esnek (flex) malzemeleriyle 
            midenizde harikalar yaratacak.
          </p>
        </section>

        {/* FORMA BAŞLIYORUZ */}
        <form onSubmit={handleSubmit} className="order-form">
          
          {/* BOYUT VE HAMUR SEÇENEKLERİ (Yan yana duran bloklar) */}
          <div className="selection-row">
            
            {/* BOYUT SEÇİMİ (Radio) */}
            <div className="size-selection">
              <h3>Boyut Seç <span className="required">*</span></h3>
              <div className="radio-group">
                {['S', 'M', 'L'].map((s) => (
                  <label key={s} className="radio-label">
                    <input 
                      type="radio" 
                      name="size" 
                      value={s} 
                      checked={formData.size === s} 
                      onChange={handleChange} 
                      required 
                    />
                    <span className="custom-radio">{s}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* HAMUR SEÇİMİ (Dropdown) */}
            <div className="thickness-selection">
              <h3>Hamur Seç <span className="required">*</span></h3>
              <select 
                name="thickness" 
                value={formData.thickness} 
                onChange={handleChange} 
                required 
                className="thickness-select"
              >
                <option value="" disabled>— Hamur Kalınlığı Seç —</option>
                <option value="ince">İnce Kenar</option>
                <option value="standart">Standart Kenar</option>
                <option value="kalin">Kalın Kenar</option>
              </select>
            </div>
          </div>

          {/* MALZEME SEÇİMİ (Checkbox Grid) */}
          <div className="ingredients-section">
            <h3>Ek Malzemeler</h3>
            <p className="info-text">En fazla 10 malzeme seçebilirsiniz. 5₺</p>
            <div className="ingredients-grid">
              {availableIngredients.map((ing) => (
                <label key={ing} className="checkbox-label">
                  <input 
                    type="checkbox" 
                    value={ing} 
                    checked={formData.ingredients.includes(ing)} 
                    onChange={handleIngredientChange} 
                  />
                  {ing}
                </label>
              ))}
            </div>
          </div>

          {/* SİPARİŞ NOTU */}
          <div className="note-section">
            <h3>Sipariş Notu</h3>
            <textarea 
              name="note" 
              value={formData.note} 
              onChange={handleChange} 
              placeholder="Siparişine eklemek istediğin bir not var mı?"
              className="note-textarea"
            />
          </div>

          <hr className="form-divider" />

          {/* ADET VE TOPLAM KART BÖLÜMÜ */}
          <div className="summary-row">
            
            {/* Adet Sayacı */}
            <div className="quantity-counter">
              <button type="button" onClick={() => changeQuantity('dec')}>-</button>
              <span className="quantity-value">{quantity}</span>
              <button type="button" onClick={() => changeQuantity('inc')}>+</button>
            </div>

            {/* Sipariş Toplam Kartı */}
            <div className="price-summary-card">
              <h4>Sipariş Toplamı</h4>
              <div className="summary-item">
                <span>Seçimler</span>
                <span>{totalSelectionsPrice.toFixed(2)}₺</span>
              </div>
              <div className="summary-item total">
                <span>Toplam</span>
                <span>{grandTotal.toFixed(2)}₺</span>
              </div>
              <button type="submit" className="submit-btn" id="order-button">
                SİPARİŞ VER
              </button>
            </div>

          </div>

        </form>
      </main>
    </div>
  );
}

export default OrderForm;