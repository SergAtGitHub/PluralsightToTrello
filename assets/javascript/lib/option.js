/// <reference path="./result.ts" />
var Monads;
(function (Monads) {
    var Some = /** @class */ (function () {
        function Some(v) {
            this.value = v;
        }
        Some.wrapNull = function (value) {
            if (value == null) {
                return new None();
            }
            else {
                return new Some(value);
            }
        };
        Some.prototype.map = function (fn) {
            return new Some(fn(this.value));
        };
        Some.prototype.isSome = function () {
            return true;
        };
        Some.prototype.isNone = function () {
            return false;
        };
        Some.prototype.isSomeAnd = function (fn) {
            return fn(this.value);
        };
        Some.prototype.isNoneAnd = function (fn) {
            return false;
        };
        Some.prototype.unwrap = function () {
            return this.value;
        };
        Some.prototype.unwrapOr = function (def) {
            return this.value;
        };
        Some.prototype.unwrapOrElse = function (f) {
            return this.value;
        };
        Some.prototype.mapOr = function (def, f) {
            return f(this.value);
        };
        Some.prototype.mapOrElse = function (def, f) {
            return f(this.value);
        };
        Some.prototype.okOr = function (err) {
            return new Monads.Ok(this.value);
        };
        Some.prototype.okOrElse = function (err) {
            return new Monads.Ok(this.value);
        };
        Some.prototype.and = function (optb) {
            return optb;
        };
        Some.prototype.andThen = function (f) {
            return f(this.value);
        };
        Some.prototype.or = function (optb) {
            return this;
        };
        Some.prototype.orElse = function (f) {
            return this;
        };
        Some.prototype.toString = function () {
            return "Some " + this.value;
        };
        return Some;
    }());
    Monads.Some = Some;
    var None = /** @class */ (function () {
        function None() {
        }
        None.prototype.map = function (fn) {
            return None._instance;
        };
        None.prototype.isSome = function () {
            return false;
        };
        None.prototype.isNone = function () {
            return true;
        };
        None.prototype.isSomeAnd = function (fn) {
            return false;
        };
        None.prototype.isNoneAnd = function (fn) {
            return fn();
        };
        None.prototype.unwrap = function () {
            console.error("None.unwrap()");
            throw "None.get";
        };
        None.prototype.unwrapOr = function (def) {
            return def;
        };
        None.prototype.unwrapOrElse = function (f) {
            return f();
        };
        None.prototype.mapOr = function (def, f) {
            return def;
        };
        None.prototype.mapOrElse = function (def, f) {
            return def();
        };
        None.prototype.okOr = function (err) {
            return new Monads.Err(err);
        };
        None.prototype.okOrElse = function (err) {
            return new Monads.Err(err());
        };
        None.prototype.and = function (optb) {
            return None.instance();
        };
        None.prototype.andThen = function (f) {
            return None.instance();
        };
        None.prototype.or = function (optb) {
            return optb;
        };
        None.prototype.orElse = function (f) {
            return f();
        };
        None.instance = function () {
            return None._instance;
        };
        None.prototype.toString = function () {
            return "None";
        };
        None._instance = new None();
        return None;
    }());
    Monads.None = None;
})(Monads || (Monads = {}));
