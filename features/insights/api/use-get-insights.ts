import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetInsights = () => {
    const query = useQuery({
        queryKey: ["insights"],
        queryFn: async () => {
            const response = await client.api.insights.$get();
            
            if (!response.ok) {
                throw new Error("Failed to fetch insights");
            }

            const { data } = await response.json();
            return data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
    });

    return query;
};