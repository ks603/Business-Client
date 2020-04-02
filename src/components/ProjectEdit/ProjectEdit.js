import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import HeroGradient from '../shared/HeroGradient'

// Import axios
import axios from 'axios'
// Import apiUrl
import apiUrl from '../../apiConfig'

import ProjectForm from '../ProjectForm/ProjectForm'

class ProjectEdit extends Component {
  constructor () {
    super()

    this.state = {
      project: {
        name: '',
        employees: '',
        eta: '',
        item: ''
      },
      updated: false
    }
  }

  componentDidMount () {
    axios({
      url: `${apiUrl}/projects/${this.props.match.params.id}`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${this.props.user.token}`
      }
    })
      .then(res => {
        this.setState({ project: res.data.project })
      })
      .catch(console.error)
  }

  handleSubmit = (event) => {
    event.preventDefault()

    axios({
      method: 'patch',
      url: `${apiUrl}/projects/${this.props.match.params.id}`,
      data: { project: this.state.project },
      headers: {
        Authorization: `Bearer ${this.props.user.token}`
      }
    })
      .then(() => {
        this.setState({ updated: true })
      })
      .catch(console.error)
  }

  handleChange = (event) => {
    // create a new object with key of `name` property on input and value with `value` property
    const updatedField = {
      [event.target.name]: event.target.value
    }
    // Combine the current `project` with the `updateField`
    const editedProject = Object.assign(this.state.project, updatedField)
    // Set the state
    this.setState({ project: editedProject })
  }

  render () {
    // Destructure from state:
    const { project, updated } = this.state
    if (updated) {
      // Redirect to the 'show' page
      return <Redirect to={`/projects/${this.props.match.params.id}`}/>
    }
    return (
      <div>
        <HeroGradient
          message='Project Edit Page'
          startColor='#30cfd0'
          endColor='#b490ca'
        />
        <ProjectForm
          project={project}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
      </div>
    )
  }
}

export default ProjectEdit
