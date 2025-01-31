import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/shared/lib/api-client';
import { MutationConfig } from '@/shared/lib/react-query/queryClient';
import { getUserTreeQueryOptions } from './get-user-tree';

export const addTreeItem = ({
  treeName,
  nodeName,
  parentNodeId,
}: {
  treeName: string;
  parentNodeId: string;
  nodeName: string;
}): Promise<void> => {
  return api
    .post(`/api.user.tree.node.create?${new URLSearchParams({ treeName, parentNodeId, nodeName })}`);
};

interface UseAddOptions {
  treeName: string;
  mutationConfig?: MutationConfig<typeof addTreeItem>;
};

export const useAddTreeItem = ({
  treeName,
  mutationConfig,
}: UseAddOptions) => {
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
    mutationFn: addTreeItem
  });
};