
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import {Autoplay, EffectFade} from 'swiper/modules';
import {data} from './Data';
import Hero from './Hero';

const Home2 = () => {
  return (
   <Swiper
    spaceBetween={30}
    speed={2000}
    autoplay={{delay: 3000, disableOnInteraction: false}}
    effect={"fade"}
    fadeEffect={{crossFade: true}}
    modules={[Autoplay, EffectFade]}
    className="mySwiper"
   >
      {data.map(({id, colorDeep, colorLite, mainText, subText, shadow, mobileShadow, img}) => (
        <SwiperSlide key={id} style={{backgroundColor: `${colorLite}`}} className="w-full h-full lg:h-screen flex flex-col md:gap-10  py-8 md:pt-8">
          <Hero
            colorDeep={colorDeep}
            mainText={mainText}
            subText={subText}
            shadow={shadow}
            mobileShadow={mobileShadow}
            img={img}
          />
        </SwiperSlide>
      ))}
   </Swiper>
  )
}

export default Home2