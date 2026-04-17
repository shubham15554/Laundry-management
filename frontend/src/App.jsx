import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Package, DollarSign, CheckCircle, Search, Plus, Trash2, LayoutDashboard } from 'lucide-react';

const API_BASE = "https://laundry-management-qvsw.onrender.com/api";

function App() {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({ totalOrders: 0, totalRevenue: 0, ordersPerStatus: {} });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Form State with Multi-Garment Support
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    garments: [{ item: '', quantity: 1, pricePerItem: 0 }]
  });

  useEffect(() => {
    fetchData();
  }, [search]);

  const fetchData = async () => {
    try {
      // Sends 'search' as a query param to your updated backend logic
      const ordersRes = await axios.get(`${API_BASE}/orders?search=${search}`);
      const statsRes = await axios.get(`${API_BASE}/orders/dashboard`);
      setOrders(ordersRes.data);
      setStats(statsRes.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  // Logic to add more garment rows
  const addGarmentRow = () => {
    setFormData({
      ...formData,
      garments: [...formData.garments, { item: '', quantity: 1, pricePerItem: 0 }]
    });
  };

  // Logic to remove a garment row
  const removeGarmentRow = (index) => {
    const updatedGarments = formData.garments.filter((_, i) => i !== index);
    setFormData({ ...formData, garments: updatedGarments });
  };

  // Logic to update a specific garment's fields
  const handleGarmentChange = (index, field, value) => {
    const updatedGarments = [...formData.garments];
    updatedGarments[index][field] = value;
    setFormData({ ...formData, garments: updatedGarments });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Send the entire garments array as expected by exports.createOrder
      await axios.post(`${API_BASE}/orders`, formData);
      setFormData({
        customerName: '',
        phoneNumber: '',
        garments: [{ item: '', quantity: 1, pricePerItem: 0 }]
      });
      fetchData();
    } catch (err) {
      alert("Error: " + (err.response?.data?.error || "Check phone number or inputs"));
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.patch(`${API_BASE}/orders/${id}`, { status: newStatus });
      fetchData();
    } catch (err) {
      console.error("Status update failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      {/* HEADER */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Package className="text-blue-600" /> LAUNDRY ADMIN
          </h1>
        </div>
        
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search Name or Phone..." 
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border bg-white shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: STATS & FORM */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* STATS */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Revenue</p>
              <p className="text-xl font-black text-emerald-600">${stats.totalRevenue}</p>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Total Orders</p>
              <p className="text-xl font-black text-blue-600">{stats.totalOrders}</p>
            </div>
          </div>

          {/* CREATE ORDER FORM */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Plus size={18} className="text-blue-600"/> New Customer Drop-off
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input required placeholder="Customer Name" className="w-full border p-2.5 rounded-lg bg-slate-50" value={formData.customerName} onChange={e => setFormData({...formData, customerName: e.target.value})} />
              <input required placeholder="Phone Number" className="w-full border p-2.5 rounded-lg bg-slate-50" value={formData.phoneNumber} onChange={e => setFormData({...formData, phoneNumber: e.target.value})} />
              
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Garments</span>
                  <button type="button" onClick={addGarmentRow} className="text-blue-600 text-[11px] font-bold hover:underline">+ ADD ITEM</button>
                </div>

                {formData.garments.map((g, index) => (
                  <div key={index} className="p-3 border rounded-xl bg-slate-50/50 relative group">
                    {formData.garments.length > 1 && (
                      <button onClick={() => removeGarmentRow(index)} className="absolute -top-2 -right-2 bg-red-50 text-red-500 p-1 rounded-full border border-red-100 hover:bg-red-500 hover:text-white transition">
                        <Trash2 size={12}/>
                      </button>
                    )}
                    <input required placeholder="Item (e.g. Jeans)" className="w-full border p-2 rounded-md mb-2 bg-white text-sm" value={g.item} onChange={e => handleGarmentChange(index, 'item', e.target.value)} />
                    <div className="grid grid-cols-2 gap-2">
                      <input type="number" placeholder="Qty" className="border p-2 rounded-md bg-white text-sm" value={g.quantity} onChange={e => handleGarmentChange(index, 'quantity', e.target.value)} />
                      <input type="number" placeholder="Price" className="border p-2 rounded-md bg-white text-sm" value={g.pricePerItem} onChange={e => handleGarmentChange(index, 'pricePerItem', e.target.value)} />
                    </div>
                  </div>
                ))}
              </div>

              <button disabled={loading} className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-black transition mt-4">
                {loading ? "Creating..." : "Save Order"}
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: ORDERS TABLE */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  <th className="p-4">Customer</th>
                  <th className="p-4">Items</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map(order => (
                  <tr key={order._id} className="hover:bg-slate-50/50 transition">
                    <td className="p-4">
                      <p className="font-bold text-slate-800 text-sm">{order.customerName}</p>
                      <p className="text-xs text-slate-500">{order.phoneNumber}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {order.garments.map((g, i) => (
                          <span key={i} className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded border border-blue-100">
                            {g.item} x{g.quantity}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 font-bold text-slate-700 text-sm">
                      ${order.totalBill}
                    </td>
                    <td className="p-4">
                      <select 
                        value={order.status} 
                        onChange={(e) => updateStatus(order._id, e.target.value)}
                        className={`text-[10px] font-bold py-1 px-2 rounded-lg border outline-none ${
                          order.status === 'READY' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 
                          order.status === 'PROCESSING' ? 'bg-orange-50 text-orange-600 border-orange-200' : 'bg-slate-50 text-slate-600'
                        }`}
                      >
                        <option value="RECEIVED">RECEIVED</option>
                        <option value="PROCESSING">PROCESSING</option>
                        <option value="READY">READY</option>
                        <option value="DELIVERED">DELIVERED</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {orders.length === 0 && <p className="p-10 text-center text-slate-400 text-sm">No orders found.</p>}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;