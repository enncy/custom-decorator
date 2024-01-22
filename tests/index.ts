import { customClassDecorator, customPropertyDecorator, customParameterDecorator } from '../src';

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
/**
 * run: tsc && node ./lib/tests/index.js
 */
console.log(ControllerDecorator.get(A));
console.log(ApiDecorator.get(new A(), 'b'));
console.log(ParamDecorator.get(new A(), 'b', 0));

/**
 * output:
 * /a
 * /b
 * str
 */
