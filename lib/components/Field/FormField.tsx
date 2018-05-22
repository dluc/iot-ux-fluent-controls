import * as React from 'react';
import * as classNames from 'classnames/bind';
import {DivProps, LabelProps, Elements as Attr} from '../../Attributes';
import {MethodNode} from '../../Common';
import {HorizontalLoader} from '../Loader';
import {FormLabel, FormLabelAttributes} from './FormLabel';
import {FormError, FormErrorAttributes} from './FormError';
import { BalloonPosition, BalloonAlignment } from '../Balloon';
const css = classNames.bind(require('./Field.scss'));

export interface FormFieldType {}

export interface FormFieldAttributes {
    fieldContainer?: DivProps;
    fieldLabel?: FormLabelAttributes;
    fieldContent?: DivProps;
    fieldError?: DivProps;
    fieldTooltip?: {
        balloonPosition?: BalloonPosition;
        balloonAlignment?: BalloonAlignment;
    };
}

export interface FormFieldProps extends React.Props<FormFieldType> {
    /** HTML element name for label accessibility */
    name: string;
    /** Label to display above input element */
    label?: MethodNode;
    /** Error to display below input element */
    error?: MethodNode;
    /** Error HTML title in case of overflow */
    errorTitle?: string;
    /** Display horizontal loading animation instead of error */
    loading?: boolean;
    /** Appends a red asterisk to the label if it is a string */
    required?: boolean;
    /** Set error field to display: none */
    hideError?: boolean;
    /** Tooltip text to display in info icon bubble */
    tooltip?: MethodNode;
    /** Classname to append to top level element */
    className?: string;
    /** Classname to append to top level error element */
    errorClassName?: string;

    attr?: FormFieldAttributes;
}

/**
 * High level generic form field
 *
 * @param props Control properties (defined in `FormFieldProps` interface)
 */
export const FormField: React.StatelessComponent<FormFieldProps> = (props: FormFieldProps) => {
    const containerClass = css('input-container', {
        'input-error': !!props.error,
        'required': props.required && typeof(props.label) === 'string',
    }, props.className);

    let error = props.error;
    if (props.loading) {
        error = <HorizontalLoader dots={6} />;
    }

    return (
        <Attr.div className={containerClass} attr={props.attr.fieldContainer}>
            {(!!props.label) && <FormLabel
                name={props.name}
                icon='info'
                balloon={props.tooltip}
                attr={props.attr.fieldLabel}
                required={props.required}
                {...props.attr.fieldTooltip}
            >
                {props.label}
            </FormLabel>}
            <Attr.div className={css('content')} attr={props.attr.fieldContent}>
                {props.children}
            </Attr.div>
            <FormError
                className={props.errorClassName}
                hidden={props.hideError}
                title={props.errorTitle}
                attr={{container: {
                    'aria-live': 'polite', // this tags are for screen readers to read the error when it appears
                    'aria-atomic': 'true',
                    ...props.attr.fieldError }
                }}
            >
                {error}
            </FormError>
        </Attr.div>
    );
};

FormField.defaultProps = {
    name: undefined,
    label: undefined,
    loading: false,
    hideError: false,
    attr: {
        fieldContainer: {},
        fieldLabel: {},
        fieldContent: {},
        fieldError: {},
    }
};

export default FormField;
