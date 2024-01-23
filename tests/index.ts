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
