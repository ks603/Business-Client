import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import HeroGradient from '../shared/HeroGradient'

// Import Axios:
import axios from 'axios'
// Import apiConfig:
import apiUrl from '../../apiConfig'

class Project extends Component {
  constructor () {
    super()

    this.state = {
      project: null,
      deleted: false
    }
  }

  componentDidMount () {
    axios({
      url: `${apiUrl}/projects/${this.props.match.params.id}`,
      method: 'get'
    })
      .then(res => {
        this.setState({ project: res.data.project })
      })
      .catch(console.error)
  }

  delete = (event) => {
    axios({
      method: 'delete',
      url: `${apiUrl}/projects/${this.props.match.params.id}`,
      headers: {
        Authorization: `Bearer ${this.props.user.token}`
      }
    })
      .then(() => {
        this.setState({ deleted: true })
      })
      .catch(console.error)
  }

  render () {
    // Destructure from state:
    const { project, deleted } = this.state
    let projectJSX

    // 3 states:
    // If project is `null`, we are loading
    if (!project) {
      projectJSX = <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"/>
    } else if (deleted) {
      projectJSX = <Redirect to="/projects"/>
    } else {
      // We have a project, display it!
      projectJSX = (
        <div>
          <HeroGradient
            message={project.name}
            startColor='#30cfd0'
            endColor='#b490ca'
          />
          <p>Eployees Assigned: {project.employees}</p>
          <p>Estimated Completion: {project.eta}</p>
          <p>Items needed: {project.item}</p>
          <button onClick={this.delete} className='btn btn-primary'>Delete Project</button>
          <Link to={`/projects/${this.props.match.params.id}/edit`}>
            <button className='btn btn-primary'> Update Project</button>
          </Link>
        </div>
      )
    }

    return (
      projectJSX
    )
  }
}

export default Project
