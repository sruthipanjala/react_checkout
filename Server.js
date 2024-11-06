import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

function Fakestore() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    fetch('https://fakestoreapi.com/products/')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error('Error fetching data:', err));
  }, []);
  const handlePayment = (price) => {
    navigate('/payment', { state: { price } });
  };
  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='container'>
      <div className='row mb-4'>
        <div className='col-md-12'>
          <input
            type='text'
            className='form-control'
            placeholder='Search for products'
            value={search}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className='row'>
        {filteredData.length === 0 ? (
          <p className='text-center'>No products found</p>
        ) : (
          filteredData.map((item) => (
            <div className='col-md-4 mb-4' key={item.id}>
              <div className='card'>
                <img src={item.image} className='card-img-top' alt={item.title} />
                <div className='card-body'>
                  <h5 className='card-title text-center'>{item.title}</h5>
                  <p className='text-center'>
                    <button
                      className='btn btn-outline-danger'
                      onClick={() => handlePayment(item.price)}
                    >
                      ${item.price}
                    </button>
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Fakestore;
