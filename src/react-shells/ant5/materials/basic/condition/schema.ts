import { INodeSchema } from "core";
import { labelSchema } from "../../baseSchema";

export const conditionSchema: INodeSchema = {
  componentName: "Fragment",
  children: [
    labelSchema,
    {
      componentName: "FormItem",
      props: {
        label: "$trueExpression",
      },
      children: [
        {
          componentName: "TextArea",
          "x-field": {
            name: `config.trueExpression`,
            params: {
              withBind: true,
            }
          },
        }
      ]
    },
  ],
}