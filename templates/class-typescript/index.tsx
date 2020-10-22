import NEED_CHANGE_REACT_IMPORT_COMMA{ ReactNode, NEED_CHANGE_COMPONENT_TYPE } from 'react';
import { extend, ExtendedProps } from 'koot';

import styles from 'NEED_CHANGE_IMPORT_STYLES';

// ============================================================================

interface ComponentProps {
    customProps?: string;
}

// Component Class ============================================================

@extend({
    /* NEED_CHANGE_ALL_EXTEND_OPTIONS_IN_COMMENTED */
    styles
})
class NEED_CHANGE_COMPONENT_NAME extends NEED_CHANGE_COMPONENT_TYPE<
    ExtendedProps & ComponentProps
> {
    render(): ReactNode {
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
