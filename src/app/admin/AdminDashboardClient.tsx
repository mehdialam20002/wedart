"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Plus, Search, Trash2, Edit2, LogOut, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { updateBookingStatus, deleteBooking, createBooking, BookingData, BookingStatus, updateBookingDetails } from "@/app/actions";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";

const servicesList = [
  "Traditional Photography",
  "Cinematic Videography",
  "Candid Photography",
  "Drone Shoot",
  "Pre-Wedding Shoot",
  "Hardbound Albums"
];

export function AdminDashboardClient({ initialBookings }: { initialBookings: BookingData[] }) {
  const supabase = createClient();
  const [bookings, setBookings] = React.useState<BookingData[]>(initialBookings);
  const [activeTab, setActiveTab] = React.useState<"customer" | "admin">("customer");
  const [searchQuery, setSearchQuery] = React.useState("");
  
  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [isPending, startTransition] = React.useTransition();
  const [formData, setFormData] = React.useState({
    name: "", phone: "", date: "", package: [] as string[], details: "", amount: "", discount: ""
  });

  const handleCheckboxChange = (service: string) => {
    setFormData(prev => ({
      ...prev,
      package: prev.package.includes(service)
        ? prev.package.filter(s => s !== service)
        : [...prev.package, service]
    }));
  };

  const openEditModal = (b: BookingData) => {
    if (!b.id) return;
    setEditingId(b.id);
    setFormData({
      name: b.name,
      phone: b.phone,
      date: b.event_date,
      package: b.package.split(",").map(item => item.trim()).filter(Boolean),
      details: b.requirements || "",
      amount: b.amount ? b.amount.toString() : "",
      discount: b.discount ? b.discount.toString() : ""
    });
    setIsEditModalOpen(true);
  };

  const handleCreateOrEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.package.length === 0) {
      toast.error("Please select at least one service.");
      return;
    }
    
    startTransition(async () => {
      const payload: any = {
        name: formData.name,
        phone: formData.phone,
        event_date: formData.date,
        package: formData.package.join(", "),
        requirements: formData.details
      };
      
      // Only attach if they are not empty
      if (formData.amount) payload.amount = parseFloat(formData.amount);
      if (formData.discount) payload.discount = parseFloat(formData.discount);

      if (editingId) {
        // Handle Edit
        const res = await updateBookingDetails(editingId, payload);
        
        if (res.success) {
          toast.success("Booking updated!");
          setIsEditModalOpen(false);
          setEditingId(null);
          window.location.reload();
        } else {
          toast.error(res.error || "Failed to update booking");
        }
      } else {
        // Handle Create
        payload.source = "admin";
        payload.status = "pending";
        const res = await createBooking(payload);
        if (res.success) {
          toast.success("Admin booking created successfully!");
          setIsCreateModalOpen(false);
          setFormData({ name: "", phone: "", date: "", package: [], details: "", amount: "", discount: "" });
          window.location.reload(); 
        } else {
          toast.error(res.error || "Failed to create booking");
        }
      }
    });
  };

  const handleStatusChange = async (id: string, newStatus: BookingStatus) => {
    const res = await updateBookingStatus(id, newStatus);
    if (res.success) {
      toast.success("Status updated!");
      setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
    } else {
      toast.error(res.error || "Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    const res = await deleteBooking(id);
    if (res.success) {
      toast.success("Booking deleted!");
      setBookings(bookings.filter(b => b.id !== id));
    } else {
      toast.error("Failed to delete booking");
    }
  };

  const filteredBookings = bookings.filter((b) => {
    return (
      b.source === activeTab &&
      (b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       b.phone.includes(searchQuery))
    );
  });

  const totalBookings = bookings.length;
  const customerBookings = bookings.filter(b => b.source === "customer").length;
  const adminBookings = bookings.filter(b => b.source === "admin").length;
  
  // Stats specifically for the active tab view
  const pendingInView = bookings.filter(b => b.source === activeTab && b.status === "pending").length;
  const completedInView = bookings.filter(b => b.source === activeTab && b.status === "completed").length;

  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out successfully");
      router.push("/admin/login");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans flex overflow-hidden">
      
      {/* Sidebar Layout */}
      <aside className="w-64 bg-black border-r border-white/5 flex flex-col p-6 hidden md:flex">
        <h2 className="font-serif text-2xl text-gold-500 mb-12">WedArt Admin</h2>
        
        <nav className="flex flex-col gap-2 flex-grow relative">
          {["customer", "admin"].map((tab) => (
            <button 
              key={tab}
              className={`relative text-left px-4 py-3 rounded-lg transition-colors capitalize z-10 ${activeTab === tab ? "text-gold-500" : "text-gray-400 hover:text-white"}`}
              onClick={() => setActiveTab(tab as "customer" | "admin")}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTabSidebar"
                  className="absolute inset-0 bg-gold-500/10 rounded-lg -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {tab} Bookings
            </button>
          ))}
        </nav>

        <button 
          className="flex items-center gap-2 text-gray-500 hover:text-red-400 mt-auto transition-colors" 
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Header */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-serif">Dashboard Overview</h1>
              <p className="text-gray-400 text-sm mt-1">Manage all your photography bookings from one place.</p>
            </div>
            {activeTab === "admin" && (
              <Button onClick={() => {
                setEditingId(null);
                setFormData({ name: "", phone: "", date: "", package: [], details: "", amount: "", discount: "" });
                setIsCreateModalOpen(true);
              }}>
                <Plus className="w-4 h-4 mr-2" />
                Create Booking
              </Button>
            )}
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-white/5 border border-white/5 rounded-xl p-4">
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Total</p>
              <p className="text-2xl font-bold text-white">{totalBookings}</p>
            </div>
            <div className="bg-white/5 border border-white/5 rounded-xl p-4">
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Customer</p>
              <p className="text-2xl font-bold text-white">{customerBookings}</p>
            </div>
            <div className="bg-white/5 border border-white/5 rounded-xl p-4">
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Admin</p>
              <p className="text-2xl font-bold text-white">{adminBookings}</p>
            </div>
            <div className="bg-white/5 border border-white/5 rounded-xl p-4">
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Pending ({activeTab})</p>
              <p className="text-2xl font-bold text-amber-500">{pendingInView}</p>
            </div>
            <div className="bg-white/5 border border-white/5 rounded-xl p-4">
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Completed ({activeTab})</p>
              <p className="text-2xl font-bold text-green-500">{completedInView}</p>
            </div>
          </div>

          {/* Utilities Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search by name or phone..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-black border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-gold-500"
              />
            </div>
          </div>

          {/* Table Area (Animated Tab Switching) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-black border border-white/5 rounded-xl overflow-x-auto min-h-[400px]"
            >
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5 text-gray-400 text-sm">
                    <th className="px-6 py-4 font-normal">Customer</th>
                    <th className="px-6 py-4 font-normal">Contact</th>
                    <th className="px-6 py-4 font-normal">Event Date</th>
                    {activeTab === "admin" && <th className="px-6 py-4 font-normal">Costing</th>}
                    <th className="px-6 py-4 font-normal min-w-[200px]">Services</th>
                    <th className="px-6 py-4 font-normal">Status</th>
                    <th className="px-6 py-4 font-normal text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredBookings.length > 0 ? filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-6 py-4 align-top">
                        <p className="text-white font-medium">{b.name}</p>
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-sm align-top">{b.phone}</td>
                      <td className="px-6 py-4 text-gray-400 text-sm align-top">{new Date(b.event_date).toLocaleDateString()}</td>
                      {activeTab === "admin" && (
                        <td className="px-6 py-4 text-sm align-top">
                          {b.amount ? (
                            <div>
                              <p className="text-white">₹{b.amount.toLocaleString('en-IN')}</p>
                              {b.discount ? <p className="text-green-400 text-xs">Discount: ₹{b.discount.toLocaleString('en-IN')}</p> : null}
                            </div>
                          ) : (
                            <span className="text-gray-600">-</span>
                          )}
                        </td>
                      )}
                      <td className="px-6 py-4 align-top">
                        <div className="flex flex-wrap gap-1">
                          {b.package.split(",").map((service, i) => (
                            <span key={i} className="bg-gold-500/10 text-gold-500 text-xs px-2 py-1 rounded whitespace-nowrap">
                              {service.trim()}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 align-top">
                        <select 
                          value={b.status} 
                          onChange={(e) => {
                            if (b.id) handleStatusChange(b.id, e.target.value as BookingStatus);
                          }}
                          className={`text-xs px-2 py-1 rounded capitalize bg-black border cursor-pointer outline-none ${
                          b.status === "completed" ? "border-green-500/30 text-green-500" :
                          b.status === "delivered" ? "border-blue-500/30 text-blue-500" :
                          "border-amber-500/30 text-amber-500"
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="completed">Completed</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-right align-top flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {activeTab === "admin" && (
                          <button onClick={() => openEditModal(b)} className="p-2 text-gray-400 hover:text-white rounded bg-white/5 transition-colors" title="Edit Booking Details">
                            <Edit2 className="w-4 h-4" />
                          </button>
                        )}
                        <button onClick={() => b.id && handleDelete(b.id)} className="p-2 text-gray-400 hover:text-red-500 rounded bg-white/5 transition-colors" title="Delete Booking">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                        <div className="flex flex-col items-center justify-center">
                          <Search className="w-8 h-8 mb-4 opacity-50" />
                          <p>No {activeTab} bookings found.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </motion.div>
          </AnimatePresence>

        </div>
      </main>

      {/* Create / Edit Modal */}
      <AnimatePresence>
        {(isCreateModalOpen || isEditModalOpen) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 overflow-y-auto">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-zinc-950 border border-white/10 p-6 rounded-2xl w-full max-w-lg relative my-8"
            >
              <button 
                onClick={() => {
                  setIsCreateModalOpen(false);
                  setIsEditModalOpen(false);
                }} 
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-2xl font-serif mb-6 text-white">
                {editingId ? "Edit Admin Booking" : "Create Admin Booking"}
              </h2>
              
              <form onSubmit={handleCreateOrEditSubmit} className="space-y-4">
                <input required type="text" placeholder="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded items-center px-4 py-3 outline-none focus:border-gold-500" />
                <input required type="tel" placeholder="Phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 outline-none focus:border-gold-500" />
                <input required type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 outline-none [color-scheme:dark] focus:border-gold-500" />
                
                <div className="grid grid-cols-2 gap-4">
                  <input type="number" placeholder="Total Amount (₹)" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 outline-none focus:border-gold-500" />
                  <input type="number" placeholder="Discount Given (₹)" value={formData.discount} onChange={e => setFormData({...formData, discount: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 outline-none focus:border-gold-500" />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-sans text-gray-400 uppercase tracking-wide">
                    Select Services Required
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {servicesList.map((service) => (
                      <label 
                        key={service} 
                        className={`flex items-center gap-2 p-2 rounded-md border cursor-pointer transition-colors ${
                          formData.package.includes(service) 
                            ? "bg-gold-500/10 border-gold-500/50 text-white" 
                            : "bg-black/40 border-white/10 text-gray-400 hover:border-white/20"
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-white/20 bg-black/50 text-gold-500 focus:ring-0 focus:ring-offset-0 cursor-pointer accent-gold-500"
                          checked={formData.package.includes(service)}
                          onChange={() => handleCheckboxChange(service)}
                        />
                        <span className="text-sm font-sans">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <textarea placeholder="Requirements / Details" value={formData.details} onChange={e => setFormData({...formData, details: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 outline-none focus:border-gold-500" rows={3}></textarea>
                
                <Button type="submit" disabled={isPending} className="w-full">
                  {isPending ? "Saving..." : "Save Booking"}
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
