import { useQuery, queryOptions } from '@tanstack/react-query';
import { api } from '@/shared/lib/api-client';
import { UserTreeItem } from '../model/user-tree';

export const getUserTree = ({
  treeName,
}: {
  treeName: string;
}): Promise<UserTreeItem> => {
  return api
    .post(`/api.user.tree.get?${new URLSearchParams({ treeName })}`)
    .then(response => response.data);
};

export const getUserTreeQueryOptions = ({ treeName }: { treeName: string }) => {
  return queryOptions({
    queryKey: ['user-tree', treeName],
    queryFn: () => getUserTree({ treeName }),
  });
};

interface UseUserTreeOptions {
  treeName: string;
};

export const useUserTree = ({
  treeName,
}: UseUserTreeOptions) => {
  return useQuery({
    ...getUserTreeQueryOptions({ treeName }),
  });
};