import Link from "next/link";
import Slider from "react-slick";

export default function Produtos_destaque_4cols({ blocos_destaque, slug_bloco }) {
  return (
  	<>
    	<div className="bannerTopo cp-banner-slide-3cols">
    		<div className="container">
	    		{
					blocos_destaque.map((bloco, keyBloco) => {
						var settingsSlide = {
						  	slidesToShow: 5,
						  	slidesToScroll: 1,
						  	speed: 500,
						  	nextArrow: <i className="spr spr-carousel-right" aria-label="ir para o próximo slide" role="button"></i>,
						  	prevArrow: <i className="spr spr-carousel-left" aria-label="ir para o slide anterior" role="button"></i>
						}

						return(
							(bloco.prefix == slug_bloco)?
								<section class="container">
									<header class="section-header">
										<h2 class="section-title">{bloco.titulo}</h2>	
										<div class="descFeatured">
											<div dangerouslySetInnerHTML={{ __html: bloco.descricao }} />
										</div>
									</header>


									<div className="showcase clearfix product-card">
						              <div className="carousel-inset"> 
						                <Slider className="slideVitrine" {...settingsSlide}>
						                    {
						                      (bloco.produtos && bloco.produtos.length > 0) ?
						                      bloco.produtos.map((item, i) => (
						                        <div className="showcase-item cp-itemprodutos9 js-event-product-click">
													<div className="showcase-item-image porn-hover">
														<a href={item.keyword} title={item.name} tabindex="0">
															<img width="386" height="386" src={item.thumb} alt={item.name} />
														</a>
													</div>
													<div className="showcase-item-col-text">
														<div className="showcase-item-buy ">
															<span className="product-buy">
																<a className="btn btn-primary btn-block bg_color2 btn-product-detail" data-productid="1851" tabindex="0">Comprar</a>
															</span>
														</div>
														<p className="showcase-item-name">
															<a href={item.keyword} title={item.name} tabindex="0">{item.name}</a>
														</p>
														<div className="showcase-item-rating pointer" title="Avaliações">
															<span className="rating">
																<i className="rate-star-empty"></i>
																<i className="rate-star-empty"></i>
																<i className="rate-star-empty"></i>
																<i className="rate-star-empty"></i>
																<i className="rate-star-empty"></i>
															</span>
															<span className="review-quantity">0 avaliações</span>
														</div>
													</div>
													<form action="" id="product-1851" method="post">
														<div className="showcase-item-col-call">
															<div className="item-price" id="prices-blocos-1851">
																	<span className="item-price-value">{item.price}</span>
																	<div className="item-price-installments">ou {item.parcelas}x de {item.valor_parcela}</div>
															</div>
														</div>
													</form>
												</div>
						                      )) : <p>-</p>
						                    }    
						                </Slider>
						              </div>
						            </div>
						        </section>
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


