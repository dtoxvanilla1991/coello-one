"use client";

import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: 0 });

  useEffect(() => {
    fetch("http://localhost:3500/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const handleAddProduct = async () => {
    const response = await fetch("http://localhost:3500/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await response.json();
    setProducts((prevProducts) => [...prevProducts, data]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Nike Products</h1>
      <ul className="mb-4">
        {products.map((product) => (
          <li key={product.id} className="mb-2">
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
          className="border p-2 mr-2"
        />
        <input
          type="number"
          placeholder="Product Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })
          }
          className="border p-2 mr-2"
        />
        <button
          onClick={handleAddProduct}
          className="bg-blue-500 text-white p-2">
          Add Product
        </button>
      </div>
    </div>
  );
}
