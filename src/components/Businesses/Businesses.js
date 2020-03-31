import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// Import Axios:
import axios from 'axios'
// Import apiConfig:
import apiUrl from '../../apiConfig'

class Businesses extends Component {
  constructor () {
    // Call the constructor on `Component` (the parent class)
    super()

    this.state = {
      businesses: null
    }
  }

  componentDidMount () {
    // Run once, when the component mounts
    // This is where our API request will go
    axios({
      url: `${apiUrl}/businesses`,
      method: 'get',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
      .then(res => {
        console.log(res)
        this.setState({ businesses: res.data.businesses })
      })
      .catch(err => {
        this.props.msgAlert({
          heafding: 'Businesses list failed to laod',
          message: err.message,
          variant: 'danger'
        })
      })
  }

  render () {
    // Destructure things from state:
    const { businesses } = this.state
    let businessJSX
    // 3 states:
    // if businesses is `null`, we are loading
    if (!businesses) {
      businessJSX = <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"/>
    } else if (businesses.length === 0) {
      // If the array of businesses is empty, we have no businesses to show
      businessJSX = 'No businesses yet, go make some!'
    } else {
      // Otherwise, display the businesses
      const businessesList = businesses.map(business => (
        <li key={business._id}>
          <Link to={`/businesses/${business._id}`}>{business.name}</Link>
        </li>
      ))

      businessJSX = (
        <ul>
          {businessesList}
        </ul>
      )
    }
    return (
      <React.Fragment>
        <h1>Businesses Page</h1>
        {businessJSX}
      </React.Fragment>
    )
  }
}

export default Businesses
