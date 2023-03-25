import { IDriver, IDriverFactory } from 'core/interfaces'
import { IDispatchable, ICustomEvent } from 'core/interfaces/event'
import { CanvasScrollEvent } from '../events'

export class CanvasScrollDriverImpl implements IDriver {

  constructor(private dispatcher: IDispatchable<ICustomEvent<any>>, private element: Element | Node | HTMLElement) {
    this.attach()
  }

  onScroll = () => {
    this.dispatcher.dispatch(
      new CanvasScrollEvent()
    )
  }

  attach() {
    this.element.addEventListener('scroll', this.onScroll)
    this.win().addEventListener('scroll', this.onScroll)
  }
  teardown(): void {
    this.element.removeEventListener('scroll', this.onScroll)
    this.win().removeEventListener('scroll', this.onScroll)
  }

  private win(){
    return (this.element as Document)?.defaultView || this.element?.ownerDocument?.defaultView || window
  }
}

export const CanvasScrollDriver: IDriverFactory = (
  dispatcher: IDispatchable<ICustomEvent<any>>,
  element: Element | Node | HTMLElement,
) => {
  return new CanvasScrollDriverImpl(
    dispatcher,
    element,
  )
}