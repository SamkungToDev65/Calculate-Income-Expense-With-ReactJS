import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import "./Table.css";

function Table({ items, onEdit, onDelete }) {
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const [filters, setFilters] = useState({
    category: '',
    types: [],  // Array to hold selected types
    paymentMethod: '',
  });

  const handleEdit = (index) => {
    setEditIndex(index);
    setCurrentItem(items[index]);
    setShowModal(true);
  };

  const handleSave = () => {
    if (currentItem && editIndex !== null) {
      onEdit(editIndex, currentItem);  // Notify parent to update item
    }
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem((prevItem) => ({
      ...prevItem,
      [name]: value
    }));
  };

  const handleFilterChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === 'type') {
      setFilters((prevFilters) => {
        const updatedTypes = checked
          ? [...prevFilters.types, value]
          : prevFilters.types.filter(type => type !== value);
        return { ...prevFilters, types: updatedTypes };
      });
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value
      }));
    }
  };

  const filteredItems = items.filter((item) => {
    return (
      (filters.category ? item.category === filters.category : true) &&
      (filters.types.length > 0 ? filters.types.includes(item.isExpense ? 'expense' : 'income') : true) &&
      (filters.paymentMethod ? item.paymentMethod === filters.paymentMethod : true)
    );
  });

  return (
    <>
      <div className="mb-4">
        <h5>Filter Items</h5>
        <form className="row g-3">
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Type</label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="filterExpense"
                  name="type"
                  value="expense"
                  checked={filters.types.includes('expense')}
                  onChange={handleFilterChange}
                />
                <label className="form-check-label" htmlFor="filterExpense">
                  Expense
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="filterIncome"
                  name="type"
                  value="income"
                  checked={filters.types.includes('income')}
                  onChange={handleFilterChange}
                />
                <label className="form-check-label" htmlFor="filterIncome">
                  Income
                </label>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="filterPaymentMethod" className="form-label">Payment Method</label>
              <select
                className="form-select"
                id="filterPaymentMethod"
                name="paymentMethod"
                value={filters.paymentMethod}
                onChange={handleFilterChange}
              >
                <option value="">All Payment Methods</option>
                <option value="cash">Cash</option>
                <option value="credit_card">Credit Card</option>
                <option value="bank_transfer">Bank Transfer</option>
              </select>
            </div>
          </div>
        </form>
      </div>


      <table className="table table-hover text-center">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Amount</th>
            <th scope="col">Category</th>
            <th scope="col">Type</th>
            <th scope="col">Payment Method</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{item.amount} บาท</td>
              <td>{item.category}</td>
              <td>{item.isExpense ? 'Expense' : 'Income'}</td>
              <td>{item.paymentMethod}</td>
              <td>
                <button 
                  className="btn btn-warning btn-sm me-2" 
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>
                <button 
                  className="btn btn-danger btn-sm" 
                  onClick={() => onDelete(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentItem && (
            <form>
              <div className="mb-3">
                <label htmlFor="editAmount" className="form-label">Amount</label>
                <input
                  type="number"
                  className="form-control"
                  id="editAmount"
                  name="amount"
                  value={currentItem.amount || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="editCategory" className="form-label">Category</label>
                <input
                  type="text"
                  className="form-control"
                  id="editCategory"
                  name="category"
                  value={currentItem.category || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="editType" className="form-label">Type</label>
                <select
                  className="form-select"
                  id="editType"
                  name="isExpense"
                  value={currentItem.isExpense ? 'expense' : 'income'}
                  onChange={handleChange}
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="editPaymentMethod" className="form-label">Payment Method</label>
                <select
                  className="form-select"
                  id="editPaymentMethod"
                  name="paymentMethod"
                  value={currentItem.paymentMethod || ''}
                  onChange={handleChange}
                >
                  <option value="cash">Cash</option>
                  <option value="credit_card">Credit Card</option>
                  <option value="bank_transfer">Bank Transfer</option>
                </select>
              </div>
            </form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Table;
