import { Children } from 'react'
import './App.css'
import Signup from './components/Signup'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Login from './components/Login'
import { Route } from 'lucide-react'
import Home from './components/Home'
import MainLayout from './components/MainLayout'

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    Children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
])

function App() {
  return (
    <>
    <RouterProvider router={browserRouter}/>
    </>
  )
}

export default App
