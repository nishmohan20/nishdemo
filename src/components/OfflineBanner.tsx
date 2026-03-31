import { WifiOff } from "lucide-react";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";

const OfflineBanner = () => {
  const isOnline = useNetworkStatus();

  if (isOnline) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="mx-4 max-w-sm rounded-xl border border-destructive/30 bg-card p-8 text-center shadow-lg space-y-4">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
          <WifiOff className="h-7 w-7 text-destructive" />
        </div>
        <div className="space-y-1.5">
          <h3 className="text-base font-bold text-card-foreground">No network connection</h3>
          <p className="text-sm text-muted-foreground">
            Please connect to the internet and try again.
          </p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="w-full rounded-lg bg-primary py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:opacity-90"
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default OfflineBanner;
