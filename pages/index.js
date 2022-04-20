import Head from "next/head";
import Link from "next/link";
import dynamic from 'next/dynamic'

import Container from "@/components/container";
import Header from "@/components/header";
import Layout from "@/components/layout";

import { getConfigs, getMainMenu, getBannersAll, getProdutosDestaque, getMarcas } from "@/lib/api";

//var dirdir = 'sdfsdf';
//import TemplateHeader from "@/components/templates/n49shopv2_trijoia/header";
var idStoreApp = 'n49shopv2_trijoia';
var TemplateHeader = dynamic(() => import('@/components/templates/'+idStoreApp+'/components/header'))
var TemplatePage = dynamic(() => import('@/components/templates/'+idStoreApp+'/pages/index'))
var TemplateFooter = dynamic(() => import('@/components/templates/'+idStoreApp+'/components/footer'))

export default function Posts({configs, mainMenu, banners, produtos_destaque, marcas}) {
  return (
    <Layout>
      <Container>
        <Head>
          <title>{configs.resposta.storeName}</title>
        </Head>
        <TemplateHeader configs={configs.resposta} mainMenu={mainMenu.resposta}></TemplateHeader> 
        <TemplatePage configs={configs.resposta} banners={banners.resposta.banners} blocos_destaque={produtos_destaque.resposta}  marcas={marcas.resposta}></TemplatePage>        
        <TemplateFooter configs={configs.resposta} />
      </Container>
    </Layout>
  );
}

export async function getStaticProps() {
  var configs = await getConfigs();
  var mainMenu = await getMainMenu();
  var banners = await getBannersAll('all');
  var produtos_destaque = await getProdutosDestaque();
  var marcas = await getMarcas();
 
  return { 
    props: { configs, mainMenu, banners, produtos_destaque, marcas },
    revalidate: 60
  };
}