import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './App.css';
import Home1 from './Home1';

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
    "Sarımsak", "Kabak", "Zeytin" // Kabak ve mantar gibi Figma'daki diğerlerini ekleyebilirsin
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
      <header style={{
    backgroundColor: '#E22222', // O meşhur pizza kırmızısı
    width: '100vw',             // Sayfa genişliğinde tam uzasın
    position: 'static',
    left: '50%',
    right: '50%',
    marginLeft: '-50vw',        // Container dışına taşması için sihirli dokunuş
    marginRight: '-50vw',
    marginBottom: "-20px",
    paddingBottom: "30px" ,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    
}}>
    {/* İkinci resimdeki logo */}
    <img 
        src="/pictures/logo.svg" 
        alt="Teknolojik Yemekler Logo" 
        style={{ width: '300px', marginBottom: '10px' , transform: "translateY(35px)"}} 
    />
    
    {/* Navigasyon (Anasayfa - Sipariş Oluştur) */}
    
</header>

      <main style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 20px' }}>
        {/* BANNER VE BILGILER (Bu kısımlar aynı) */}
        <section className="pizza-intro">
          <img src="/pictures/form-banner.png" alt="Pizza" style={{ width: '100%', borderRadius: '8px' ,transform: "translateY(-20px)" }} />
          <nav style={{
        color: 'white',
        fontSize: '14px',
        
        fontWeight: '300' , transform: "translateY(-50px)!important"
    }}>
    </nav>
          <span>Ana Sayfa - </span> <span style={{color:"red" }}> Sipariş Oluştur</span>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold' , marginTop: "1px"  }}>Position Absolute Pizza</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 0' }}>
            <span style={{ fontSize: '28px', fontWeight: 'bold' }}>{basePrice.toFixed(2)}₺</span>
            <span style={{ color: '#5f5f5f' }}>4.9 (928)</span>
          </div>
          <p style={{ color: '#5f5f5f', lineHeight: '1.6' }}>Frontend Dev olarak hala position absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir. Küçük bir pizzaya bazen pizzetta denir.</p>
        </section>

        <form onSubmit={handleSubmit}>
          {/* BOYUT VE HAMUR (Yan yana, bu kısım aynı) */}
          <div style={{ display: 'flex', gap: '40px', margin: '30px 0' }}>
            {/* BOYUT VE HAMUR - Sol Taraf (satır 158'den başlar) */}
<div style={{ flex: 1 }}>
  <h3 style={{ fontSize: '18px', marginBottom: '15px' }}>Boyut Seç <span style={{ color: 'red' }}>*</span></h3>
  
  {/* Butonları yan yana dizmek için flex container */}
  <div style={{ display: 'flex', gap: '10px' }}>
    {['S', 'M', 'L'].map(size => (
      <label 
        key={size} 
        style={{ 
          position: 'relative', 
          cursor: 'pointer', 
          display: 'block',
          width: '45px', // Buton genişliği
          height: '45px' // Buton yüksekliği
        }}
      >
        {/* Standart radyo butonunu gizliyoruz */}
        <input 
          type="radio" 
          name="size" 
          value={size} 
          required 
          checked={formData.size === size} // formData state'ine göre kontrol
          onChange={handleChange} // onChange fonksiyonunu kullan
          style={{
            position: 'absolute',
            opacity: 0, // Tamamen gizle
            width: 0,
            height: 0,
            margin: 0
          }}
        />
        
        {/* Bu span, bizim gördüğümüz yuvarlak buton olacak */}
        <span 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: formData.size === size ? '#FDC913' : '#faf7f2', // Seçili ise Sarı, değilse Krem
            borderRadius: '50%', // Yuvarlak yapmak için
            fontWeight: '600',
            color: '#292929', // Yazı rengi
            transition: 'background-color 0.3s ease', // Geçiş efekti
            fontSize: '16px'
          }}
        >
          {size}
        </span>
      </label>
    ))}
  </div>
</div>
            <div style={{ flex: 1 }}>
  <h3 style={{ fontSize: '18px', marginBottom: '15px' }}>Hamur Seç <span style={{ color: 'red' }}>*</span></h3>
  
  <select
    name="dough"
    value={formData.dough}
    onChange={handleChange}
    required
    style={{
      width: '100%',
      padding: '12px 15px',
      backgroundColor: '#faf7f2', // Figma'daki krem rengi
      border: 'none',
      borderRadius: '8px',
      fontSize: '14px',
      color: '#5f5f5f',
      cursor: 'pointer',
      outline: 'none',
      fontWeight: '500'
    }}
  >
    <option value="">—Hamur Kalınlığı Seç —</option>
    <option value="ince">Süpper İnce</option>
    <option value="orta">İnce Kenar</option>
    <option value="kalin">Kalın Kenar</option>
  </select>
</div>
          </div>

          {/* MALZEMELER (Buraya ekledik) */}
          
<div style={{ marginTop: '40px' }}>
  <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '5px' }}>Ek Malzemeler</h3>
  <p style={{ fontSize: '14px', color: '#5f5f5f', marginBottom: '20px' }}>En fazla 10 malzeme seçebilirsiniz. 5₺</p>
  
  {/* MALZEME GRİD YAPISI (3 Sütun) */}
  <div style={{ 
    display: 'grid', 
    gridTemplateColumns: 'repeat(3, 1fr)', 
    gap: '20px 10px' // Satır arası 20px, sütun arası 10px
  }}>
    {availableIngredients.map((ing) => (
      <label 
        key={ing} 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '600',
          color: '#5f5f5f'
        }}
      >
        <div style={{ position: 'relative', marginRight: '12px', width: '40px', height: '40px' }}>
          {/* Gerçek Checkbox'ı Gizle */}
          <input
            type="checkbox"
            value={ing}
            checked={formData.ingredients.includes(ing)}
            onChange={handleIngredientChange}
            style={{
              position: 'absolute',
              opacity: 0,
              cursor: 'pointer',
              height: 0,
              width: 0,
            }}
          />
          
          {/* Bizim Sarı/Krem Kutu */}
          <div style={{
            height: '40px',
            width: '40px',
            backgroundColor: formData.ingredients.includes(ing) ? '#FDC913' : '#faf7f2', // Seçiliyse Sarı
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease'
          }}>
            {/* Seçiliyse içine bir "tik" veya "X" koyabilirsin (Figma'ya göre) */}
            {formData.ingredients.includes(ing) && (
              <span style={{ fontSize: '18px', fontWeight: 'bold' }}>✓</span>
            )}
          </div>
        </div>
        {ing}
      </label>
    ))}
  </div>
</div>

          {/* SİPARİŞ NOTU (Aynı) */}
          {/* SİPARİŞ NOTU */}
<div style={{ margin: '30px 0' }}>
  <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>Sipariş Notu</h3>
  <textarea
    placeholder="Siparişine eklemek istediğin bir not var mı?"
    onChange={(e) => setFormData({...formData, note: e.target.value})}
    style={{
      width: '100%',
      height: '80px',
      padding: '15px',
      backgroundColor: '#faf7f2', // Diğer form elemanlarıyla uyumlu krem rengi
      border: 'none',             // Kenarlığı kaldırdık
      borderRadius: '8px',        // Köşeleri yuvarlattık
      fontSize: '14px',
      color: '#5f5f5f',
      fontFamily: 'inherit',      // Fontun bozulmaması için
      resize: 'none',             // Kullanıcının kutuyu sağa sola çekiştirmesini engeller (isteğe bağlı)
      outline: 'none'             // Focus olduğunda çıkan mavi çizgiyi engellemek için
    }}
  />
</div>

          <hr style={{ border: '0.5px solid black', margin: '40px 0' }} />

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
      <Home1 />
    </div>
  );
}


const counterBtnStyle = { padding: '10px 20px', border: '1px solid #ccc', backgroundColor: '#FDC913', borderRadius: '5px' ,cursor: 'pointer', fontWeight: 'bold' };
const submitBtnStyle = { width: '100%', backgroundColor: '#FDC913', padding: '15px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' };

export default OrderForm;