"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParameterMetadata = exports.getPropertyMetadata = exports.getClassMetadata = exports.setParameterMetadata = exports.setPropertyMetadata = exports.setClassMetadata = exports.METADATA_PARAMETER_KEY = exports.METADATA_PROPERTY_KEY = exports.METADATA_CLASS_KEY = void 0;
exports.METADATA_CLASS_KEY = 'metadata:class';
exports.METADATA_PROPERTY_KEY = 'metadata:property';
exports.METADATA_PARAMETER_KEY = 'metadata:parameter';
/**
 * 设置类装饰器的元数据
 * @param name 		装饰器名字
 * @param target 	类
 * @param value 	值
 */
function setClassMetadata(name, target, value) {
    Reflect.defineMetadata("".concat(exports.METADATA_CLASS_KEY, ":").concat(name.toLowerCase()), value, target);
}
exports.setClassMetadata = setClassMetadata;
/**
 * 设置属性装饰器的元数据
 * @param name 		装饰器名字
 * @param target	类
 * @param key 		属性
 * @param value		值
 */
function setPropertyMetadata(name, target, key, value) {
    Reflect.defineMetadata("".concat(exports.METADATA_PROPERTY_KEY, ":").concat(name.toLowerCase()), value, target, key);
}
exports.setPropertyMetadata = setPropertyMetadata;
/**
 * 设置参数装饰器的元数据
 * @param name 		装饰器名字
 * @param target 	类
 * @param key 		属性
 * @param value 	值
 */
function setParameterMetadata(name, target, key, parameter_index, value) {
    if (key) {
        Reflect.defineMetadata("".concat(exports.METADATA_PARAMETER_KEY, ":").concat(parameter_index, ":").concat(name.toLowerCase()), value, target, key);
    }
}
exports.setParameterMetadata = setParameterMetadata;
/**
 * 获取类装饰器的元数据
 * @param name 		装饰器名称
 * @param target 	类
 */
function getClassMetadata(name, target) {
    return Reflect.getMetadata("".concat(exports.METADATA_CLASS_KEY, ":").concat(name.toLowerCase()), target);
}
exports.getClassMetadata = getClassMetadata;
/**
 * 获取属性装饰器的元数据
 * @param name    装饰器名称
 * @param target  类
 * @param key  	  属性
 */
function getPropertyMetadata(name, target, key) {
    return Reflect.getMetadata("".concat(exports.METADATA_PROPERTY_KEY, ":").concat(name.toLowerCase()), target, key);
}
exports.getPropertyMetadata = getPropertyMetadata;
/**
 * 获取参数装饰器的元数据
 * @param name     装饰器名称
 * @param target   类
 * @param key 	   属性
 */
function getParameterMetadata(name, target, key, parameter_index) {
    return Reflect.getMetadata("".concat(exports.METADATA_PARAMETER_KEY, ":").concat(parameter_index, ":").concat(name.toLowerCase()), target, key);
}
exports.getParameterMetadata = getParameterMetadata;
