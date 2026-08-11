import Image from "next/image";
import type { LogoItem } from "@/lib/content/marquees";

type LogoCellsProps = {
  logos: LogoItem[];
  isPartner?: boolean;
};

function LogoCells({ logos, isPartner = false }: LogoCellsProps) {
  const cells = [...logos, ...logos];

  return (
    <>
      {cells.map((logo, index) => (
        <div key={`${logo.src}-${index}`} className="logo-cell">
          <Image
            src={logo.src}
            alt={logo.alt}
            width={120}
            height={60}
            style={isPartner && logo.scale ? { ["--logo-scale" as string]: logo.scale } : undefined}
            loading="lazy"
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
