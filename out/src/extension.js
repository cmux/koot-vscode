
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

const fs = vscode.workspace.fs;
const jsxExtension = {
    javascript: 'jsx',
    typescript: 'tsx'
};
function activate(context) {
    const commandNewComponent = vscode.commands.registerCommand('extension.kootNewComponent', newComponent);
    context.subscriptions.push(commandNewComponent);
    // const commandNewComponentTS = vscode.commands.registerCommand(
    //     'extension.kootNewComponentTS',
    //     () => {
    //         vscode.window.showInformationMessage('New Component (TypeScript)');
    //     }
    // );
    // context.subscriptions.push(commandNewComponentTS);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
    //
}
exports.deactivate = deactivate;
const newComponent = (uri) => __awaiter(void 0, void 0, void 0, function* () {
    const name = (yield vscode.window.showInputBox({
        prompt: '请输入组件名'
    })) || '';
    const { type: componentType } = (yield vscode.window.showQuickPick([
        {
            type: 'class',
            label: `类 (Class)`
        },
        {
            type: 'functional',
            label: `函数组件 (Functional Component)`
        }
    ], {
        placeHolder: '请选择组件类型'
    })) || {};
    const { language = 'javascript' } = (yield vscode.window.showQuickPick([
        {
            language: 'javascript',
            label: `JavaScript`
        },
        {
            language: 'typescript',
            label: `TypeScript`
        }
    ], {
        placeHolder: '请选择语言'
    })) || {};
    const ext = jsxExtension[language];
    const { type: createType } = (yield vscode.window.showQuickPick([
        {
            type: 'folder',
            label: `创建到子文件夹中 (./${name}/index.${ext})`
        },
        {
            type: 'file',
            label: `创建到当前文件夹中 (./${name}.${ext})`
        }
    ], {
        placeHolder: '请选择创建方式'
    })) || {};
    //
    const templates = {
        jsx: vscode.Uri.file(path.resolve(__dirname, '..', `templates/${componentType}-${language}/index.${ext}`)),
        styles: vscode.Uri.file(path.resolve(__dirname, '..', `templates/styles.less`))
    };
    console.log(templates);
    const newFiles = {};
    switch (createType) {
        case 'folder': {
            const newFolder = vscode.Uri.file(`${uri.path}/${name}`);
            newFiles.jsx = vscode.Uri.file(`${newFolder.path}/index.${ext}`);
            newFiles.styles = vscode.Uri.file(`${newFolder.path}/index.module.less`);
            yield fs.createDirectory(newFolder);
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
    yield fs.copy(templates.jsx, newFiles.jsx);
    yield fs.copy(templates.styles, newFiles.styles);
    // 修改文件内容
    const needChange = {
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
    const contentJSX = yield fs.readFile(newFiles.jsx);
    console.log(contentJSX);
});
//# sourceMappingURL=extension.js.map