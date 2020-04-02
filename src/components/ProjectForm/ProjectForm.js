import React from 'react'

const ProjectForm = ({ project, handleSubmit, handleChange }) => (
  <form onSubmit={handleSubmit}>
    <label>Project Name:</label>
    <input
      placeholder="Name"
      name="name"
      value={project.name || ''}
      className='form-control'
      onChange={handleChange}
    />
    <label>Employees:</label>
    <input
      placeholder="Assigned Employees"
      name="employees"
      value={project.employees || ''}
      className='form-control'
      onChange={handleChange}
    />
    <label>Estimated Completion:</label>
    <textarea
      placeholder="How much time will this project take?"
      name="eta"
      value={project.eta || ''}
      className='form-control'
      onChange={handleChange}
    />
    <label>Items:</label>
    <textarea
      placeholder="What items will be needed for this task?"
      name="item"
      value={project.item || ''}
      className='form-control'
      onChange={handleChange}
    />
    <button type='submit' className='btn btn-primary'>Submit</button>
  </form>
)

export default ProjectForm
