# NusaGraph

NusaGraph is a Semantic Web-based geographic exploration portal for Indonesian location data, built with RDF/Turtle, SPARQL, GeoNames vocabulary, Apache Jena Fuseki, and a Next.js frontend. It helps users search geographic entities, inspect semantic relationships, view map-based context, and run SPARQL queries against an RDF knowledge graph.

## Team Members

| No. | Name | Student ID |
| --- | --- | --- |
| 1 | Robby Azwan Saputra | 140810230008 |
| 2 | Muhammad Zahran Muntazar | 140810230014 |
| 3 | Dafa Ghani Abdul Rabbani | 140810230022 |

## Project Resources

| Resource | Description |
| --- | --- |
| Deployed website URL | [Placeholder: add deployed website link] |
| TTL dataset folder | [Google Drive TTL Folder](https://drive.google.com/drive/folders/1z1M2eXtZGU6m-QuP1Oc9mTkTjoMYBCdk?usp=sharing) |

## Table of Contents

1. [Project Overview](#project-overview)
2. [Team Members](#team-members)
3. [Project Resources](#project-resources)
4. [System Architecture](#system-architecture)
5. [Technology Stack](#technology-stack)
6. [Project Requirements](#project-requirements)
7. [Installation Guide](#installation-guide)
8. [Quick Start for Windows](#quick-start-for-windows)
9. [Running Apache Jena Fuseki](#running-apache-jena-fuseki)
10. [Running the Frontend](#running-the-frontend)
11. [Application Pages](#application-pages)
12. [User Guide](#user-guide)
13. [Example Results](#example-results)
14. [Updating the TTL Dataset](#updating-the-ttl-dataset)
15. [Validating the Output](#validating-the-output)
16. [Folder Structure](#folder-structure)
17. [Ontology and Data Model](#ontology-and-data-model)
18. [API Endpoints](#api-endpoints)
19. [Troubleshooting](#troubleshooting)
20. [References](#references)

## Project Overview

The Semantic Web represents data with clear meaning, structure, and relationships. Instead of treating information as isolated text, Semantic Web data is modeled as connected entities that can be queried and interpreted by machines.

NusaGraph applies this concept to Indonesian geographic data. Places, coordinates, feature classes, feature codes, population values, and administrative identifiers are represented as RDF-based entities. The application uses SPARQL to retrieve and filter those entities, while the frontend presents the results through search cards, maps, statistics, detail pages, and a knowledge graph workspace.

Main capabilities:

- Search Indonesian geographic entities semantically.
- Filter by feature class, feature code, province or administrative code, and population.
- Display geographic results on an interactive map.
- Inspect RDF-style metadata for each entity.
- Explore graph statistics and semantic relationship previews.
- Run editable SPARQL query templates through a browser interface.

## System Architecture

NusaGraph is divided into three main layers:

1. RDF dataset layer

   The geographic data is stored as Turtle/RDF data and loaded into Apache Jena Fuseki.

2. SPARQL service layer

   Fuseki exposes the RDF graph through a SPARQL endpoint. The Next.js server-side code sends SPARQL queries to this endpoint and converts the result into application-friendly objects.

3. Web interface layer

   The Next.js frontend provides search, filters, entity detail pages, map visualization, graph statistics, and a SPARQL Explorer.

Simplified flow:

```text
TTL/RDF Dataset -> Apache Jena Fuseki -> SPARQL Endpoint -> Next.js API Layer -> NusaGraph Interface
```

## Technology Stack

| Layer | Technology |
| --- | --- |
| Frontend framework | Next.js 16 |
| UI library | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Map visualization | Leaflet and React Leaflet |
| Icons | Lucide React |
| RDF store and SPARQL server | Apache Jena Fuseki |
| Data format | RDF/Turtle (`.ttl`) |
| Query language | SPARQL |
| Ontology vocabulary | GeoNames Ontology, RDF, WGS84 Geo Position |

## Project Requirements

Before running the project, prepare these tools:

- Node.js `>= 20.9.0`
- npm
- Git
- Apache Jena Fuseki
- RDF/Turtle dataset (`.ttl`)
- A configured Fuseki SPARQL endpoint

The Node.js dependencies are managed through `package.json` and `package-lock.json`. The `requirements.txt` file is included as a readable project requirement summary, not as a Python `pip` dependency file.

## Installation Guide

1. Clone or open the project folder.

2. Install the Node.js dependencies:

   ```bash
   npm install
   ```

3. Prepare the TTL dataset.

   The dataset folder is available here:
   [Google Drive TTL Folder](https://drive.google.com/drive/folders/1z1M2eXtZGU6m-QuP1Oc9mTkTjoMYBCdk?usp=sharing)

4. Load the TTL dataset into Apache Jena Fuseki.

5. Create a `.env` file in the project root.

6. Add the Fuseki SPARQL endpoint:

   ```env
   FUSEKI_SPARQL_ENDPOINT=http://localhost:3030/[dataset-name]/sparql
   ```

7. Start the frontend:

   ```bash
   npm run dev
   ```

8. Open the local application:

   ```text
   http://localhost:3000
   ```

## Quick Start for Windows

Use this quick path when the dependencies and Fuseki are already installed:

```powershell
npm install
npm run dev
```

Then open:

```text
http://localhost:3000
```

If the application cannot retrieve data, check the `.env` file and confirm that Fuseki is running.

## Running Apache Jena Fuseki

1. Start Apache Jena Fuseki.
2. Create or open the dataset that will store the NusaGraph TTL data.
3. Upload the Turtle file into the dataset.
4. Confirm that the dataset has an active SPARQL endpoint.
5. Copy the endpoint URL into the `.env` file.

Expected endpoint format:

```text
http://localhost:3030/[dataset-name]/sparql
```

## Running the Frontend

Development mode:

```bash
npm run dev
```

Production build:

```bash
npm run build
npm run start
```

Code quality check:

```bash
npm run lint
```

## Application Pages

| Page | Route | Purpose |
| --- | --- | --- |
| Home | `/` | Displays the main project introduction and navigation cards. |
| Search | `/search` | Searches geographic entities and displays map-based results. |
| Knowledge Graph | `/knowledge-graph` | Shows a workspace for semantic relationship previews. |
| Graph Stats | `/graph-stats` | Displays summary statistics from the RDF graph. |
| SPARQL Explorer | `/sparql` | Provides editable SPARQL query templates. |
| Methodology | `/methodology` | Explains the project flow and data processing approach. |
| Capabilities | `/features` | Summarizes the prototype features. |
| About | `/about` | Shows team and project scope information. |
| Entity Detail | `/entities/[id]` | Displays metadata, coordinates, and map context for one entity. |

## User Guide

1. Open the homepage and choose a module from the navigation.
2. Use the `Search` page to find Indonesian geographic entities by name.
3. Apply filters such as feature class, feature code, province/admin code, or population.
4. Select a result card to focus the map on that entity.
5. Open `View Detail` to inspect coordinates, feature metadata, and RDF-style information.
6. Visit `Knowledge Graph` to review semantic relationship previews.
7. Visit `Graph Stats` to view total entities, triples, provinces, natural features, administrative regions, and semantic relations.
8. Open `SPARQL Explorer` to choose a query template, edit the query, and run it against Fuseki.
9. Use `Methodology` and `About` to understand the project background, scope, and team responsibilities.

## Example Results

This section is intentionally prepared as a placeholder so final screenshots and outputs can be added later.

| Result Area | Placeholder |
| --- | --- |
| Homepage | [Placeholder: add homepage screenshot and short explanation] |
| Semantic Search | [Placeholder: add search result screenshot and short explanation] |
| Entity Detail | [Placeholder: add entity detail screenshot and short explanation] |
| Interactive Map | [Placeholder: add map screenshot and short explanation] |
| Knowledge Graph | [Placeholder: add graph workspace screenshot and short explanation] |
| Graph Statistics | [Placeholder: add graph statistics screenshot and short explanation] |
| SPARQL Explorer | [Placeholder: add SPARQL query result screenshot and short explanation] |

## Updating the TTL Dataset

1. Prepare the updated `.ttl` file.
2. Open the related dataset in Apache Jena Fuseki.
3. Replace or reload the graph data according to the dataset update method used by the team.
4. Keep the SPARQL endpoint URL unchanged when possible.
5. Restart the frontend if environment variables or endpoint settings are changed.
6. Recheck the Search, Graph Stats, Entity Detail, and SPARQL pages.

## Validating the Output

After updating or loading the dataset, validate the application through these checks:

- The Search page returns geographic entities.
- Search filters produce relevant results.
- The map displays markers for entities with coordinates.
- Entity detail pages can be opened from result cards.
- Graph Stats returns non-empty statistics.
- SPARQL Explorer can run at least one template query successfully.
- No Fuseki endpoint error appears in the interface.

## Folder Structure

```text
src/
  app/                  Application routes and API routes
  components/           UI, layout, search, map, graph, entity, and SPARQL components
  data/                 Static feature class, feature code, mock, and team data
  lib/                  SPARQL client, API functions, query templates, and utilities
  types/                TypeScript type definitions
public/                 Static assets
```

## Ontology and Data Model

NusaGraph uses RDF-style modeling to describe geographic entities and their attributes. The application expects data shaped around GeoNames and common RDF vocabularies.

Common prefixes used by the project:

```sparql
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX gn: <http://www.geonames.org/ontology#>
PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
```

Typical entity fields:

- Entity URI
- GeoNames ID
- Name
- Country code
- Feature class
- Feature code
- Latitude and longitude
- Population
- Timezone
- Administrative codes

## API Endpoints

The frontend uses internal Next.js API routes to communicate with the server-side SPARQL functions.

| Endpoint | Purpose |
| --- | --- |
| `/api/entities/search` | Searches entities using keyword and filter parameters. |
| `/api/facets` | Returns available search facet options. |
| `/api/facets/feature-codes` | Returns feature code options for a selected feature class. |
| `/api/sparql` | Runs SPARQL queries through the configured Fuseki endpoint. |

## Troubleshooting

| Problem | Possible Cause | Suggested Fix |
| --- | --- | --- |
| Search returns an error | Fuseki is not running or endpoint is incorrect | Check `FUSEKI_SPARQL_ENDPOINT` in `.env` and restart the frontend. |
| Search returns no data | Dataset is empty or TTL data was not loaded | Recheck the Fuseki dataset and run a simple SPARQL query in Fuseki. |
| Map markers do not appear | Entity data has missing latitude or longitude | Confirm that the TTL data includes `geo:lat` and `geo:long`. |
| Graph Stats fails | SPARQL endpoint cannot process the statistics query | Verify Fuseki status and dataset contents. |
| Environment variable is ignored | Development server was already running | Stop and restart `npm run dev`. |

## References

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [Apache Jena Fuseki Documentation](https://jena.apache.org/documentation/fuseki2/)
- [SPARQL 1.1 Query Language](https://www.w3.org/TR/sparql11-query/)
- [RDF 1.1 Concepts](https://www.w3.org/TR/rdf11-concepts/)
- [GeoNames Ontology](https://www.geonames.org/ontology/documentation.html)
- [Leaflet Documentation](https://leafletjs.com/reference.html)
