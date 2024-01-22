"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonParameterDecorator = exports.CommonPropertyDecorator = exports.CommonClassDecorator = void 0;
require("reflect-metadata");
var utils_1 = require("./utils");
function CommonClassDecorator(options) {
    return [
        (function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return function (target) {
                (0, utils_1.setClassMetadata)(options.name, target, options.value.apply(options, args));
            };
        }),
        {
            name: options.name,
            value: options.value,
            get: function (target) { return (0, utils_1.getClassMetadata)(options.name, target); }
        }
    ];
}
exports.CommonClassDecorator = CommonClassDecorator;
function CommonPropertyDecorator(options) {
    return [
        (function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return function (target, key) {
                (0, utils_1.setPropertyMetadata)(options.name, target, key.toString(), options.value.apply(options, args));
            };
        }),
        {
            name: options.name,
            value: options.value,
            get: function (target, key) { return (0, utils_1.getPropertyMetadata)(options.name, target, key); }
        }
    ];
}
exports.CommonPropertyDecorator = CommonPropertyDecorator;
function CommonParameterDecorator(options) {
    return [
        (function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return function (target, key, parameter_index) {
                (0, utils_1.setParameterMetadata)(options.name, target, key, parameter_index, options.value.apply(options, args));
            };
        }),
        {
            name: options.name,
            value: options.value,
            get: function (target, key, index) { return (0, utils_1.getParameterMetadata)(options.name, target, key, index); }
        }
    ];
}
exports.CommonParameterDecorator = CommonParameterDecorator;
