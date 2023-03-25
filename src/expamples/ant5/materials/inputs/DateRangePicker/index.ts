import { DatePicker } from "antd";
import { IComponentMaterial } from "core-react";
import { forwardRefById } from "core-react/hocs/forwardRefById";
import { rangePickerIcon } from "./icon";
import { dateRangePickerLocales, dateRangePickerResourceLocales } from "./locales";
import { dateRangePickerSchema } from "./schema";

const name = "DateRangePicker"
export const DateRangePickerMaterial: IComponentMaterial = {
  componentName: name,
  component: DatePicker.RangePicker,
  designer: forwardRefById(DatePicker.RangePicker, element => element?.parentElement?.parentElement),
  designerLocales: dateRangePickerLocales,
  designerSchema: dateRangePickerSchema,
  designerProps: {
    inputReadOnly: true,
    open: false,
  },
  resource: {
    name: name,
    resourceLocales: dateRangePickerResourceLocales,
    icon: rangePickerIcon,
    color: "#0EDB77",
    elements: [
      {
        componentName: name,
      }
    ]
  },
}