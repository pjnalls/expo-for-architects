import { Cat } from '@/types/Cat';

const CatApiEndpoint = 'http://localhost:3000/api/cat';

export async function getCats(): Promise<Cat[] | undefined> {
  const json: Cat[] | undefined = await fetch(`${CatApiEndpoint}/get-cats`)
    .then((res) => {
      if (!res.ok) {
        return undefined;
      }
      return res.json();
    })
    .catch(() => undefined);
  return json;
}

export async function addCat(cat: Cat): Promise<Cat | undefined> {
  const json: Cat | undefined = await fetch(`${CatApiEndpoint}/add-cat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cat),
  })
    .then((res) => {
      if (!res.ok) {
        return undefined;
      }
      return res.json();
    })
    .catch((e) => {
      console.log('Error has occurred when adding cat', e);
      return undefined;
    });
  return json;
}
