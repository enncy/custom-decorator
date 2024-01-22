"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("../src");
var _a = (0, src_1.CommonPropertyDecorator)({
    name: 'Api',
    value: function (path) { return path; }
}), Api = _a[0], ApiDecorator = _a[1];
var _b = (0, src_1.CommonClassDecorator)({
    name: 'Controller',
    value: function (path) { return path; }
}), Controller = _b[0], ControllerDecorator = _b[1];
var _c = (0, src_1.CommonParameterDecorator)({
    name: 'Param',
    value: function (name) { return name; }
}), Param = _c[0], ParamDecorator = _c[1];
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.b = function (str) {
        console.log(str);
    };
    __decorate([
        Api('/b'),
        __param(0, Param('str')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], A.prototype, "b", null);
    A = __decorate([
        Controller('/a')
    ], A);
    return A;
}());
/**
 * run: tsc && node ./lib/tests/index.js
 */
console.log(ControllerDecorator.get(A));
console.log(ApiDecorator.get(new A(), 'b'));
console.log(ParamDecorator.get(new A(), 'b', 0));
/**
 * output:
 * /a
 * /b
 * str
 */
