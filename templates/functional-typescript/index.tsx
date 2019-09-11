import React from 'react';
import { extend } from 'koot';

import styles from 'NEED_CHANGE_IMPORT_STYLES';

// ============================================================================

interface ComponentProps {
    customProps?: string;
}

// Functional Component =======================================================

const NEED_CHANGE_COMPONENT_NAME = extend<ComponentProps>({
    /* NEED_CHANGE_ALL_EXTEND_OPTIONS_IN_COMMENTED */
    styles
})(
    ({
        className,
        children,
        customProps,
        'data-class-name': dataClassName
    }): JSX.Element => {
        return (
            <div
                className={className}
                data-custom-props={customProps}
                data-class-name={dataClassName}
            >
                <p>Hello world!</p>
                {children}
            </div>
        );
    }
);

export default NEED_CHANGE_COMPONENT_NAME;
