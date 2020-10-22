import { window } from 'vscode';
import { Language } from '../extension';
import jsxExtension from '../commons/jsx-extensions';

type CreateType = 'folder' | 'file';
type QuickPickCreateType = {
    type: 'folder' | 'file';
    label: string;
};

export default async (
    componentName: string,
    language: Language
): Promise<CreateType> => {
    const { type } =
        (await window.showQuickPick<QuickPickCreateType>(
            [
                {
                    type: 'folder',
                    label: `创建到子文件夹中 (./${componentName}/index.${jsxExtension[language]})`,
                },
                {
                    type: 'file',
                    label: `创建到当前文件夹中 (./${componentName}.${jsxExtension[language]})`,
                },
            ],
            {
                placeHolder: '请选择创建方式',
            }
        )) || {};

    if (typeof type === 'undefined') throw new Error('NO_INPUT:CREATE_TYPE');

    return type;
};
