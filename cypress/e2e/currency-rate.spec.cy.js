context('SpectroCoin Currency Price Rates', () => {
  before(function () {
    cy.visit('https://spectrocoin.com/en/bitcoin-price-rates.html');
  })

    it('Click the dropdown to open the dropdown menu', () => {
      cy.get('.css-c7znz7').click();
    })
    
    it('Find the "EUR" currency and click on it', () => {
      cy.get('.css-1bac1wu-menu').contains('EUR').click();
      cy.reload()
    })
  
    it('Check that "EUR" is selected', () => {
      cy.get('.css-c7znz7').contains('EUR');
    })

    it('Select Bitcoin currency from the list', () => {
      cy.get('table tbody')
      .find('tr')
      cy.get('td').eq(0).should('contain.text', 'Bitcoin')
      .parent()
      .click()
      cy.url().should('include', '/en/buy-bitcoin.html')
    }) 

    it('Check if last 24 hours rate change was positive', () => {
      cy.get('.CryptoStatistics_list__knBbC')
      .find('li').eq(1).should('contain.text', 'Price change 24h')
      .within(() => {
        cy.get('div').eq(1)
        .invoke('text').then((rateChangeText) => {
          const rateChange = parseFloat(rateChangeText.replace(/[^0-9.-]+/g, ''));
          cy.wrap(rateChange).should('be.greaterThan', 0, 'Rate change is greater than 0, indicating a positive change');
        })
      })
    }) 
  })