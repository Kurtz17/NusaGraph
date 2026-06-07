import { TeamCard } from "@/components/about/TeamCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { teamMembers } from "@/data/team-members";

export function TeamSection() {
  return (
    <section className="border-b border-slate-200 bg-white px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Team members"
          title="A focused team for semantic data and front-end exploration"
          description="Each role supports a different part of the prototype, from ontology structure to interface implementation and SPARQL query scenarios."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <TeamCard key={member.npm} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
