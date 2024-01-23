import 'reflect-metadata';
import {
	getClassMetadata,
	getPropertyMetadata,
	getParameterMetadata,
	setClassMetadata,
	setPropertyMetadata,
	setParameterMetadata
} from './utils';

export type DecoratorInfo<T extends (...args: any) => any, Args extends Array<any>, Value> = {
	name: string;
	value: (...args: Args) => Value;
	get: (...args: Parameters<T>) => Value | undefined;
};

export function customClassDecorator<
	DecoratorDescriber extends (...args: any[]) => ClassDecorator,
	Args extends Array<any> = Parameters<DecoratorDescriber>,
	Value = any
>(options: {
	name: string;
	value: (this: { target: Function }, ...args: Args) => Value;
}): [DecoratorDescriber, DecoratorInfo<ClassDecorator, Args, Value>] {
	return [
		((...args: Args) => {
			return (target) => {
				setClassMetadata(options.name, target, options.value.apply({ target: target }, args));
			};
		}) as DecoratorDescriber,
		{
			name: options.name,
			value: options.value,
			get: (target: any) => getClassMetadata(options.name, target)
		}
	];
}

export function customPropertyDecorator<
	DecoratorDescriber extends (...args: any[]) => PropertyDecorator,
	Args extends Array<any> = Parameters<DecoratorDescriber>,
	Value = any
>(options: {
	name: string;
	value: (this: { target: Object; key: string | symbol }, ...args: Args) => Value;
}): [
	DecoratorDescriber,
	DecoratorInfo<PropertyDecorator, Args, Value> & { getDesignType: (target: Object, key: string | symbol) => any }
] {
	return [
		((...args: Args) => {
			return (target, key) => {
				setPropertyMetadata(
					options.name,
					target,
					key.toString(),
					options.value.apply({ target: target, key: key }, args)
				);
			};
		}) as DecoratorDescriber,
		{
			name: options.name,
			value: options.value,
			get: (target: any, key: string) => getPropertyMetadata(options.name, target, key),
			getDesignType: (target: any, key: string) => Reflect.getMetadata('design:type', target, key)
		}
	];
}

export function customMethodDecorator<
	DecoratorDescriber extends (...args: any[]) => PropertyDecorator,
	Args extends Array<any> = Parameters<DecoratorDescriber>,
	Value = any
>(options: {
	name: string;
	value: (this: { target: Object; key: string | symbol }, ...args: Args) => Value;
}): [
	DecoratorDescriber,
	DecoratorInfo<PropertyDecorator, Args, Value> & {
		getDesignType: (target: Object, key: string | symbol) => any;
		getReturnType: (target: Object, key: string | symbol) => any;
		getParameterTypes: (target: Object, key: string | symbol) => any[];
	}
] {
	return [
		((...args: Args) => {
			return (target, key) => {
				setPropertyMetadata(
					options.name,
					target,
					key.toString(),
					options.value.apply({ target: target, key: key }, args)
				);
			};
		}) as DecoratorDescriber,
		{
			name: options.name,
			value: options.value,
			get: (target: any, key: string) => getPropertyMetadata(options.name, target, key),
			getDesignType: (target: any, key: string) => Reflect.getMetadata('design:type', target, key),
			getReturnType: (target: any, key: string) => Reflect.getMetadata('design:returntype', target, key),
			getParameterTypes: (target: any, key: string) => Reflect.getMetadata('design:paramtypes', target, key)
		}
	];
}

export function customParameterDecorator<
	DecoratorDescriber extends (...args: any[]) => ParameterDecorator,
	Args extends Array<any> = Parameters<DecoratorDescriber>,
	Value = any
>(options: {
	name: string;
	value: (this: { target: Object; key: string | symbol | undefined; parameterIndex: number }, ...args: Args) => Value;
}): [DecoratorDescriber, DecoratorInfo<ParameterDecorator, Args, Value>] {
	return [
		((...args: Args) => {
			return (target, key, parameter_index) => {
				setParameterMetadata(
					options.name,
					target,
					key,
					parameter_index,
					options.value.apply({ target: target, key: key, parameterIndex: parameter_index }, args)
				);
			};
		}) as DecoratorDescriber,
		{
			name: options.name,
			value: options.value,
			get: (target: any, key: string, index: number) => getParameterMetadata(options.name, target, key, index)
		}
	];
}
