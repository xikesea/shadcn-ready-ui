"use client";

import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useTransition } from "react";

interface NavigationContextValue {
  navigate: (href: string) => void;
  isPending: boolean;
}

const NavigationContext = createContext<NavigationContextValue>({
  navigate: () => {},
  isPending: false,
});

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const navigate = useCallback(
    (href: string) => {
      startTransition(() => {
        router.push(href);
      });
    },
    [router]
  );

  return (
    <NavigationContext.Provider value={{ navigate, isPending }}>
      {isPending && (
        <div className="fixed top-0 left-0 right-0 z-[200] h-[2px] overflow-hidden bg-primary/20">
          <div
            className="h-full w-1/2 rounded-full bg-primary"
            style={{ animation: "nav-progress 1s ease-in-out infinite" }}
          />
        </div>
      )}
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  return useContext(NavigationContext);
}
