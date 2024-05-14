import axios from 'axios'
import './App.css'
import { useState } from 'react';

let word = 'hello'
async function search() {
  let means:[]=[]
 await axios.get('https://api.dictionaryapi.dev/api/v2/entries/en/'+word).then(function (response) {
    means = response.data[0].meanings
  })
  return means
}   
function App() {
  const [means, setMean] = useState([])

  async function submitHandler(e: { preventDefault: () => void; }) {
    e.preventDefault()
    setMean( await search())
  }
  function changeHandler(e: {
    target: any; preventDefault: () => void; }) {
    e.preventDefault()
    word = (e.target.value)
  }
  return (
    <>

    <h1 style={{ textAlign: 'center' }}>Dictionary</h1>
      <form action="" onSubmit={submitHandler} style={{ textAlign: 'center', margin: '10px' }}>
        <input type="text" onChange={changeHandler} style={{ width: '300px' }} />
        <button className="btn-primary">Send</button>
      </form>
      <div className='container'>
        {means.length > 0 ? means.map((mean:any) => (
          <div className='definition'>
            {mean.definitions[0].definition}
          </div>
        )) : <p>No meanings found</p>}
      </div>
    </>
  )
}

export default App
