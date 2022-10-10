import Vue, {WatchOptions} from "vue";

const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: () => {},
  set: (key: string) => {}
}

export function proxy(target: object, sourceKey: string, key: string) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key]
  }
  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}

class RxService {
  static uuid: number = 0

  private __data: object = {}
  private uuid = RxService.uuid ++

  constructor() {
    if (!Vue.prototype._watchers) {
      Vue.prototype._watchers = []
    }
    if (!Vue.prototype._events) {
      Vue.prototype._events = []
    }
  }

  public observe() {
    Reflect.ownKeys(this).forEach((key: string) => {
      if (key.startsWith('_') || key.startsWith('$')) return

      this['__data'][key] = this[key]

      Reflect.deleteProperty(this, key)

      proxy(this, `__data`, key)
    })

    Vue.observable(this['__data'])
  }

  public watch(getter: () => any, callback: (val: any) => void, options?: WatchOptions) {
    return Vue.prototype.$watch(getter, callback, options)
  }

  public next(channel: string, payload: any) {
    return Vue.prototype.$emit(`[${this.uuid}]${channel}`, payload)
  }

  public on(channel: string, callback: Function) {
    return Vue.prototype.$on(`[${this.uuid}]${channel}`, callback)
  }

  public off(channel: string, callback: Function) {
    return Vue.prototype.$off(`[${this.uuid}]${channel}`, callback)
  }

  public once(channel: string, callback: Function) {
    return Vue.prototype.$once(`[${this.uuid}]${channel}`, callback)
  }
}

export default RxService
