import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetGoals = () => {
    const query = useQuery({
        queryKey: ["goals"],
        queryFn: async () => {
            const response = await client.api.goals.$get();
            
            if (!response.ok) {
                throw new Error("Failed to fetch goals");
            }

            const { data } = await response.json();
            return data;
        },
    });

    return query;
};