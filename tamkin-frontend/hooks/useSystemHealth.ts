import { useQuery } from "@tanstack/react-query";
import { systemApi } from "@/lib/api";

const SYSTEM_KEY = "system";

export function useSystemHealth() {
  return useQuery({
    queryKey: [SYSTEM_KEY],
    queryFn: systemApi.getHealth,
    staleTime: 5 * 60 * 1000,
  });
}
