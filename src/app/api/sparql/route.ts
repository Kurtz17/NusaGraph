import { runSparqlQuery } from '@/lib/api';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { query?: string };

    if (!body.query?.trim()) {
      return Response.json({ message: 'Query is required.' }, { status: 400 });
    }

    const rows = await runSparqlQuery(body.query);

    return Response.json(rows);
  } catch (error) {
    return Response.json(
      {
        message:
          error instanceof Error ? error.message : 'SPARQL request failed.',
      },
      { status: 500 },
    );
  }
}
