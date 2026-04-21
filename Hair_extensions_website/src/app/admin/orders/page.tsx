import React from 'react';
import { ShoppingCart, Eye, Package, Truck, CheckCircle, XCircle } from 'lucide-react';
import pool from '../../../lib/db';

export default async function AdminOrdersPage() {
  let orders = [];
  let dbError = "";

  try {
    const [rows] = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
    orders = rows as any[];
  } catch (err: any) {
    dbError = err.message;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Processing': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Shipped': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'Cancelled': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white tracking-tight">Order Management</h1>
          <p className="text-gray-400 mt-2 text-sm">Monitor and manage customer purchases and delivery status.</p>
        </div>
      </div>

      {dbError && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm">
          Failed to load orders: {dbError}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#16181d] border border-white/5 p-4 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-amber-500/10 rounded-xl text-amber-500"><Package className="w-5 h-5" /></div>
          <div><p className="text-xs text-gray-500 uppercase font-bold">Pending</p><p className="text-xl font-bold text-white">12</p></div>
        </div>
        <div className="bg-[#16181d] border border-white/5 p-4 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500"><Truck className="w-5 h-5" /></div>
          <div><p className="text-xs text-gray-500 uppercase font-bold">Shipped</p><p className="text-xl font-bold text-white">45</p></div>
        </div>
        <div className="bg-[#16181d] border border-white/5 p-4 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500"><CheckCircle className="w-5 h-5" /></div>
          <div><p className="text-xs text-gray-500 uppercase font-bold">Delivered</p><p className="text-xl font-bold text-white">289</p></div>
        </div>
        <div className="bg-[#16181d] border border-white/5 p-4 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-red-500/10 rounded-xl text-red-500"><XCircle className="w-5 h-5" /></div>
          <div><p className="text-xs text-gray-500 uppercase font-bold">Cancelled</p><p className="text-xl font-bold text-white">4</p></div>
        </div>
      </div>

      <div className="bg-[#16181d] border border-white/5 rounded-2xl shadow-lg p-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="text-xs uppercase bg-[#0f1115] text-gray-500">
              <tr>
                <th className="px-4 py-3 rounded-l-lg">Order ID</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3 rounded-r-lg text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 && !dbError ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500">No orders found.</td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                    <td className="px-4 py-4 font-medium text-amber-500">{order.order_number}</td>
                    <td className="px-4 py-4 text-white">{order.customer_name}</td>
                    <td className="px-4 py-4 max-w-xs truncate">{order.product_name}</td>
                    <td className="px-4 py-4 text-center">
                      <span className={`px-2 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider border ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-white font-medium">${Number(order.amount).toFixed(2)}</td>
                    <td className="px-4 py-4 text-right space-x-2">
                       <button className="p-1.5 text-gray-400 hover:text-amber-400 bg-white/5 hover:bg-amber-400/10 rounded-md transition-colors" title="View Details">
                         <Eye className="w-4 h-4" />
                       </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    
    </div>
  );
}
