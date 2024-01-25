# custom-decorator

> `custom-decorator` making it easier for you to customize decorators to get/set reflect-metadata values

```sh
npm i custom-decorator
```

## Example

```ts
import { CustomDecorator } from 'custom-decorator';

// example

export function Decorator(val: string): ClassDecorator {
	return (target) => {
		CustomDecorator.setClassMetadata(Decorator, target, val);
	};
}

@Decorator('hello')
class A {}

console.log(CustomDecorator.getClassMetadata(Decorator, A)); // hello

// simplify

const SimplifyDecorator = CustomDecorator.factory('SimplifyDecorator', 'class', (val: string) => val);

const TestMethod = CustomDecorator.factory('method-dec', 'method', (val: string) => val);

const TestParameter = CustomDecorator.factory('parameter-dec', 'parameter', (num: number) => num * 2);

@SimplifyDecorator('hello')
class B {
	@TestMethod('test')
	test(@TestParameter(2) test: number) {}
}

console.log(CustomDecorator.getClassMetadata(SimplifyDecorator, B)); // hello
console.log(CustomDecorator.getPropertyMetadata(TestMethod, new B(), 'test')); // test
console.log(CustomDecorator.getParameterMetadata(TestParameter, new B(), 'test', 0)); // 4
```

**defineGetter** : define getter by decorator-value type mapping

```ts
import { defineGetter } from 'custom-decorator';

/**
 * type prompt
 */
const getter = defineGetter<{
	(d: typeof TestMethod): string;
}>();

console.log(getter(TestMethod, new B(), 'test'));
// type: string
// value: 'test'
```
