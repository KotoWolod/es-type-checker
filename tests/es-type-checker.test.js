import { mocha, describe, it, expect, before } from './header.js';
import TypeChecker from '../lib/es-type-checker.js';

const { is } = new TypeChecker();
const of = is;

const string_ = '';
const number_ = 2;
const boolean_ = true;
const symbol_ = Symbol('test');
const function_ = function(){};
const bigInt_ = BigInt("1234567890123456789012345678901234567890");
const undefined_ = undefined;
const null_ = null;
const array_ = [];
const date_ = new Date();
const object_ = {};
const set_ = new Set();
const map_ = new Map();
const weakSet_ = new WeakSet();
const weakMap_ = new WeakMap();
const weakRef_ = new WeakRef(object_);
const regExp_ = new RegExp(/./g);
const buffer_ = new Buffer.alloc(5);
const promise_ = new Promise((_)=> _);
const json_ = JSON.stringify({test: 'test'});
const json5_ = "{property: 'value'}";
const error_ = new Error('this is error');
const rangeError_ = new RangeError('this is RangeError');
const referenceError_ = new ReferenceError('this is ReferenceError');
const syntaxError_ = new SyntaxError('this is SyntaxError');
const typeError_ = new TypeError('this is TypeError');
const typeChecker_ = new TypeChecker();
const typeof_ = [string_, number_, boolean_, symbol_, function_, bigInt_];
const special_ = [ array_, date_, object_, set_, map_, weakSet_, weakMap_, weakRef_,
    regExp_, buffer_, promise_, json_, json5_, error_, rangeError_, referenceError_, syntaxError_, typeError_,
    typeChecker_];
const validator_ = [string_, array_, object_, set_, map_, weakSet_, weakMap_, weakRef_];

describe('strict-type-checker tests', function () {
    this.timeout(0);

    it('typeof positive tests', () => {
        const value = is({ string: type } = string_.type, string_);

        ({ string: type } = string_.type), of(string_);
        ({ String: type } = string_.type), of(string_);
        ({ Number: type } = number_.type), of(number_);
        ({ number: type } = number_.type), of(number_);
        ({ boolean: type } = boolean_.type), of(boolean_);
        ({ Boolean: type } = boolean_.type), of(boolean_);
        ({ symbol: type } = symbol_.type), of(symbol_);
        ({ Symbol: type } = symbol_.type), of(symbol_);
        ({ function: type } = function_.type), of(function_);
        ({ Function: type } = function_.type), of(function_);
        ({ bigint: type } = bigInt_.type), of(bigInt_);
        ({ BigInt: type } = bigInt_.type), of(bigInt_);
    });

    it('typeof negative tests', ()=> {
        typeof_.forEach((argument)=> {
            ({ string: type } = argument.type);
            type!=='string' && expect(of(argument)).to.throw(TypeError);
        });
        typeof_.forEach((argument)=> {
            ({ number: type } = argument.type);
            type!=='number' && expect(of(argument)).to.throw(TypeError);
        });
        typeof_.forEach((argument)=> {
            ({ boolean: type } = argument.type);
            type!=='boolean' && expect(of(argument)).to.throw(TypeError);
        });
        typeof_.forEach((argument)=> {
            ({ symbol: type } = argument.type);
            type!=='symbol' && expect(of(argument)).to.throw(TypeError);
        });
        typeof_.forEach((argument)=> {
            ({ object: type } = argument.type);
            type!=='object' && expect(of(argument)).to.throw(TypeError);
        });
        typeof_.forEach((argument)=> {
            ({ function: type } = argument.type);
            type!=='function' && expect(of(argument)).to.throw(TypeError);
        });
        typeof_.forEach((argument)=> {
            ({ bigint: type } = argument.type);
            type!=='bigint' && expect(of(argument)).to.throw(TypeError);
        });
    });

    it('special positive tests', () => {
        ({ undefined: type } = undefined_?.type ?? true), of(undefined_);
        ({ null: type } = null_?.type ?? true), of(null_);
        ({ Array: type } = array_.type), of(array_);
        ({ array: type } = array_.type), of(array_);
        ({ date: type } = date_.type), of(date_);
        ({ Date: type } = date_.type), of(date_);
        ({ object: type } = object_.type), of(object_);
        ({ Object: type } = object_.type), of(object_);
        ({ Set: type } = set_.type), of(set_);
        ({ set: type } = set_.type), of(set_);
        ({ Map: type } = map_.type), of(map_);
        ({ map: type } = map_.type), of(map_);
        ({ WeakSet: type } = weakSet_.type), of(weakSet_);
        ({ weakset: type } = weakSet_.type), of(weakSet_);
        ({ WeakMap: type } = weakMap_.type), of(weakMap_);
        ({ weakmap: type } = weakMap_.type), of(weakMap_);
        ({ WeakRef: type } = weakRef_.type), of(weakRef_);
        ({ weakref: type } = weakRef_.type), of(weakRef_);
        ({ RegExp: type } = regExp_.type), of(regExp_);
        ({ regexp: type } = regExp_.type), of(regExp_);
        ({ Error: type } = error_.type), of(error_);
        ({ error: type } = error_.type), of(error_);
        ({ RangeError: type } = rangeError_.type), of(rangeError_);
        ({ rangeerror: type } = rangeError_.type), of(rangeError_);
        ({ ReferenceError: type } = referenceError_.type), of(referenceError_);
        ({ referenceerror: type } = referenceError_.type), of(referenceError_);
        ({ SyntaxError: type } = syntaxError_.type), of(syntaxError_);
        ({ syntaxerror: type } = syntaxError_.type), of(syntaxError_);
        ({ TypeError: type } = typeError_.type), of(typeError_);
        ({ typeerror: type } = typeError_.type), of(typeError_);
        ({ Buffer: type } = buffer_.type), of(buffer_);
        ({ buffer: type } = buffer_.type), of(buffer_);
        ({ Promise: type } = promise_.type), of(promise_);
        ({ promise: type } = promise_.type), of(promise_);
        ({ JSON: type } = json_.type), of(json_);
        ({ json: type } = json_.type), of(json_);
        ({ JSON5: type } = json5_.type), of(json5_);
        ({ json5: type } = json5_.type), of(json5_);
        ({ TypeChecker: type } = typeChecker_.class), of(typeChecker_);
        ({ TypeChecker: type } = TypeChecker.class), of(TypeChecker);
    });

    it('validator positive tests', () => {
        ({ empty: type } = string_.type), of(string_);
        ({ empty: type } = array_.type), of(array_);
        ({ empty: type } = object_.type), of(object_);
        ({ empty: type } = set_.type), of(set_);
        ({ empty: type } = map_.type), of(map_);
        ({ empty: type } = weakSet_.type), of(weakSet_);
        ({ empty: type } = weakMap_.type), of(weakMap_);
        ({ empty: type } = weakRef_.type), of(weakRef_);
        ({ notEmpty: type } = string_.type), of('string_');
        ({ notEmpty: type } = array_.type), of([array_]);
        ({ notEmpty: type } = object_.type), of({object_: 1});
        ({ notEmpty: type } = set_.type), of(new Set().add(1));
        ({ notEmpty: type } = map_.type), of(new Map().set('a', 1));
        ({ notEmpty: type } = weakSet_.type), of(weakSet_.add(object_));
        ({ notEmpty: type } = weakMap_.type), of(weakMap_.set(object_, 1));
        ({ notEmpty: type } = weakRef_.type), of(new WeakRef({t:1}));
    });

});
