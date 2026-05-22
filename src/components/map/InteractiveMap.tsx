"use client";

import dynamic from "next/dynamic";
import { LoadingState } from "@/components/ui/LoadingState";
import type { GeographicEntity } from "@/types/geographic";

const MapClient = dynamic(() => import("@/components/map/MapClient"), {
  ssr: false,
  loading: () => <LoadingState />,
});

type InteractiveMapProps = {
  entities: GeographicEntity[];
  selectedEntity?: GeographicEntity | null;
  height?: string;
};

export function InteractiveMap(props: InteractiveMapProps) {
  return <MapClient {...props} />;
}
