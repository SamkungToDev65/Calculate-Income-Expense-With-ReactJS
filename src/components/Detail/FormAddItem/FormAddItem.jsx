import React, { useState } from 'react';
import "./FormAdditem.css"

function FormAddItem({ addItem }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [isExpense, setIsExpense] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const newItem = {
      amount,
      category,
      isExpense,
      paymentMethod,
    };

    addItem(newItem);
    
    // Clear form fields after submission
    setAmount('');
    setCategory('');
    setIsExpense(true);
    setPaymentMethod('');
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Add Income/Expense</h5>
        <form className="form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="amount" className="form-label">Amount</label>
            <input
              type="number"
              className="form-control"
              id="amount"
              placeholder="Enter amount"
              min={0}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="category" className="form-label">Category</label>
            <input
              type="text"
              className="form-control"
              id="category"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Type</label>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="expense"
                name="type"
                value="expense"
                checked={isExpense === true}
                onChange={() => setIsExpense(true)}
              />
              <label htmlFor="expense" className="form-check-label">Expense</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="income"
                name="type"
                value="income"
                checked={isExpense === false}
                onChange={() => setIsExpense(false)}
              />
              <label htmlFor="income" className="form-check-label">Income</label>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="paymentMethod" className="form-label">Payment Method</label>
            <select
              className="form-select"
              id="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
            >
              <option value="">Select payment method</option>
              <option value="cash">Cash</option>
              <option value="credit_card">Credit Card</option>
              <option value="bank_transfer">Bank Transfer</option>
            </select>
          </div>

          <button type="submit" className="btn add-btn">Add Item</button>
        </form>
      </div>
    </div>
  );
}

export default FormAddItem;
