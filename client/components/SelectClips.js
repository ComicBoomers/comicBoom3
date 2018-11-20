import React from 'react';
import {Link} from 'react-router-dom'


const SelectClips = (props)=>{
  return (
    <div>
      <div>
        <Link to='/createComic'>
      <button type='submit'>I Like These </button>
      </Link>
        </div>
        <div>
        <Link to='/upLoadVideo'>
        {/* have a toaster pop up and say sorry lets try again */}
      <button type='submit'>These Stink</button>
      </Link>
        </div>
      Generated Images Placeholder!

      </div>
  )
}

export default SelectClips
