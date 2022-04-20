import axios from 'axios'
/* api n49 */

var dominio = 'http://www.trijoiashoplocal.com.br/';

export async function getConfigs() {

  const URL = dominio+"index.php?route=feed/api/configures";
  const { data } = await axios.get(URL, {
        method: 'GET', credentials: 'include', headers: { 'API-KEY': '44c4sok0s0444s0scoo0ks80kogggsgc0cggkwoo' }})
  return data;
}

export async function getMainMenu() {
  const URL = dominio+"/index.php?route=feed/api/menu";
  const { data } = await axios.get(URL, {
        method: 'GET', credentials: 'include', headers: { 'API-KEY': '44c4sok0s0444s0scoo0ks80kogggsgc0cggkwoo' }})
  return data;
}

export async function getCategoryBySlug(slugCategoria) {
  const URL = dominio+"index.php?route=feed/api/categoria&keyword="+slugCategoria;
  const { data } = await axios.get(URL, {
        method: 'GET', credentials: 'include', headers: { 'API-KEY': '44c4sok0s0444s0scoo0ks80kogggsgc0cggkwoo' }})
  return data;
}

export async function getProductsByCategory() {
  const URL = dominio+"index.php?route=feed/api/categoria&keyword=mel-e-derivados";
  const { data } = await axios.get(URL, {
        method: 'GET', credentials: 'include', headers: { 'API-KEY': '44c4sok0s0444s0scoo0ks80kogggsgc0cggkwoo' }})
  return data;
}

export async function getBannersAll(slug) {
  const URL = dominio+"index.php?route=feed/api/banners&posicao=all";
  const { data } = await axios.get(URL, {
        method: 'GET', credentials: 'include', headers: { 'API-KEY': '44c4sok0s0444s0scoo0ks80kogggsgc0cggkwoo' }})
  return data;
}

export async function getProdutosDestaque(slug) {
  const URL = dominio+"index.php?route=feed/api/destaques";
  const { data } = await axios.get(URL, {
        method: 'GET', credentials: 'include', headers: { 'API-KEY': '44c4sok0s0444s0scoo0ks80kogggsgc0cggkwoo' }})
  return data;
}

export async function getMarcas() {
  const URL = dominio+"index.php?route=feed/api/marcas";
  const { data } = await axios.get(URL, {
        method: 'GET', credentials: 'include', headers: { 'API-KEY': '44c4sok0s0444s0scoo0ks80kogggsgc0cggkwoo' }})
  return data;
}

export async function getProductBySlug(slug) {
  const URL = dominio+"index.php?route=feed/api/produto&keyword="+slug;
  const { data } = await axios.get(URL, {
        method: 'GET', credentials: 'include', headers: { 'API-KEY': '44c4sok0s0444s0scoo0ks80kogggsgc0cggkwoo' }})
  return data;
}

export async function getShippingValues(formDataShipping) {
  const URL = dominio+"index.php?route=valdeir/calcula_frete";
  
  const headers = {
      'API-KEY': '44c4sok0s0444s0scoo0ks80kogggsgc0cggkwoo'
  };

  const { data } = await axios.post(URL, {
        formDataShipping,
        credentials: 'include',
        headers
      })
      
  return data;
}




/* end api n49 */

/*import Butter from "buttercms";

const butter = Butter(process.env.BUTTER_CMS_API_KEY);

const postsPageSize = 10;



export async function getPreviewPostBySlug(slug) {
  const postResponse = await butter.post.retrieve(slug, {
    preview: 1,
  });
  return postResponse?.data?.data;
}

export async function getPostsData(page = 1, pageSize = postsPageSize) {
  // https://buttercms.com/docs/api/node?javascript#get-your-blog-posts
  const response = await butter.post.list({
    page_size: pageSize,
    page: page,
  });

  return {
    posts: response?.data?.data,
    prevPage: response?.data?.meta.previous_page,
    nextPage: response?.data?.meta.next_page,
  };
}

export async function getAllPostsPaginated(pageSize = postsPageSize) {
  const paginatedPosts = [];
  let currentPage = 1;
  while (!!currentPage) {
    const pagePostsData = await getPostsData(currentPage, pageSize);
    paginatedPosts[currentPage - 1] = pagePostsData.posts;
    currentPage = pagePostsData.nextPage;
  }
  return paginatedPosts;
}

export async function getCategories() {
  const categories = await butter.category.list();
  return categories?.data?.data;
}

export async function getCategoryWithPosts(slug) {
  const response = await butter.category.retrieve(slug, {
    include: "recent_posts",
  });
  return response?.data?.data;
}

export async function getAtomData() {
  const atom = await butter.feed.retrieve("atom");
  return atom?.data?.data;
}

export async function getRssData() {
  const rss = await butter.feed.retrieve("rss");
  return rss?.data?.data;
}

export async function getSitemapData() {
  const sitemap = await butter.feed.retrieve("sitemap");
  return sitemap?.data?.data;
}

export async function getPagesByType(type) {
  const pages = await butter.page.list(type);
  return pages?.data?.data;
}

export async function getPageWithType(type, slug) {
  const page = await butter.page.retrieve(type, slug);
  return page?.data?.data;
}

export async function getPost(slug) {
  const post = await butter.post.retrieve(slug);
  return post?.data?.data;
}

export async function getCollectionsItems(collectionsSlugs) {
  const collectionsItems = await butter.content.retrieve(collectionsSlugs);
  return collectionsItems?.data?.data;
}

export async function getPostAndMorePosts(slug, preview) {
  const postResponse = await butter.post.retrieve(slug, {
    preview: preview ? 1 : 0,
  });
  const postListResponse = await butter.post.list();
  return {
    post: postResponse?.data?.data,
    morePosts: postListResponse?.data?.data.filter(
      ({ slug: postSlug }) => postSlug !== slug
    ),
  };
}
*/