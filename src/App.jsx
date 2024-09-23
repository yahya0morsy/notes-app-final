import React from 'react'
import {BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import Bgg from './bg.jsx'
import { useState } from 'react'
import Sign from './sign.jsx'
import Try from './try.jsx'
import SignNew from './newUser.jsx'
import Notes from './notes.jsx'
import Showing from './show.jsx'
import Adddata from './addNote.jsx'
import Profile from './profile.jsx'
 const App = () => (
  
    <Routes>
    <Route
      
      path='/'
      element={<Sign/>}
    />
      <Route
      
      path='/try'
      element={<Notes/>}
    />
     <Route
      
      path='/addUSer'
      element={<SignNew/>}
    />
      <Route
      
      path='/display'
      element={<Showing/>}
    />
    <Route
      
      path='/adding'
      element={<Adddata/>}
    />
        <Route
      
      path='/profile'
      element={<Profile/>}
    />
    </Routes>

   
  
)

export default App