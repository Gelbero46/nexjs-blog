import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData
    },
  }
}

// export async function getServerSideProps( context ) {
//   return {
//     props: {

//     }
//   }
// }

export default function Home( { allPostsData } ) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hi i'm Gelbero and i'm a writer with 5 years of experience in editing, seo writing and content writing. I've working with grammaly and microsoft on large scale writing and editing tools. </p>
        
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          )
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`} >{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                {date}
              </small>
        
            </li>
          ))}
        </ul>
      </section>

    </Layout>
  );
}