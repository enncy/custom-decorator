import { CustomDecorator } from '../src/index';
import { defineGetter } from '../src/utils';

// example

export function Decorator(val: string): ClassDecorator {
	return (target) => {
		CustomDecorator.setClassMetadata(Decorator, target, val);
	};
}

@Decorator('hello')
class A {}

console.log(CustomDecorator.getClassMetadata(Decorator, A));

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

console.log(CustomDecorator.getClassMetadata(SimplifyDecorator, B));
console.log(CustomDecorator.getPropertyMetadata(TestMethod, new B(), 'test'));
console.log(CustomDecorator.getParameterMetadata(TestParameter, new B(), 'test', 0));

/**
 * type prompt
 */
const getter = defineGetter<{
	TestMethod: [typeof TestMethod, string];
	TestParameter: [typeof TestParameter, number];
}>();

console.log(getter.TestMethod(new B(), 'test'));
// type: string
// value: 'test'
console.log(getter.TestParameter(new B(), 'test', 0));
// type: number
// value: 4
