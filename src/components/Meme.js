import React, {useState, useEffect} from 'react'

function Meme() {
  const [meme, setMeme] = useState({
    topText: '',
    bottomText: '',
    randomImage: 'http://i.imgflip.com/1bij.jpg'
  })

  function handleChange(event) {
    const {name, value} = event.target
    setMeme(prevMeme => {
      return {
        ...prevMeme,
        [name] : value
      }
    })
  }

  const [allMemeImages, setAllMemeImages] = useState([])

   useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then(res => res.json())
      .then(data => setAllMemeImages(data.data.memes))
  }, [])

    function getMemeImage() {
      const randomNumber = Math.floor(Math.random() * allMemeImages.length)
      const imageUrl = allMemeImages[randomNumber].url
      setMeme(prevMeme => ({
        ...prevMeme,
        randomImage : imageUrl
      }))
    }
  return (
    <main>
        <div className='form'>
            <input type="text" placeholder='Top text' className='form-input1' name='topText' value={meme.topText} onChange={handleChange} />
            <input type="text" placeholder='Bottom text' className='form-input2' name='bottomText' value={meme.bottomText} onChange={handleChange} />
            <button className='form-btn' onClick={getMemeImage}>Get a new meme image 🖼</button>
        </div>
        <div className='meme'>
          <img src={meme.randomImage} className='meme-img' />
          <h2 className="meme-text top">{meme.topText}</h2>
          <h2 className="meme-text bottom">{meme.bottomText}</h2>
        </div>
        
    </main>
  )
}

export default Meme