import React from 'react'
import { Spinner } from 'reactstrap'

function Loader() {
  return (
    <Spinner
      color='success'
      style={{
        width: '100px',
        height: '100px',
        margin: 'auto',
        display: 'block',
      }}
    >
      <span className='sr-only'>Loading...</span>
    </Spinner>
  )
}

export default Loader
