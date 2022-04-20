import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import dynamic from 'next/dynamic'

import Container from "@/components/container";
import Layout from "@/components/layout";
import { getConfigs, getMainMenu, getCategoryBySlug, getProductsByCategory } from "@/lib/api";

var idStoreApp = 'n49shopv2_trijoia';
var TemplateHeader = dynamic(() => import('@/components/templates/'+idStoreApp+'/components/header'))
var TemplateFooter = dynamic(() => import('@/components/templates/'+idStoreApp+'/components/footer'))

export default function Categoria({ configs, mainMenu, dadosCategoria }) {
  const router = useRouter();
  if (!router.isFallback && !dadosCategoria?.keyword) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout>
      <Container>
        {router.isFallback ? (
          <div>Loading…</div>
        ) : (
          <>
            <Head>
              <title>{dadosCategoria.name}</title>
              <meta name="description" content="lelele" />
              <meta name="og:image" content="lilili" />
            </Head>
            <TemplateHeader configs={configs.resposta} mainMenu={mainMenu.resposta}></TemplateHeader> 
            <div clas="main-content">
              <div className="list-products">
                <div className="container">
                  <div className="column-left">
                    FILTRO
                  </div>
                  <div className="container-content container-template">
                    <div className="header-area">
                      <h1 class="category-page-title">{dadosCategoria.name}</h1>
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
}

export async function getStaticProps({ params }) {
  var configs = await getConfigs();
  var mainMenu = await getMainMenu();
  var resCategoria = await getCategoryBySlug(params.slug);
  var dadosCategoria = null;
  if(resCategoria.success){
  	dadosCategoria = resCategoria.resposta;
  }
  return {
    props: {
      configs,
      dadosCategoria,
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
