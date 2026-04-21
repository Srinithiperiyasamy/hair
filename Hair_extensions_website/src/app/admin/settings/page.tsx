import React from 'react';
import { Settings, Globe, Mail, Shield, Bell, Save } from 'lucide-react';

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700 max-w-5xl">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white tracking-tight">Settings</h1>
          <p className="text-gray-400 mt-2 text-sm">Manage your store configuration and preferences.</p>
        </div>
        <button className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-6 py-2 rounded-xl flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(251,191,36,0.3)]">
          <Save className="w-5 h-5" />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         {/* Sidebar Tabs */}
         <div className="lg:col-span-1 space-y-2">
            {[
              { label: 'General', icon: Globe, active: true },
              { label: 'Notifications', icon: Bell, active: false },
              { label: 'Email Setup', icon: Mail, active: false },
              { label: 'Security', icon: Shield, active: false },
            ].map((tab, i) => (
              <button key={i} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                ${tab.active ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20 shadow-inner' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
         </div>

         {/* Form Area */}
         <div className="lg:col-span-3 bg-[#16181d] border border-white/5 rounded-2xl p-8 space-y-8">
            <section className="space-y-6">
               <h2 className="text-lg font-bold text-white flex items-center gap-2">
                 <Globe className="w-5 h-5 text-amber-500" /> Store Information
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                     <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Store Name</label>
                     <input type="text" defaultValue="Love Hair Extensions" className="w-full bg-[#0f1115] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50" />
                  </div>
                  <div>
                     <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Contact Email</label>
                     <input type="email" defaultValue="support@lovehair.com" className="w-full bg-[#0f1115] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50" />
                  </div>
                  <div className="md:col-span-2">
                     <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Store Address</label>
                     <textarea rows={3} defaultValue="123 Luxury Lane, Beverly Hills, CA 90210" className="w-full bg-[#0f1115] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 resize-none"></textarea>
                  </div>
               </div>
            </section>

            <section className="space-y-6 pt-8 border-t border-white/5">
               <h2 className="text-lg font-bold text-white flex items-center gap-2">
                 <Shield className="w-5 h-5 text-teal-500" /> Currency & Tax
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                     <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Primary Currency</label>
                     <select className="w-full bg-[#0f1115] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none">
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                        <option>GBP (£)</option>
                     </select>
                  </div>
                  <div>
                     <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Tax Rate (%)</label>
                     <input type="number" defaultValue="8.5" className="w-full bg-[#0f1115] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50" />
                  </div>
               </div>
            </section>
         </div>
      </div>
    
    </div>
  );
}
