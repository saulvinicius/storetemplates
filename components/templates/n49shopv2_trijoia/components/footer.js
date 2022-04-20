import Link from "next/link";

export default function Footer({ configs }) {
	var loadBlock = (shortcode) => {
		let blockList = null
		let countBlocks = 0
		
		if(configs.footerBlocks){
			blockList = Object.keys(configs.footerBlocks)
			countBlocks = blockList.length	
		}
		
		let resultBlock = []
		let linksBlock = null
		let contentBlock = null
		
		for (var i = 1; i <= countBlocks; i++) {
			if((configs.footerBlocks[i]) && (configs.footerBlocks[i].shortcode == shortcode) && (configs.footerBlocks[i].status == 1)){
				let arrayLinks = []		
				if(configs.footerBlocks[i].link_interno!= null){
					arrayLinks = Object.keys(configs.footerBlocks[i].link_interno).map(item => 
						configs.footerBlocks[i].link_interno[item]
					);
				}
				resultBlock['links'] = arrayLinks
				resultBlock['conteudo'] = configs.footerBlocks[i].description[5]
			}
		}
		
		return resultBlock;
	}

	var decodeHtml = (str) => {
		const translate_re = /&(nbsp|amp|quot|lt|gt|#x27;|#x2F;);/g
		let result = null
	
		const translate = {
			'nbsp': ' ', 
			'amp' : '&', 
			'quot': '"',
			'lt'  : '<', 
			'gt'  : '>',
			'#x27;': "'",
			'#x2F;': '/' 
		},
		translator = function($0, $1) { 
			return translate[$1]; 
		};
		
		if(str){
			result = str.replace(translate_re, translator)	
		}
		
		return result
	}

	var blockFooter1 = loadBlock('links_topo_1')
	var blockFooter2 = loadBlock('links_topo_2')

  return (
    <footer className="footer cp-footer7">
				
		<div className="container">		
			<div className="row links-footer">
				<div className="col-md-3 col-sm-12 v-top">
					<div className="title-block">
						<div className="area-logo-footer">
							<img className="logo-footer" src="https://db7qxt7xxlq5m.cloudfront.net/fit-in/0x0/filters:fill(ffffff)/filters:quality(80)/n49shopv2_trijoia/images/footerspa/logo-footer-trijoiashop.png" />
						</div>

						<div className="social-area">
							<div className="square-social col-sm-2 bg-white mr-2">
								<a href="https://www.facebook.com/lojasTriJoia" target="_blank"><i className="fab fa-facebook-f color2"></i></a>
							</div>

							<div className="square-social col-sm-2 bg-white">
								<a href="https://www.instagram.com/trijoiadigital" target="_blank"><i className="fab fa-instagram color2"></i> </a></div>
							</div>
						</div>
					</div>
					<div className="tamanho-tablet col-md-3 col-sm-12 v-top column-links column-lk1">
						{
							(blockFooter1 != null) ?
								<>
									<div dangerouslySetInnerHTML={{ __html: decodeHtml(blockFooter1.conteudo) }} />
									<ul class="menufooter">
										{
											(blockFooter1.links != null && blockFooter1.links.length) ?		
											blockFooter1.links.map((item, key) => 
													(item.tipo_pagina == 'informacoes') ?
														<li><a href={"/"+item.pagina+"/i"} className="footer-nav-link">{item.label}</a></li>
													: (item.tipo_pagina == 'minhaconta' && item.pagina != 'contato') ?
														<li><a href={"/"+item.pagina} className="footer-nav-link">{item.label}</a></li>
													: (item.tipo_pagina == 'linkdireto') ?
														<li><a href={item.pagina} className="footer-nav-link">{item.label}</a></li>
													:
														<Link key={key} href={"/"+item.pagina}>
															<li><a className="footer-nav-link">{item.label}</a></li>
														</Link>
												)
											:
												null
										}
									</ul>
								</>	
							:
								null
						}
					</div>

					<div className="col-md-3 col-sm-12 v-top column-links column-lk2">
						{
							
							(blockFooter2 != null) ?
								<>
									<div dangerouslySetInnerHTML={{ __html: decodeHtml(blockFooter2.conteudo) }} />
									<ul class="menufooter">
										{
											(blockFooter2.links != null && blockFooter2.links.length) ?		
											blockFooter2.links.map((item, key) => 
													(item.tipo_pagina == 'informacoes') ?
														<li><a href={"/"+item.pagina+"/i"} className="footer-nav-link">{item.label}</a></li>
													: (item.tipo_pagina == 'minhaconta' && item.pagina != 'contato') ?
														<li><a href={"/"+item.pagina} className="footer-nav-link">{item.label}</a></li>
													: (item.tipo_pagina == 'linkdireto') ?
														<li><a href={item.pagina} className="footer-nav-link">{item.label}</a></li>
													:
														<Link key={key} href={"/"+item.pagina}>
															<li><a className="footer-nav-link">{item.label}</a></li>
														</Link>
												)
											:
												null
										}
									</ul>
								</>	
							:
								null
						}
					</div>

					<div className="col-md-3 col-sm-12 v-top column-links column-lk3">
						<div className="title-block">
							<h3 className="footer-title-menu">Contato</h3>

							<p>Rua Sapiranga, 9595, Imigrante - Campo Bom</p>

							<p><strong>Fone:&nbsp;</strong>51 35986100</p>

							<p><b>WhatsApp</b> <a href="https://api.whatsapp.com/send?phone=5551999460836&amp;text=&amp;source=&amp;data=&amp;app_absent=" target="_blank">(51) 9 9946 0836</a></p>

							<p><a href="mailto:marketing@trijoia.com.br">marketing@trijoia.com.br</a></p>
						</div>
					</div>
				</div>

				<div className="row base-footer">
					<div className="tamanho-tablet col-md-4 col-sm-12 v-middle img-footer-1">
						<div>
							<div className="title-block">
								<h3 className="footer-title-menu">Segurança</h3>
							</div>
							<div className="content-block">
								<ul className="d-flex">
									<li>
										<img className="pr-2" src="https://db7qxt7xxlq5m.cloudfront.net/fit-in/0x0/filters:fill(ffffff)/filters:quality(80)/n49shopv2_trijoia/images/footerspa/selos.jpg" />
									</li>
									<li>&nbsp;</li>
								</ul>
							</div>
						</div>
					</div>
					<div className="tamanho-tablet col-md-4 col-sm-12 v-middle">
						<div className="paymentArea">
							<div className="title-block">
								<h3 className="footer-title-menu">Formas de Pagamento</h3>
							</div>
							<div className="content-block">
								<p><img src="https://db7qxt7xxlq5m.cloudfront.net/fit-in/0x0/filters:fill(ffffff)/filters:quality(80)/n49shopv2_trijoia/images/footerspa/formas-pagamento-trijoia.png" /></p>
							</div>
						</div>
					</div>
					<div className="col-md-4 col-sm-12 v-middle box-developers">
						<div className="paymentArea">
							<p><a href="https://www.n49.com.br" target="_blank"><img src="/catalog/view/theme/includes/layouts/images/n49-plataforma-ecommerce.png" /></a> <a className="bra" href="http://www.bradigital.com.br/?gclid=Cj0KCQjw7Nj5BRCZARIsABwxDKLTFqgCjHifMm8och7RQ37U_5p-3YnjIGrssNem5M6K8yrnm9tXN_MaAi04EALw_wcB" target="_blank"><img src="https://1ab6290f102b0284.cdn.gocache.net/n49shopv2_trijoia/images/footerspa/logo-bra.png" /></a></p>
						</div>
					</div>
					<div className="storeInfo">
						<div className="footer-desc t-center">
							<p>CWD Gestao Digital Com de Prod Ópticos @ 2020 - Todos os direitos reservados - CNPJ 36.572.435/0001 58 Ofertas válidas enquanto durarem nossos estoques - Vendas sujeitas à análise e confirmação de dados pela empresa - Os preços, promoções e condições de pagamento são válidos exclusivamente para compras efetuadas em nossa loja virtual.</p>
						</div>
					</div>
				</div>
	</div>
</footer>
  );
}
