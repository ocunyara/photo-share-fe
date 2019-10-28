import React, { useState } from 'react'
import axios from 'axios'

// import firebase from 'components/Firebase/firebase'
import { Button } from 'components/Button/Button'

export const AvatarImage = () => {
  let [img, setImage] = useState('')

  let handleChange = event => {
    setImage((img = event.target.files[0]))
  }

  const handleUpload = () => {
    axios.post()
  }

  return (
    <div>
      <img src={img} alt="" />
      <input type="file" onChange={handleChange} />
      <Button handleClick={handleUpload}>Upload file</Button>
    </div>
  )
}
