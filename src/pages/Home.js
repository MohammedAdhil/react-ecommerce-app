import React, { useContext } from 'react';
import { ProductContext } from '../contexts/ProductContext';
import Product from '../components/Product'
import Hero from '../components/Hero';

const Home = () => {
// get products
const { products} = useContext(ProductContext);
// console.log(products);

// get only mens and womens
const filteredProducts = products.filter(item => {
  return (item.category === "men's clothing" || item.category === "women's clothing")
})


const scrollToElement = () => {
  const element = document.getElementById("scrollToElement");
  if (element) {
    window.scroll({
      top: element.offsetTop,
      behavior: "smooth",
    });
  }
};

// console.log(filteredProducts)
return <div>
<Hero scrollToSection={scrollToElement} />

  <section id="scrollToElement" className='py-16'>
    <div className='container mx-auto'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0'>
        {filteredProducts.map((product) => {
          return (
            <Product key={product.id} product={product}/>
          )
        })}
      </div>
    </div>
  </section>



  </div>;
};

export default Home;
