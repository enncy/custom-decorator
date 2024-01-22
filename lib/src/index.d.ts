import 'reflect-metadata';
export declare type DecoratorInfo<T extends (...args: any) => any, Args extends Array<any>, Value> = {
    name: string;
    value: (...args: Args) => Value;
    get: (...args: Parameters<T>) => Value;
};
export declare function CommonClassDecorator<FunctionType extends (...args: Args) => ClassDecorator, Args extends Array<any>, Value>(options: {
    name: string;
    value: (...args: Args) => Value;
}): [FunctionType, DecoratorInfo<ClassDecorator, Args, Value>];
export declare function CommonPropertyDecorator<FunctionType extends (...args: Args) => PropertyDecorator, Args extends Array<any>, Value>(options: {
    name: string;
    value: (...args: Args) => Value;
}): [FunctionType, DecoratorInfo<PropertyDecorator, Args, Value>];
export declare function CommonParameterDecorator<FunctionType extends (...args: Args) => ParameterDecorator, Args extends Array<any>, Value>(options: {
    name: string;
    value: (...args: Args) => Value;
}): [FunctionType, DecoratorInfo<ParameterDecorator, Args, Value>];
