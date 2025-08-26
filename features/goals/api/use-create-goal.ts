import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.goals.$post>;
type RequestType = InferRequestType<typeof client.api.goals.$post>["json"];

export const useCreateGoal = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.goals.$post({ json });
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Goal created successfully");
            queryClient.invalidateQueries({ queryKey: ["goals"] });
        },
        onError: () => {
            toast.error("Failed to create goal");
        }
    });

    return mutation;
};