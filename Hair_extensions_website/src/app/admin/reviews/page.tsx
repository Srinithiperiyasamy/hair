import React from 'react';
import { Star, MessageSquare, CheckCircle2, XCircle, Trash2 } from 'lucide-react';
import pool from '../../../lib/db';

export default async function AdminReviewsPage() {
  let reviews = [];
  let dbError = "";

  try {
    const [rows] = await pool.query('SELECT * FROM reviews ORDER BY created_at DESC');
    reviews = rows as any[];
  } catch (err: any) {
    dbError = err.message;
    // Fallback dummy data
    reviews = [
      { id: 1, name: 'Nicole', text: 'I love working with One love hair. The quality is beautiful.', rating: 5, status: 'Approved', created_at: new Date() },
      { id: 2, name: 'Sarah', text: 'Fantastic clip-ins, they blend seamlessly.', rating: 5, status: 'Pending', created_at: new Date() },
    ];
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white tracking-tight">Customer Reviews</h1>
          <p className="text-gray-400 mt-2 text-sm">Monitor and moderate feedback from your customers.</p>
        </div>
      </div>

      <div className="bg-[#16181d] border border-white/5 rounded-2xl shadow-lg p-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="text-xs uppercase bg-[#0f1115] text-gray-500">
              <tr>
                <th className="px-4 py-3 rounded-l-lg">Customer</th>
                <th className="px-4 py-3">Rating</th>
                <th className="px-4 py-3">Review Text</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 rounded-r-lg text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                  <td className="px-4 py-4 font-medium text-white">{review.name}</td>
                  <td className="px-4 py-4">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'text-gray-600'}`} />
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-gray-400 max-w-md truncate">{review.text}</td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider border
                      ${review.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                      {review.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right space-x-2">
                     <button className="p-1.5 text-gray-400 hover:text-emerald-400 bg-white/5 hover:bg-emerald-400/10 rounded-md transition-colors" title="Approve">
                       <CheckCircle2 className="w-4 h-4" />
                     </button>
                     <button className="p-1.5 text-gray-400 hover:text-red-400 bg-white/5 hover:bg-red-400/10 rounded-md transition-colors" title="Delete">
                       <Trash2 className="w-4 h-4" />
                     </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    
    </div>
  );
}
