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
	/** when `factory` function defined, `value` function only has type prompt function  */
	value: (str: string) => str,
	factory(s /** auto type prompt : string */) {
		return (target, key, index) => {
			// if `factory` set, must call this.set , otherwise value is undefined
			// this.set(/** string type */)
			this.set(s);

			// ParamDecorator.get(target, key, index) // string | undefined
			// ParamDecorator.name  // Param
			// console.log(ParamDecorator.value('str')) // str
		};
	}
});

@Controller('/test')
class TestController {
	@Value(1)
	val: number;

	@Api('/name')
	name(@Param('str') str: string): string {
		console.log(str);
		return str;
	}
}

const controller = new TestController();

console.log(ControllerDecorator.get(TestController));

console.log(ValueDecorator.get(controller, 'val'));
console.log(ValueDecorator.getDesignType(controller, 'val'));

console.log(ApiDecorator.get(controller, 'name'));
console.log(ApiDecorator.getDesignType(controller, 'name'));
console.log(ApiDecorator.getParameterTypes(controller, 'name'));
console.log(ApiDecorator.getReturnType(controller, 'name'));

console.log(ParamDecorator.get(controller, 'name', 0));
