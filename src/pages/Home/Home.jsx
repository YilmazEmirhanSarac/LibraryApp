import React from 'react'
import './home.css'
import {
  Link
} from "react-router-dom";

function Home() {
  return (
    <div className='homeContainer'>
        <h1 className='homeHeader'>Kutuphane uygulamamiza hos geldiniz!</h1>
        <p>Bu uygulamada <Link to="/books">kitap ekleme</Link>, <Link to="/authors">yazar ekleme</Link>, <Link to="/publishers">yayinevi ekleme</Link>, <Link to="/categories">kategori ekleme</Link>, ve <Link to="/borrow">kitap odunc alma</Link> islemlerini yapabilirsiniz.</p>
    </div>
  )
}

export default Home