import type { LogoItem } from "@/data/marquees";

type LogoMarqueeProps = {
  logos: LogoItem[];
  isPartner?: boolean;
};

function LogoCells({ logos, isPartner = false }: LogoMarqueeProps) {
  const cells = [...logos, ...logos];

  return (
    <>
      {cells.map((logo, index) => (
        <div key={`${logo.src}-${index}`} className="logo-cell">
          <img
            src={logo.src}
            alt={logo.alt}
            loading="lazy"
            style={isPartner && logo.scale ? { ["--logo-scale" as string]: logo.scale } : undefined}
          />
        </div>
      ))}
    </>
  );
}

export function MemberMarquee({ logos }: { logos: LogoItem[] }) {
  return (
    <div className="member-strips">
      <LogoCells logos={logos} />
    </div>
  );
}

export function PartnerMarquee({
  logos,
  stripKey,
}: {
  logos: LogoItem[];
  stripKey: string;
}) {
  return (
    <div className="member-strips" data-partner-strip={stripKey}>
      <LogoCells logos={logos} isPartner />
    </div>
  );
}
