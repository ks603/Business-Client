import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import HeroGradient from '../shared/HeroGradient'

// Import axios
import axios from 'axios'
// Import apiUrl
import apiUrl from '../../apiConfig'

// Import MovieForm:
import BusinessForm from '../BusinessForm/BusinessForm'

class BusinessCreate extends Component {
  constructor () {
    super()

    this.state = {
      business: {
        name: '',
        status: '',
        review: ''
      },
      createdId: null
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()

    axios({
      method: 'post',
      url: `${apiUrl}/businesses`,
      data: { business: this.state.business },
      headers: {
        Authorization: `Bearer ${this.props.user.token}`
      }
    })
      .then(res => {
        console.log(res.data)
        this.setState({ createdId: res.data.business._id })
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
    const { business, createdId } = this.state
    if (createdId) {
      // Redirect to the 'show' page
      return <Redirect to={`/businesses/${createdId}`}/>
    }
    return (
      <Fragment>
        <HeroGradient
          message='Business Create Page'
          startColor='#30cfd0'
          endColor='#b490ca'
        />
        <BusinessForm
          business={business}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
      </Fragment>
    )
  }
}

export default BusinessCreate
