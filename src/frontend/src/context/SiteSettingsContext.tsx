import { useQuery } from "@tanstack/react-query";
import type React from "react";
import { createContext, useContext } from "react";
import { useActor } from "../hooks/useActor";

interface SiteSettings {
  whatsappNumber: string;
  storeName: string;
  heroText: string;
}

const DEFAULT_SETTINGS: SiteSettings = {
  whatsappNumber: "+91 9914902647",
  storeName: "Embroidery Designs",
  heroText: "Premium Embroidery Designs for Professionals",
};

const SiteSettingsContext = createContext<SiteSettings>(DEFAULT_SETTINGS);

export function SiteSettingsProvider({
  children,
}: { children: React.ReactNode }) {
  const { actor } = useActor();

  const { data } = useQuery({
    queryKey: ["site-settings"],
    queryFn: () => actor!.getSiteSettings(),
    enabled: !!actor,
    staleTime: 1000 * 60 * 5, // 5 min cache
  });

  const settings = data ?? DEFAULT_SETTINGS;

  return (
    <SiteSettingsContext.Provider value={settings}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}
