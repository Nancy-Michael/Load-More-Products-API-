import React, { useEffect, useState } from 'react'
import './style.css'

function LoadMore() {

    const [loading, setLoding] = useState(false);
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);
    const [disableButton,setDisableButton]=useState(false)

    async function fetchProducts() {
        try {
            setLoding(true);
            const response = await fetch(
                `https://dummyjson.com/products?limit=20&skip=${count === 0 ? 0 : count * 20
                }`);

            const result =await response.json();


            if (result) {
                setProducts((prevData)=> [...prevData,...result.products])
                setLoding(false)
            }
            console.log(result);

        } catch(e) {
            console.log(e)
            setLoding(false)
        }

    }

    useEffect(() => {
        fetchProducts()
    },[count])

    useEffect(() => {
        if ( products.length === 100) {
            setDisableButton(true)
        }
    },[products])

    if (loading)
        return <div>Loading data! Please wait..</div>

  return (
      <div className='container'>
          <div className='product-container'>
              {products ?
                  products.map((item) => (
                      <div className='product'
                          key={item.id}>
                          <img src={item.thumbnail
                          } alt={item.title} />
                          <p>{item.title}</p>
                      </div>
                  ))
                : null}
          </div>
          <div className='load-more-button'>
              <button disabled={disableButton}
                  onClick={() => setCount(count + 1)}>Load More
              </button>
              {
                  disableButton ? <p>You have got 100 Items .....</p>:null
              }
          </div>

    </div>
  )
}

export default LoadMore
