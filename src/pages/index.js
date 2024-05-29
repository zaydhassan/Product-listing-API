import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => setProducts(response.data));
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-6">Product Listing</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full p-2 border border-gray-300 rounded"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div
            key={product.id}
            className="border p-4 rounded shadow hover:shadow-lg cursor-pointer"
            onClick={() => setSelectedProduct(product)}
          >
            <img src={product.image} alt={product.title} className="w-full h-48 object-cover mb-4"/>
            <h2 className="text-xl font-bold mb-2">{product.title}</h2>
            <p className="text-gray-700">${product.price}</p>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full relative">
            <button
              className="absolute top-4 right-4 text-gray-600"
              onClick={() => setSelectedProduct(null)}
            >
              &times;
            </button>
            <img src={selectedProduct.image} alt={selectedProduct.title} className="w-full h-64 object-cover mb-4"/>
            <h2 className="text-2xl font-bold mb-2">{selectedProduct.title}</h2>
            <p className="text-gray-700 mb-4">${selectedProduct.price}</p>
            <p className="text-gray-600">{selectedProduct.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
