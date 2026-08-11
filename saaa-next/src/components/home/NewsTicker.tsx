import Image from "next/image";
import Link from "next/link";
import type { TickerItem } from "@/lib/content/homepage";

type NewsTickerColumnProps = {
  title: string;
  viewAllHref: string;
  items: TickerItem[];
};

export function NewsTickerColumn({ title, viewAllHref, items }: NewsTickerColumnProps) {
  return (
    <div className="ticker-box">
      <div className="ticker-box-header">
        <div className="ticker-box-title">{title}</div>
        <Link href={viewAllHref} className="ticker-box-link">View All</Link>
      </div>
      {items.map((item) => (
        <div key={item.id} className="ticker-item">
          <Image
            className="ticker-thumb"
            src={item.image}
            alt={item.imageAlt}
            width={80}
            height={80}
          />
          <div>
            <div className="ticker-item-date">{item.dateLabel}</div>
            <div className="ticker-item-title">
              <Link href={item.href}>{item.title}</Link>
              {item.badge ? <span className="ticker-badge">{item.badge}</span> : null}
            </div>
            <div className="ticker-item-desc">{item.excerpt}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
