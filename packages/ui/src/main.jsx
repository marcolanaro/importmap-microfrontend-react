import React from 'react'
import ReactDOM from 'react-dom'
import Button from './Button'

ReactDOM.render(
  <React.StrictMode>
    <Button text="Test" onClick={() => alert('Working Handler')} />
  </React.StrictMode>,
  document.getElementById('root')
)
