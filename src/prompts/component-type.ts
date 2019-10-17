import { window } from 'vscode';

type ComponentType = 'class' | 'class-pure' | 'functional' | 'functional-memo';
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
                    type: 'class-pure',
                    label: `类 (Class) - PureComponent`
                },
                {
                    type: 'functional',
                    label: `函数组件 (Functional Component)`
                },
                {
                    type: 'functional-memo',
                    label: `函数组件 (Functional Component) - memo`
                }
            ],
            {
                placeHolder: '请选择组件类型'
            }
        )) || {};

    if (typeof type === 'undefined') throw new Error('NO_INPUT:COMPONENT_TYPE');

    return type;
};
