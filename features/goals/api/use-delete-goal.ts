import { InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.goals[":id"]["$delete"]>;

export const useDeleteGoal = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, string>({
        mutationFn: async (id: string) => {
            const response = await client.api.goals[":id"].$delete({ 
                param: { id }
            });
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Goal deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["goals"] });
        },
        onError: (error) => {
            console.error("Delete goal error:", error);
            toast.error("Failed to delete goal");
        }
    });

    return mutation;
};