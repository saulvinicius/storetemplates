import Link from "next/link";

export default function Header({ configs, mainMenu}) {

  return (
    <header className="header cp-header6">
    	<div className="barra-html-topo">
      		<div className="container">
        		<div className="col-sm-12">
        			<p><a href="https://api.whatsapp.com/send?phone=5551999460836&amp;text=&amp;source=&amp;data=&amp;app_absent=" target="_blank"><i className="fab fa-whatsapp" aria-hidden="true"></i> <b>Whatsapp</b> (51) 9 9946.0836</a> | <b>Frete Grátis</b>&nbsp;para todo Brasil nas compras acima de R$ 398,00 | Parcele em até <strong>10x sem juros</strong></p>
            		<ul className="social-top">
						<li><a href="https://www.facebook.com/lojasTriJoia" target="_blank"><i className="fab fa-facebook-f"></i></a></li>
						<li><a href="https://www.instagram.com/trijoiadigital/" target="_blank"><i className="fab fa-instagram"></i></a></li>
					</ul>
        		</div>
      		</div>
    	</div>
    
    	<div className="header-middle container container-padding">
	        <div className="container">
		        <div className="row">
		        	<div className="col-sm-4 col-header search-desk">
		            	<div className="header-search">
		                	<form className="form-search" action="busca" method="GET" id="form-busca">
		                    	<span className="twitter-typeahead">
		                        	<input type="search" id="autocomplete-input" name="search" className="form-control typeahead tt-input color2" placeholder="Busque aqui" dir="auto" />
		                      	</span>
		                      	<div className="input-group-btn">
		                        	<button type="submit" className="btn btn-search">
		                            	<i className="fa fa-search" aria-hidden="true"></i>
		                          	</button>
		                      	</div>
		                	</form>
		            	</div>
		        	</div>

		        	<div className="col-9 col-sm-4 col-header center-logo">
		            	<Link href="/">
		            		<a title={configs.storeName} className="link-logo"><img src={configs.storeLogotipo} alt={configs.storeName} className="header-logo" /></a>
		                </Link>
		        	</div>

		        	<div className="col-3 col-sm-4 col-header header-right-area">
		            	<div className="header-shopping-wrapper">
		                	<div className="header-account">
		                    	<div className="header-account-item area-account-top area-account-top my-account">
		                        	<a className="header-icon-account">
		                          		<i className="icon-user"></i>
		                        	</a>
		                          
		                          	<div className="current-user isnt-logged">
		                            	<div className="header-account-menu">
		                                	<div className="header-account-menu-inner"></div>
		                              	</div>
		                          	</div>
		                    	</div>
			                    <a href="/lista_de_desejos" className="header-wishlist" title="Minha Lista">
		                        	<i className="icon-wishlist"></i>
		                    	</a>
			                    <div className="header-bag">
		                        	<a href="/checkout/carrinho" className="js-bag-click vanilla-bag" title="Meu Carrinho">
		                            	<span className="bag-full">
		                                	<span className="cart-summary-quantity badge-custom">
		                                    	<span>0</span>
		                                	</span>
			                                <i className="icon-cart"></i>
			                            </span>
		                        	</a>
		                        	<div className="cart-summary-wrap">
		                          		<div className="cart-summary-inner">
		                              		<div className="products-cart">
		                                		<ul className="lista-produtos">
		                                		</ul>
		                                		<a href="/checkout/carrinho" className="btn btn-primary btn-block btn-checkout bg_color2">
		                                    		Finalizar Compra
		                                		</a>
		                              		</div>
		                          		</div>    
		                        	</div>
		                    	</div>
		                    </div>
		            	</div>
		        	</div>  
				</div>
	        	<div className="col-12 col-header search-mobile">
	            	<div className="header-search">
	                	<form className="form-search" action="busca" method="GET" id="form-busca">
	                    	<span className="twitter-typeahead">
	                        	<input type="search" id="autocomplete-input" name="search" className="form-control typeahead tt-input color2" placeholder="Busque aqui" dir="auto" />
	                      	</span>
	                      	<div className="input-group-btn">
	                        	<button type="submit" className="btn btn-search">
	                            	<i className="fa fa-search" aria-hidden="true"></i>
	                          	</button>
	                      	</div>
	                	</form>
	            	</div>
	        	</div> 
	        </div>         
    	</div> 

    	<nav className="header-menu header-menu-desk js-menu-mobile clearfix bg_color1 bg_cor_padrao_2">
			<div className="hidden-xs hidden-sm">
				<ul className="container main-menu">
					{
						(mainMenu.menus.length)?
							mainMenu.menus.map((item, key) => {
				    			return (
				    				<li className="menu-item first">
										<Link href={'/produtos/'+item.href}>
											<a className="">{item.title}</a>
										</Link>
									</li>
				    			)
				        	})
				        :
				        	null
					}
				</ul>
			</div>
		</nav>   
	</header>
  );
}
