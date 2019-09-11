import { window } from 'vscode';
import { Language } from '../extension';

type QuickPickLanguage = {
    language: Language;
    label: string;
};

export default async (): Promise<Language> => {
    const { language = 'javascript' } =
        (await window.showQuickPick<QuickPickLanguage>(
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

    return language;
};
