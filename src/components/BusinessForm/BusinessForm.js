import React from 'react'

const BusinessForm = ({ business, handleSubmit, handleChange }) => (
  <form onSubmit={handleSubmit}>
    <label>Name</label>
    <input
      placeholder="Wonderful"
      name="name"
      value={business.name || ''}
      className='form-control'
      onChange={handleChange}
    />
    <label>Status</label>
    <input
      placeholder="Standng"
      name="status"
      value={business.status || ''}
      className='form-control'
      onChange={handleChange}
    />
    <label>Review</label>
    <textarea
      placeholder="Review"
      name="review"
      value={business.review || ''}
      className='form-control'
      onChange={handleChange}
    />
    <button type='submit' className='btn btn-primary'>Submit</button>
  </form>
)

export default BusinessForm
