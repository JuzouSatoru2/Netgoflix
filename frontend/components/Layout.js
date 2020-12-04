import Head from 'next/head';

import { Header } from './Header';
import { Meta } from './Meta';

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
        }
      `}</style>
    </>
  );
};
