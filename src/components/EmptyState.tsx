import { ShieldCheck, AlertTriangle, UserPlus, Search, FolderOpen } from "lucide-react";

interface EmptyStateProps {
  variant: "zero-reviews" | "booking-error" | "no-bookings" | "no-results";
  onRetry?: () => void;
  onAction?: () => void;
}

const config = {
  "zero-reviews": {
    icon: ShieldCheck,
    iconBg: "bg-guarantee/10",
    iconColor: "text-guarantee",
    title: "New to the platform",
    message: "Book with our satisfaction guarantee — if you're not happy, get a full refund.",
    actionLabel: undefined,
  },
  "booking-error": {
    icon: AlertTriangle,
    iconBg: "bg-destructive/10",
    iconColor: "text-destructive",
    title: "Booking couldn't be completed",
    message: "The provider may be unavailable. Try another time or provider.",
    actionLabel: "Try Again",
  },
  "no-bookings": {
    icon: UserPlus,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    title: "No bookings yet",
    message: "Complete your profile to start appearing in search and attract your first students.",
    actionLabel: "Complete Profile",
  },
  "no-results": {
    icon: Search,
    iconBg: "bg-secondary",
    iconColor: "text-muted-foreground",
    title: "No instructors found",
    message: "Try adjusting your search or filters to find the right match.",
    actionLabel: "Clear Filters",
  },
};

const EmptyState = ({ variant, onRetry, onAction }: EmptyStateProps) => {
  const { icon: Icon, iconBg, iconColor, title, message, actionLabel } = config[variant];

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-10 text-center space-y-4">
      <div className={`flex h-14 w-14 items-center justify-center rounded-full ${iconBg}`}>
        <Icon className={`h-7 w-7 ${iconColor}`} />
      </div>
      <div className="space-y-1.5">
        <h3 className="text-base font-bold text-card-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground max-w-xs">{message}</p>
      </div>
      {actionLabel && (onRetry || onAction) && (
        <button
          onClick={onRetry || onAction}
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:opacity-90"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
