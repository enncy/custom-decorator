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

function SimplifyDecorator(val: string) {
	return CustomDecorator.classFactory(SimplifyDecorator, val);
}

function TestMethod(val: string) {
	return CustomDecorator.methodFactory(TestMethod, val);
}

function TestParameter(num: number) {
	return CustomDecorator.parameterFactory(TestParameter, num * 2);
}

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
import { CustomDecorator } from 'custom-decorator';

/**
 * type prompt
 */
const getter = CustomDecorator.defineGetter<{
	TestMethod: [typeof TestMethod, string];
	TestParameter: [typeof TestParameter, number];
}>();

console.log(getter.TestMethod(new B(), 'test'));
// type: string
// value: 'test'
console.log(getter.TestParameter(new B(), 'test', 0));
// type: number
// value: 4
```
