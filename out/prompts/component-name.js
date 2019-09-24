"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield vscode_1.window.showInputBox({
        prompt: '请输入组件名'
    });
    if (typeof result === 'undefined' || result === '')
        throw new Error('NO_INPUT:COMPONENT_NAME');
    return result;
});
//# sourceMappingURL=component-name.js.map