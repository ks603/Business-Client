import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'
import HeroGradient from '../shared/HeroGradient'

const Project = props => {
  const [project, setProject] = useState(null)
  const [deleted, setDeleted] = useState(false)
  // Call this callback once after the first render, this only occurs once
  // because our dependency array is empty, so our dependencies never change
  // similar to componentDidMount
  useEffect(() => {
    axios({
      url: `${apiUrl}/projects/${props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      // Make sure to update this.setState to our hooks setMovie function
      .then(res => setProject(res.data.project))
      .catch()
  }, [])
  useEffect(() => {
    // This will only run when the compnent will unmount
    // because the dependency array is empty
    return () => {
    }
  }, [])
  useEffect(() => {
    // The cleanup function is called when
    // 1. the component is about to unmount
    // 2. before the 2nd and following renders
    return () => {
    }
  })
  const destroy = () => {
    axios({
      url: `${apiUrl}/projects/${props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(() => setDeleted(true))
      .then(() => props.msgAlert({
        heading: 'Delete Success',
        message: messages.deleteSuccess,
        variant: 'delete'
      }))
      .catch()
  }

  if (!project) {
    return <p>Loading test...</p>
  }
  if (deleted) {
    return <Redirect to={
      { pathname: '/projects' }
    }/>
  }
  if (project.owner === props.user._id) {
    return (
      <div>
        <HeroGradient
          message={project.name}
          startColor='#30cfd0'
          endColor='#b490ca'
        />
        <p>Employees assigned: {project.employees}</p>
        <p>Estimated completion: {project.eta}</p>
        <p>Items needed: {project.item}</p>
        <button onClick={destroy} className='btn btn-primary'>Delete Project</button>
        <Link to={`/projects/${props.match.params.id}/edit`}>
          <button className='btn btn-primary'> Update Project</button>
        </Link>
      </div>
    )
  }
  return (
    <div>
      <HeroGradient
        message={project.name}
        startColor='#30cfd0'
        endColor='#b490ca'
      />
      <p>Employees assigned: {project.employees}</p>
      <p>Estimated completion: {project.eta}</p>
      <p>Items needed: {project.item}</p>
    </div>
  )
}

export default Project
