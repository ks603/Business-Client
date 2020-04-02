import React, { Component } from 'react'
import { } from 'react-router-dom'
import HeroGradient from '../shared/HeroGradient'

// Import Axios:
import axios from 'axios'
// Import apiConfig:
import apiUrl from '../../apiConfig'

class ProjectShow extends Component {
  constructor () {
    // Call the constructor on `Component` (the parent class)
    super()

    this.state = {
      projects: null
    }
  }

  componentDidMount () {
    // Run once, when the component mounts
    // This is where our API request will go
    axios({
      url: `${apiUrl}/projects`,
      method: 'get'
    })
      .then(res => {
        this.setState({ projects: res.data.projects })
      })
      .catch(err => {
        this.props.msgAlert({
          heafding: 'Projects list failed to laod',
          message: err.message,
          variant: 'danger'
        })
      })
  }

  render () {
    // Destructure things from state:
    const { projects } = this.state
    let projectJSX
    // 3 states:
    // if projects is `null`, we are loading
    if (!projects) {
      projectJSX = <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"/>
    } else if (projects.length === 0) {
      // If the array of projects is empty, we have no projects to show
      projectJSX = 'No projects yet, go make some!'
    } else {
      // Otherwise, display the projects
      const projectsList = projects.map(project => (
        <li key={project._id}>
          {project.name}
          <br></br>
        </li>
      ))

      projectJSX = (
        <ul>
          {projectsList}
        </ul>
      )
    }
    return (
      <React.Fragment>
        <HeroGradient
          message='Project Page'
          startColor='#30cfd0'
          endColor='#b490ca'
        />
        <HeroGradient
          message={projectJSX}
        />
      </React.Fragment>
    )
  }
}

export default ProjectShow
