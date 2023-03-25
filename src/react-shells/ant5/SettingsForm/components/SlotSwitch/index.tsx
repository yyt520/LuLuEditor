import { Switch } from "antd"
import { useAddSlot } from "core-react/hooks/useAddSlot"
import { useCurrentNode } from "core-react/hooks/useCurrentNode"
import { useRemoveSlot } from "core-react/hooks/useRemoveSlot"
import { useTreeNode } from "core-react/hooks/useTreeNode"
import { memo, useCallback, useMemo } from "react"

export const SlotSwitch = memo((props: {
  name?: string
}) => {
  const { name } = props
  const currentNode = useCurrentNode()
  const node = useTreeNode(currentNode?.id || "")
  const removeSlot = useRemoveSlot(node?.id);
  const addSlot = useAddSlot(node?.id)

  const checked = useMemo(() => {
    return name ? !!node?.slots?.[name] : false
  }, [name, node?.slots])

  const handleChange = useCallback((checked: boolean) => {
    if (checked) {
      name && node && addSlot(name)
    } else {
      name && node && removeSlot(name)
    }
  }, [addSlot, name, node, removeSlot])

  return (
    <Switch checked={checked || false} onChange={handleChange} />
  )
})