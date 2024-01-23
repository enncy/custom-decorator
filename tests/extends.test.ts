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
