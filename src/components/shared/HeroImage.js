import React from 'react'

const HeroImage = ({ backgroundImage, message }) => {
  const heroContainerStyles = {
    // Center content inside container
    display: 'flex',
    // Center horizontally
    justifyContent: 'center',
    // Center verticaly

    // Background image
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',

    // Make the container taller
    height: '100vh'
  }
  // <div style={{ backgroundColor: 'red' }}>
  return (
    <div style={heroContainerStyles}>
      <h1>{message}</h1>
    </div>
  )
}

export default HeroImage
