var __awaiter =
    (this && this.__awaiter) ||
    function(thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function(resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator['throw'](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : adopt(result.value).then(fulfilled, rejected);
            }
            step(
                (generator = generator.apply(thisArg, _arguments || [])).next()
            );
        });
    };
Object.defineProperty(exports, '__esModule', { value: true });
const vscode = require('vscode');

function prompt(
    options = {
        type: 'input'
    }
) {
    return __awaiter(this, void 0, void 0, function*() {
        if (options.type === 'input') {
            return (
                (yield vscode.window.showInputBox({
                    prompt: options.prompt
                })) || ''
            );
        }
        if (options.type === 'select' && Array.isArray(options.items)) {
            if (typeof options.items[0] === 'string') {
                return (
                    (yield vscode.window.showQuickPick(options.items, {
                        placeHolder: '请选择组件类型'
                    })) || ''
                );
            } else {
                return (
                    (yield vscode.window.showQuickPick(options.items, {
                        placeHolder: '请选择组件类型'
                    })) || ''
                );
            }
        }
        return '';
    });
}
exports.default = prompt;
//# sourceMappingURL=prompt.js.map
