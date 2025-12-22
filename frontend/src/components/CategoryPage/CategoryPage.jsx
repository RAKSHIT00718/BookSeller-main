/* CategoryPage.jsx */

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ShoppingBag, Plus, Minus, Star, ArrowLeft } from "lucide-react";
import { useCart } from "../../CartContext/CartContext";
import { categoryBooks, categories } from "../../assets/dummydata";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const { cart, addToCart, updateCartItem } = useCart();
  const [sortBy, setSortBy] = useState("title");

  // Get category info and books
  const categoryInfo = categories.find(cat => cat.id === categoryId);
  const books = categoryBooks[categoryId] || [];

  // Helpers for cart state
  const isInCart = (id) => cart.items?.some(item => item.id === id);
  const getCartQuantity = (id) => cart.items?.find(item => item.id === id)?.quantity || 0;

  // Cart handlers
  const handleAddToCart = (book) =>
    addToCart({ id: book.id, title: book.title, price: book.price, quantity: 1 });
  
  const handleIncrement = (id) => {
    const currentQuantity = getCartQuantity(id);
    const book = books.find(b => b.id === id);
    updateCartItem(id, currentQuantity + 1, book.title, book.price);
  };

  const handleDecrement = (id) => {
    const currentQuantity = getCartQuantity(id);
    if (currentQuantity > 1) {
      const book = books.find(b => b.id === id);
      updateCartItem(id, currentQuantity - 1, book.title, book.price);
    }
  };

  // Sort books
  const sortedBooks = [...books].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return parseInt(a.price) - parseInt(b.price);
      case "price-high":
        return parseInt(b.price) - parseInt(a.price);
      case "author":
        return a.author.localeCompare(b.author);
      default:
        return a.title.localeCompare(b.title);
    }
  });

  if (!categoryInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Category not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <button 
              onClick={() => window.history.back()} 
              className="mr-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-4xl md:text-5xl font-bold">
              {categoryInfo.title}
            </h1>
          </div>
          <p className="text-xl text-blue-100 max-w-2xl">
            {categoryInfo.description}
          </p>
          <p className="text-lg text-blue-200 mt-2">
            Curated by {categoryInfo.author}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {books.length} Books in Collection
          </h2>
          
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="title">Title A-Z</option>
              <option value="author">Author A-Z</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {sortedBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-[3/4] relative overflow-hidden bg-gray-100">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                    {book.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                  {book.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{book.author}</p>
                <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                  {book.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">
                    ₹{book.price}
                  </span>
                  
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">4.5</span>
                  </div>
                </div>

                <div className="mt-4">
                  {!isInCart(book.id) ? (
                    <button
                      onClick={() => handleAddToCart(book)}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </button>
                  ) : (
                    <div className="flex items-center justify-center space-x-3 bg-gray-100 rounded-lg py-2">
                      <button
                        onClick={() => handleDecrement(book.id)}
                        className="p-1 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow"
                      >
                        <Minus className="w-4 h-4 text-gray-600" />
                      </button>
                      <span className="text-lg font-semibold min-w-[2rem] text-center">
                        {getCartQuantity(book.id)}
                      </span>
                      <button
                        onClick={() => handleIncrement(book.id)}
                        className="p-1 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow"
                      >
                        <Plus className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {books.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">No books found in this category.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CategoryPage;