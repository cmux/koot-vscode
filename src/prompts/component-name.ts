import { window } from 'vscode';

export default async (): Promise<string> => {
    const result = await window.showInputBox({
        prompt: '请输入组件名'
    });

    if (typeof result === 'undefined' || result === '')
        throw new Error('NO_INPUT:COMPONENT_NAME');

    return result;
};
