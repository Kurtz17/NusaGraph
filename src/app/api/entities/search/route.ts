import { searchEntities } from '@/lib/api';
import type { SearchFilters } from '@/types/geographic';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const minPopulation = params.get('minPopulation');

  const limit = Number(params.get('limit') ?? 3);
  const offset = Number(params.get('offset') ?? 0);

  const filters: SearchFilters = {
    province: params.get('province') ?? undefined,
    featureType: params.get('featureType') ?? undefined,
    featureClass: params.get('featureClass') ?? undefined,
    featureCode: params.get('featureCode') ?? undefined,
    minPopulation: minPopulation ? Number(minPopulation) : undefined,
  };

  try {
    const entities = await searchEntities(
      params.get('q') ?? '',
      filters,
      limit,
      offset,
    );

    return Response.json(entities);
  } catch (error) {
    return Response.json(
      {
        message:
          error instanceof Error ? error.message : 'Search request failed.',
      },
      { status: 500 },
    );
  }
}