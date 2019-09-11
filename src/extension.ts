import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

import jsxExtension from './commons/jsx-extensions';

import promptComponentName from './prompts/component-name';
import promptComponentType from './prompts/component-type';
import promptLanguage from './prompts/language';
import promptCreateType from './prompts/create-type';

// ============================================================================

export type Language = 'javascript' | 'typescript';

// ============================================================================

export function activate(context: vscode.ExtensionContext): void {
    const commandNewComponent = vscode.commands.registerCommand(
        'extension.kootNewComponent',
        newComponent
    );
    context.subscriptions.push(commandNewComponent);
}

// this method is called when your extension is deactivated
export function deactivate(): void {
    //
}

const newComponent = async (uri: vscode.Uri): Promise<void> => {
    const name = await promptComponentName();
    const type = await promptComponentType();
    const language = await promptLanguage();
    const createType = await promptCreateType(name, language);
    const ext = jsxExtension[language];

    //

    const templates = {
        jsx: vscode.Uri.file(
            path.resolve(
                __dirname,
                '..',
                `templates/${type}-${language}/index.${ext}`
            )
        ),
        styles: vscode.Uri.file(
            path.resolve(__dirname, '..', `templates/styles.less`)
        )
    };
    const newFiles: {
        [file: string]: vscode.Uri;
    } = {};
    switch (createType) {
        case 'folder': {
            const newFolder = vscode.Uri.file(`${uri.path}/${name}`);
            newFiles.jsx = vscode.Uri.file(`${newFolder.path}/index.${ext}`);
            newFiles.styles = vscode.Uri.file(
                `${newFolder.path}/index.module.less`
            );
            await vscode.workspace.fs.createDirectory(newFolder);
            break;
        }
        case 'file': {
            newFiles.jsx = vscode.Uri.file(`${uri.path}/${name}.${ext}`);
            newFiles.styles = vscode.Uri.file(
                `${uri.path}/${name}.module.less`
            );
            break;
        }
        default: {
        }
    }

    // 复制文件
    await vscode.workspace.fs.copy(templates.jsx, newFiles.jsx);
    await vscode.workspace.fs.copy(templates.styles, newFiles.styles);

    // 修改文件内容
    const needChange: {
        componentName: string;
        importStyle: string;
    } = {
        componentName: name.substr(0, 1).toUpperCase() + name.substr(1),
        importStyle: ''
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
    const contentJSX = (await vscode.workspace.fs.readFile(newFiles.jsx))
        .toString()
        .replace(/NEED_CHANGE_COMPONENT_NAME/g, `${needChange.componentName}`)
        .replace(/'NEED_CHANGE_IMPORT_STYLES'/g, `'${needChange.importStyle}'`)
        .replace(
            /\/\* NEED_CHANGE_ALL_EXTEND_OPTIONS_IN_COMMENTED \*\//g,
            language === 'typescript'
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
    */`
        );
    fs.writeFileSync(newFiles.jsx.fsPath, contentJSX, 'utf-8');

    // 打开 JSX 文件
    await vscode.window.showTextDocument(newFiles.jsx);
};
