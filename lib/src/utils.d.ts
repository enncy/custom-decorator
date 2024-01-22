export declare const METADATA_CLASS_KEY = "metadata:class";
export declare const METADATA_PROPERTY_KEY = "metadata:property";
export declare const METADATA_PARAMETER_KEY = "metadata:parameter";
/**
 * 设置类装饰器的元数据
 * @param name 		装饰器名字
 * @param target 	类
 * @param value 	值
 */
export declare function setClassMetadata(name: string, target: Function, value: any): void;
/**
 * 设置属性装饰器的元数据
 * @param name 		装饰器名字
 * @param target	类
 * @param key 		属性
 * @param value		值
 */
export declare function setPropertyMetadata(name: string, target: Object, key: string | symbol, value: any): void;
/**
 * 设置参数装饰器的元数据
 * @param name 		装饰器名字
 * @param target 	类
 * @param key 		属性
 * @param value 	值
 */
export declare function setParameterMetadata(name: string, target: Object, key: string | symbol | undefined, parameter_index: number, value: any): void;
/**
 * 获取类装饰器的元数据
 * @param name 		装饰器名称
 * @param target 	类
 */
export declare function getClassMetadata(name: string, target: Function): any;
/**
 * 获取属性装饰器的元数据
 * @param name    装饰器名称
 * @param target  类
 * @param key  	  属性
 */
export declare function getPropertyMetadata(name: string, target: Object, key: string | symbol): any;
/**
 * 获取参数装饰器的元数据
 * @param name     装饰器名称
 * @param target   类
 * @param key 	   属性
 */
export declare function getParameterMetadata(name: string, target: Object, key: string | symbol, parameter_index: number): any;
