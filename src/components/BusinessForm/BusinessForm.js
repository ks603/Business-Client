import React from 'react'

const BusinessForm = ({ business, handleSubmit, handleChange }) => (
  <form onSubmit={handleSubmit}>
    <label>Name:</label>
    <input
      placeholder="Vendor name"
      name="name"
      value={business.name || ''}
      className='form-control'
      onChange={handleChange}
    />
    <label>Status:</label>
    <input
      placeholder="In good standing?"
      name="status"
      value={business.status || ''}
      className='form-control'
      onChange={handleChange}
    />
    <label>Review:</label>
    <textarea
      placeholder="Recent Notes"
      name="review"
      value={business.review || ''}
      className='form-control'
      onChange={handleChange}
    />
    <button type='submit' className='btn btn-primary'>Submit</button>
  </form>
)

export default BusinessForm
