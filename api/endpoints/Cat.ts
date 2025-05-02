import { Cat } from '@/types/Cat';

const CatAPIEndpoint = 'http://localhost:3000/api/cat';

export async function getCats(): Promise<Cat[] | undefined> {
  const json: { data: Cat[] } | undefined = await fetch(
    `${CatAPIEndpoint}/get-cats`
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

export async function addCat(cat: Cat): Promise<Cat | undefined> {
  const json: { data: Cat } | undefined = await fetch(
    `${CatAPIEndpoint}/add-cat`,
    {
      method: 'POST',
      body: JSON.stringify(cat),
    }
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
