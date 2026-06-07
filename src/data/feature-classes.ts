export const featureClassInfo: Record<
  string,
  { name: string; description: string }
> = {
  A: {
    name: 'Administrative region',
    description: 'Country, state, region, and administrative divisions.',
  },
  H: {
    name: 'Hydrographic feature',
    description: 'Streams, lakes, bays, seas, and other water features.',
  },
  L: {
    name: 'Area',
    description: 'Parks, areas, reserves, regions, and land-use features.',
  },
  P: {
    name: 'Populated place',
    description: 'Cities, villages, settlements, and populated localities.',
  },
  R: {
    name: 'Road or railroad',
    description: 'Roads, railroads, junctions, and transport corridors.',
  },
  S: {
    name: 'Spot feature',
    description:
      'Buildings, farms, facilities, and point-of-interest features.',
  },
  T: {
    name: 'Hypsographic feature',
    description: 'Mountains, hills, rocks, islands, and terrain features.',
  },
  U: {
    name: 'Undersea feature',
    description:
      'Undersea ridges, basins, seamounts, and ocean-floor features.',
  },
  V: {
    name: 'Vegetation feature',
    description: 'Forests, groves, orchards, grasslands, and vegetation areas.',
  },
};

export function getFeatureClassInfo(featureClass: string) {
  return featureClassInfo[featureClass];
}
