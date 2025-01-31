import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/shared/lib/api-client';
import { getUserTreeQueryOptions } from './get-user-tree';
import { MutationConfig } from '@/shared/lib/react-query/queryClient';

export const renameTreeItem = ({
  treeName,
  nodeId,
  newNodeName,
}: {
  treeName: string;
  nodeId: string;
  newNodeName: string;
}): Promise<void> => {
  return api
    .post(`/api.user.tree.node.rename?${new URLSearchParams({ treeName, nodeId, newNodeName })}`);
};

interface UseRenameOptions {
  treeName: string;
  mutationConfig?: MutationConfig<typeof renameTreeItem>;
};

export const useRenameTreeItem = ({
  treeName,
  mutationConfig,
}: UseRenameOptions) => {
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
    mutationFn: renameTreeItem
  });
};