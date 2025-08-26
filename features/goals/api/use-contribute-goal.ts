import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.goals[":id"]["contribute"]["$post"]>;
type RequestType = InferRequestType<typeof client.api.goals[":id"]["contribute"]["$post"]>["json"];

export const useContributeGoal = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.goals[":id"]["contribute"].$post({ 
                param: { id: id! },
                json 
            });
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Contribution added successfully");
            queryClient.invalidateQueries({ queryKey: ["goals"] });
        },
        onError: () => {
            toast.error("Failed to add contribution");
        }
    });

    return mutation;
};