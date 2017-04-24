"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Rx_1 = require("rxjs/Rx");
var UrlBaseService$ = (function (_super) {
    __extends(UrlBaseService$, _super);
    function UrlBaseService$() {
        var _this = _super.call(this) || this;
        _this.baseUrl = new Rx_1.BehaviorSubject('http://localhost:3276/API/');
        _this.source = _this.baseUrl.asObservable();
        return _this;
    }
    return UrlBaseService$;
}(Rx_1.Observable));
exports.UrlBaseService$ = UrlBaseService$;
//# sourceMappingURL=urlbase.service.js.map