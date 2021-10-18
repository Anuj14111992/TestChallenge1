
    it('Getting state name using Bearer token', function(){
        

       cy.request({
           method:'GET',
           url:'https://www.universal-tutorial.com/api/getaccesstoken',
           headers: {
               'api-token': 'lf7FO69mXhvrFg9zbOMEdD7tW5wZX24RBdZmmE6aP01Y6n7mXCOjVChhDKC9t5l0YuU',
               'Accept':'application/json',
               'user-email': 'anujchauhan411@gmail.com'

           }
        }).then(function(response){
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('auth_token')
            const token = response.body['auth_token']
            return token
           
          
      
        })
        .then((token)=>{
      
       cy.request({
        method:'GET',
        url:'https://www.universal-tutorial.com/api/states/India',
        headers: {
            'Accept':'application/json',
            'Authorization': 'Bearer '+token,

        },
        response: []
     }).then(function(response){
         cy.log(response.body)
         expect(response.status).to.eq(200)
         cy.log(response.status)
         cy.wrap(response.body).should(items => {
            expect(items.map(i => i.state_name)).to.include('Dadra and Nagar Haveli')
          })
        
     })
    })
    
     })
     
 