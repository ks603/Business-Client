import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'
import HeroGradient from '../shared/HeroGradient'

const Business = props => {
  const [business, setBusiness] = useState(null)
  const [deleted, setDeleted] = useState(false)
  // Call this callback once after the first render, this only occurs once
  // because our dependency array is empty, so our dependencies never change
  // similar to componentDidMount
  useEffect(() => {
    axios({
      url: `${apiUrl}/businesses/${props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      // Make sure to update this.setState to our hooks setMovie function
      .then(res => setBusiness(res.data.business))
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
      url: `${apiUrl}/businesses/${props.match.params.id}`,
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

  if (!business) {
    return <p>Loading test...</p>
  }
  if (deleted) {
    return <Redirect to={
      { pathname: '/businesses' }
    }/>
  }
  if (business.owner === props.user._id) {
    return (
      <div>
        <HeroGradient
          message={business.name}
          startColor='#30cfd0'
          endColor='#b490ca'
        />
        <p>Status with company: {business.status}</p>
        <p>Review: {business.review}</p>
        <button onClick={destroy} className='btn btn-primary'>Delete Business</button>
        <Link to={`/businesses/${props.match.params.id}/edit`}>
          <button className='btn btn-primary'> Update Business</button>
        </Link>
      </div>
    )
  }
  return (
    <div>
      <HeroGradient
        message={business.name}
        startColor='#30cfd0'
        endColor='#b490ca'
      />
      <p>Status with business: {business.status}</p>
      <p>Review: {business.review}</p>
    </div>
  )
}

export default Business
