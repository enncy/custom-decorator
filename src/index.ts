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
	value?: (...args: Args) => Value;
	get: (...args: Parameters<T>) => Value | undefined;
};

function getDesignType(target: any, key: string | symbol) {
	Reflect.getMetadata('design:type', target, key);
}

function getReturnType(target: any, key: string | symbol) {
	Reflect.getMetadata('design:returntype', target, key);
}

function getParameterTypes(target: any, key: string | symbol) {
	Reflect.getMetadata('design:paramtypes', target, key);
}

export function customClassDecorator<Value = any, Args extends Array<any> = Array<any>>(options: {
	name: string;
	factory?: (
		this: {
			set: (value: Value) => void;
		},
		...args: Args
	) => ClassDecorator;
	value?: (this: { target: Function }, ...args: Args) => Value;
}): [(...args: Args) => ClassDecorator, DecoratorInfo<ClassDecorator, Args, Value>] {
	return [
		(...args: Args) => {
			return (target) => {
				const set = (value: any) => setClassMetadata(options.name, target, value);
				if (options.factory) {
					const decorator = options.factory.apply({ set }, args);
					decorator(target);
				} else if (options.value) {
					const value = options.value.apply({ target: target }, args);
					set(value);
				}
			};
		},
		{
			name: options.name,
			value: options.value,
			get: (target: any) => getClassMetadata(options.name, target)
		}
	];
}

export function customPropertyDecorator<Value = any, Args extends Array<any> = Array<any>>(options: {
	name: string;
	factory?: (
		this: {
			set: (value: Value) => void;
			getDesignType: () => any;
		},
		...args: Args
	) => PropertyDecorator;
	value?: (this: { target: Object; key: string | symbol }, ...args: Args) => Value;
}): [
	(...args: Args) => PropertyDecorator,
	DecoratorInfo<PropertyDecorator, Args, Value> & { getDesignType: (target: Object, key: string | symbol) => any }
] {
	return [
		(...args: Args) => {
			return (target, key) => {
				const set = (value: any) => setPropertyMetadata(options.name, target, key, value);
				if (options.factory) {
					const decorator = options.factory.apply({ set, getDesignType: () => getDesignType(target, key) }, args);
					decorator(target, key);
				} else if (options.value) {
					const value = options.value.apply({ target: target, key: key }, args);
					set(value);
				}
			};
		},
		{
			name: options.name,
			value: options.value,
			get: (target: any, key: string) => getPropertyMetadata(options.name, target, key),
			getDesignType: (target: any, key: string) => Reflect.getMetadata('design:type', target, key)
		}
	];
}

export function customMethodDecorator<Value = any, Args extends Array<any> = Array<any>>(options: {
	name: string;
	factory?: (
		this: {
			set: (value: Value) => void;
			getDesignType: () => any;
			getReturnType: () => any;
			getParameterTypes: () => any[];
		},
		...args: Args
	) => PropertyDecorator;
	value?: (this: { target: Object; key: string | symbol }, ...args: Args) => Value;
}): [
	(...args: Args) => PropertyDecorator,
	DecoratorInfo<PropertyDecorator, Args, Value> & {
		getDesignType: (target: Object, key: string | symbol) => any;
		getReturnType: (target: Object, key: string | symbol) => any;
		getParameterTypes: (target: Object, key: string | symbol) => any[];
	}
] {
	return [
		(...args: Args) => {
			return (target, key) => {
				const set = (value: any) => setPropertyMetadata(options.name, target, key, value);
				if (options.factory) {
					const decorator = options.factory.apply(
						{
							set,
							getDesignType: () => getDesignType(target, key),
							getReturnType: () => getReturnType(target, key),
							getParameterTypes: () => getParameterTypes(target, key)
						},
						args
					);
					decorator(target, key);
				} else if (options.value) {
					const value = options.value.apply({ target: target, key: key }, args);
					set(value);
				}
			};
		},
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

export function customParameterDecorator<Value = any, Args extends Array<any> = Array<any>>(options: {
	name: string;
	factory?: (
		this: {
			set: (value: Value) => void;
		},
		...args: Args
	) => ParameterDecorator;
	value?: (this: { target: Object; key: string | symbol | undefined; parameterIndex: number }, ...args: Args) => Value;
}): [(...args: Args) => ParameterDecorator, DecoratorInfo<ParameterDecorator, Args, Value>] {
	return [
		(...args: Args) => {
			return (target, key, parameter_index) => {
				if (!key) {
					return;
				}
				const set = (value: any) => setParameterMetadata(options.name, target, key, parameter_index, value);
				if (options.factory) {
					const decorator = options.factory.apply({ set }, args);
					decorator(target, key, parameter_index);
				} else if (options.value) {
					const value = options.value.apply({ target: target, key: key, parameterIndex: parameter_index }, args);
					set(value);
				}
			};
		},
		{
			name: options.name,
			value: options.value,
			get: (target: any, key: string, index: number) => getParameterMetadata(options.name, target, key, index)
		}
	];
}
