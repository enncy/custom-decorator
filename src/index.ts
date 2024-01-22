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
	FunctionType extends (...args: Args) => ClassDecorator,
	Args extends Array<any>,
	Value
>(options: DecoratorOptions<Args, Value>): [FunctionType, DecoratorInfo<ClassDecorator, Args, Value>] {
	return [
		((...args: Args) => {
			return (target) => {
				setClassMetadata(options.name, target, options.value(...args));
			};
		}) as FunctionType,
		{
			name: options.name,
			value: options.value,
			get: (target: any) => getClassMetadata(options.name, target)
		}
	];
}

export function customPropertyDecorator<
	FunctionType extends (...args: Args) => PropertyDecorator,
	Args extends Array<any>,
	Value
>(options: DecoratorOptions<Args, Value>): [FunctionType, DecoratorInfo<PropertyDecorator, Args, Value>] {
	return [
		((...args: Args) => {
			return (target, key) => {
				setPropertyMetadata(options.name, target, key.toString(), options.value(...args));
			};
		}) as FunctionType,
		{
			name: options.name,
			value: options.value,
			get: (target: any, key: string) => getPropertyMetadata(options.name, target, key)
		}
	];
}

export function customParameterDecorator<
	FunctionType extends (...args: Args) => ParameterDecorator,
	Args extends Array<any>,
	Value
>(options: DecoratorOptions<Args, Value>): [FunctionType, DecoratorInfo<ParameterDecorator, Args, Value>] {
	return [
		((...args: Args) => {
			return (target, key, parameter_index) => {
				setParameterMetadata(options.name, target, key, parameter_index, options.value(...args));
			};
		}) as FunctionType,
		{
			name: options.name,
			value: options.value,
			get: (target: any, key: string, index: number) => getParameterMetadata(options.name, target, key, index)
		}
	];
}
