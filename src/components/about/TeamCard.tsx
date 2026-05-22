import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

type TeamCardProps = {
  member: {
    name: string;
    npm: string;
    role: string;
    description: string;
    initials: string;
  };
};

export function TeamCard({ member }: TeamCardProps) {
  return (
    <Card className="h-full p-6" interactive>
      <div className="flex items-start gap-4">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-slate-950 text-base font-bold text-white shadow-sm">
          {member.initials}
        </span>
        <div>
          <h3 className="text-lg font-semibold leading-snug text-slate-950">
            {member.name}
          </h3>
          <p className="mt-1 text-sm font-medium text-slate-500">
            NPM: {member.npm}
          </p>
        </div>
      </div>
      <div className="mt-5">
        <Badge tone="indigo">{member.role}</Badge>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-600">
        {member.description}
      </p>
    </Card>
  );
}
