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
})(/* NNED_CHANGE_USE_MEMO_START */
    ({
        className,
        children,
        customProps,
        'data-class-name': classNameModule
    }): JSX.Element => {
        return (
            <div
                className={className}
                data-custom-props={customProps}
                data-class-name={classNameModule}
            >
                <p>Hello world!</p>
                {children}
            </div>
        );
    }
/* NNED_CHANGE_USE_MEMO_END */);

export default NEED_CHANGE_COMPONENT_NAME;
