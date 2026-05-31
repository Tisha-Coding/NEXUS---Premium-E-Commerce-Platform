import React, { useContext, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import axios from "axios";
import { toast } from "react-toastify";

const Collection = () => {
  const { search, showSearch, setSearch } = useContext(ShopContext);
  const [searchParams] = useSearchParams();
  const [showFilter, setShowFilter] = useState(true);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortOrder, setSortOrder] = useState("relevant");
  const [sortType, setSortType] = useState("relevant");
  const [products, setProducts] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
        setFilterProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  // Auto-filter by category from URL params (e.g., /collection?category=MEN)
  useEffect(() => {
    const urlCategory = searchParams.get("category");
    if (urlCategory) {
      setCategory([urlCategory.toUpperCase()]);
    }
  }, [searchParams]);

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    if (sortOrder === "low-high") {
      productsCopy.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high-low") {
      productsCopy.sort((a, b) => b.price - a.price);
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => {
          const priceA = a.finalPrice && a.saleApplied ? a.finalPrice : a.price;
          const priceB = b.finalPrice && b.saleApplied ? b.finalPrice : b.price;
          return priceA - priceB;
        }));
        break;
      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => {
          const priceA = a.finalPrice && a.saleApplied ? a.finalPrice : a.price;
          const priceB = b.finalPrice && b.saleApplied ? b.finalPrice : b.price;
          return priceB - priceA;
        }));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, sortOrder, search, showSearch]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortType(value);
    setSortOrder(value);
  };

  const clearFilters = () => {
    setCategory([]);
    setSubCategory([]);
    setSearch("");
    setSortOrder("relevant");
    setSortType("relevant");
  };

  const hasActiveFilters = category.length > 0 || subCategory.length > 0 || (showSearch && search);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header section */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          <p className="text-gray-600 text-sm mt-2">
            Browse our complete collection of premium fashion items
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 flex-shrink-0">
            {/* Mobile filter toggle */}
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="lg:hidden w-full flex items-center justify-between bg-black text-white px-4 py-3 rounded-lg font-semibold mb-4 transition-all"
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters
              </span>
              <svg className={`w-5 h-5 transform transition-transform ${showFilter ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>

            {/* Filter panels */}
            <div className={`space-y-4 ${showFilter ? "" : "hidden lg:block"}`}>
              {/* Categories */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-widest mb-4">Category</h3>
                <div className="space-y-3">
                  {["MEN", "WOMEN", "KIDS"].map((cat) => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        value={cat}
                        checked={category.includes(cat)}
                        onChange={toggleCategory}
                        className="w-4 h-4 rounded border-gray-300 text-black cursor-pointer"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-black transition-colors">
                        {cat.charAt(0) + cat.slice(1).toLowerCase()}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Type */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-widest mb-4">Type</h3>
                <div className="space-y-3">
                  {["Topwear", "Bottomwear", "Winterwear"].map((type) => (
                    <label key={type} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        value={type}
                        checked={subCategory.includes(type)}
                        onChange={toggleSubCategory}
                        className="w-4 h-4 rounded border-gray-300 text-black cursor-pointer"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-black transition-colors">
                        {type}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="w-full bg-black text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-900 transition-colors"
                >
                  Clear Filters
                </button>
              )}

              {/* Active filters */}
              {hasActiveFilters && (
                <div className="bg-gray-100 rounded-lg p-4">
                  <p className="text-xs text-gray-600 font-semibold uppercase mb-2">Active Filters:</p>
                  <div className="flex flex-wrap gap-2">
                    {category.map((cat) => (
                      <span key={cat} className="bg-black text-white text-xs px-3 py-1 rounded-full">
                        {cat}
                      </span>
                    ))}
                    {subCategory.map((sub) => (
                      <span key={sub} className="bg-gray-800 text-white text-xs px-3 py-1 rounded-full">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Products Section */}
          <div className="flex-1">
            {/* Sort bar */}
            <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-200">
              <div>
                <p className="text-gray-600 text-sm">
                  {filterProducts.length} {filterProducts.length === 1 ? "product" : "products"} found
                </p>
              </div>
              <select
                onChange={handleSortChange}
                value={sortType}
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all"
              >
                <option value="relevant">Sort: Relevant</option>
                <option value="low-high">Sort: Low to High</option>
                <option value="high-low">Sort: High to Low</option>
              </select>
            </div>

            {/* Products Grid */}
            {filterProducts.length === 0 ? (
              <div className="py-24 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <p className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  No products found
                </p>
                <p className="text-sm text-gray-600 max-w-md mx-auto mb-6">
                  {hasActiveFilters
                    ? "Try adjusting your filters or search terms to find what you're looking for."
                    : "No products available at the moment. Check back soon!"}
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {filterProducts.map((item) => (
                  <ProductItem
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    image={item.image}
                    price={item.price}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
