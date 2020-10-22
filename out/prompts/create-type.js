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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const jsx_extensions_1 = __importDefault(require("../commons/jsx-extensions"));
exports.default = (componentName, language) => __awaiter(void 0, void 0, void 0, function* () {
    const { type } = (yield vscode_1.window.showQuickPick([
        {
            type: 'folder',
            label: `创建到子文件夹中 (./${componentName}/index.${jsx_extensions_1.default[language]})`,
        },
        {
            type: 'file',
            label: `创建到当前文件夹中 (./${componentName}.${jsx_extensions_1.default[language]})`,
        },
    ], {
        placeHolder: '请选择创建方式',
    })) || {};
    if (typeof type === 'undefined')
        throw new Error('NO_INPUT:CREATE_TYPE');
    return type;
});
//# sourceMappingURL=create-type.js.map