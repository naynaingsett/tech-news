import Head from 'next/head';
import styles from '../styles/About.module.css';
import { Toolbar } from '../components/toolbar';

export const About = ({ employee }) => {
  return (
    <>
      <Head>
        <title>About</title>
        <meta
          name="description"
          content={`This project is developed by ${employee.name}`}
        />

        <meta property="og:image" content={employee.image} />
        <meta property="og:title" content="About" />
        <meta
          property="og:description"
          content={`This project is developed by ${employee.name}`}
        />

        <meta property="twitter:image" content={employee.image} />
        <meta property="twitter:title" content="About" />
        <meta
          property="twitter:description"
          content={`This project is developed by ${employee.name}`}
        />
      </Head>

      <div className="page-container">
        <Toolbar />

        <div className={styles.main}>
          <h1>Developed by</h1>
          <div className={styles.about}>
            <h2>{employee.name}</h2>
            <p>{employee.position}</p>
            <img src={employee.image} alt="employee" />
            <a href={employee.website}><span>My website: naysett20.netlify.app</span></a>
            <p>{employee.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async pageContext => {
  const apiResponse = await fetch(
    'https://my-json-server.typicode.com/naynaingsett/tech-news/aboutTheDeveloper',
  );
  const employee = await apiResponse.json();
  return {
    props: {
      employee,
    },
  };
};

export default About;