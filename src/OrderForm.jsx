import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './App.css';

function OrderForm() {
  const history = useHistory();

  // FORM STATE'LERİ
  const [formData, setFormData] = useState({
    size: '',
    thickness: '',
    ingredients: [], // Seçilen malzemeler dizi olarak tutulacak
    note: ''
  });
  const [quantity, setQuantity] = useState(1);

  // Sabitler
  const basePrice = 85.50;
  const ingredientPrice = 5.00; // Ek malzeme başı fiyat

  // Mevcut Malzeme Listesi (Figma'dan)
  const availableIngredients = [
    "Pepperoni", "Sucuk", "Kanada Jambonu", "Mantar", 
    "Sosis", "Soğan", "Domates", "Biber",
    "Tavuk Izgara", "Ananas", "Mısır", "Jalapeno", 
    "Sarımsak", "Kabak", "Mısır" // Kabak ve mantar gibi Figma'daki diğerlerini ekleyebilirsin
  ];

  // FONKSİYONLAR
  const handleIngredientChange = (e) => {
    const { value, checked } = e.target;
    let updatedIngredients = [...formData.ingredients];

    if (checked) {
      // Eğer seçildiyse ve 10 malzeme sınırını aşmıyorsa ekle
      if (updatedIngredients.length < 10) {
        updatedIngredients.push(value);
      } else {
        alert("En fazla 10 malzeme seçebilirsiniz!");
        return; // İşlemi durdur
      }
    } else {
      // Seçim kaldırıldıysa diziden çıkar
      updatedIngredients = updatedIngredients.filter(item => item !== value);
    }

    setFormData({ ...formData, ingredients: updatedIngredients });
  };

// ... bileşen içi


const handleSubmit = (e) => {
  e.preventDefault();

  // Figma'daki sipariş özeti için gereken veriler
  const orderSummary = {
    name: "Position Absolute Acı Pizza",
    size: formData.size,         // State'indeki seçili boyut
    dough: formData.thickness,   // State'indeki seçili hamur
    ingredients: formData.ingredients, // Seçili malzemeler dizisi
    totalPrice: grandTotal,      // Hesapladığın toplam fiyat
    extraPrice: totalIngredientsPrice // Sadece ek malzemelerin fiyatı
  };

  // v5 usulü state ile yönlendirme
  history.push({
  pathname: '/success',
  state: {
    ...formData, // Tüm formu gönder
    name: "Position Absolute Acı Pizza",
    totalPrice: grandTotal,
    extraPrice: totalIngredientsPrice
  }
});
};

  // Dinamik Fiyat Hesaplama
  const totalIngredientsPrice = formData.ingredients.length * ingredientPrice;
  const grandTotal = (basePrice + totalIngredientsPrice) * quantity;
  const handleChange = (e) => {
  const { name, value, type, checked } = e.target;
  
  if (type === 'checkbox') {
    // Malzemeler için özel kontrol
    let newIngredients = [...formData.ingredients];
    if (checked) {
      newIngredients.push(value);
    } else {
      newIngredients = newIngredients.filter(item => item !== value);
    }
    setFormData({ ...formData, ingredients: newIngredients });
  } else {
    // Boyut ve Hamur için standart kontrol
    setFormData({ ...formData, [name]: value });
  }
};

  return (
    <div className="order-form-wrapper" style={{ 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', // İçindeki her şeyi yatayda ortalar
    width: '100%', 
    margin: '0 auto' 
}}>
      {/* HEADER */}
      <header style={{ backgroundColor: '#E22222', padding: '30px 0', textAlign: 'center' }}>
        <h1 style={{ color: '#FFFFFF', margin: 0 }}>Teknolojik Yemekler</h1>
      </header>

      <main style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 20px' }}>
        {/* BANNER VE BILGILER (Bu kısımlar aynı) */}
        <section className="pizza-intro">
          <img src="/assets/iteration-2/pictures/pizzabaner.png" alt="Pizza" style={{ width: '100%', borderRadius: '8px' }} />
          <nav style={{ margin: '20px 0', color: '#5f5f5f' }}>Anasayfa - <strong>Sipariş Oluştur</strong></nav>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Position Absolute Pizza</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 0' }}>
            <span style={{ fontSize: '28px', fontWeight: 'bold' }}>{basePrice.toFixed(2)}₺</span>
            <span style={{ color: '#5f5f5f' }}>4.9 (928)</span>
          </div>
          <p style={{ color: '#5f5f5f', lineHeight: '1.6' }}>Frontend Dev olarak hala position absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir. Küçük bir pizzaya bazen pizzetta denir.</p>
        </section>

        <form onSubmit={handleSubmit}>
          {/* BOYUT VE HAMUR (Yan yana, bu kısım aynı) */}
          <div style={{ display: 'flex', gap: '40px', margin: '30px 0' }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '18px' }}>Boyut Seç *</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {['S', 'M', 'L'].map(size => (
                  <label key={size} style={{ cursor: 'pointer' }}>
                    <input type="radio" name="size" value={size} required onChange={(e) => setFormData({...formData, size: e.target.value})} style={{ marginRight: '10px' }} /> {size}
                  </label>
                ))}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '18px' }}>Hamur Seç *</h3>
              <select 
  name="dough" 
  value={formData.dough} 
  onChange={handleChange} // Burada state güncellenmeli
>
  <option value="">Hamur Seç</option>
  <option value="Süper İnce">Süper İnce</option>
  <option value="İnce">İnce Kenar</option>
  <option value="Kalın">Kalın Kenar</option>
</select>
            </div>
          </div>

          {/* MALZEMELER (Buraya ekledik) */}
          <div style={{ margin: '30px 0' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>Ek Malzemeler</h3>
            <p style={{ color: '#5f5f5f', fontSize: '14px', marginBottom: '20px' }}>En fazla 10 malzeme seçebilirsiniz. {ingredientPrice}₺</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
              {availableIngredients.map(ing => (
                <label key={ing} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '14px' }}>
                  <input 
                    type="checkbox" 
                    value={ing} 
                    onChange={handleIngredientChange} 
                    style={{ marginRight: '10px', width: '18px', height: '18px' }} 
                  /> 
                  {ing}
                </label>
              ))}
            </div>
          </div>

          {/* SİPARİŞ NOTU (Aynı) */}
          <div style={{ margin: '30px 0' }}>
            <h3 style={{ fontSize: '18px' }}>Sipariş Notu</h3>
            <textarea 
              placeholder="Siparişine eklemek istediğin bir not var mı?"
              onChange={(e) => setFormData({...formData, note: e.target.value})}
              style={{ width: '100%', height: '80px', padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>

          <hr style={{ border: '0.5px solid #ccc', margin: '40px 0' }} />

          {/* FİYAT VE BUTON (Dinamik fiyat eklendi) */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex' }}>
              <button type="button" onClick={() => setQuantity(q => Math.max(1, q - 1))} style={counterBtnStyle}>-</button>
              <div style={{ padding: '10px 20px', borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc', fontWeight: 'bold' }}>{quantity}</div>
              <button type="button" onClick={() => setQuantity(q => q + 1)} style={counterBtnStyle}>+</button>
            </div>

            <div style={{ border: '1px solid #ccc', borderRadius: '4px', width: '250px', padding: '20px', backgroundColor: '#fafafa' }}>
              <h4 style={{ margin: '0 0 15px 0' }}>Sipariş Toplamı</h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span>Seçimler ({formData.ingredients.length} adet)</span>
                <span>{totalIngredientsPrice.toFixed(2)}₺</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#E22222', fontWeight: 'bold', marginBottom: '20px' }}>
                <span>Toplam</span>
                <span>{grandTotal.toFixed(2)}₺</span>
              </div>
              <button type="submit" style={submitBtnStyle}>
                SİPARİŞ VER
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}


const counterBtnStyle = { padding: '10px 20px', border: '1px solid #ccc', backgroundColor: '#FDC913', cursor: 'pointer', fontWeight: 'bold' };
const submitBtnStyle = { width: '100%', backgroundColor: '#FDC913', padding: '15px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' };

export default OrderForm;