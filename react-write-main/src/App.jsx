import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'
import { GET_USER } from './appwrite/backendUrls'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {

    console.log("App.jsx UseEffect called");
    fetch(GET_USER, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((data) => {
      console.log("In Then ths data is --> ", data);
      return data.json();
    }).then((user) => {
      if(user.data) {
        dispatch(login(user.data))
      } else {
        dispatch(logout())
      }

      
      console.log("In App.jsx UseEffect The User is --> ", user);
    }).catch((e) => {
      console.log("Error in catch --> ", e);
    }).finally(() => setLoading(false))
    
    // authService.getCurrentUser()
    // .then((userData) => {
    //   if (userData) {
    //     dispatch(login({userData}))
    //   } else {
    //     dispatch(logout())
    //   }
    // })
    // .finally(() => setLoading(false))
  }, [])
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap w-full flex-col justify-between bg-[#f5f5f7]'>
        <Header />
            <main className='w-full h-full'>
                <Outlet />
            </main>
        <Footer />
    </div>
  ) : null
}

export default App