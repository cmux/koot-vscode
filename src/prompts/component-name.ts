import { window } from 'vscode';

export default async (): Promise<string> =>
    (await window.showInputBox({
        prompt: '请输入组件名'
    })) || '';
