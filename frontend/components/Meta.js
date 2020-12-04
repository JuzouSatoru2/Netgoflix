import Head from 'next/head';

export const Meta = () => {
  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, shrink-to-fit=no, viewport-fit=cover"
        />
        <link rel="shortcut icon" href="/static/favicon.ico" />
        <meta
          name="description"
          content="Web app for browsing movies and series."
        />
        <meta name="author" content="Alex" />
        <meta name="robots" content="nofollow" />
        <meta name="HandheldFriendly" content="true" />
        <meta httpEquiv="Cache-Control" content="public, max-age=31536000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="msapplication-TileColor" content="#1a202c" />
        <meta name="mobile-web-app-capable" content="yes" />
      </Head>
    </>
  );
};
