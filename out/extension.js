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
const vscode = require("vscode");
const path = require("path");
const fs = require("fs");
const camelcase_1 = require("../modules/camelcase");
const jsx_extensions_1 = require("./commons/jsx-extensions");
const component_name_1 = require("./prompts/component-name");
const component_type_1 = require("./prompts/component-type");
const language_1 = require("./prompts/language");
const create_type_1 = require("./prompts/create-type");
// ============================================================================
function activate(context) {
    const commandNewComponent = vscode.commands.registerCommand('extension.kootNewComponent', newComponent);
    context.subscriptions.push(commandNewComponent);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
    //
}
exports.deactivate = deactivate;
const newComponent = (uri) => __awaiter(void 0, void 0, void 0, function* () {
    const name = yield component_name_1.default();
    const type = yield component_type_1.default();
    const language = yield language_1.default();
    const createType = yield create_type_1.default(name, language);
    const ext = jsx_extensions_1.default[language];
    const newJSXTransform = yield (() => __awaiter(void 0, void 0, void 0, function* () {
        if (!Array.isArray(vscode.workspace.workspaceFolders))
            return false;
        const fileReactPackage = vscode.Uri.parse(vscode.workspace.workspaceFolders[0].uri.path +
            '/node_modules/react/package.json');
        try {
            const reactPackage = JSON.parse((yield vscode.workspace.fs.readFile(fileReactPackage)).toString());
            const major = reactPackage.version
                ? parseInt(reactPackage.version.split('.')[0])
                : 17;
            return major >= 17;
        }
        catch (e) {
            console.error(e);
            return true;
        }
    }))();
    //
    const templates = {
        jsx: vscode.Uri.file(path.resolve(__dirname, '..', `templates/${type.split('-')[0]}-${language}/index.${ext}`)),
        styles: vscode.Uri.file(path.resolve(__dirname, '..', `templates/styles.less`))
    };
    const newFiles = {};
    switch (createType) {
        case 'folder': {
            const newFolder = vscode.Uri.file(`${uri.path}/${name}`);
            newFiles.jsx = vscode.Uri.file(`${newFolder.path}/index.${ext}`);
            newFiles.styles = vscode.Uri.file(`${newFolder.path}/index.module.less`);
            yield vscode.workspace.fs.createDirectory(newFolder);
            break;
        }
        case 'file': {
            newFiles.jsx = vscode.Uri.file(`${uri.path}/${name}.${ext}`);
            newFiles.styles = vscode.Uri.file(`${uri.path}/${name}.module.less`);
            break;
        }
        default: {
        }
    }
    // 复制文件
    yield vscode.workspace.fs.copy(templates.jsx, newFiles.jsx);
    yield vscode.workspace.fs.copy(templates.styles, newFiles.styles);
    // 修改文件内容
    const needChange = {
        componentName: camelcase_1.default(name, { pascalCase: true }),
        importStyle: '',
        classIsPure: type === 'class-pure',
        functionalUseMemo: type === 'functional-memo'
    };
    switch (createType) {
        case 'folder': {
            needChange.importStyle = './index.module.less';
            break;
        }
        case 'file': {
            needChange.importStyle = `./${name}.module.less`;
            break;
        }
        default: {
        }
    }
    const contentJSX = (/^functional/.test(type)
        ? needChange.functionalUseMemo
            ? newJSXTransform
                ? `import { memo } from 'react';\n`
                : `import React, { memo } from 'react';\n`
            : newJSXTransform
                ? ''
                : `import React from 'react';\n`
        : '') +
        (yield vscode.workspace.fs.readFile(newFiles.jsx))
            .toString()
            .replace(/NEED_CHANGE_COMPONENT_NAME/g, `${needChange.componentName}`)
            .replace(/'NEED_CHANGE_IMPORT_STYLES'/g, `'${needChange.importStyle}'`)
            .replace(/\/\* NEED_CHANGE_ALL_EXTEND_OPTIONS_IN_COMMENTED \*\//g, language === 'typescript'
            ? `/*
    // 下例均为简易写法
    // 更详细的释义和高级写法，请查阅文档
    // https://koot.js.org/#/react

    connect: (state: any): any => {
        return {}
    },

    // 修改页面 title 和 meta 标签
    // pageinfo 也可为 function
    pageinfo: {
        title: '页面标题',
        metas: [
            { description: '页面描述' }
        ]
    },

    // 同构数据
    // https://koot.js.org/#/react
    data: (state: any, renderProps, dispatch) => {
        return dispatch({
            type: "ACTION",
            payload: {}
        });
    },

    // 控制组件的 SSR 行为
    // 仅作用于 SSR 项目
    ssr: true,
    */`
            : `/*
    // 下例均为简易写法
    // 更详细的释义和高级写法，请查阅文档
    // https://koot.js.org/#/react

    connect: (state) => {
        return {}
    },

    // 修改页面 title 和 meta 标签
    // pageinfo 也可为 function
    pageinfo: {
        title: '页面标题',
        metas: [
            { description: '页面描述' }
        ]
    },

    // 同构数据
    data: (state, renderProps, dispatch) => {
        return dispatch({
            type: "ACTION",
            payload: {}
        });
    },

    // 控制组件的 SSR 行为
    // 仅作用于 SSR 项目
    ssr: true,
    */`)
            .replace(/NEED_CHANGE_REACT_IMPORT_COMMA{/g, newJSXTransform ? '{' : `React, {`)
            .replace(/ NEED_CHANGE_COMPONENT_TYPE(.)/g, needChange.classIsPure ? ' PureComponent$1' : ' Component$1')
            .replace(/\/\* NNED_CHANGE_USE_MEMO_START \*\//g, needChange.functionalUseMemo ? 'memo(' : '')
            .replace(/\/\* NNED_CHANGE_USE_MEMO_END \*\//g, needChange.functionalUseMemo ? ')' : '');
    fs.writeFileSync(newFiles.jsx.fsPath, contentJSX, 'utf-8');
    // 打开 JSX 文件
    yield vscode.window.showTextDocument(newFiles.jsx);
});
//# sourceMappingURL=extension.js.map