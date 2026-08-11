type BadgeVariant = "default" | "pending" | "comingSoon";

const variantClass: Record<BadgeVariant, string> = {
  default: "section-tag",
  pending: "badge-pending",
  comingSoon: "badge-coming-soon",
};

type BadgeProps = {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span className={[variantClass[variant], className].filter(Boolean).join(" ")}>
      {children}
    </span>
  );
}
