import Head from 'next/head';

import { Header } from '@/components/Header';
import { Meta } from '@/components/Meta';

export const Layout = ({ children, title = 'Netgoflix' }) => {
  return (
    <>
      <Head>
        <title>{title === 'Netgoflix' ? title : `Netgoflix | ${title}`}</title>
      </Head>
      <Meta></Meta>
      <Header></Header>
      <div className="container content">{children}</div>
      <style jsx global>{`
        body {
          background-color: rgb(26, 32, 44);
        }

        .Header {
          background-color: rgb(26, 32, 44);
        }

        .content {
          color: #fff;
          margin-bottom: 2rem;
        }
      `}</style>
    </>
  );
};
