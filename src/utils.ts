import 'reflect-metadata';

export const METADATA_CLASS_KEY = 'metadata:class';
export const METADATA_PROPERTY_KEY = 'metadata:property';
export const METADATA_PARAMETER_KEY = 'metadata:parameter';

/**
 * 设置类装饰器的元数据
 * @param decorator_name 		装饰器名字
 * @param target 	类
 * @param value 	值
 */
export function setClassMetadata(decorator_name: string | { name: string }, target: Function, value: any) {
	const _name = typeof decorator_name === 'string' ? decorator_name : decorator_name.name;
	Reflect.defineMetadata(`${METADATA_CLASS_KEY}:${_name.toLowerCase()}`, value, target);
}

/**
 * 设置属性装饰器的元数据
 * @param decorator_name 		装饰器名字
 * @param target	类
 * @param key 		属性
 * @param value		值
 */
export function setPropertyMetadata(
	decorator_name: string | { name: string },
	target: Object,
	key: string | symbol,
	value: any
) {
	const _name = typeof decorator_name === 'string' ? decorator_name : decorator_name.name;
	Reflect.defineMetadata(`${METADATA_PROPERTY_KEY}:${_name.toLowerCase()}`, value, target, key);
}

/**
 * 设置参数装饰器的元数据
 * @param decorator_name 		装饰器名字
 * @param target 	类
 * @param key 		属性
 * @param value 	值
 */
export function setParameterMetadata(
	decorator_name: string | { name: string },
	target: Object,
	key: string | symbol | undefined,
	parameter_index: number,
	value: any
) {
	if (key) {
		const _name = typeof decorator_name === 'string' ? decorator_name : decorator_name.name;
		Reflect.defineMetadata(`${METADATA_PARAMETER_KEY}:${parameter_index}:${_name.toLowerCase()}`, value, target, key);
	}
}

/**
 * 获取类装饰器的元数据
 * @param decorator_name 		装饰器名称
 * @param target 	类
 */
export function getClassMetadata<T = any>(decorator_name: string | { name: string }, target: Function): T {
	const _name = typeof decorator_name === 'string' ? decorator_name : decorator_name.name;
	return Reflect.getMetadata(`${METADATA_CLASS_KEY}:${_name.toLowerCase()}`, target);
}

/**
 * 获取属性装饰器的元数据
 * @param decorator_name    装饰器名称
 * @param target  类
 * @param key  	  属性
 */
export function getPropertyMetadata<T = any>(
	decorator_name: string | { name: string },
	target: Object,
	key: string | symbol
): T {
	const _name = typeof decorator_name === 'string' ? decorator_name : decorator_name.name;

	return Reflect.getMetadata(`${METADATA_PROPERTY_KEY}:${_name.toLowerCase()}`, target, key);
}

/**
 * 获取参数装饰器的元数据
 * @param name     装饰器名称
 * @param target   类
 * @param key 	   属性
 */
export function getParameterMetadata<T = any>(
	decorator_name: string | { name: string },
	target: Object,
	key: string | symbol,
	parameter_index: number
): T {
	const _name = typeof decorator_name === 'string' ? decorator_name : decorator_name.name;
	return Reflect.getMetadata(`${METADATA_PARAMETER_KEY}:${parameter_index}:${_name.toLowerCase()}`, target, key);
}

/**
 * 获取 design 元数据
 * @param target
 * @param key
 */
export function getDesign(
	target: Object,
	key: string | symbol
): {
	type: any;
	paramTypes: any[];
	returnType: any;
} {
	return {
		type: Reflect.getMetadata('design:type', target, key),
		paramTypes: Reflect.getMetadata('design:paramtypes', target, key),
		returnType: Reflect.getMetadata('design:returntype', target, key)
	};
}

export function factory<T extends 'class' | 'property' | 'method' | 'parameter'>(
	decorator: Function,
	value: any
): T extends 'class'
	? ClassDecorator
	: T extends 'property'
	? PropertyDecorator
	: T extends 'method'
	? MethodDecorator
	: T extends 'parameter'
	? ParameterDecorator
	: undefined {
	return ((target: any, key: any, index: any) => {
		if (key === undefined) {
			setClassMetadata(decorator.name, target, value);
			return;
		}
		if (typeof index === 'number') {
			setParameterMetadata(decorator.name, target, key, index, value);
			return;
		}
		setPropertyMetadata(decorator.name, target, key, value);
	}) as any;
}

export function classFactory(decorator: Function, value_to_set: any) {
	return factory<'class'>(decorator, value_to_set);
}

export function propertyFactory(decorator: Function, value_to_set: any) {
	return factory<'property'>(decorator, value_to_set);
}

export function methodFactory(decorator: Function, value_to_set: any) {
	return factory<'method'>(decorator, value_to_set);
}

export function parameterFactory(decorator: Function, value_to_set: any) {
	return factory<'parameter'>(decorator, value_to_set);
}

type GetterArgs<
	T extends (...args: any[]) => ClassDecorator | MethodDecorator | PropertyDecorator | ParameterDecorator
> = Parameters<ReturnType<T> extends MethodDecorator ? PropertyDecorator : ReturnType<T>>;

export function defineGetter<Define extends Record<string, [any, any]>>(): {
	[K in keyof Define]: Define[K] extends [infer D extends (...args: any[]) => any, infer T]
		? (...args: GetterArgs<D>) => T
		: unknown;
} {
	return new Proxy(
		{},
		{
			get(target, decorator_key, receiver) {
				return (...args: any): any => {
					const target: any = args[0];
					const key = args[1] as string | symbol | undefined;
					if (key === undefined) {
						return getClassMetadata(decorator_key.toString(), target);
					}
					const index = args[2] as number | undefined;
					if (index === undefined) {
						return getPropertyMetadata(decorator_key.toString(), target, key);
					} else {
						return getParameterMetadata(decorator_key.toString(), target, key, index);
					}
				};
			}
		}
	) as any;

	// return (decorator: any, ...args: any): any => {
	// 	const target: any = args[0];
	// 	const key = args[1] as string | symbol | undefined;
	// 	if (key === undefined) {
	// 		return getClassMetadata(decorator, target);
	// 	}
	// 	const index = args[2] as number | undefined;
	// 	if (index === undefined) {
	// 		return getPropertyMetadata(decorator, target, key);
	// 	} else {
	// 		return getParameterMetadata(decorator, target, key, index);
	// 	}
	// };
}
