import Link from "next/link";
import Slider from "react-slick";

var settingsSlide = {
  	slidesToShow: 3,
  	slidesToScroll: 1,
  	speed: 500,
  	nextArrow: <i className="spr spr-carousel-right" aria-label="ir para o próximo slide" role="button"></i>,
  	prevArrow: <i className="spr spr-carousel-left" aria-label="ir para o slide anterior" role="button"></i>
}
export default function Lista_marcas_3cols({ marcas }) {
  return (
  	<>
    	<div className="bannerTopo cp-carrosselmarcas3col">
    		<div className="section-header">
    			<h2 className="section-title">Compre por Marcas</h2>
	    		<div class="descFeatured">
					<p><a href="/marcas">Ver todas <i class="fa fa-chevron-right"></i></a></p>
				</div>
			</div>
    		<div className="container">
    			<div className="areaSlider">
	    		{
					<Slider className="slideVitrine" {...settingsSlide}>
	                    {
	                      (marcas && marcas.length > 0) ?
	                      marcas.map((item, i) => (
	                        <div>
	                        	<a href={item.href} id="marca" title={item.name} class="carousel-manufacture__manufacture-link">
							        <img src={item.image} alt={item.name} class="carousel-manufacture__manufacture-image img-responsive" />
							      </a>
	                        </div>
	                      )) : <p>-</p>
	                    }    
	                </Slider>		
			    }
			    </div>
			</div>
    	</div>
     </>
  );
}


