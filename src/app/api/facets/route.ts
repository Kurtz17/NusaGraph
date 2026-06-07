import { getSearchFacets } from '@/lib/api';

export async function GET() {
  try {
    const facets = await getSearchFacets();

    return Response.json(facets);
  } catch (error) {
    return Response.json(
      {
        message:
          error instanceof Error ? error.message : 'Facet request failed.',
      },
      { status: 500 },
    );
  }
}
