import React, { useState } from 'react';
import './App.css';
import FormAddItem from './components/Detail/FormAddItem/FormAddItem';
import Table from './components/Detail/Table/Table';
import End from './components/End/End';
import Navbar from './components/Navbar/Navbar';

function App() {
  const [items, setItems] = useState([]);

  const addItem = (item) => {
    setItems([...items, item]);
  };

  const handleDelete = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleEdit = (index, updatedItem) => {
    const updatedItems = items.map((item, i) =>
      i === index ? updatedItem : item
    );
    setItems(updatedItems);
  };

  return (
    <>
      <Navbar />
      <div className="container my-4">
        <div className="row mt-5">
          <div className="col-md-6">
            <FormAddItem addItem={addItem} />
          </div>
          <div className="col-md-6">
            <Table items={items} onEdit={handleEdit} onDelete={handleDelete} />
          </div>
        </div>
      </div>
      <End />
    </>
  );
}

export default App;
