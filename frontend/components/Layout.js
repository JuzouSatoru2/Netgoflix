import Head from 'next/head';

import { Header } from './Header';
import { Meta } from './Meta';

export const Layout = ({ children, title = 'Netgoflix' }) => {
  return (
    <>
      <Head>
        <title>{title === 'Netgoflix' ? title : `Netgloflix | ${title}`}</title>
      </Head>
      <Meta></Meta>
      <Header></Header>
      <div className="container content">{children}</div>
    </>
  );
};
