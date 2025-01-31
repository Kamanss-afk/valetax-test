import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/shared/lib/api-client';
import { UserTreeItem } from '../model/user-tree';
import { getUserTreeQueryOptions } from './get-user-tree';
import { MutationConfig } from '@/shared/lib/react-query/queryClient';

export const deleteTreeItem = ({
  treeName,
  nodeId,
}: {
  treeName: string;
  nodeId: string;
}): Promise<UserTreeItem> => {
  return api
    .post(`/api.user.tree.node.delete?${new URLSearchParams({ treeName, nodeId })}`);
};

interface UseDeleteOptions {
  treeName: string;
  mutationConfig?: MutationConfig<typeof deleteTreeItem>;
};

export const useDeleteTreeItem = ({
  treeName,
  mutationConfig,
}: UseDeleteOptions) => {
  const queryClient = useQueryClient();
  
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getUserTreeQueryOptions({ treeName }).queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteTreeItem,
  });
};