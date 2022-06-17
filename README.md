# e-comm_api
//get("/products")
  http://localhost:8000/api/products/6298a20c30e8571d11f9591e
  get all product details


//router.get("/products/:id")
  http://localhost:8000/api/products/6298a20c30e8571d11f9591e
  get single product details
  

//router.get("/cart")
  http://localhost:8000/api/cart/
  get all products in cart
  
  
//router.post("/cart/:id")
  http://localhost:8000/api/cart/6298a20c30e8571d11f9591e
  body{
    userName:"user!"
  }
  

//router.delete("/cart/:id")
  http://localhost:8000/api/cart/6298a20c30e8571d11f9591e
  body{
    userName:"user!"
  }
  

//router.post("/review/:id")
  http://localhost:8000/api/review/6298a20c30e8571d11f9591e
  body{
    "review": "very good product",
    "start": 5,
    "userName": "user2"
  }
