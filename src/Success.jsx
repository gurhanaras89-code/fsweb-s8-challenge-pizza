import React from 'react';
import { useLocation } from 'react-router-dom';

function Success() {
  const location = useLocation();
  
  // Veriyi alıyoruz ama eğer yoksa boş bir obje atıyoruz ki sayfa patlamasın
  const order = location.state || {};

  // Debug için: Tarayıcı konsolunda verinin gelip gelmediğini görelim
  console.log("Gelen Sipariş Verisi:", order);

  return (
    <div className="success-page" style={{
      backgroundColor: '#E22222',
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      textAlign: 'center',
      margin: 0,
      padding: '20px'
    }}>
      <img 
        src="/pictures/logo.svg" 
        alt="Teknolojik Yemekler Logo" 
        style={{ width: '300px', marginBottom: '10px' , transform: "translateY(-35px)"}} 
    />
      <h2 style={{ fontFamily: 'Satisfy', color: '#FDC913', fontSize: '32px' }}>lezzetin yolda</h2>
      <h1 style={{ fontSize: '48px', fontWeight: '300', margin: '20px 0' }}>
        SİPARİŞİNİZ ALINDI!
      </h1>

      <hr style={{ width: '400px', border: '0.5px solid white', margin: '30px 0' }} />

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ fontSize: '24px' }}>Position Absolute Acı Pizza</h3>
        <div style={{ textAlign: 'left', display: 'inline-block', marginTop: '20px' }}>
          {/* order?. ifadesi sayesinde veri yoksa bile sayfa beyaz ekran vermez */}
          <p style={{ marginBottom: '8px' }}>Boyut: <strong>{order?.size || order?.boyut || "Seçilmedi"}</strong></p>
          <p style={{ marginBottom: '8px' }}>Hamur: <strong>{order?.dough || order?.thickness || "Seçilmedi"}</strong></p>
          <p style={{ marginBottom: '8px' }}>Ek Malzemeler: <strong>
            {Array.isArray(order?.ingredients) ? order.ingredients.join(', ') : "Malzeme Seçilmedi"}
          </strong></p>
          {/* Ek Malzemelerden hemen sonra burayı ekle */}
<p>Sipariş Notu: <strong>{order.note || "Not eklenmedi"}</strong></p>
        </div>
      </div>

      <div style={{
        border: '1px solid white',
        borderRadius: '8px',
        padding: '20px',
        width: '280px'
      }}>
        <h4 style={{ textAlign: 'left', marginBottom: '15px' }}>Sipariş Toplamı</h4>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span>Seçimler</span>
          <span>{order?.extraPrice || "0.00"}₺</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
          <span>Toplam</span>
          <span>{order?.totalPrice || "0.00"}₺</span>
        </div>
      </div>
    </div>
  );
}

export default Success;