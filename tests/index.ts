import { CustomDecorator } from '../src/index';

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

const TestMethod = CustomDecorator.factory('method-dec', 'method', (val: string) => val);

const TestParameter = CustomDecorator.factory('parameter-dec', 'parameter', (num: number) => num * 2);

@SimplifyDecorator('hello')
class B {
	@TestMethod('test')
	test(@TestParameter(2) test: number) {}
}

console.log(CustomDecorator.getClassMetadata(SimplifyDecorator, B));
console.log(CustomDecorator.getPropertyMetadata(TestMethod, new B(), 'test'));
console.log(CustomDecorator.getParameterMetadata(TestParameter, new B(), 'test', 0));
