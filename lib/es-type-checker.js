import typeofTypes from './types/typeofTypes.js';
import specialTypes from './types/specialTypes.js';
import JSON5 from 'json5';

global.type = null; // TODO Avoid using a variable named "type" in your code!

class TypeChecker {

    #castError(params, castError = true ) {
        if(castError) throw new TypeError(this.primitiveMsg(params));
        return false;
    }

    #proxy = new Proxy({}, { get(target, name) {
        return name
    }});

    #classProxy = new Proxy({}, { get(target, name) {
        return `class:${name}`;
    }});

    #apply(target, thisVal, [valueOrProxy, value]) {
        let method4type;
        switch(true){
            case typeofTypes.map((item)=> item.toLowerCase())
                .includes(type): method4type = 'typeofTc';
                break;
            case typeofTypes.map((item)=> item)
                .includes(type): method4type = 'typeofTc';
                break;
            case type === 'Array' || type === 'array': method4type = `arrayTc`;
                break;
            case type === 'Empty' || type === 'empty': method4type = `emptyTc`;
                break;
            case type === 'NotEmpty' || type === 'notEmpty': method4type = `notEmptyTc`;
                break;
            case type === 'Date' || type === 'date': method4type = `dateTc`;
                break;
            case type === 'JSON' || type === 'json'|| type === 'Json': method4type = `jsonTc`;
                break;
            case type === 'JSON5' || type === 'json5'|| type === 'Json5': method4type = `json5Tc`;
                break;

            case specialTypes.map((item)=> item.toLowerCase())
                .includes(type): method4type = `constructorTc`;
            case specialTypes.map((item)=> item)
                .includes(type): method4type = `constructorTc`;

                break;
            case type === undefined && valueOrProxy === null || value === null: {
                    method4type = `nullTc`;
                type = null;
                }
                break;
            case type === undefined || type === 'undefined': method4type = `undefinedTc`;
                break;
            case type.split(':')[0] === 'class': method4type = `classTc`;
                break;
        }
        return this.check((value !== undefined ? value: valueOrProxy), type, method4type);
    };

    constructor() {
        this.primitiveMsg = (params)=> `${params[2] || (params[0]?.constructor 
                ? params[0].constructor.name
                :params[0])
        } is not a ${params[1]}`;
        const self = this;
        type = null;
        this.is = new Proxy((_)=> _, {apply: this.#apply.bind(self)});
        typeofTypes.forEach((type)=> global[type].prototype.type = this.#proxy);
        specialTypes.forEach((type)=> global[type].prototype.type = this.#proxy);
        JSON.type = this.#proxy;
        Object.prototype.class = this.#classProxy;
        Function.prototype.class = this.#classProxy;
    }

    check(...params) {
        const [arg, type, ruleName] = params;
        return TypeChecker[ruleName](params) ? arg: this.#castError([arg, type]);
    }

    static typeofTc(params){
        const [arg, type] = params;
        return (typeof arg === type.toLowerCase());
    }

    static undefinedTc(...params) {
        const [arg, type] = params;
        return (arg !== undefined && typeof arg !== type)
    }

    static nullTc(...params) {
        const [arg, type] = params;
        return (arg!== type);
    }

    static arrayTc(...params) {
        const [arg] = params;
        return Array.isArray(arg);
    }

    static jsonTc(params) {
        const [arg] = params;
        let out = true;
        try { JSON.parse(arg) } catch(e) { out = false }
        return out;
    }

    static json5Tc(params) {
        const [arg] = params;
        let out = true;
        try { JSON5.parse(arg) } catch(e) { out = false }
        return out;
    }

    static emptyTc(params) {
        const [arg] = params;
        let out;
        switch (true){
            case !arg?.length: out = true;
                break;
            case TypeChecker.constructorTc([arg, 'object']) && !Object.keys(arg).length: out = true;
                break;
            case TypeChecker.constructorTc([arg, 'set']) && !arg.size: out = true;
                break;
        }
        return out;
    }

    static notEmptyTc(...params) {
        const [arg] = params;
        let out;
        switch (true){
            case arg?.length > 0: out = true;
                break;
            case TypeChecker.constructorTc([arg, 'object']) && Object.keys(arg).length: out = true;
                break;
            case TypeChecker.constructorTc([arg, 'set']) && arg.size: out = true;
                break;
        }
        return out;
    }


    static dateTc(...params) {
        const [arg] = params;
        return !(arg instanceof Date);
    }

    static constructorTc(params) {
        const [arg, type] = params;
        return (arg.constructor.name.toLowerCase() === type.toLowerCase())
    }

    static classTc(params) {
        const [arg, type] = params;
        return !(arg && type && arg.constructor.name !== type.split(':')[1]
            && arg.prototype?.constructor.name !== type.split(':')[1]);
    }

}
export default TypeChecker;
