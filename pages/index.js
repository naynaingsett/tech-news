import styles from '../styles/Home.module.css';
import { Toolbar } from '../components/toolbar';
import Head from 'next/head'
export default function Home({articles}) {
  return (
    <>
      <Head>
        <title>TechNews</title>
      </Head>
      <Toolbar />
      <div className={styles.all}>
        <h1>Trending Tech News</h1>
        <div className={styles.main}>
          {articles && articles.map((article, index) => (
          <div key={index} className={styles.post}>
            <h1 onClick={() => (window.location.href = article.url)}>{article.title}</h1>
            <p>{article.description}</p>
            {!!article.urlToImage && <img src={article.urlToImage} alt='image'/>}
          </div>
          ))}
        </div>
      </div>
    </>
  );
}
export const getServerSideProps = async pageContext => {
  const apiResponse = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&category=technology&pagesize=4&page=1&apiKey=${process.env.NEXT_APP_NEWS_API_KEY}`,
  ).then(res => res.json());

  const { articles } = apiResponse;
console.log(articles)
  return {
    props: {
      articles: articles,
    },
  };
};