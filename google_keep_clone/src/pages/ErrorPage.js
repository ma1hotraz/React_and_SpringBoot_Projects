import React from 'react'
import '../css/ErrorPage.css'
import { Link } from 'react-router-dom'
import sww from '../images/sww.gif';

export default function ErroPage() {
  return (
    <div style={{ marginTop: '35vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <img src={sww} style={{ height: '150px', width: '150px' }} alt="Something Went Wrong" />
      <h2>Something Went Wrong, Please Refresh Page or Try Again After Sometimes.</h2>
      <Link to="/signin" className="link_404" style={{ textDecoration: 'none' }}>Go to Home</Link>
    </div>
  )
}


