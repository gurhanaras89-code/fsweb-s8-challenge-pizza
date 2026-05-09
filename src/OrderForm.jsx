import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './App.css';
import Home1 from './Home1';
import axios from 'axios';

function OrderForm() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    size: '',
    thickness: '',
    ingredients: [], 
    note: '',
    name: ''
  });
  const [quantity, setQuantity] = useState(1);

  const isValid = formData.size && formData.name.length >= 3;
  const basePrice = 85.50;
  const ingredientPrice = 5.00; 

  const availableIngredients = [
    "Pepperoni", "Sucuk", "Kanada Jambonu", "Mantar",
    "Sosis", "Soğan", "Domates", "Biber",
    "Tavuk Izgara", "Ananas", "Mısır", "Jalapeno",
    "Sarımsak", "Kabak", "Zeytin" 
  ];

  const handleIngredientChange = (e) => {
    const { value, checked } = e.target;
    let updatedIngredients = [...formData.ingredients];

    if (checked) {
      if (updatedIngredients.length < 10) {
        updatedIngredients.push(value);
      } else {
        alert("En fazla 10 malzeme seçebilirsiniz!");
        return; 
      }
    } else {
      updatedIngredients = updatedIngredients.filter(item => item !== value);
    }

    setFormData({ ...formData, ingredients: updatedIngredients });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const orderSummary = {
      name: "Position Absolute Acı Pizza",
      size: formData.size,         
      dough: formData.thickness,  
      ingredients: formData.ingredients, 
      totalPrice: grandTotal,     
      extraPrice: totalIngredientsPrice 
    };
    axios.post('https://reqres.in/api/pizza', orderSummary, {
      headers: {
        'x-api-key': 'reqres-free-v1' 
      }
    })
      .then(response => {
        console.log("Sipariş Özeti", response.data);
      })
      .catch(error => {
        console.error("Sipariş gönderilirken hata oluştu:", error);
      });
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
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div className="order-form-wrapper" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', 
      width: '100%',
      margin: '0 auto'
    }}>
      <header style={{
        backgroundColor: '#E22222',
        width: '100vw', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw', marginBottom: "-20px", paddingBottom: "30px", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}>
        <img
          src="/pictures/logo.svg"
          alt="Teknolojik Yemekler Logo"
          style={{ width: '300px', marginBottom: '10px', transform: "translateY(35px)" }}
        />
      </header>
      <main style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 20px' }}>
        <section className="pizza-intro">
          <img src="/pictures/form-banner.png" alt="Pizza" style={{ width: '100%', borderRadius: '8px', transform: "translateY(-20px)" }} />
          <nav style={{
            color: 'white',
            fontSize: '14px',
            fontWeight: '300', transform: "translateY(-50px)!important"
          }}>
          </nav>
          <span>Ana Sayfa - </span> <span style={{ color: "red" }}> Sipariş Oluştur</span>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: "1px" }}>Position Absolute Pizza</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 0' }}>
            <span style={{ fontSize: '28px', fontWeight: 'bold' }}>{basePrice.toFixed(2)}₺</span>
            <span style={{ color: '#5f5f5f' }}>4.9 (928)</span>
          </div>
          <p style={{ color: '#5f5f5f', lineHeight: '1.6' }}>Frontend Dev olarak hala position absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir. Küçük bir pizzaya bazen pizzetta denir.</p>
        </section>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', gap: '40px', margin: '30px 0' }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '18px', marginBottom: '15px' }}>Boyut Seç <span style={{ color: 'red' }}>*</span></h3>
              <div style={{ display: 'flex', gap: '10px' }}>
                {['S', 'M', 'L'].map(size => (
                  <label
                    key={size}
                    style={{
                      position: 'relative',
                      cursor: 'pointer', display: 'block',
                      width: '45px', 
                      height: '45px' 
                    }} >
                    <input
                      type="radio"
                      name="size"
                      value={size}
                      required
                      checked={formData.size === size}
                      onChange={handleChange} 
                      style={{
                        position: 'absolute',
                        opacity: 0, width: 0,
                        height: 0,
                        margin: 0
                      }}
                    />
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center', justifyContent: 'center',
                        width: '100%',
                        height: '100%', backgroundColor: formData.size === size ? '#FDC913' : '#faf7f2', 
                        borderRadius: '50%', 
                        fontWeight: '600',
                        color: '#292929', 
                        transition: 'background-color 0.3s ease', 
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
                name="thickness"
                id="dough-select"
                value={formData.dough}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  backgroundColor: '#faf7f2',
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
                <option value="Süpper İnce">Süpper İnce</option>
                <option value="İnce Kenar">İnce Kenar</option>
                <option value="Kalın Kenar">Kalın Kenar</option>
              </select>
            </div>
          </div>
          <div style={{ marginTop: '40px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '5px' }}>Ek Malzemeler</h3>
            <p style={{ fontSize: '14px', color: '#5f5f5f', marginBottom: '20px' }}>En fazla 10 malzeme seçebilirsiniz. 5₺</p>

            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '20px 10px' 
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
                    <input
                      type="checkbox"
                      name="name"
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

          <div style={{ margin: '30px 0' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>Sipariş Notu</h3>
            <textarea
              placeholder="Siparişine eklemek istediğin bir not var mı?"
              id="name-input"
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              style={{
                width: '100%',
                height: '80px',
                padding: '15px',
                backgroundColor: '#faf7f2', 
                border: 'none',             
                borderRadius: '8px',       
                fontSize: '14px', color: '#5f5f5f',
                fontFamily: 'inherit',     
                resize: 'none',             
                outline: 'none'             
              }}
            />
          </div>

          <hr style={{ border: '0.5px solid black', margin: '40px 0' }} />
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


const counterBtnStyle = { padding: '10px 20px', border: '1px solid #ccc', backgroundColor: '#FDC913', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' };
const submitBtnStyle = { width: '100%', backgroundColor: '#FDC913', padding: '15px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' };

export default OrderForm;