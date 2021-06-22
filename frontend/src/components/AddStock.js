import { useState } from 'react'

const AddStock = ({ onAdd }) => {
  const [symbol, setSymbol] = useState('')

  const onSubmit = (e) => {
    //   
    e.preventDefault()

    if (!symbol) {
      alert('Please add a task')
      return
    }

    onAdd({ symbol })

    setSymbol('')
  }

  return (
    <form className='form-inline' onSubmit={onSubmit}>
      <div >
        <input
          type='text'
          placeholder='Stock Symbol. Eg: AAPL'
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
      </div>

      <input type='submit' value='Add' />
    </form>
  )
}

export default AddStock