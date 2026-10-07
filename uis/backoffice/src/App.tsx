import { useEffect, useState } from 'react'
import { Layout } from './components/Layout'
import { navigation } from './navigation'

function readPath() {
  const path = window.location.hash.replace(/^#/, '')
  return path === '' ? '/' : path
}

function App() {
  const [path, setPath] = useState(readPath)

  useEffect(() => {
    const onHashChange = () => setPath(readPath())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const entry = navigation.find((item) => item.path === path)
  const Page = entry?.page

  return (
    <Layout currentPath={path}>
      {Page ? (
        <Page />
      ) : (
        <>
          <h1 className="font-display text-3xl font-extrabold">Página no encontrada</h1>
          <p className="mt-3 text-niebla">
            Esta sección no existe.{' '}
            <a href="#/" className="font-medium text-crema underline underline-offset-4">
              Volver a Inicio
            </a>
          </p>
        </>
      )}
    </Layout>
  )
}

export default App
