import React, { useState } from 'react';
import axios from 'axios';
import { FaQrcode } from 'react-icons/fa';

export default function DonationForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    amount: '',
    message: ''
  });
  const [msg, setMsg] = useState('');
  const [selectedAmount, setSelectedAmount] = useState('');

  const predefinedAmounts = [100, 500, 1000, 5000];

  const handle = e => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setForm(prev => ({ ...prev, amount: amount.toString() }));
  };

  const getButtonClass = (isSelected) => 
    `p-4 rounded-lg border-2 ${
      isSelected 
        ? 'border-blue-600 bg-blue-50 text-blue-600'
        : 'border-gray-200 hover:border-blue-600 hover:bg-blue-50'
    } transition-all duration-200`;

  const getPaymentButtonClass = (method) => 
    `p-4 rounded-lg border-2 flex items-center justify-center space-x-2 ${
      form.paymentMethod === method
        ? 'border-blue-600 bg-blue-50 text-blue-600'
        : 'border-gray-200 hover:border-blue-600 hover:bg-blue-50'
    } transition-all duration-200`;

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/donations', form);
      setMsg('Thank you for your donation!');
      setForm({ name: '', email: '', mobile: '', amount: '', paymentMethod: '', message: '', anonymous: false });
      setSelectedAmount('');
    } catch (err) {
      setMsg('Error processing donation. Please try again.');
    }
  };

  return (
    <form onSubmit={submit} className="space-y-8">
      {/* Donation Amount Selection */}
      <div>
        <label className="block text-gray-700 font-semibold mb-4">Select Amount (₹)</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {predefinedAmounts.map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => handleAmountSelect(amount)}
              className={getButtonClass(selectedAmount === amount)}
            >
              ₹{amount}
            </button>
          ))}
        </div>
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handle}
          placeholder="Enter custom amount"
          className="w-full p-4 border-2 rounded-lg focus:border-blue-600 focus:ring-0"
          required
        />
      </div>

      {/* Payment Method Selection */}
      <div>
        <label className="block text-gray-700 font-semibold mb-4">Payment Method</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            type="button"
            onClick={() => setForm(prev => ({ ...prev, paymentMethod: 'card' }))}
            className={getPaymentButtonClass('card')}
          >
            <FaRegCreditCard />
            <span>Card</span>
          </button>
          <button
            type="button"
            onClick={() => setForm(prev => ({ ...prev, paymentMethod: 'netbanking' }))}
            className={getPaymentButtonClass('netbanking')}
          >
            <FaUniversity />
            <span>Net Banking</span>
          </button>
          <button
            type="button"
            onClick={() => setForm(prev => ({ ...prev, paymentMethod: 'upi' }))}
            className={getPaymentButtonClass('upi')}
          >
            <FaWallet />
            <span>UPI</span>
          </button>
        </div>
      </div>

      {/* Personal Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handle}
            className="w-full p-3 border rounded-lg focus:border-blue-600 focus:ring-0"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handle}
            className="w-full p-3 border rounded-lg focus:border-blue-600 focus:ring-0"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Mobile Number</label>
        <input
          type="tel"
          name="mobile"
          value={form.mobile}
          onChange={handle}
          className="w-full p-3 border rounded-lg focus:border-blue-600 focus:ring-0"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Message (Optional)</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handle}
          rows="3"
          className="w-full p-3 border rounded-lg focus:border-blue-600 focus:ring-0"
          placeholder="Share why you're making this donation..."
        ></textarea>
      </div>

      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="anonymous"
            checked={form.anonymous}
            onChange={handle}
            className="rounded text-blue-600 focus:ring-blue-500"
          />
          <span className="text-gray-700">Make this donation anonymous</span>
        </label>
      </div>

      {msg && (
        <div className={`p-4 rounded-lg ${
          msg.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
        }`}>
          {msg}
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
      >
        Complete Donation
      </button>
    </form>
  );
}
