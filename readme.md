# custom-decorator

> `custom-decorator` making it easier for you to customize decorators to get/set reflect-metadata values

## TOC

- [Install](#Install)
- [Example](#Example)
  - [TransformValue](#TransformValue-Example)
  - [Extends](#Extends-Example)
- [Api](#Api)

## Install

```sh
npm i custom-decorator
```

## Example

```ts
import { customClassDecorator, customPropertyDecorator, customParameterDecorator, customMethodDecorator } from '../src';

const [Controller, ControllerDecorator] = customClassDecorator({
	name: 'Controller',
	value: (path: string) => path
});

const [Value, ValueDecorator] = customPropertyDecorator({
	name: 'Value',
	value: (val: any) => val
});

const [Api, ApiDecorator] = customMethodDecorator({
	name: 'Api',
	value: (path: string) => path
});

const [Param, ParamDecorator] = customParameterDecorator({
	name: 'Param',
	value: (name: string) => name
});

@Controller('/test')
class TestController {
	@Value(1)
	val: number;

	@Api('/b')
	name(@Param('str') str: string): string {
		console.log(str);
		return str;
	}
}

const controller = new TestController();

console.log(ControllerDecorator.get(TestController));

console.log(ValueDecorator.get(controller, 'val'));
console.log(ValueDecorator.getDesignType(controller, 'val'));

console.log(ApiDecorator.get(controller, 'test'));
console.log(ApiDecorator.getDesignType(controller, 'test'));
console.log(ApiDecorator.getParameterTypes(controller, 'test'));
console.log(ApiDecorator.getReturnType(controller, 'test'));

console.log(ParamDecorator.get(controller, 'test', 0));
```

run:

```
tsc && node ./lib/tests/index.js
```

output:

```
/a
1
[Function: Number]
/b
[Function: Function]
[ [Function: String] ]
[Function: String]
str
```

### TransformValue Example

```ts
import { customParameterDecorator } from 'custom-decorator';

const [Param, ParamDecorator] = customParameterDecorator({
	name: 'Param',
	value: (name: string, type: 'string' | 'object') => {
		return {
			name,
			type
		};
	}
});

class A {
	b(@Param('body', 'object') data: object) {
		console.log(data);
	}
}

console.log(ParamDecorator.get(new A(), 'b', 0));
// { name: 'body', type: 'object' }
```

### Extends Example

```ts
import { customClassDecorator, customPropertyDecorator, customParameterDecorator } from '../src';

const [Controller, ControllerDecorator] = customClassDecorator({
	name: 'Controller',
	value: (path: string) => path
});

const [Api, ApiDecorator] = customPropertyDecorator({
	name: 'Api',
	value: (path: string) => path
});

class A {
	@Api('/name')
	name() {}
}

@Controller('/b-path')
class B extends A {}

@Controller('/c-path')
class C extends B {
	override name() {}
}

console.log(ControllerDecorator.get(A));
console.log(ControllerDecorator.get(B));
console.log(ControllerDecorator.get(C));

console.log(ApiDecorator.get(new A(), 'name'));
console.log(ApiDecorator.get(new C(), 'name'));
```

output:

```
undefined
/b-path
/c-path
/name
/name
```

## Api

- [type `DecoratorOptions`](#type-decoratoroptions)
- [function `customClassDecorator`](#function-customclassdecorator)
- [function `customPropertyDecorator`](#function-custompropertydecorator)
- [function `customParameterDecorator`](#function-customparameterdecorator)

### type `DecoratorOptions`

> `customClassDecorator` , `customPropertyDecorator` , `customParameterDecorator` has the same options:

- name: `string` unique decorator name
- value: `(...args: any[]) => any` decorator value transform function
  - args means the arguments of the decorator
  - return the reflect-metadata value
  - example see [TransformValue Example](#transformvalue-example)

### function `customClassDecorator`

> custom class decorator

- options: `DecoratorOptions`
- return: `[Decorator, DecoratorInfo]`
  - Decorator: decorator function
  - DecoratorInfo:
    - `get`: get decorator value

### function `customPropertyDecorator`

> custom property decorator

- options: `DecoratorOptions`
- return: `[Decorator, DecoratorInfo]`
  - Decorator: decorator function
  - DecoratorInfo:
    - `get`: get decorator value
    - `getDesignType`: get decorator design type

### function `customMethodDecorator`

> custom method decorator

- options: `DecoratorOptions`
- return: `[Decorator, DecoratorInfo]`
  - Decorator: decorator function
  - DecoratorInfo:
    - `get`: get decorator value
    - `getDesignType`: get decorator design type
    - `getReturnType`: get decorator return type
    - `getParameterTypes`: get decorator parameter types

### function `customParameterDecorator`

> custom parameter decorator

- options: `DecoratorOptions`
- return: `[Decorator, DecoratorInfo]`
  - Decorator: decorator function
  - DecoratorInfo:
    - `get`: get decorator value
