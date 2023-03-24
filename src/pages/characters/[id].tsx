import imageLoader from "imageLoader";
import Image from 'next/image';
import {Character, GetCharacterResults} from "../../../types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function CharacterPage({character}:{
    character: Character
}){
    return <div>
        <h1>Character page</h1>

        <Image
            loader = {imageLoader}
            unoptimized
            src={character.image}
            alt={character.name}
            width="200"
            height="200"
        />
        
        </div>;
}

export async function getStaticPaths(){
    const res = await fetch("https://rickandmortyapi.com/api/character");
    const {results}: GetCharacterResults = await res.json();

    return{
        paths: results.map((character) => {
            return { params: {id: String(character.id) }};
        }),
        fallback: false,
    };
}

export async function getStaticProps({ params }: { params: {id: string } }) {
    const res = await fetch(
        'https://rickandmortyapi.com/api/character/${params.id}'
    );
    const character = await res.json()
    return {
        props: {
            character
        }
    }
}

//export default CharacterPage;
export default function CharacterPageWrapper() {
    const router = useRouter();
    const { id } = router.query;
    const [character, setCharacter] = useState<Character | null>(null);
  
    useEffect(() => {
      async function fetchCharacter() {
        const res = await fetch(
          `https://rickandmortyapi.com/api/character/${id}`
        );
        const characterData = await res.json();
        setCharacter(characterData);
      }
  
      if (id) {
        fetchCharacter();
      }
    }, [id]);
  
    if (!character) {
      return <div>Loading...</div>;
    }
  
    return <CharacterPage character={character} />;
  }
  
  
  
  
  