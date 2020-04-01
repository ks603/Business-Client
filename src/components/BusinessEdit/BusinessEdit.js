import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

// Import axios
import axios from 'axios'
// Import apiUrl
import apiUrl from '../../apiConfig'

import BusinessForm from '../BusinessForm/BusinessForm'

class BusinessEdit extends Component {
  constructor () {
    super()

    this.state = {
      business: {
        name: '',
        status: '',
        review: ''
      },
      updated: false
    }
  }

  componentDidMount () {
    axios({
      url: `${apiUrl}/businesses/${this.props.match.params.id}`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${this.props.user.token}`
      }
    })
      .then(res => {
        this.setState({ business: res.data.business })
      })
      .catch(console.error)
  }

  handleSubmit = (event) => {
    event.preventDefault()

    axios({
      method: 'patch',
      url: `${apiUrl}/businesses/${this.props.match.params.id}`,
      data: { business: this.state.business },
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
    // Combine the current `business` with the `updateField`
    const editedBusiness = Object.assign(this.state.business, updatedField)
    // Set the state
    this.setState({ business: editedBusiness })
  }

  render () {
    // Destructure from state:
    const { business, updated } = this.state
    if (updated) {
      // Redirect to the 'show' page
      return <Redirect to={`/businesses/${this.props.match.params.id}`}/>
    }
    return (
      <div>
        <h1>Business Edit page</h1>
        <BusinessForm
          business={business}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
      </div>
    )
  }
}

export default BusinessEdit
