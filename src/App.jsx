import { BrowserRouter, Route, Routes } from "react-router"
import HomeLayout from "./Pages/HomeLayout/HomeLayout"
import NotFound from "./Pages/NotFound/NotFound"
import Home from "./Pages/Home/Home"
import Profile from "./Pages/Profile/Profile"
import Post from "./Pages/Post/Post"
import Reel from "./Pages/Reel/Reel"
import Create from "./Pages/Create/Create"
import Login from "./Pages/Login/Login"
import Register from "./Pages/Register/Register"
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./Components/PrivateRoute"



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeLayout />}>
            <Route index element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            } />
            <Route path="reel" element={
              <PrivateRoute>
                <Reel />
              </PrivateRoute>
            } />
            <Route path="post" element={
              <PrivateRoute>
                <Post />
              </PrivateRoute>
            } />
            <Route path="create" element={
              <PrivateRoute>
                <Create />
              </PrivateRoute>
            } />
            <Route path="profile/:id" element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } />
          </Route>


          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 404 route  */}
          <Route path="*" element={<NotFound />} />


        </Routes>
        {/* REACT TOAST */}
        <ToastContainer />
      </BrowserRouter>
    </>
  )
}

export default App
