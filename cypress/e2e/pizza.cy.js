describe('Pizza Sipariş Formu Testleri', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/pizza'); 
  });

  it('İsim inputuna metin girilebiliyor mu?', () => {
    // ID ile nokta atışı yapıyoruz
    cy.get('#name-input') 
      .type('Gürhan Aras') 
      .should('have.value', 'Gürhan Aras');
  });

  it('Birden fazla malzeme seçilebiliyor mu?', () => {
    // Checkbox'lar için force:true her zaman hayat kurtarır
    cy.get('input[type="checkbox"]').check(['Pepperoni', 'Sosis', 'Mısır'], { force: true });
    cy.get('input[value="Pepperoni"]').should('be.checked');
  });

  it('Form başarıyla gönderilip sipariş tamamlanıyor mu?', () => {
    cy.get('#name-input').type('Gürhan'); // ID ile bul
    cy.get('input[value="L"]').check({ force: true }); 
    cy.get('#dough-select').select('Kalın Kenar'); 
    cy.get('input[type="checkbox"]').check(['Pepperoni', 'Sosis'], { force: true });
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/success');
  });
});