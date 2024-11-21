import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function HomeSlider() {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4500,
    autoplaySpeed: 4500,
    cssEase: "linear"
  };
  return <>
    <Slider {...settings}>
      <div>
        <img src={require(`../../images/slider/grocery-banner-2.jpeg`)} className='w-100' style={{height:'300px'}} alt="" />
      </div>
      <div>
        <img src={require(`../../images/slider/grocery-banner.png`)} className='w-100' style={{height:'300px'}} alt="" />
      </div>
      <div>
        <img src={require(`../../images/slider/slider-2.jpeg`)} className='w-100' style={{height:'300px'}} alt="" />
      </div>
      <div>
        <img src={require(`../../images/slider/slider-image-1.jpeg`)} className='w-100' style={{height:'300px'}} alt="" />
      </div>
      <div>
        <img src={require(`../../images/slider/slider-image-2.jpeg`)} className='w-100' style={{height:'300px'}} alt="" />
      </div>
      <div>
        <img src={require(`../../images/slider/slider-image-3.jpeg`)} className='w-100' style={{height:'300px'}} alt="" />
      </div>
    </Slider>
  </>
}
