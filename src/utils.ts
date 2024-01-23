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
export function getClassMetadata(decorator_name: string | { name: string }, target: Function) {
	const _name = typeof decorator_name === 'string' ? decorator_name : decorator_name.name;
	return Reflect.getMetadata(`${METADATA_CLASS_KEY}:${_name.toLowerCase()}`, target);
}

/**
 * 获取属性装饰器的元数据
 * @param decorator_name    装饰器名称
 * @param target  类
 * @param key  	  属性
 */
export function getPropertyMetadata(decorator_name: string | { name: string }, target: Object, key: string | symbol) {
	const _name = typeof decorator_name === 'string' ? decorator_name : decorator_name.name;
	return Reflect.getMetadata(`${METADATA_PROPERTY_KEY}:${_name.toLowerCase()}`, target, key);
}

/**
 * 获取参数装饰器的元数据
 * @param name     装饰器名称
 * @param target   类
 * @param key 	   属性
 */
export function getParameterMetadata(
	decorator_name: string | { name: string },
	target: Object,
	key: string | symbol,
	parameter_index: number
) {
	const _name = typeof decorator_name === 'string' ? decorator_name : decorator_name.name;
	return Reflect.getMetadata(`${METADATA_PARAMETER_KEY}:${parameter_index}:${_name.toLowerCase()}`, target, key);
}
