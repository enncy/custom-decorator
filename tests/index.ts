import { CustomDecorator } from '../src/index';
import { GetterArgs, defineGetter } from '../src/utils';

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

const SimplifyDecorator = CustomDecorator.factory('SimplifyDecorator', 'class', (val: string) => val);

const TestMethod = CustomDecorator.factory('TestMethod', 'method', (val: string) => val);

const TestParameter = CustomDecorator.factory('TestParameter', 'parameter', (num: number) => num * 2);

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
	(dec: 'TestMethod', ...args: GetterArgs<typeof TestMethod>): string;
	(dec: 'TestParameter', ...args: GetterArgs<typeof TestParameter>): number;
}>();

console.log(getter('TestMethod', new B(), 'test'));
// type: string
// value: 'test'
console.log(getter('TestParameter', new B(), 'test', 0));
// type: number
// value: 4
