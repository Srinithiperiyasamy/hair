import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import pool from '../../../../lib/db';
import { redirect } from 'next/navigation';

export default function NewProductPage() {
  
  // Next.js Server Action
  async function addProduct(formData: FormData) {
    'use server';
    
    // Extract data
    const name = formData.get('name') as string;
    const price = parseFloat(formData.get('price') as string);
    const oldPrice = formData.get('oldPrice') ? parseFloat(formData.get('oldPrice') as string) : null;
    const img = formData.get('img') as string;
    const category = formData.get('category') as string || 'Bundle';
    const hairType = formData.get('hairType') as string;
    const length = formData.get('length') as string;
    const color = formData.get('color') as string;
    const stock = parseInt(formData.get('stock') as string) || 0;
    
    try {
      await pool.query(
        'INSERT INTO products (name, price, old_price, img, category, hair_type, length, color, stock, reviews_count) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          name, 
          price, 
          oldPrice, 
          img || 'https://images.unsplash.com/photo-1595424564881-81f19c9918bd?auto=format&fit=crop&w=600&q=80', 
          category, 
          hairType, 
          length, 
          color, 
          stock, 
          0
        ]
      );
      // Redirect back to products list ONLY if success
      redirect('/admin/products');
    } catch (err: any) {
      console.error("DATABASE ERROR DETAILS:", err);
      throw new Error(`Database connection failed: ${err.message || 'Unknown Error'}. Please ensure MySQL is running.`);
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700 max-w-4xl">
      
      <div className="flex items-center gap-4">
        <Link href="/admin/products" className="p-2 bg-[#16181d] border border-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-serif font-bold text-white tracking-tight">Add New Product</h1>
          <p className="text-gray-400 mt-2 text-sm">Fill in the hair details below to add a new product to your catalog.</p>
        </div>
      </div>

      <div className="bg-[#16181d] border border-white/5 rounded-2xl shadow-lg p-8">
        <form action={addProduct} className="space-y-8" suppressHydrationWarning>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Basic Info */}
            <div className="space-y-6">
              <h3 className="text-amber-500 font-medium border-b border-white/5 pb-2">Basic Information</h3>
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Product Name *</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required 
                  className="w-full bg-[#0f1115] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all placeholder-gray-600"
                  placeholder="e.g. Pure Virgin Indian Bundles"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-400 mb-1">Price ($) *</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    id="price" 
                    name="price" 
                    required 
                    className="w-full bg-[#0f1115] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all placeholder-gray-600"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label htmlFor="stock" className="block text-sm font-medium text-gray-400 mb-1">Stock Quantity</label>
                  <input 
                    type="number" 
                    id="stock" 
                    name="stock" 
                    className="w-full bg-[#0f1115] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all placeholder-gray-600"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-400 mb-1">Category</label>
                <select 
                  id="category" 
                  name="category" 
                  className="w-full bg-[#0f1115] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all"
                >
                  <option value="Bundles">Bundles</option>
                  <option value="Wigs">Wigs</option>
                  <option value="Frontals">Frontals</option>
                  <option value="Closures">Closures</option>
                </select>
              </div>

              <div>
                <label htmlFor="img" className="block text-sm font-medium text-gray-400 mb-1">Image URL</label>
                <input 
                  type="url" 
                  id="img" 
                  name="img" 
                  className="w-full bg-[#0f1115] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all placeholder-gray-600"
                  placeholder="https://example.com/hair.jpg"
                />
              </div>
            </div>

            {/* Hair Specifics */}
            <div className="space-y-6">
              <h3 className="text-amber-500 font-medium border-b border-white/5 pb-2">Hair Specifications</h3>
              
              <div>
                <label htmlFor="hairType" className="block text-sm font-medium text-gray-400 mb-1">Hair Type</label>
                <select 
                  id="hairType" 
                  name="hairType" 
                  className="w-full bg-[#0f1115] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all"
                >
                  <option value="Straight">Straight</option>
                  <option value="Curly">Curly</option>
                  <option value="Wavy">Wavy</option>
                  <option value="Kinky">Kinky</option>
                </select>
              </div>

              <div>
                <label htmlFor="length" className="block text-sm font-medium text-gray-400 mb-1">Length (inches)</label>
                <select 
                  id="length" 
                  name="length" 
                  className="w-full bg-[#0f1115] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all"
                >
                  <option value='10"'>10 inch</option>
                  <option value='12"'>12 inch</option>
                  <option value='14"'>14 inch</option>
                  <option value='16"'>16 inch</option>
                  <option value='18"'>18 inch</option>
                  <option value='20"'>20 inch</option>
                  <option value='22"'>22 inch</option>
                  <option value='24"'>24 inch</option>
                  <option value='26"'>26 inch</option>
                  <option value='28"'>28 inch</option>
                  <option value='30"'>30 inch</option>
                </select>
              </div>

              <div>
                <label htmlFor="color" className="block text-sm font-medium text-gray-400 mb-1">Color</label>
                <select 
                  id="color" 
                  name="color" 
                  className="w-full bg-[#0f1115] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all"
                >
                  <option value="Natural Black">Natural Black</option>
                  <option value="Jet Black">Jet Black</option>
                  <option value="Dark Brown">Dark Brown</option>
                  <option value="Light Brown">Light Brown</option>
                  <option value="Blonde">Blonde</option>
                  <option value="Burgundy">Burgundy</option>
                </select>
              </div>

              <div className="pt-2">
                 <p className="text-xs text-gray-500 italic">Note: These specifications help customers find the perfect match for their style.</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex justify-end">
            <button 
              type="submit" 
              className="bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-black font-bold px-10 py-4 rounded-xl flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(251,191,36,0.3)] hover:shadow-[0_0_30px_rgba(251,191,36,0.5)] transform hover:-translate-y-1 active:translate-y-0"
            >
              <Save className="w-5 h-5" />
              <span>Save Product</span>
            </button>
          </div>

        </form>
      </div>
    
    </div>
  );
}
