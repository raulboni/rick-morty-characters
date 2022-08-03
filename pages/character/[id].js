import Layout from "../../components/Layout";
import { useFetch } from "../../hooks/useFetch";
import Image from "next/image";

export async function getServerSideProps({ query }) {
  const { id } = query;
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/${id}`
  );
  const data = await response.json();
  return {
    props: { data }, // will be passed to the page component as props
  };
}
const Character = ({ data }) => {
  const { name, image, gender, location, origin, species, status } = data;
  return (
    <Layout>
      <div className="flex flex-col gap-10">
        <h3 className="text-center text-2xl">{name}</h3>
        <div className="flex flex-col gap-4 sm:flex-row justify-center items-center">
          <Image
            src={image}
            width="300px"
            height="300px"
            layout="fixed"
          ></Image>
          <ul className="font-mono">
            <li>Species: {species}</li>
            <li>Gender: {gender}</li>
            <li>Origin: {origin.name}</li>
            <li>Status: {status}</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Character;
