import { EditOutlined } from "@ant-design/icons"
import Editor from "@monaco-editor/react"
import { Button, Drawer, Space, Typography } from "antd"
import { useThemeMode } from "core-react/hooks/useThemeMode"
import { useToolsTranslate } from "core-react/hooks/useToolsTranslate"
import { memo, useCallback, useEffect, useState } from "react"

export const JSONInput = memo((
  props: {
    title?: string,
    value?: any,
    onChange?: (value?: any) => void
  }
) => {
  const { title, value, onChange } = props
  const [valueStr, setValueStr] = useState<string>()
  const [error, setError] = useState(false)
  const [open, setOpen] = useState(false);
  const themeMode = useThemeMode()

  useEffect(() => {
    if (value) {
      setValueStr(JSON.stringify(value, null, 2))
    } else {
      setValueStr("")
    }
  }, [value])

  const t = useToolsTranslate()
  const showDrawer = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleConfirm = useCallback(() => {
    if (valueStr) {
      try {
        const newValue = JSON.parse(valueStr)
        onChange?.(newValue)
        setOpen(false);
      } catch (e) {
        setError(true)
      }
    } else {
      onChange?.(undefined)
      setOpen(false);
    }
  }, [onChange, valueStr]);

  const handleChange = useCallback((value?: string) => {
    setValueStr(value);
    setError(false);
  }, [])

  return (
    <>
      <Button icon={<EditOutlined />} onClick={showDrawer}>{t('edit')}</Button>
      <Drawer
        title={title}
        placement="right"
        mask={false}
        onClose={handleClose}
        open={open}
        size="large"
        extra={
          <Space>
            <Typography.Text type={"danger"}>{error && t("formatError")}</Typography.Text>
            <Button onClick={handleClose}>{t("cancel")}</Button>
            <Button type="primary" onClick={handleConfirm}>
              {t("confirm")}
            </Button>
          </Space>
        }
      >
        <Editor
          height="100%"
          language="json"
          theme={themeMode === "dark" ? "vs-dark" : "vs-light"}
          value={valueStr}
          onChange={handleChange}
        />
      </Drawer>
    </>
  )
})