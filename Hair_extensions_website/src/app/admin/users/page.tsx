import React from 'react';
import { Users, UserX, UserCheck, Trash2, History } from 'lucide-react';
import pool from '../../../lib/db';

export default async function AdminUsersPage() {
  let users = [];
  let dbError = "";

  try {
    const [rows] = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
    users = rows as any[];
  } catch (err: any) {
    dbError = err.message;
    // Fallback dummy data if table doesn't exist yet
    users = [
      { id: 1, name: 'Emma Watson', email: 'emma@example.com', status: 'Active', created_at: new Date() },
      { id: 2, name: 'Sophia Turner', email: 'sophia@example.com', status: 'Blocked', created_at: new Date() },
    ];
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white tracking-tight">Customer Management</h1>
          <p className="text-gray-400 mt-2 text-sm">View and manage registered users and their activity.</p>
        </div>
      </div>

      <div className="bg-[#16181d] border border-white/5 rounded-2xl shadow-lg p-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="text-xs uppercase bg-[#0f1115] text-gray-500">
              <tr>
                <th className="px-4 py-3 rounded-l-lg">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Joined Date</th>
                <th className="px-4 py-3 rounded-r-lg text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                  <td className="px-4 py-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold text-xs">
                      {user.name.charAt(0)}
                    </div>
                    <span className="text-white font-medium">{user.name}</span>
                  </td>
                  <td className="px-4 py-4 text-gray-400">{user.email}</td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider
                      ${user.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-gray-500">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4 text-right space-x-2">
                     <button className="p-1.5 text-gray-400 hover:text-amber-400 bg-white/5 hover:bg-amber-400/10 rounded-md transition-colors" title="Order History">
                       <History className="w-4 h-4" />
                     </button>
                     <button className="p-1.5 text-gray-400 hover:text-red-400 bg-white/5 hover:bg-red-400/10 rounded-md transition-colors" title={user.status === 'Active' ? 'Block User' : 'Unblock User'}>
                       {user.status === 'Active' ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                     </button>
                     <button className="p-1.5 text-gray-400 hover:text-red-600 bg-white/5 hover:bg-red-600/10 rounded-md transition-colors" title="Delete User">
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
