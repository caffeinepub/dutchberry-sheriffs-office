import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";
import type { ContactFormEntry } from "@/backend";

export function useSubmitForm() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      email,
      phone,
      message,
    }: {
      name: string;
      email: string;
      phone: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.submitForm(name, email, phone, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
    },
  });
}

export function useGetAllSubmissions() {
  const { actor, isFetching } = useActor();

  return useQuery<ContactFormEntry[]>({
    queryKey: ["submissions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllSubmissions();
    },
    enabled: !!actor && !isFetching,
  });
}
