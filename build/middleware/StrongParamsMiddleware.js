"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function strongParamsMiddleware(params) {
    return function (request, response, next) {
        var weakParams = request.body;
        var strongParams = {};
        Object.entries(params).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            var weakParam = weakParams[key];
            if (weakParam && typeof weakParam === value) {
                strongParams[key] = weakParam;
            }
            else {
                return next('bad type');
            }
        });
        response.locals.strongParams = strongParams;
        request.body = null;
        return next();
    };
}
exports.strongParamsMiddleware = strongParamsMiddleware;
