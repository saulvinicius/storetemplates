import Link from "next/link";
import Slider from "react-slick";

export default function Slideshow_full({ listabanners, slug_bloco }) {
  return (
  	<>
    	<div>
    		{
				listabanners.map((bloco, keyBloco) => {
					var settings = {
					  autoplay: true,
					  infinite: true,
					  speed: 500,
					  slidesToShow: 1,
					  slidesToScroll: 1,
					  nextArrow: <i class="spr spr-carousel-right" aria-label="ir para o próximo slide" role="button"></i>,
					  prevArrow: <i class="spr spr-carousel-left" aria-label="ir para o slide anterior" role="button"></i>
					};

					return(
						(bloco.slug == slug_bloco)?
							<Slider className="slideshowFull" {...settings}>
								{	
									(bloco.banners.length)?
										bloco.banners.map((item, key) => {
							    			return (
							    				<div className="item">
										          <a href={item.link} title={item.name}>
										            <picture>
										              <source media="(min-width: 520px)" data-srcset={item.image_desktop}/>
										              <img src={item.image_desktop}
										                alt={item.name}
										                />
										            </picture>
										          </a>
										        </div>
							    			)
							        	})
							        :
							        	null
					        	}
							</Slider>
						:
							null
					)
					
				})
		    }
    	</div>
     </>
  );
}


