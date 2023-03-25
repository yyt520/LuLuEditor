import { ITreeNode, ID } from "core";
import { useCallback, useEffect, useState } from "react";
import { UnListener } from "runner/minions";
import { useDesignerEngine } from "./useDesignerEngine";

export function useTreeNodes(ids: ID[]) {
  const [nodes, setNodes] = useState<(ITreeNode | null)[] | null>()
  const monitor = useDesignerEngine()?.getMonitor()
  const handleNodeChange = useCallback((nd: ITreeNode) => {
    setNodes(nodes => {
      if (nodes?.find(node => node?.id === nd.id)) {
        return nodes?.map(node => node?.id === nd.id ? nd : node)
      }
      return nodes;
    })
  }, [])

  useEffect(() => {
    if (monitor) {
      const nds: (ITreeNode | null)[] = []
      const offs: UnListener[] = []
      for (const id of ids) {
        nds.push(monitor.getNode(id))
        offs.push(monitor?.subscribeToNodeChanged(id, handleNodeChange))
      }
      setNodes(nds)

      return () => {
        for (const off of offs) {
          off?.()
        }
      }
    }

  }, [handleNodeChange, ids, monitor])

  return nodes
}