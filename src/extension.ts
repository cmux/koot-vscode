import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

const jsxExtension = {
    javascript: 'jsx',
    typescript: 'tsx'
};

export function activate(context: vscode.ExtensionContext): void {
    const commandNewComponent = vscode.commands.registerCommand(
        'extension.kootNewComponent',
        newComponent
    );
    context.subscriptions.push(commandNewComponent);

    // const commandNewComponentTS = vscode.commands.registerCommand(
    //     'extension.kootNewComponentTS',
    //     () => {
    //         vscode.window.showInformationMessage('New Component (TypeScript)');
    //     }
    // );
    // context.subscriptions.push(commandNewComponentTS);
}

// this method is called when your extension is deactivated
export function deactivate(): void {
    //
}

const newComponent = async (uri: vscode.Uri): Promise<void> => {
    const name =
        (await vscode.window.showInputBox({
            prompt: '请输入组件名'
        })) || '';

    //

    type ComponentType = {
        type: 'class' | 'functional';
        label: string;
    };
    const { type: componentType } =
        (await vscode.window.showQuickPick<ComponentType>(
            [
                {
                    type: 'class',
                    label: `类 (Class)`
                },
                {
                    type: 'functional',
                    label: `函数组件 (Functional Component)`
                }
            ],
            {
                placeHolder: '请选择组件类型'
            }
        )) || {};

    //

    type Language = {
        language: 'javascript' | 'typescript';
        label: string;
    };
    const { language = 'javascript' } =
        (await vscode.window.showQuickPick<Language>(
            [
                {
                    language: 'javascript',
                    label: `JavaScript`
                },
                {
                    language: 'typescript',
                    label: `TypeScript`
                }
            ],
            {
                placeHolder: '请选择语言'
            }
        )) || {};
    const ext = jsxExtension[language];

    //

    type CreateType = {
        type: 'folder' | 'file';
        label: string;
    };
    const { type: createType } =
        (await vscode.window.showQuickPick<CreateType>(
            [
                {
                    type: 'folder',
                    label: `创建到子文件夹中 (./${name}/index.${ext})`
                },
                {
                    type: 'file',
                    label: `创建到当前文件夹中 (./${name}.${ext})`
                }
            ],
            {
                placeHolder: '请选择创建方式'
            }
        )) || {};

    //

    const templates = {
        jsx: vscode.Uri.file(
            path.resolve(
                __dirname,
                '..',
                `templates/${componentType}-${language}/index.${ext}`
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
        .replace(/'NEED_CHANGE_IMPORT_STYLES'/g, `'${needChange.importStyle}'`);
    fs.writeFileSync(newFiles.jsx.fsPath, contentJSX, 'utf-8');
};
