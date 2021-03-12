import React from 'react'

function Button({ text, onClick }) {
  return (
    <button onClick={onClick} style={{ borderRadius: '8px' }}>
      {text}
    </button>
  )
}

export default Button;
