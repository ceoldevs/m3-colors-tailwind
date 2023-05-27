"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadTokens = void 0;
function loadTokens(tokenString) {
    var tokens = JSON.parse(tokenString);
    var entities = tokens.entities.reduce(function (obj, item) {
        var _a;
        return Object.assign(obj, (_a = {}, _a[item.id] = item.value, _a));
    });
    var paletteFilter = Object.keys(entities)
        .filter(function (key) { return key.includes('palette'); })
        .reduce(function (obj, key) {
        var _a;
        var newKey = key.split(".")[3];
        return Object.assign(obj, (_a = {}, _a[newKey] = entities[key], _a), {});
    });
    var sysFilter = Object.keys(entities)
        .filter(function (key) { return key.includes('sys'); })
        .reduce(function (obj, key) {
        var _a;
        var keySplit = key.split(".");
        if (keySplit[4] != undefined) {
            var newKey = keySplit[3] + "." + keySplit[4];
            return Object.assign(obj, (_a = {}, _a[newKey] = entities[key], _a), {});
        }
        else {
            return Object.assign(obj, {}, {});
        }
    });
    // console.log(sysFilter);
    var palette = {};
    for (var key in paletteFilter) {
        if (paletteFilter.hasOwnProperty(key)) {
            var match = key.match(/([a-z\-]+)(\d{0,3})/);
            if (match) {
                var type = match[1], weight = match[2];
                var numericWeight = parseInt(weight);
                if (!(type in palette)) {
                    palette[type] = {};
                }
                palette[type][numericWeight] = paletteFilter[key];
            }
        }
    }
    var colors = {};
    for (var key in sysFilter) {
        if (sysFilter.hasOwnProperty(key)) {
            var match = key.split(".");
            if (match.length == 2) {
                var field = match[0], dispMode = match[1];
                if (!(dispMode in colors)) {
                    colors[dispMode] = {};
                }
                colors[dispMode][field] = sysFilter[key];
            }
        }
    }
    // console.log({...colors, ...palette});
    return __assign(__assign({}, colors), palette);
}
exports.loadTokens = loadTokens;
