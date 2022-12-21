import { Carousel } from 'rsuite';

function Hero() {
  return (
    <>
      <Carousel className="banner">
        <div className="hero-text py-4 py-lg-5">
                <h1>
                    Melody <br/>
                    <div className="perfect mx-2 mx-md-auto">
                        <span> The Perfect Music Site </span>
                    </div>
                    Welcome to Music Lovers!
                </h1>
                <p>
                We are determined to give you nothing but the best music...
                </p>
                
        </div>
      </Carousel>
    </>
  );
}

export default Hero
