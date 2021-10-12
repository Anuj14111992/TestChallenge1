/// <reference types="cypress"/>
/// <reference types="cypress-iframe" />
import 'cypress-iframe';
import { invoke } from 'lodash';


it('Opening Luma Homepage',function(){
  cy.visit('http://mage2-firecheckout-osc.tst.limep.net')
   })


 it('Selecting item and adding to cart and going for checkout', function(){
  cy.get('#search', { timeout: 10000 }).type('Jacket{enter}')
  cy.get(':nth-child(1) > .product-item-info > .photo > .product-image-container > .product-image-wrapper > .product-image-photo',{ timeout: 10000 }).click()
  cy.get('#option-label-size-145-item-167',{ timeout: 10000 }).click()
 Cypress.on('uncaught:exception', (err, runnable) => {
  return false
 })
 cy.get('#option-label-color-93-item-52', { timeout: 10000 }).click()

  cy.get('#product-addtocart-button').click();
  cy.get('#product_addtocart_form').submit();
  cy.get('.showcart').click();
  cy.get('#top-cart-btn-checkout').click({force: true});
  cy.url().should('contains', 'http://mage2-firecheckout-osc.tst.limep.net/checkout/');
  
  cy.wait(5000)
  cy.get('.checkout-methods-items > :nth-child(2) > .action',{ timeout: 10000 }).click()
  

 })

it('Filling all details required in checkout page', function(){
  cy.get('#customer-email-fieldset > .required > .control > #customer-email',{ timeout: 10000 }).should('be.visible').type('anujchauhan411@gmail.com').tab()
  .tab().type('Anuj').tab()
  .tab().type('chauhan').tab()
  .tab().type('1 Francis Street, New South Wales, 2114').tab().tab()
  .tab().type('Sydney').tab()
  .tab().select('Alaska')
  .tab().type('2114')
  .tab().type('+61403256771')
  cy.wait(5000)
  })

it('Selecting card payment radio button and Toggle button One Time Payment to 4 interest payments', function(){
  cy.get('#lpcheckout',{timeout: 10000 }).click()

  cy.get('#lpcheckout-iframe').its('0.contentDocument.body').find('.lpPaymentOptionCheckbox').click({force: true})
})
     
it('Getting One time payment, actual cost and Shipping cost', function(){
  cy.get('#lpcheckout-iframe').its('0.contentDocument.body').find('.p-ontime > .price').invoke('text').as('oneTimePayment')
  cy.get('.sub > .amount > .price').invoke('text').as('actualCost')
  cy.get('.shipping > .amount > .price').invoke('text').as('shippingCost')
  })

 it('Comparing the shipping and actual cost', function(){
  cy.log('The One Time Payment is:', this.oneTimePayment)
   cy.log('The Item Amount is:', this.actualCost)
   cy.log('The Shipping cost is:', this.shippingCost)
   const orderTotal = this.actualCost + this.shippingCost
   if(this.oneTimePayment=orderTotal){
     cy.log('one time payment and sum of actual amount & Shipping cost are equal')
   } else{
     cy.log('one time payment and sum of actual amount & Shipping cost are not equal')
   }
   })

  it('Verify email has been pre-populated as per email given', function(){
    cy.get('#lpcheckout-iframe').its('0.contentDocument.body').find('.email').should('value','anujchauhan411@gmail.com')
    cy.log('Verified')
  })
  it('Toggle back the button to One Time Payment', function(){
    cy.get('#lpcheckout',{timeout: 10000 }).click()

  cy.get('#lpcheckout-iframe').its('0.contentDocument.body').find('.lpPaymentOptionCheckbox').click({force: true})

  })
  it('Placing order', function(){
    cy.get('.place-order > .actions-toolbar > div.primary > .action').click()
  })
  it('Veryfying Error for card details', function(){
  
    cy.get('#lpcheckout-iframe').its('0.contentDocument.body').find('.error-msg-noa',{timeout: 10000 }).should("text","Error: is required")
    cy.log('Card Expiry detail error varified')
    
    



  })