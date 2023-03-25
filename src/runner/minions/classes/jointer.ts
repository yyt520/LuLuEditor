import { InputHandler, IJointer } from "../interfaces/controller";

export class Jointer implements IJointer {
  private outlets: (IJointer | InputHandler)[] = []

  constructor(public id: string, public name: string) {

  }

  push: InputHandler = (inputValue?: any) => {
    for (const jointer of this.outlets) {
      if (typeof jointer === "function") {
        jointer(inputValue)
      } else {
        jointer.push(inputValue)
      }
    }
  }

  connect = (jointer: IJointer | InputHandler) => {
    this.outlets.push(jointer)
  }

  disconnect = (jointer: IJointer | InputHandler) => {
    this.outlets.splice(this.outlets.indexOf(jointer), 1)
  }
}