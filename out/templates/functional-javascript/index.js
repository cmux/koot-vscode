
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const koot_1 = require("koot");
const NEED_CHANGE_IMPORT_STYLES_1 = require("NEED_CHANGE_IMPORT_STYLES");
// Functional Component =======================================================
const NEED_CHANGE_COMPONENT_NAME = koot_1.extend({
    styles: NEED_CHANGE_IMPORT_STYLES_1.default
})(({ className, children, customProps, 'data-class-name': dataClassName }) => {
    return (<div className={className} data-custom-props={customProps} data-class-name={dataClassName}>
                <p>Hello world!</p>
                {children}
            </div>);
});
exports.default = NEED_CHANGE_COMPONENT_NAME;
//# sourceMappingURL=index.js.map