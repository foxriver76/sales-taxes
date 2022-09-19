'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.roundUp = void 0;
function roundUp(val, precision) {
    return Math.round(Math.ceil(val / precision) * precision * 100) / 100;
}
exports.roundUp = roundUp;
//# sourceMappingURL=utils.js.map
