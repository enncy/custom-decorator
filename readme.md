# custom-decorator

> `custom-decorator` making it easier for you to customize decorators

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
import { customClassDecorator, customPropertyDecorator, customParameterDecorator } from 'custom-decorator';

const [Controller, ControllerDecorator] = customClassDecorator({
	name: 'Controller',
	value: (path: string) => path
});

const [Api, ApiDecorator] = customPropertyDecorator({
	name: 'Api',
	value: (path: string) => path
});

const [Param, ParamDecorator] = customParameterDecorator({
	name: 'Param',
	value: (name: string) => name
});

@Controller('/a')
class A {
	@Api('/b')
	b(@Param('str') str: string) {
		console.log(str);
	}
}

console.log(ControllerDecorator.get(A));
console.log(ApiDecorator.get(new A(), 'b'));
console.log(ParamDecorator.get(new A(), 'b', 0));
```

run:

```
tsc && node ./lib/tests/index.js
```

output:

```
/a
/b
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
@Controller('/b')
class B extends A {}

class C extends A {
	override b() {}
}

/**
 * run: tsc && node ./lib/tests/extends.test.js
 */
console.log(ControllerDecorator.get(B));
console.log(ControllerDecorator.get(C));
console.log(ApiDecorator.get(new C(), 'b'));
```

output:

```
/b
/a
/b
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
    - get: `(target: any) => any` get decorator value

### function `customPropertyDecorator`

> custom property decorator

- options: `DecoratorOptions`
- return: `[Decorator, DecoratorInfo]`
  - Decorator: decorator function
  - DecoratorInfo:
    - get: `(target: any, propertyKey: string | symbol) => any` get decorator value

### function `customParameterDecorator`

> custom parameter decorator

- options: `DecoratorOptions`
- return: `[Decorator, DecoratorInfo]`
  - Decorator: decorator function
  - DecoratorInfo:
    - get: `(target: any, propertyKey: string | symbol, parameterIndex: number) => any` get decorator value
