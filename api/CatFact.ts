import { CatFact } from '@/types/CatFact';

const CatFactAPIEndpoint = 'https://catfact.ninja/fact';

export async function getRandomCatFact(): Promise<CatFact | undefined> {
  const json: CatFact | undefined = await fetch(CatFactAPIEndpoint)
    .then((res) => {
      if (!res.ok) {
        return undefined;
      }
      return res.json();
    })
    .catch(() => undefined);
  return json;
}

export async function getCatFacts(
  page: number
): Promise<CatFact[] | undefined> {
  const json: { data: CatFact[] } | undefined = await fetch(
    `${CatFactAPIEndpoint}s?page=${page}`
  )
    .then((res) => {
      if (!res.ok) {
        return undefined;
      }
      return res.json();
    })
    .catch(() => undefined);
  return json?.data;
}
