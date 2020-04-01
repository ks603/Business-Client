import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'

// Import axios
import axios from 'axios'
// Import apiUrl
import apiUrl from '../../apiConfig'

// Import MovieForm:
import ProjectForm from '../ProjectForm/ProjectForm'

class ProjectCreate extends Component {
  constructor () {
    super()

    this.state = {
      project: {
        name: '',
        employees: '',
        eta: '',
        item: ''
      },
      createdId: null
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()

    axios({
      method: 'post',
      url: `${apiUrl}/projects`,
      data: { project: this.state.project },
      headers: {
        Authorization: `Bearer ${this.props.user.token}`
      }
    })
      .then(res => {
        console.log(res.data)
        this.setState({ createdId: res.data.project._id })
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
    const { project, createdId } = this.state
    if (createdId) {
      // Redirect to the 'show' page
      return <Redirect to={`/projects/${createdId}`}/>
    }
    return (
      <Fragment>
        <h1>Project Create page</h1>
        <ProjectForm
          project={project}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
      </Fragment>
    )
  }
}

export default ProjectCreate
