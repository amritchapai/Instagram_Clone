import { Children } from 'react'
import './App.css'
import Signup from './components/Signup'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Login from './components/Login'
import { Route } from 'lucide-react'
import Home from './components/Home'
import MainLayout from './components/MainLayout'
import Suggested from './components/Suggested'

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/suggested",
        element: <Suggested />,
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
]);

function App() {
  return (
    <>
    <RouterProvider router={browserRouter}/>
    </>
  )
}

export default App
