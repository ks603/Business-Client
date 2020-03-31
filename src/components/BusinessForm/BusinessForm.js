import React from 'react'

const BusinessForm = ({ business, handleSubmit, handleChange }) => (
  <form onSubmit={handleSubmit}>
    <label>Title</label>
    <input
      placeholder="aa"
      name="title"
      value={business.title || ''}
      onChange={handleChange}
    />
    <label>Director</label>
    <input
      placeholder="A b"
      name="director"
      value={business.director || ''}
      onChange={handleChange}
    />
    <label>Year Released</label>
    <input
      placeholder="YYYY-MM-DD"
      name="year"
      value={business.year || ''}
      type="date"
      onChange={handleChange}
    />
    <button type="submit">Submit</button>
  </form>
)

export default BusinessForm
