import React from 'react';
import { extend } from 'koot';

import styles from 'NEED_CHANGE_IMPORT_STYLES';

// Component Class ============================================================

@extend({
    styles
})
class NEED_CHANGE_COMPONENT_NAME extends React.Component {
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
