import { getFeatureCodeFacets } from '@/lib/api';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const featureClass = request.nextUrl.searchParams.get('featureClass');

  if (!featureClass) {
    return Response.json(
      { message: 'featureClass is required.' },
      { status: 400 },
    );
  }

  try {
    const featureCodes = await getFeatureCodeFacets(featureClass);

    return Response.json(featureCodes);
  } catch (error) {
    return Response.json(
      {
        message:
          error instanceof Error
            ? error.message
            : 'Feature code facet request failed.',
      },
      { status: 500 },
    );
  }
}
