# rx-srv

**A reactive service provider for Vue2**

## Install

```bash
yarn add rx-srv -D
yarn add reflect-metadata -D
yarn add typedi -D
```

Then you need to import 'reflect-metadata' at first

```typescript
import 'reflect-metadata'
```

## Usage

First, you should create a service

```typescript
import RxService from 'rx-srv'
import {Service} from "typedi";

@Service()
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

export default UserService
```

Then, you can export the service at a single export

```typescript
import UserService from "@/service/user-service";
import {Container} from "typedi";


export const userService = Container.get(UserService)
```

Finally, use it at page

```vue
<template>
  <div id="app">
    User Info:
    <div>Name: {{userService.userName}}</div>
    <div>Age:  {{userService.userAge}}</div>
    <div>Addr: {{userService.userAddress.province}} - {{userService.userAddress.city}}</div>

    <div>
      <button @click="growUp">Grow Up</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { userService } from "@/service";

@Component
export default class App extends Vue {
  public userService = userService

  public growUp() {
    this.userService.growUp()
  }
}

</script>
<style scoped>
#app {
   font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  overflow: hidden;
  width: 100%;
}
</style>

```

That is all, please have fun with rx-srv

## Version Change Log

### V1.03
🌤️ New Feature:
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
