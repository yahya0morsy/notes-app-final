import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Bgg from './bg.jsx'
import { useState } from 'react'
import Sign from './sign.jsx'
import Try from './try.jsx'
import SignNew from './newUser.jsx'
import Notes from './notes.jsx'
 
 const App = () => (
  <HashRouter>
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
    </Routes>

   
  </HashRouter>
)

export default App