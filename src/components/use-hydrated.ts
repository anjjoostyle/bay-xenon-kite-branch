import { useEffect, useState } from "react";
import { useLedger } from "@/lib/store";

export function useHydrated() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let finished = false;

    const finish = () => {
      if (cancelled || finished) return;
      finished = true;
      const s = useLedger.getState();
      if (!s.onboarded) s.loadDemo();
      useLedger.setState({ hydrated: true });
      setReady(true);
      void import("@/lib/publish")
        .then((m) => m.syncPublicPages())
        .catch(() => undefined);
    };

    const unsub = useLedger.persist.onFinishHydration(finish);
    const result = useLedger.persist.rehydrate();
    void Promise.resolve(result).then(finish, finish);
    const timeout = window.setTimeout(finish, 500);

    return () => {
      cancelled = true;
      unsub();
      window.clearTimeout(timeout);
    };
  }, []);

  return ready;
}
