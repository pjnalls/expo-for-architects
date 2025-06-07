import { Cat } from '@/types/Cat';

const NlpApiEndpoint = 'http://localhost:3000/api/nlp';

export async function getClassification(
  cat: Cat
): Promise<{ data: string } | undefined> {
  const json: { data: string } | undefined = await fetch(
    `${NlpApiEndpoint}/classify`,
    {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8081',
        'Access-Control-Allow-Credentials': 'true',
      },
      body: JSON.stringify(cat),
    }
  )
    .then((res) => {
      if (!res.ok) {
        console.log('Error has occurred when analyzing text', res);
        return undefined;
      }
      console.log('res', res);
      return res.json();
    })
    .catch((e) => {
      console.log('Error has occurred when analyzing text', e);
      return undefined;
    });
  return json;
}
