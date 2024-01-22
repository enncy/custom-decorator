export const METADATA_CLASS_KEY = 'metadata:class';
export const METADATA_PROPERTY_KEY = 'metadata:property';
export const METADATA_PARAMETER_KEY = 'metadata:parameter';

/**
 * 设置类装饰器的元数据
 * @param name 		装饰器名字
 * @param target 	类
 * @param value 	值
 */
export function setClassMetadata(name: string, target: Function, value: any) {
	Reflect.defineMetadata(`${METADATA_CLASS_KEY}:${name.toLowerCase()}`, value, target);
}

/**
 * 设置属性装饰器的元数据
 * @param name 		装饰器名字
 * @param target	类
 * @param key 		属性
 * @param value		值
 */
export function setPropertyMetadata(name: string, target: Object, key: string | symbol, value: any) {
	Reflect.defineMetadata(`${METADATA_PROPERTY_KEY}:${name.toLowerCase()}`, value, target, key);
}

/**
 * 设置参数装饰器的元数据
 * @param name 		装饰器名字
 * @param target 	类
 * @param key 		属性
 * @param value 	值
 */
export function setParameterMetadata(
	name: string,
	target: Object,
	key: string | symbol | undefined,
	parameter_index: number,
	value: any
) {
	if (key) {
		Reflect.defineMetadata(`${METADATA_PARAMETER_KEY}:${parameter_index}:${name.toLowerCase()}`, value, target, key);
	}
}

/**
 * 获取类装饰器的元数据
 * @param name 		装饰器名称
 * @param target 	类
 */
export function getClassMetadata(name: string, target: Function) {
	return Reflect.getMetadata(`${METADATA_CLASS_KEY}:${name.toLowerCase()}`, target);
}

/**
 * 获取属性装饰器的元数据
 * @param name    装饰器名称
 * @param target  类
 * @param key  	  属性
 */
export function getPropertyMetadata(name: string, target: Object, key: string | symbol) {
	return Reflect.getMetadata(`${METADATA_PROPERTY_KEY}:${name.toLowerCase()}`, target, key);
}

/**
 * 获取参数装饰器的元数据
 * @param name     装饰器名称
 * @param target   类
 * @param key 	   属性
 */
export function getParameterMetadata(name: string, target: Object, key: string | symbol, parameter_index: number) {
	return Reflect.getMetadata(`${METADATA_PARAMETER_KEY}:${parameter_index}:${name.toLowerCase()}`, target, key);
}
