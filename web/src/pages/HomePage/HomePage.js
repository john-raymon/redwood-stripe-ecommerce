import { useEffect } from 'react'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const HomePage = () => {
  useEffect(() => {
    fetch(`${window.RWJS_API_URL}/fetchProducts`)
      .then((response) => response.json())
      .then((json) => console.log(json))
      .catch((error) => console.log(error))
  }, [])
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <h1>HomePage</h1>
      <p>
        Find me in <code>./web/src/pages/HomePage/HomePage.js</code>
      </p>
      <p>
        My default route is named <code>home</code>, link to me with `
        <Link to={routes.home()}>Home</Link>`
      </p>
    </>
  )
}

export default HomePage
