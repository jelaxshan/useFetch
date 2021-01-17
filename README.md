# useFetch

My take on a custom fetch hook written in Typescript.

useFetch hook (simple example):

```js
import React from 'react'
import { useFetch } from './useFetch'

const App = () => {
  const {data, error, isLoading} = useFetch({
    url: 'https://google.com'
  })

  if (isLoading) {
    // can be used for loading indicator/spinner etc.
    return <h1>Loading..</h1>
  }

  if (error) {
    // handle any error
    sendToSentry(error)
  }

  return (
    <>
      <pre>response: {data}</pre>
    </>
  )
}

export default App
```