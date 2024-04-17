var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
function Log(target, propertName) {
    console.log('Property decorator!');
    console.log(target, propertName);
}
function Log2(target, name, descriptor) {
    console.log('Accessor decorator!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function Log3(target, name, descriptor) {
    console.log('Method decorator!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function Log4(target, name, position) {
    console.log('Parameter decorator!');
    console.log(target);
    console.log(name);
    console.log(position);
}
var Product = function () {
    var _a;
    var _instanceExtraInitializers = [];
    var _title_decorators;
    var _title_initializers = [];
    var _title_extraInitializers = [];
    var _set_price_decorators;
    var _getPriceWithTax_decorators;
    return _a = /** @class */ (function () {
            function Product(t, p) {
                this.title = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _title_initializers, void 0));
                this._price = __runInitializers(this, _title_extraInitializers);
                this.title = t;
                this._price = p;
            }
            Object.defineProperty(Product.prototype, "price", {
                set: function (val) {
                    if (val > 0) {
                        this._price = val;
                    }
                    else {
                        throw new Error('Invalid price - should be positive!');
                    }
                },
                enumerable: false,
                configurable: true
            });
            Product.prototype.getPriceWithTax = function (tax) {
                return this._price * (1 + tax);
            };
            return Product;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _title_decorators = [Log];
            _set_price_decorators = [Log2];
            _getPriceWithTax_decorators = [Log3];
            __esDecorate(_a, null, _set_price_decorators, { kind: "setter", name: "price", static: false, private: false, access: { has: function (obj) { return "price" in obj; }, set: function (obj, value) { obj.price = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _getPriceWithTax_decorators, { kind: "method", name: "getPriceWithTax", static: false, private: false, access: { has: function (obj) { return "getPriceWithTax" in obj; }, get: function (obj) { return obj.getPriceWithTax; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: function (obj) { return "title" in obj; }, get: function (obj) { return obj.title; }, set: function (obj, value) { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
var p1 = new Product('Book', 19);
var p2 = new Product('Book 2', 29);
function Autobind(_, _2, descriptor) {
    var originalMethod = descriptor.value;
    var adjDescriptor = {
        configurable: true,
        enumerable: false,
        get: function () {
            var boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
}
var Printer = function () {
    var _a;
    var _instanceExtraInitializers = [];
    var _showMessage_decorators;
    return _a = /** @class */ (function () {
            function Printer() {
                this.message = (__runInitializers(this, _instanceExtraInitializers), 'This works!');
            }
            Printer.prototype.showMessage = function () {
                console.log(this.message);
            };
            return Printer;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _showMessage_decorators = [Autobind];
            __esDecorate(_a, null, _showMessage_decorators, { kind: "method", name: "showMessage", static: false, private: false, access: { has: function (obj) { return "showMessage" in obj; }, get: function (obj) { return obj.showMessage; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
var p = new Printer();
p.showMessage();
var button = document.querySelector('button');
button.addEventListener('click', p.showMessage);
