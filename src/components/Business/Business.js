import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import HeroGradient from '../shared/HeroGradient'

// Import Axios:
import axios from 'axios'
// Import apiConfig:
import apiUrl from '../../apiConfig'

class Business extends Component {
  constructor () {
    super()

    this.state = {
      business: null,
      deleted: false
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

  delete = (event) => {
    axios({
      method: 'delete',
      url: `${apiUrl}/businesses/${this.props.match.params.id}`,
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
    const { business, deleted } = this.state
    let businessJSX

    // 3 states:
    // If business is `null`, we are loading
    if (!business) {
      businessJSX = <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"/>
    } else if (deleted) {
      businessJSX = <Redirect to="/businesses"/>
    } else {
      // We have a business, display it!
      businessJSX = (
        <div>
          <HeroGradient
            message={business.name}
            startColor='#30cfd0'
            endColor='#b490ca'
          />
          <p>Status with company: {business.status}</p>
          <p>Review: {business.review}</p>
          <button onClick={this.delete} className='btn btn-primary'>Delete Business</button>
          <Link to={`/businesses/${this.props.match.params.id}/edit`}>
            <button className='btn btn-primary'> Update Business</button>
          </Link>
        </div>
      )
    }

    return (
      businessJSX
    )
  }
}

export default Business
