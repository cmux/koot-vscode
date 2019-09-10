
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const koot_1 = require("koot");
const NEED_CHANGE_IMPORT_STYLES_1 = require("NEED_CHANGE_IMPORT_STYLES");
// Component Class ============================================================
let NEED_CHANGE_COMPONENT_NAME = class NEED_CHANGE_COMPONENT_NAME extends react_1.default.Component {
    render() {
        return (<div className={this.props.className} data-custom-props={this.props.customProps} data-class-name={this.props['data-class-name']}>
                <p>Hello world!</p>
                {this.props.children}
            </div>);
    }
};
NEED_CHANGE_COMPONENT_NAME = __decorate([
    koot_1.extend({
        styles: NEED_CHANGE_IMPORT_STYLES_1.default
    })
], NEED_CHANGE_COMPONENT_NAME);
exports.default = NEED_CHANGE_COMPONENT_NAME;
//# sourceMappingURL=index.js.map