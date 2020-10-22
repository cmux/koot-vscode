import NEED_CHANGE_REACT_IMPORT_COMMA{ NEED_CHANGE_COMPONENT_TYPE } from 'react';
import { extend } from 'koot';

import styles from 'NEED_CHANGE_IMPORT_STYLES';

// Component Class ============================================================

@extend({
    /* NEED_CHANGE_ALL_EXTEND_OPTIONS_IN_COMMENTED */
    styles
})
class NEED_CHANGE_COMPONENT_NAME extends NEED_CHANGE_COMPONENT_TYPE {
    render() {
        return (
            <div
                className={this.props.className}
                data-custom-props={this.props.customProps}
                data-class-name={this.props['data-class-name']}
            >
                <p>Hello world!</p>
                {this.props.children}
            </div>
        );
    }
}

export default NEED_CHANGE_COMPONENT_NAME;
