import React from 'react';
import { extend } from 'koot';

import styles from 'NEED_CHANGE_IMPORT_STYLES';

// Functional Component =======================================================

const NEED_CHANGE_COMPONENT_NAME = extend({
    styles
})(({ className, children, customProps, 'data-class-name': dataClassName }) => {
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
});

export default NEED_CHANGE_COMPONENT_NAME;
