import React from 'react';
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
class NEED_CHANGE_COMPONENT_NAME extends React.Component<
    ComponentProps & ExtendedProps
> {
    render(): JSX.Element {
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
