import { Carousel } from "antd";


function MyCarousel() {


 const slides = [

  {
    image: "/images/banner1.png",
  },


  {
    image: "/images/banner2.png",
   
  },




  {
    image: "/images/banner3.png",
    
  },

  {
    image: "/images/banner4.png",
  },



];


  return (


    <Carousel
      autoplay
      autoplaySpeed={4000}
      arrows
      infinite
    >


      {
        slides.map((slide, index)=>(


          <div key={index}>


            <div
              className="
              relative
              h-[450px]
              rounded-3xl
              overflow-hidden
              "
            >


              <img
                src={slide.image}
                className="
                w-full
                h-full
                object-cover
                "
              />



              <div
                className="
                absolute
                inset-0
                flex
                flex-col
                justify-center
                items-center
                text-white
                "
              >


                <h1
                  className="
                  text-5xl
                  font-bold
                  "
                >
                  {slide.title}
                </h1>


                <p
                  className="
                  text-xl
                  mt-4
                  "
                >
                  {slide.text}
                </p>


              </div>


            </div>


          </div>


        ))
      }



    </Carousel>


  );

}


export default MyCarousel;