import { Layout } from '../components/Layout';

const Index = ({ data }) => (
  <Layout>
    <h1>Home page</h1>
    {data.map((dataSet) => (
      <ul key={dataSet._id}>
        <li>name: {dataSet.name}</li>
        <li>date: {dataSet.date}</li>
        <li>usk: {dataSet.usk}</li>
        <li>genre: {dataSet.genre}</li>
        <li>Type: {dataSet.isSerie === true ? 'serie' : 'movie'}</li>
      </ul>
    ))}
  </Layout>
);

export async function getServerSideProps() {
  const res = await fetch(process.env.BACKEND_URL);
  const data = await res.json();

  return { props: { data } };
}

export default Index;
