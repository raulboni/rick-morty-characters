import Link from "next/link";
import Image from "next/image";
const CharacterList = ({ characters }) => {
  return (
    <ul className="mt-10 flex flex-wrap gap-10 justify-center">
      {characters.map((c) => (
        <li key={c.id}>
          <h3 className="text-center my-2 py-2">{c.name}</h3>

          <Link href={`/character/${c.id}`}>
            <Image
              src={c.image}
              width="200px"
              height="200px"
              className="hover:scale-110 transition-transform"
            ></Image>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default CharacterList;
