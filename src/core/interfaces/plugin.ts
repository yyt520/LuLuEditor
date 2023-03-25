import { IDesignerEngine } from "./engine"

export interface IPlugin {
  //唯一名称，可用于覆盖默认值
  name: string,
  destory(): void,
}

export type IPluginFactory = (
  engine: IDesignerEngine,
) => IPlugin
