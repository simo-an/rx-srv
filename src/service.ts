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
  private __data: object = {}

  constructor() { }

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
}

export default RxService
