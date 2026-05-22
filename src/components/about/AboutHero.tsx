export function AboutHero() {
  return (
    <section className="border-b border-slate-200 bg-slate-50 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold text-teal-700">Project team</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          About NusaGraph
        </h1>
        <p className="mt-5 max-w-2xl text-xl font-semibold leading-snug text-slate-800">
          Meet the team behind the Indonesian Semantic Geographic Knowledge
          Graph prototype.
        </p>
        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">
          NusaGraph is a front-end prototype for exploring Indonesian
          geographic entities through semantic search, RDF-based data
          representation, GeoNames Ontology, and SPARQL query exploration. This
          project was developed as part of a Semantic Web final project.
        </p>
      </div>
    </section>
  );
}
