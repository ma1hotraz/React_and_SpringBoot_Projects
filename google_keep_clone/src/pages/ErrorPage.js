import React from 'react'
import sww from '../images/sww.gif'
import '../css/ErrorPage.css'

export default function ErroPage() {
  return (
    <div style={{ marginTop: '35vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <img src={sww} style={{ height: '150px', width: '150px' }} alt="Something Went Wrong" />
      <h2>Something Went Wrong, Please Login Again</h2>
      <a href="/signin" className="link_404" style={{ textDecoration: 'none' }}>Go to Home</a>
    </div>


  )
}


