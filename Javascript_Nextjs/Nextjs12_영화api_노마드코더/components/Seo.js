import Head from 'next/head';

function Seo({ title }) {
  return (<>
    {/* 헤드 타이틀 바꾸기 */}
    <Head>
      <title>{title} | Next movies</title>
    </Head>
    </>)
}

export default Seo
