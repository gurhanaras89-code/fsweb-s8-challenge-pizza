import React, { useState } from 'react';

function OrderForm() {
  // Form verilerini tek bir state içinde topluyoruz
  const [formData, setFormData] = useState({
    size: '' // Boyut bilgisini burada tutacağız (K, O, B)
  });

  // Input değişimlerini yakalayan fonksiyon
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="form-container">
      <h2>Sipariş Formu</h2>
      
      <form>
        {/* Boyut Seçimi Bölümü */}
        <div className="form-section">
          <h3>Boyut Seç *</h3>
          
          <label>
            <input 
              type="radio" 
              name="size" 
              value="Küçük" 
              checked={formData.size === 'Küçük'}
              onChange={handleChange} 
            />
            Küçük
          </label>

          <label>
            <input 
              type="radio" 
              name="size" 
              value="Orta" 
              checked={formData.size === 'Orta'}
              onChange={handleChange} 
            />
            Orta
          </label>

          <label>
            <input 
              type="radio" 
              name="size" 
              value="Büyük" 
              checked={formData.size === 'Büyük'}
              onChange={handleChange} 
            />
            Büyük
          </label>
        </div>
      </form>

      {/* State'in doğru güncellendiğini ekranda anlık görmek için geçici test yazısı */}
      <div style={{ marginTop: '20px', color: 'gray' }}>
        <strong>Seçilen Boyut:</strong> {formData.size || 'Henüz seçilmedi'}
      </div>
    </div>
  );
}

export default OrderForm;