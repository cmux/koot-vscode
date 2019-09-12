import { window } from 'vscode';

type ComponentType = 'class' | 'functional';
type QuickPickComponentType = {
    type: ComponentType;
    label: string;
};

export default async (): Promise<ComponentType> => {
    const { type } =
        (await window.showQuickPick<QuickPickComponentType>(
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

    if (typeof type === 'undefined') throw new Error('NO_INPUT:COMPONENT_TYPE');

    return type;
};
