import { Cat } from "@/types/Cat";

const NlpApiEndpoint = 'http://localhost:3000/api/nlp';

export async function getClassification(cat: Cat): Promise<string | undefined> {
  const json: string | undefined = await fetch(`${NlpApiEndpoint}/classify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cat),
  })
    .then((res) => {
      if (!res.ok) {
        console.log('Error has occurred when analyzing text', res.status);
        return undefined;
      }
      return res.json().then((data) => data.data);
    })
    .catch((e) => {
      console.log('Error has occurred when analyzing text', e);
      return undefined;
    });
  return json;
}
