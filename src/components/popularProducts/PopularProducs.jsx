import React, { useEffect, useRef, useState } from 'react';
import './PopularProducts.css'
import { Link } from 'react-router-dom';
import { UserAuth } from '../../AuthContext/AuthContext';

const PopularProducts = () => {
    const sectionRef = useRef(null);
    const {products} = UserAuth();
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    // Limit to 8 items
    const displayProducts = products.slice(0, 8);

    return ( 
        <div ref={sectionRef} className="popular-products fade-in-section">
            <div className="container">
                <h1>Popular Products</h1>
                {displayProducts && displayProducts.length > 0 ? (
                    <>
                        <div className="products">
                            {displayProducts.map((product, index) => (
                                <div 
                                    key={index} 
                                    className="product"
                                >
                                    <div className="img">
                                        <img src={product.image_url} alt={product.name} />
                                    </div>
                                    <div className="infos">
                                        <h2>{product.name}</h2>
                                        <p>{product.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="explore-button-container">
                            <Link to="/products" className="explore-all-items-btn">Explore all items &rarr;</Link>
                        </div>
                    </>
                ) : (
                    <div className="no-products">
                        <i className="fas fa-box-open"></i>
                        <h3>No Products Found</h3>
                        <p>There are no popular products available at the moment.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
 
export default PopularProducts;