import React, { useEffect, useRef } from 'react';
import './PopularProducts.css'
import chair1 from './chair1.png'
import { Link } from 'react-router-dom';
import { UserAuth } from '../../AuthContext/AuthContext';

const PopularProducts = () => {
    const sectionRef = useRef(null);
    const {products} = UserAuth()

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              // Optionally, unobserve once visible if it only needs to animate once
              // observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 } // Trigger when 10% of the element is visible
      );
  
      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }
  
      // Clean up the observer on component unmount
      return () => {
        if (sectionRef.current) {
          observer.unobserve(sectionRef.current);
        }
      };
    }, []); // Empty dependency array means this effect runs once on mount

/*     const products = [
        {
            id: 1,
            name: 'Product 1',
            description: 'Lorem ipsum dolor sit ',
            price: 100,
            image: chair1,
            backgroundColor:'#F3CACA'
        },
        {
            id: 2,
            name: 'Product 2',
            description: 'Lorem ipsum dolor ',
            price: 100,
            image: chair1,
            backgroundColor:'#E0EFF6'
        }
        ,
        {
            id: 3,
            name: 'Product 3',
            description: 'Lorem ipsum dolor sit ',
            price: 100,
            image: chair1,
            backgroundColor:'#EEEBFF'
        }
        ,
        {
            id: 3,
            name: 'Product 3',
            description: 'Lorem ipsum dolor sit ',
            price: 100,
            image: chair1,
            backgroundColor:'#EEEBFF'
        }
        ,
        {
            id: 3,
            name: 'Product 3',
            description: 'Lorem ipsum dolor sit ',
            price: 100,
            image: chair1,
            backgroundColor:'#EEEBFF'
        }
        ,
        {
            id: 3,
            name: 'Product 3',
            description: 'Lorem ipsum dolor sit ',
            price: 100,
            image: chair1,
            backgroundColor:'#EEEBFF'
        }
        ,
        {
            id: 3,
            name: 'Product 3',
            description: 'Lorem ipsum dolor sit ',
            price: 100,
            image: chair1,
            backgroundColor:'#EEEBFF'
        }
    ] */

    return ( 
        <div ref={sectionRef} className="popular-products fade-in-section">
            <div className="container">
                <h1>Popular Products</h1>
                <div className="products">
                    {products.slice(0, 4).map((product,index)=>(
                        <div key={index} className="product" style={{backgroundColor:product.backgroundColor}}>
                            <div className="img">
                                <img width={205} height={270} src={product.image_url} alt="" />
                            </div>
                            <div className="infos">
                                <h2>{product.name}</h2>
                                <p>{product.description}</p>
                                <h2>{product.price}</h2>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="explore-button-container">
                    <Link to="/categories-products" className="explore-all-items-btn">Explore all items &rarr;</Link>
                </div>
            </div>
        </div>
     );
}
 
export default PopularProducts;