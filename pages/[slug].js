import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import dynamic from 'next/dynamic'
import { useState, useEffect, useRef } from 'react'
import ReactImageMagnify from 'react-image-magnify'
import Slider from "react-slick";

import Container from "@/components/container";
import Layout from "@/components/layout";
import { getConfigs, getMainMenu, getProductBySlug, getProductsByCategory, getShippingValues } from "@/lib/api";

var idStoreApp = 'n49shopv2_trijoia';
var TemplateHeader = dynamic(() => import('@/components/templates/'+idStoreApp+'/components/header'))
var TemplateFooter = dynamic(() => import('@/components/templates/'+idStoreApp+'/components/footer'))

let sliderThumbs = {
  infinite: false,
  vertical: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  speed: 500,
  responsive: [
    {
      breakpoint: 415,
      settings: {
        vertical: false,
        slidesToShow: 3
      }
    }
  ]
}

var settingsMobileSlide = {
  slidesToShow: 1,
  slidesToScroll: 1,
  speed: 500,
  dots: true
}

export default function Product({ configs, mainMenu, dadosProduto }) {
  var initialImages = [];
  function getInitialImage(dadosProduto) {
    
    var imgInicial = [];
    var tempImgInicial = [];
    
    for(var i in dadosProduto.images){
      tempImgInicial.push([i, dadosProduto.images [i]]);
    }

    var initialKey = dadosProduto.image.substring(dadosProduto.image.lastIndexOf('/')+1)
    
    if(dadosProduto.images != undefined && dadosProduto.images[initialKey] != null){
      imgInicial['show'] = dadosProduto.images[initialKey].show 
      imgInicial['popup'] = dadosProduto.images[initialKey].popup
      imgInicial['thumb'] = dadosProduto.images[initialKey].thumb
    }else if(tempImgInicial[0] != null){
      imgInicial = tempImgInicial[0][1]
    }

    return imgInicial;
  }
  if(dadosProduto){
    initialImages = getInitialImage(dadosProduto);
  }

  var shippingMethods = null;
  var selectedOptionBuy = 1;
  const postcodeTextRef = useRef();
  
  
  var [specialValue, setSpecialValue] = useState(null);
  var [mainValue, setMainValue] = useState(null);
  var [selectedQtdParcel, setSelectedQtdParcel] = useState(null);
  var [selectedValParcel, setSelectedValParcel] = useState(null);
  var [quantityBuy, setQuantityBuy] = useState(1);

  var [loading, setLoading] = useState(0);
  var [loadingText, setLoadingText] = useState('');
  var [shippingMethods, setShippingMethods] = useState('');

  //ACRESCENTA A QUANTIDADE
var fnIncrementQuantity = () => {
  let novoValor = parseInt(document.querySelector('#txtQuantity').value) + 1
  setQuantityBuy(novoValor);
  document.querySelector('#txtQuantity').value = novoValor
}
//DIMINUI A QUANTIDADE
var fnDecreaseQuantity = () => {
  if(document.querySelector('#txtQuantity').value > 1){
    let novoValor = parseInt(document.querySelector('#txtQuantity').value) - 1
    setQuantityBuy(novoValor);
    document.querySelector('#txtQuantity').value = novoValor
  }
}

var fnchangeQuantity = (e) =>{
  let valorAntigo = quantityBuy
  let novoValor = e.target.value;
  if(isNaN(novoValor)){
    document.querySelector('#txtQuantity').value = valorAntigo
  }else{
    setQuantityBuy(novoValor);
  }
}

var cepChange = (e) => {
  //let valueMask = Helper.mascaraCep(e.target)
  return true;
}

/* FN CALCULO DE FRETE */
var GetShipping = async ({ res }) => {
  // valida o preenchimento correto do campo
  if(postcodeTextRef.current.value == ""){
    this.showAlert('Por favor, insira o CEP para calcular o frete!')
    return false;
  }

  setLoading(1);
  setLoadingText('Calculando o valor do frete...');
  
  let formDataShipping = new FormData();
  formDataShipping.append('product_id', 5555555);
  formDataShipping.append('country_id', 30);
  formDataShipping.append('zone_id', '460');
  formDataShipping.append('quantity', quantityBuy);
  formDataShipping.append('optionNumbers', 1);
  formDataShipping.append('postcode', postcodeTextRef.current.value);

  //OPCOES SELECIONADAS
  if(document.querySelectorAll('.listOptions .option').length > 0){
    if(parseInt(this.props.detproduto.has_option) != 0){
      if(selectedOptionBuy != null){
        const opcoesSelecionadas = selectedOptionBuy.split('_')
        const grupoOption = opcoesSelecionadas[0]//PRIMEIRO ITEM DO ARRAY( ID DO GRUPO )
        for (var key = 0; key < opcoesSelecionadas.length; key++) {
          const opcaoSelecionada = opcoesSelecionadas[key]
          if(key != 0){// ADICIONA AS OPCOES SEM O PRIMEIRO ITEM DO ARRAY( ID DO GRUPO )
            formDataShipping.append('option['+grupoOption+']', opcaoSelecionada);		
          }
        }
    }else{
      //this.showAlert('Selecione uma opção do produto!')
      setLoading(0);
      return false;
    }
  }  
}
//OPCOES SELECIONADAS - END
  
  const resShipping = await getShippingValues(formDataShipping);

  const shippingMethods = await resShipping.json()
  const tempShipping = Object.values(shippingMethods.shipping_method)
  const shippingList = new Array()
  tempShipping.map((item, key) => {
    var tempItem = {};
    tempItem['titulo'] = item.title
    tempItem['valores'] = Object.values(item.quote)
    shippingList.push(tempItem)
  })
  setShippingMethods(shippingList);
  setLoading(0);
}
/* END - FN CALCULO DE FRETE */

  useEffect(() => {
    function getMainValue(dadosProduto) {
      var initialMainValue = null;
      if(dadosProduto != undefined){
        if(parseInt(dadosProduto.has_option) == 0){ // PRODUTO SEM OPCOES
          if(dadosProduto.special){
            initialMainValue = dadosProduto.price;
          }else{
            initialMainValue = dadosProduto.price;
          }
        }else{
          if(initialMainValue == null && dadosProduto.price){
            initialMainValue = dadosProduto.price
          }
        }
        setMainValue(initialMainValue);
      }
    }

    function getMainValue(dadosProduto) {
      var initialMainValue = null;
      if(dadosProduto != undefined){
        if(parseInt(dadosProduto.has_option) == 0){ // PRODUTO SEM OPCOES
          if(dadosProduto.special){
            initialMainValue = dadosProduto.price;
          }else{
            initialMainValue = dadosProduto.price;
          }
        }else{
          if(initialMainValue == null && dadosProduto.price){
            initialMainValue = dadosProduto.price
          }
        }
        setMainValue(initialMainValue);
      }
    }

    function getDadosParcelamento(dadosProduto){
      if(dadosProduto != undefined){
        setSelectedQtdParcel(dadosProduto.parcelas);
        setSelectedValParcel(dadosProduto.val_parcela);
      }
    }

    function getSpecialValue(dadosProduto) {
      var initialSpecialValue = null;
      if(dadosProduto != undefined){
        console.log(dadosProduto);
        if(parseInt(dadosProduto.has_option) == 0){ // PRODUTO SEM OPCOES
          if(dadosProduto.special){
            initialSpecialValue = dadosProduto.special;
          }else{
            initialSpecialValue = null;
          }
        }else{
          if(initialSpecialValue == null && dadosProduto.special){
            initialSpecialValue = dadosProduto.special
          }
        }
      }
      setSpecialValue(initialSpecialValue);
    }

    getSpecialValue(dadosProduto);
    getMainValue(dadosProduto);
    getDadosParcelamento(dadosProduto);
  })

  const [soldOutStock, setSoldOutStock] = useState(() => {
    const initialState = 0;
    return initialState;
  });
  
  
  /*if(parseInt(dadosProduto.has_option) == 0){ // PRODUTO SEM OPCOES
      
    const valorAtual = dadosProduto.price
    if(dadosProduto.special){
      setSelectedMainValue(valorAtual);
      setSelectedSpecialValue(dadosProduto.special);
    }else{
      setSelectedMainValue(null);
      setSelectedSpecialValue(valorAtual);
    }

    if(!dadosProduto.sold_out){
      setSoldOutStock(0);
    }else{
      setSoldOutStock(1);
    }
  }else{ // PRODUTO COM OPCOES
    setSoldOutStock(0);

      if(selectedMainValue == null){
        setSelectedMainValue(dadosProduto.price)
      }
      if(selectedSpecialValue == null && dadosProduto.special){
        setSelectedSpecialValue(dadosProduto.special)
      }*/

      /*for(var i in dadosProduto.options){
        grupoAtual = dadosProduto.options[i]
        for(var opt in grupoAtual.option_value){
          if(grupoAtual.option_value[opt].option_value_id==dadosProduto.opcao_selecionada){
            initialOption = grupoAtual.product_option_id+'_'+grupoAtual.option_value[opt].product_option_value_id
            this.SelectOption(initialOption, null)
          }
        }
      }
            
  }*/
 
  var changeZoom = (ev) => {
    const imgShow = ev.currentTarget.dataset.srcshow
    const imgPopup = ev.currentTarget.dataset.srcpopup
    var tempImage = {};
    tempImage['show'] = imgShow
    tempImage['popup'] = imgPopup
    //setInitialImage(tempImage);
    
  }
  
  const router = useRouter();
  if (!router.isFallback && !dadosProduto?.product_id) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout>
      <Container>
      
        {
        router.isFallback ? (
          <div>Loading…</div>
        ) : (
          <>
            <Head>
              <title>{dadosProduto.name}</title>
              <meta name="description" content="lelele" />
              <meta name="og:image" content="lilili" />
            </Head>
            <TemplateHeader configs={configs.resposta} mainMenu={mainMenu.resposta}></TemplateHeader> 
            <div className="main-content">
              <div className="page-products">
                <div className="container-padding light-background nproduct-breadcrumb">
                  <div className="container">
                    <ol className="breadcrumb">
                       <li className="breadcrumb-item">
                          <a href="/" title="Página inicial">Home</a>
                       </li>
                       <li className="breadcrumb-item">
                          {dadosProduto.name}
                       </li>
                    </ol>
                    <div className="cp-preview3">
                      <div className="container">
                          <div className="nproduct-page">

                            <div className="nproduct-gallery">
                              <div className="product-thumbnails ">
                               <div className="product-images-container">
                                 {
                                  (dadosProduto.images) ?
                                    (Object.keys(dadosProduto.images).length > 4)?
                                      <Slider className="sliderThumbs" {...sliderThumbs}>
                                        
                                          {
                                            Object.keys(dadosProduto.images).map((item, key) => 
                                                    <span
                                                      className="product-image-thumb js-carousel-control-item pointer js-product-image-thumb">
                                                        
                                                        <img src={dadosProduto.images[item].popup}
                                                          alt={dadosProduto.name}
                                                          data-srcshow={dadosProduto.images[item].show}
                                                          data-srcpopup={dadosProduto.images[item].popup}
                                                          width="10" height="10"
                                                          onClick="" />
                                                    </span>
                                            )
                                          }
                                          {
                                          (dadosProduto.videos.length)?
                                            dadosProduto.videos.map((itemVideo, keyVideo) =>  
                                              <div className="item-video" key={keyVideo}>  
                                                <a href="javascript:;" onClick="" data-videoid={itemVideo.id_video}>
                                                  <img src={`https://img.youtube.com/vi/${itemVideo.id_video}/mqdefault.jpg`} />
                                                  <i className="fa fa-youtube-play" aria-hidden="true"></i>
                                                </a>
                                              </div>
                                            )
                                          :
                                            null  
                                          }
                                        
                                      </Slider>
                                    :
                                      <>
                                       {                        
                                        Object.keys(dadosProduto.images).map((item, key) => 
                                                <span
                                                  className="product-image-thumb js-carousel-control-item pointer js-product-image-thumb">
                                                    
                                                    <img src={dadosProduto.images[item].popup}
                                                      alt={dadosProduto.name}
                                                      data-srcshow={dadosProduto.images[item].show}
                                                      data-srcpopup={dadosProduto.images[item].popup}
                                                      width="10" height="10"
                                                      onClick="" />
                                                </span>
                                          )
                                        
                                       }
                                       {
                                        (dadosProduto.videos.length)?
                                          dadosProduto.videos.map((itemVideo, keyVideo) =>  
                                            <div className="item-video" key={keyVideo}>  
                                              <a href="javascript:;" onClick="" data-videoid={itemVideo.id_video}>
                                                <img src={`https://img.youtube.com/vi/${itemVideo.id_video}/mqdefault.jpg`} />
                                                <i className="fa fa-youtube-play" aria-hidden="true"></i>
                                              </a>
                                            </div>
                                          )
                                        :
                                          null  
                                        }      
                                    </>
                                  : null
                                  }
                                </div>
                              </div>
                              
                                <div className="product-images min-width-415px">
                                  <div className="areaZoom">
                                    {
                                      (dadosProduto.labels.promo_top_left.image != null)?
                                        <div className="labelItem labelTopLeft">
                                          <img src={dadosProduto.labels.promo_top_left.image} />  
                                        </div>
                                      :
                                        null
                                    }
                                    {
                                      (dadosProduto.labels.promo_top_right.image != null)?
                                        <div className="labelItem labelTopRight">
                                          <img src={dadosProduto.labels.promo_top_right.image} />  
                                        </div>
                                      :
                                        null
                                    }
                                    {
                                      (dadosProduto.labels.promo_bottom_left.image != null)?
                                        <div className="labelItem labelBottomLeft">
                                          <img src={dadosProduto.labels.promo_bottom_left.image} />  
                                        </div>
                                      :
                                        null
                                    }
                                    {
                                      (dadosProduto.labels.promo_bottom_right.image != null)?
                                        <div className="labelItem labelBottomRight">
                                          <img src={dadosProduto.labels.promo_bottom_right.image} />  
                                        </div>
                                      :
                                        null  
                                    }

                                    <ReactImageMagnify {...{
                                            smallImage: {
                                            alt: dadosProduto.name,
                                            isFluidWidth: true,
                                            src: initialImages.show
                                        },
                                        largeImage: {
                                            src: initialImages.popup,
                                            width: configs.widthZoom,
                                            height: configs.widthZoom
                                        }
                                    }} />       
                                  </div>
                                </div>
                              

                              <div className="max-width-414px">
                                {(Object.keys(dadosProduto.images) && Object.keys(dadosProduto.images).length > 1) ?
                                  <div className="product-images">
                                    <Slider className="slideVitrine" {...settingsMobileSlide}>
                                        {
                                          Object.keys(dadosProduto.images).map((item, key) => 
                                              <div className="areaZoom">
                                                <img src={dadosProduto.images[item].popup} alt={dadosProduto.name} />
                                              </div>
                                          )
                                        }  
                                        {
                                        (dadosProduto.videos.length)?
                                          dadosProduto.videos.map((itemVideo, keyVideo) =>  
                                            <div className="areaZoom item-video" key={keyVideo}>  
                                              <a href="javascript:;" onClick="" data-videoid={itemVideo.id_video}>
                                                <img src={`https://img.youtube.com/vi/${itemVideo.id_video}/mqdefault.jpg`} />
                                                <i className="fa fa-youtube-play" aria-hidden="true"></i>
                                              </a>
                                            </div>
                                          )
                                        :
                                          null  
                                        }  
                                    </Slider>
                                  </div>
                                : (Object.keys(dadosProduto.images) && Object.keys(dadosProduto.images).length > 0) ?
                                    <>
                                      {
                                        Object.keys(dadosProduto.images).map((item, key) => 
                                          <div className="areaZoom">
                                            <img src={dadosProduto.images[item].popup} alt={dadosProduto.name} />
                                          </div>
                                        )
                                      }
                                      {
                                        (dadosProduto.videos.length)?
                                          dadosProduto.videos.map((itemVideo, keyVideo) =>  
                                            <div className="areaZoom item-video" key={keyVideo}>  
                                              <a href="javascript:;" onClick="" data-videoid={itemVideo.id_video}>
                                                <img src={`https://img.youtube.com/vi/${itemVideo.id_video}/mqdefault.jpg`} />
                                                <i className="fa fa-youtube-play" aria-hidden="true"></i>
                                              </a>
                                            </div>
                                          )
                                        :
                                          null  
                                      }
                                    </>  
                                :
                                  null
                                }  
                              </div>
                            </div>
                            <div className="nproduct-info">
                                <div className="product-actions container-padding container-padding-top">
                                  <div className="nproduct-header">
                                     <h1 className="nproduct-title">{dadosProduto.name}</h1>

                                      {(dadosProduto.model)?
                                        <ul className="infosProduct">
                                            <li><span className="titleInfo">REF:</span> {dadosProduto.model}</li>
                                        </ul>
                                      :
                                        null
                                      }

                                     <div className="rateBox">
                                        <a className="lk-avaliar" onClick="">Avaliar agora</a>
                                     </div>

                                    
                                      {(dadosProduto.short != '')?
                                        <div className="infosArea">
                                         <div className="resumeProduct">
                                          <div dangerouslySetInnerHTML={{ __html: dadosProduto.short }} />
                                         </div>
                                        </div> 
                                      :
                                        null
                                      }
                                    
                                  </div>

                                  <div className="buyArea">

                                    <div className="colSection">
                                      <div className="nprodct-price">
                                          {(specialValue) ?
                                            <div className="oldPrice">
                                              De <span className="nproduct-price-max">{mainValue}</span>
                                            </div>
                                          : 
                                            ''
                                          }  
                                          <div className="nproduct-price-value">
                                            {(specialValue) ?
                                              <>
                                                Por <span className="specialValue">{specialValue}</span>
                                               <span className="item-discount">{dadosProduto.discount_percent}</span>
                                              </>
                                            :
                                              <p>por <span>{mainValue}</span></p>
                                            }
                                          </div>

                                          {(selectedQtdParcel != '' && selectedValParcel != '')?
                                            <p className="selectedParcel">Ou <span className="numParc">{selectedQtdParcel}x</span> de <span className="valParc">{selectedValParcel}</span></p>
                                          :
                                            null
                                          }
                                       </div>

                                      {
                                        (dadosProduto != '')?
                                          (parseInt(dadosProduto.has_option) != 0) ?
                                           <div className="optionsArea">
                                            {
                                                dadosProduto.options.map((item, key) => 
                                                  <div className="box-option">
                                                    <label>{item.name}</label>
                                                    
                                                    {(item.type == 'text')?
                                                      <div className="txtOption">  
                                                        <input id="fieldOption" maxlength="3" type="text" data-group={item.product_option_id} className="field" name="txt-option" />
                                                        <div className="help">
                                                            <i className="fa fa-question-circle color2" aria-hidden="true"></i>

                                                            <div className="infoHelp">
                                                                Insira até 3 letras para personalizar a camisa com um bordado exclusivo.      
                                                            </div>
                                                        </div>
                                                      </div>
                                                    :
                                                      <ul className="listOptions">
                                                        {
                                                          item.option_value.map((itemOption, key) => 
                                                            <li>
                                                              <label className={selectedOptionBuy !== item.product_option_id+'_'+itemOption.product_option_value_id ? 'option' : 'option selected'} onClick="" href="javascript:;">{itemOption.name}</label>
                                                            </li>
                                                          )
                                                        }
                                                      </ul>
                                                    }
                                                  </div>
                                                )
                                              }
                                           </div>
                                        : 
                                          ''
                                    :  ''     
                                  }
                                    </div>

                                    {(dadosProduto.variacoes.length)?
                                      <div className="moreOptionsArea">
                                        <label>Outras Opções</label>
                                        <ul className="moreOptionsList">
                                          {
                                            dadosProduto.variacoes.map((item, key) => 
                                              <li>
                                                  <a href={'/'+item.slug} title={item.name}>
                                                    <img src={item.thumb} height="19" alt="Variação" />
                                                  </a>
                                              </li>
                                            )
                                          }
                                        </ul>
                                      </div>
                                    :
                                      null
                                    }

                                      <div className="colSection">
                                        <div className="quantityArea">      
                                          <label>Quantidade:</label>
                                          <div class="buttonsQuantity">
                                              <a href="javascript:;" onClick={fnDecreaseQuantity} className="btnLess"><i class="fa fa-minus" aria-hidden="true"></i></a>
                                              <input id="txtQuantity" type="text" name="txt-quantity" value={ quantityBuy } className="txtQuantity" />
                                              <a href="javascript:;" onClick={fnIncrementQuantity} className="btnMore"><i class="fa fa-plus" aria-hidden="true"></i></a>
                                          </div>
                                        </div>

                                        {(soldOutStock != null && !soldOutStock)?
                                          <div className="buyButtonArea">
                                                <a href="javascript:;" className="buyButton btn_buy" onClick="">
                                                   <i className="fas fa fa-shopping-cart"></i> {'Comprar'}
                                                </a>
                                          </div>
                                        : (soldOutStock != null && soldOutStock)?
                                          <div className="buyButtonArea">
                                                <a href="javascript:;" className="buyButton notifyButton" data-productid={dadosProduto.product_id} onClick="">
                                                   <i className="fa fa-envelope" aria-hidden="true"></i> Avise-me
                                                </a>
                                          </div>
                                        :
                                          null
                                        }
                                    </div>

                                    <div className="shippingArea">
                                      <label><i class="fa fa-truck"></i> Calcular frete:</label>
                                      <div className="formShipping">
                                        <input type="text" placeholder="CEP" id="txtShipping" ref={postcodeTextRef} className="txtShipping" onChange={cepChange}/>
                                        <a href="javascript:;" className="btnShipping bg_color2" onClick={GetShipping}>C</a>
                                      </div>

                                      {(shippingMethods!= null) ?
                                        (shippingMethods.length) ?
                                        <div className="shippingResult">
                                          <ul className="shippingList">
                                          {shippingMethods.map((item, key) => 
                                            item.valores.map((itemValor, keyValor) => 
                                              <li className="item">
                                                <h3 className="title">{item.titulo}</h3>
                                                <p>{itemValor.title}</p>
                                                <p>Valor: {itemValor.text}</p>
                                              </li>
                                            )
                                          )}
                                          </ul>
                                        </div>
                                        : ''
                                      :
                                        ''
                                      } 
                                    </div>

                                    {(dadosProduto.text_prevenda!= null && dadosProduto.text_prevenda != '')?
                                      <>
                                        <p className="checkPrevenda"><input id="ckprevenda" type="checkbox" onChange="" /> Concordo com o prazo de entrega descrito abaixo.</p>
                                        <div className="infoPrevenda">
                                          <h4 className="tit">TERMO DE ACEITAÇÃO</h4>
                                          {dadosProduto.text_prevenda}
                                        </div>
                                      </>
                                    :
                                      null
                                    }  

                                  </div>

                                  {(dadosProduto.guia_medidas)?
                                    <div className="guiasMedida">
                                      <ul>
                                      {
                                        dadosProduto.guia_medidas.map((itemGuia, keyGuia) => 
                                          <li className="itemGuia">
                                              <a className="color2" title={itemGuia.title} data-tituloguia="" data-conteudoguia="" onClick="">{itemGuia.title}</a>
                                          </li>
                                        )
                                      }
                                      </ul>
                                    </div>
                                  :
                                    null
                                  }
                                  
                                  

                                  

                              </div>
                              </div>

                          </div>
                        </div>
                  </div>
                  </div>
                </div>
                
              </div>
            </div>
            <TemplateFooter configs={configs.resposta} />
          </>
        )}
      </Container>
    </Layout>
  );
};

export async function getStaticProps({ params }) {
  var configs = await getConfigs();
  var mainMenu = await getMainMenu();
  var resProduct = await getProductBySlug(params.slug);

  var dadosProduto = null;
  if(resProduct.success){
    dadosProduto = resProduct.resposta.produto;
  }
  return {
    props: {
      configs,
      dadosProduto,
      mainMenu
    },
    revalidate: 60
  };
}

export async function getStaticPaths() {
  const produtos = await getProductsByCategory();

  return {
    paths:
      [],
    fallback: true,
  };
}
