import Head from 'next/head';
import styles from '../../styles/Feed.module.css';
import { Toolbar } from '../../components/toolbar';
import { Paginator } from '../../components/paginator';
export const Feed = ({ articles, pageNumber }) => {
  return articles ? (
    <>
      <Head>
        <title>TechNews</title>
        <meta property="og:image" content={articles[0]?.urlToImage} />
        <meta property="og:description" content={articles[0]?.description} />
        <meta property="og:title" content={articles[0]?.title + ' and more!'} />
      </Head>
      <div className='page-container'>
        <Toolbar />
        <Paginator pageNumber={pageNumber}/>
        <div className={styles.main}>
          {articles.map((article, index) => (
            <div key={index} className={styles.post}>
              <h1 onClick={() => (window.location.href = article.url)}>{article.title}</h1>
              <p>{article.description}</p>
              {!!article.urlToImage && <img src={article.urlToImage} alt='image' className={styles.img}/>}
            </div>
          ))}
        </div>

        <Paginator pageNumber={pageNumber}/>
      </div>
    </>
  ) : (
    <div className="page-container">
      <Toolbar />
      <div className={styles.main}>
        <h1>Oops! No articles for this page</h1>
      </div>
    </div>
  );
};

export const getServerSideProps = async pageContext => {
  const pageNumber = pageContext.query.slug;

  if (!pageNumber || pageNumber < 1 || pageNumber > 5) {
    return {
      props: {
        articles: [],
        pageNumber: 1,
      },
    };
  }

  const apiResponse = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&category=technology&pagesize=10&page=${pageNumber}&apiKey=${process.env.NEXT_APP_NEWS_API_KEY}`,
  ).then(res => res.json());

  const { articles } = apiResponse;

  return {
    props: {
      articles: articles,
      pageNumber: Number.parseInt(pageNumber),
    },
  };
};

export default Feed;