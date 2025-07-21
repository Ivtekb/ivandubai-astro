export default function handler(request) {
  return new Response('Bot is working!', {
    status: 200,
    headers: {
      'Content-Type': 'text/plain'
    }
  });
}

export const config = {
  runtime: 'edge'
};