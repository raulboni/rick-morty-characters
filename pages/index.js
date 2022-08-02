import Image from "next/image";
import { useState } from "react";
import Layout from "../components/Layout";
import { useFetch } from "../hooks/useFetch";
import CharacterList from "../components/CharacterList";

export default function Home() {
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const baseUrl = `https://rickandmortyapi.com/api/character/?page=${page}`;

  const { data, pages, error } = useFetch(baseUrl, filters);
  const onChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPage(1);
  };

  return (
    <Layout>
      <div className=" flex justify-center flex-wrap p-4 mx-10 gap-2">
        <select
          className=" bg-slate-200 p-1 rounded-sm"
          name="gender"
          onChange={(e) => onChange(e.target.name, e.target.value)}
        >
          <option value=""></option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <select
          className=" bg-slate-200 p-1 rounded-sm"
          name="species"
          onChange={(e) => onChange(e.target.name, e.target.value)}
        >
          <option value=""></option>
          <option value="human">Human</option>
          <option value="alien">Alien</option>
        </select>

        <select
          className=" bg-slate-200 p-1 rounded-sm"
          name="status"
          onChange={(e) => onChange(e.target.name, e.target.value)}
        >
          <option value=""></option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
        </select>
      </div>
      <form
        className="flex justify-center my-2 gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          onChange(e.currentTarget.name.name, e.currentTarget.name.value);
          console.log(filters);
        }}
      >
        <input
          className=" bg-slate-200 p-1 rounded-sm"
          name="name"
          type="text"
        />
        <button className="bg-slate-600 text-white hover:bg-slate-800 py-1 px-4 rounded-sm">
          Search
        </button>
      </form>
      {error && <p>{error}</p>}
      {data && <CharacterList characters={data} />}
      <div className=" my-10 flex justify-center align-baseline">
        <Image
          className="mt-auto cursor-pointer"
          src="/first.svg"
          width="30px"
          height="30px"
          onClick={() => setPage(1)}
        ></Image>
        <Image
          className="rotate-180 cursor-pointer"
          src="/next.svg"
          width="30px"
          height="30px"
          onClick={() => page > 1 && setPage((p) => p - 1)}
        ></Image>
        <span className="mr-1 mt-0.5 px-3 rounded-sm">
          {page > 1 && page - 1}
        </span>
        <span className="mx-1 text-slate-100 bg-slate-600 mt-0.5 px-3 rounded-sm">
          {page}
        </span>
        <span className="ml-1 mt-0.5 px-3 rounded-sm">
          {page < pages - 1 && page + 1}
        </span>
        <Image
          className="cursor-pointer"
          src="/next.svg"
          width="30px"
          height="30px"
          onClick={() => page < pages && setPage((p) => p + 1)}
        ></Image>
        <Image
          className="cursor-pointer"
          src="/last.svg"
          width="30px"
          height="30px"
          onClick={() => setPage(pages)}
        ></Image>
      </div>
    </Layout>
  );
}
