import Link from "next/link";
import Slider from "react-slick";

export default function Banner_slide_3cols({ listabanners, slug_bloco }) {
  return (
  	<>
    	<div className="bannerTopo cp-banner-slide-3cols">
    		<div className="container">
	    		{
					listabanners.map((bloco, keyBloco) => {
						var settings = {
						  autoplay: false,
						  infinite: true,
						  speed: 500,
						  slidesToShow: 3,
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
    	</div>
     </>
  );
}


