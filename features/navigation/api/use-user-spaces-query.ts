import { getUserSpacesbyId } from "./get-user-spaces-by-id";
import { useQuery } from "@supabase-cache-helpers/postgrest-swr";
import useSWR from "swr";

function useOrganizationQuery(organizationId: number) {
  const client = useSupabase();
  const key = ["organization", organizationId];

  return useSWR(key, async () => {
    return getUserSpacesbyId(client, organizationId).then(
      (result) => result.data
    );
  });
}

export default useOrganizationQuery;
