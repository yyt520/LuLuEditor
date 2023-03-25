import { Tooltip } from "antd";
import { IComponentMaterial } from "core-react";
import { TextMaterial } from "../../displays/typography/Text";
import { TooltipDesigner } from "./designer";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { materialSchema } from "./schema";

const name = "Tooltip"
export const TooltipMaterial: IComponentMaterial = {
  componentName: name,
  component: Tooltip,
  designer: TooltipDesigner,
  designerLocales: locales,
  designerSchema: materialSchema,
  designerProps: {
    //readOnly: true,
  },
  resource: {
    name: name,
    resourceLocales: resourceLocales,
    icon: icon,
    color: "#8B79EC",
    elements: [
      {
        componentName: name,
        slots: {
          title: {
            componentName: "Text",
            props: {
              value: "prompt text",
            }
          },
        },
        children: [
          {
            componentName: "Button",
            props: {
              title: name,
            },
          }
        ]
      }
    ]
  },
  slots: {
    title: TextMaterial,
  },
  behaviorRule: {
    droppable: true,
    noPlaceholder: false,
  }
}