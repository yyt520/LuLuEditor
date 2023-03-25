import { Node } from "@antv/x6";
import { useCallback, useEffect } from "react";
import { ActionType } from "../../actions";
import { INodeData } from "../../interfaces";
import { useDispatch } from "../useDispatch";
import { useGraph } from "../useGraph";
import { useBackup } from "./useBackup";
import { useMarkChange } from "./useMarkChange";

export function useAddNode() {
  const graph = useGraph()
  const dispatch = useDispatch()

  const markeChange = useMarkChange()
  const backup = useBackup()
  const handleNodeAdd = useCallback(({ node }: { node: Node, index: number, options: any }) => {
    const { meta } = node.getData() as INodeData
    backup()
    const newData = {
      ...meta,
      id: node.id,
      x6Node: {
        x: node.getPosition().x,
        y: node.getPosition().y,
        width: node.getSize().width,
        height: node.getSize().height,
      }
    }
    node.setData(newData)
    graph?.select(node.id)
    dispatch?.({
      type: ActionType.ADD_NODE,
      payload: newData
    })
    markeChange()
  }, [backup, dispatch, graph, markeChange])

  useEffect(() => {
    graph?.on('node:added', handleNodeAdd)

    return () => {
      graph?.off('node:added', handleNodeAdd)
    }
  }, [graph, handleNodeAdd])
}