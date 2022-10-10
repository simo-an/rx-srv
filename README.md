# rx-srv

**A reactive service provider for Vue2**

## Install

```bash
yarn add rx-srv -D
```

## Usage

First, you should create a service

```typescript
import RxService from 'rx-srv'

class UserService extends RxService {

  public userName: string = 'Tom'
  public userAge: number = 18

  public userAddress = {
    province: 'AnHui',
    city: 'ChiZhou'
  }

  constructor() {
    super('UserService');
    super.observe()
  }

  public rename(name: string) { this.userName = name }
  public growUp() { this.userAge ++ }
  public updateProvince(province: string) { this.userAddress.province = province }
  public updateCity(city: string) { this.userAddress.city = city }

}

const userService = new UserService()

export default userService
```

Finally, use it at page

```vue
<template>
  <div id="app">
    User Info:
    <div>Name: {{userService.userName}}</div>
    <div>Age:  {{userService.userAge}}</div>
    <div>Addr: {{userAddress}}</div>

    <div>
      <button @click="growUp">Grow Up</button>
    </div>
  </div>
</template>

<script lang="ts">
import { userService } from "@/service/user-service.ts";

export default {
  computed: {
    userAddress() {
      return `${userService.userAddress.province} - ${userService.userAddress.city}`
    }
  },
  methods: {
    growUp() {
      userService.growUp()
    }
  }
}

</script>

```

That is all, please have fun with rx-srv

## Version Change Log

### V1.0.3
#### 🎉 New Feature
1. Support Watch API

Example: 

```typescript
@Service()
class UserService extends RxService {
  public userAge: number = 18

  constructor() {
    super();
    super.observe()
    
    this.watch(() => this.userAge, (val) => {
      console.warn('user age changed', val)
    })
  }
}
```

### V1.0.5
#### 🎉 New Feature
1. Support Event Emitter

Example: 

```typescript
// emit an event
userService.next('logged', payload)

// listen an event
userService.on('logged', () => {
  // do something after logged
})

// cancel an event
userService.off('logged')

// emit an event only once
userService.once('logged', payload)
```

#### ⚒ Bug Fix
1. Fix lower vue version error

