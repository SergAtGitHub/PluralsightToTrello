/// <reference path="./option.ts" />
var Monads;
(function (Monads) {
    var Ok = /** @class */ (function () {
        function Ok(v) {
            this.value = v;
        }
        Ok.prototype.map = function (fn) {
            return new Ok(fn(this.value));
        };
        Ok.prototype.mapErr = function (fn) {
            return new Ok(this.value);
        };
        Ok.prototype.isOk = function () {
            return true;
        };
        Ok.prototype.isErr = function () {
            return false;
        };
        Ok.prototype.ok = function () {
            return new Monads.Some(this.value);
        };
        Ok.prototype.err = function () {
            return Monads.None.instance();
        };
        Ok.prototype.and = function (res) {
            return res;
        };
        Ok.prototype.andThen = function (op) {
            return op(this.value);
        };
        Ok.prototype.or = function (res) {
            return this;
        };
        Ok.prototype.orElse = function (op) {
            return new Ok(this.value);
        };
        Ok.prototype.unwrapOr = function (optb) {
            return this.value;
        };
        Ok.prototype.unwrapOrElse = function (op) {
            return this.value;
        };
        Ok.prototype.unwrap = function () {
            return this.value;
        };
        Ok.prototype.toString = function () {
            return "Some " + this.value;
        };
        return Ok;
    }());
    Monads.Ok = Ok;
    var Err = /** @class */ (function () {
        function Err(error) {
            this.error = error;
        }
        Err.prototype.map = function (fn) {
            return new Err(this.error);
        };
        Err.prototype.mapErr = function (fn) {
            return new Err(fn(this.error));
        };
        Err.prototype.isOk = function () {
            return false;
        };
        Err.prototype.isErr = function () {
            return false;
        };
        Err.prototype.ok = function () {
            return Monads.None.instance();
        };
        Err.prototype.err = function () {
            return new Monads.Some(this.error);
        };
        Err.prototype.and = function (res) {
            return new Err(this.error);
        };
        Err.prototype.andThen = function (op) {
            return new Err(this.error);
        };
        Err.prototype.or = function (res) {
            return res;
        };
        Err.prototype.orElse = function (op) {
            return op(this.error);
        };
        Err.prototype.unwrapOr = function (optb) {
            return optb;
        };
        Err.prototype.unwrapOrElse = function (op) {
            return op(this.error);
        };
        Err.prototype.unwrap = function () {
            throw "Err.get";
        };
        Err.prototype.toString = function () {
            return "None";
        };
        return Err;
    }());
    Monads.Err = Err;
})(Monads || (Monads = {}));
