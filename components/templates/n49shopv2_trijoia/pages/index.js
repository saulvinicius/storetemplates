import Link from "next/link";
import Image from "next/image";
import dynamic from 'next/dynamic'

var idStoreApp = 'n49shopv2_trijoia';

var SlideshowFull = dynamic(() => import('@/components/templates/'+idStoreApp+'/components/slideshow_full'));
var BannerSlide3Cols = dynamic(() => import('@/components/templates/'+idStoreApp+'/components/banner_slide_3cols'));
var ProdutosDestaque4Cols = dynamic(() => import('@/components/templates/'+idStoreApp+'/components/produtos_destaque_4cols'));
var ListaMarcas3Cols = dynamic(() => import('@/components/templates/'+idStoreApp+'/components/lista_marcas_3cols'));

export default function Index (props) {

  return (
  	<>

      <SlideshowFull listabanners={props.banners} slug_bloco="slideshow-full"></SlideshowFull>
      <BannerSlide3Cols listabanners={props.banners} slug_bloco="banner-meio-1"></BannerSlide3Cols>
      <ProdutosDestaque4Cols blocos_destaque={props.blocos_destaque} slug_bloco="listaprodutos1"></ProdutosDestaque4Cols>
      <ProdutosDestaque4Cols blocos_destaque={props.blocos_destaque} slug_bloco="listaprodutos2"></ProdutosDestaque4Cols>
      <ListaMarcas3Cols marcas={props.marcas}></ListaMarcas3Cols>

    </>
  );
}
