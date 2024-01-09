import React from 'react'
import loding from './loding.gif'

const Spinner = ()=> {
 
    return (
      <div className='text-center'>
            <img className='my-3' src={loding} alt="loading" />
      </div>
    )
}

export default Spinner
