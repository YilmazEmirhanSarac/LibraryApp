import React from 'react'
import './Home.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";  
import "slick-carousel/slick/slick-theme.css";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import Writer from '../../assets/images/writer.jpg'
import Books from '../../assets/images/books.jpg'
import BorrowBook from '../../assets/images/borrowBook.jpg'
import Categories from '../../assets/images/categories.jpg'
import Publisher from '../../assets/images/publisher.jpg'

const pages = [
  { title: "Yazarlar", desc: "Yazarlar ile ilgili crud islemleri icin tiklayiniz.", link: "/authors ", image: Writer },
  { title: "Kitaplar", desc: "Kitaplar ile ilgili crud islemleri icin tiklayiniz", link: "/books", image: Books },
  { title: "Kategoriler", desc: "Kategoriler ile ilgili crud islemleri icin tiklayiniz", link: "/categories", image: Categories },
  { title: "Yayinevleri", desc: "Yayinevleri ile ilgili crud islemleri icin tiklayiniz", link: "/publishers", image: Publisher },
  { title: "Kitap Al", desc: "Kitap alma islemleri ile ilgili crud islemleri icin tiklayiniz", link: "/borrow", image: BorrowBook },
];

const HomeSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Box sx={{ width: "80%", margin: "auto", mt: 6 }}>
      <Slider {...settings}>
        {pages.map((page, index) => (
          <Card key={index} sx={{ p: 4, textAlign: "center", backgroundColor : "#EBF6FC"}}>
            <CardContent>
              <div style={{
                display: "flex",
                justifyContent: "space-around",
                width: "100%",
                alignItems: "center",
                height: "440px"
              }}>
                <div>
                  <Typography variant="h4" color='#383C3C' gutterBottom>{page.title}</Typography>
                  <Typography variant="body1" color="#383C3C">{page.desc}</Typography>
                  <Button variant="contained" color="primary" href={page.link} sx={{ mt: 2 }}>
                    Sayfaya git
                  </Button>
                </div>
                <div>
                  <img src={page.image} alt={page.title} style={{ marginTop: '16px', maxWidth: '500px', maxHeight: '500px' }}/>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </Slider>
    </Box>
  );
};

export default HomeSlider;

// function Home() {
//   return (
//     <div className='homeContainer'>
//         {/* <h1 className='homeHeader'>Kutuphane uygulamamiza hos geldiniz!</h1>
//         <p>Bu uygulamada <Link to="/books">kitap ekleme</Link>, <Link to="/authors">yazar ekleme</Link>, 
//         <Link to="/publishers">yayinevi ekleme</Link>, <Link to="/categories">kategori ekleme</Link>, ve
//         <Link to="/borrow">kitap odunc alma</Link> islemlerini yapabilirsiniz.</p> */}
//     </div>
//   )
// }

// export default Home