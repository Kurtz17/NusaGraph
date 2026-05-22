"use client";

import { useEffect, useMemo } from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import type { GeographicEntity } from "@/types/geographic";

type MapClientProps = {
  entities: GeographicEntity[];
  selectedEntity?: GeographicEntity | null;
  height?: string;
};

function FocusMap({ entity }: { entity?: GeographicEntity | null }) {
  const map = useMap();

  useEffect(() => {
    if (entity) {
      map.flyTo([entity.latitude, entity.longitude], 7, { duration: 0.8 });
    }
  }, [entity, map]);

  return null;
}

function createMarkerIcon(selected: boolean) {
  return L.divIcon({
    className: "",
    html: `<span class="block h-4 w-4 rounded-full border-2 border-white ${
      selected ? "bg-emerald-500 shadow-lg ring-4 ring-emerald-200" : "bg-teal-600 shadow-md"
    }"></span>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
}

export default function MapClient({
  entities,
  selectedEntity,
  height = "420px",
}: MapClientProps) {
  const markers = entities.length > 0 ? entities : selectedEntity ? [selectedEntity] : [];
  const center = selectedEntity
    ? [selectedEntity.latitude, selectedEntity.longitude]
    : [-2.5489, 118.0149];
  const zoom = selectedEntity ? 6 : 5;

  const markerIcons = useMemo(
    () => ({
      selected: createMarkerIcon(true),
      default: createMarkerIcon(false),
    }),
    [],
  );

  return (
    <div
      className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm"
      style={{ height }}
    >
      <MapContainer
        center={center as [number, number]}
        zoom={zoom}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FocusMap entity={selectedEntity} />
        {markers.map((entity) => (
          <Marker
            key={entity.id}
            position={[entity.latitude, entity.longitude]}
            icon={
              entity.id === selectedEntity?.id
                ? markerIcons.selected
                : markerIcons.default
            }
          >
            <Popup>
              <div className="space-y-1">
                <p className="font-semibold text-slate-950">{entity.name}</p>
                <p className="text-sm text-slate-600">{entity.featureType}</p>
                <p className="text-xs text-slate-500">
                  {entity.province ?? "Indonesia"}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
