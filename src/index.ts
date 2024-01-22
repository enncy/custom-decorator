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
	get: (...args: Parameters<T>) => Value;
};

export type DecoratorOptions<Args extends Array<any>, Value> = { name: string; value: (...args: Args) => Value };

export function customClassDecorator<
	DecoratorDescriber extends (...args: any[]) => ClassDecorator,
	Args extends Array<any> = Parameters<DecoratorDescriber>,
	Value = any
>(options: DecoratorOptions<Args, Value>): [DecoratorDescriber, DecoratorInfo<ClassDecorator, Args, Value>] {
	return [
		((...args: Args) => {
			return (target) => {
				setClassMetadata(options.name, target, options.value(...args));
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
>(options: DecoratorOptions<Args, Value>): [DecoratorDescriber, DecoratorInfo<PropertyDecorator, Args, Value>] {
	return [
		((...args: Args) => {
			return (target, key) => {
				setPropertyMetadata(options.name, target, key.toString(), options.value(...args));
			};
		}) as DecoratorDescriber,
		{
			name: options.name,
			value: options.value,
			get: (target: any, key: string) => getPropertyMetadata(options.name, target, key)
		}
	];
}

export function customParameterDecorator<
	DecoratorDescriber extends (...args: any[]) => ParameterDecorator,
	Args extends Array<any> = Parameters<DecoratorDescriber>,
	Value = any
>(options: DecoratorOptions<Args, Value>): [DecoratorDescriber, DecoratorInfo<ParameterDecorator, Args, Value>] {
	return [
		((...args: Args) => {
			return (target, key, parameter_index) => {
				setParameterMetadata(options.name, target, key, parameter_index, options.value(...args));
			};
		}) as DecoratorDescriber,
		{
			name: options.name,
			value: options.value,
			get: (target: any, key: string, index: number) => getParameterMetadata(options.name, target, key, index)
		}
	];
}
