import React from 'react'
import { SchemaTypes } from '../../Helper/Extraproperties';

export default function Addproperty(props) {
    var controlProps = {
        required: props.data.item.required,
        placeholder: props.data.item.displayName,
        onChange: (e) => {
            props.onChange({ name: props.data.item.name, value: e.target.value });
        },
    };
    switch (props.data.item.type) {
        case SchemaTypes.String:
            controlProps.type = SchemaTypes.String;
            break;
        case SchemaTypes.Number:
            controlProps.type = SchemaTypes.Number;
            break;
        case SchemaTypes.DATE:
            controlProps.type = SchemaTypes.DATE;
            break;
        case SchemaTypes.DROP_DOWN:
            controlProps.type = SchemaTypes.DROP_DOWN;
            break;
        case SchemaTypes.checkbox:
            controlProps.type = SchemaTypes.checkbox;
            break;
        case SchemaTypes.headline:
            controlProps.type = SchemaTypes.headline;
            break;
        case SchemaTypes.IMAGE:
            controlProps.type = SchemaTypes.IMAGE;
            break;
        case SchemaTypes.STD_DROPDOWN:
            controlProps.type = SchemaTypes.STD_DROPDOWN;
            break;
        case SchemaTypes.DIV_DROPDOWN:
            controlProps.type = SchemaTypes.DIV_DROPDOWN;
            break;
        case SchemaTypes.USER_LEVEL_DROPDOWN:
            controlProps.type = SchemaTypes.USER_LEVEL_DROPDOWN;
            break;
        default:
            break;
    }

    if (controlProps.type === SchemaTypes.TextArea) {
        return (
            <>
                <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                <textarea id="message" pattern={controlProps.pattern} type={props.data.item.type} onChange={controlProps.onChange} rows="10" required={controlProps.required} defaultValue={props.currentValue} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={props.data.item.displayName} >
                </textarea>
            </>
        )
    }

    return (
        <>
            <div className="relative">
                <input
                    required={controlProps.required}
                    pattern={controlProps.pattern}
                    type={props.data.item.type}
                    min={props.data.item.min}
                    onChange={controlProps.onChange}
                    className="border mt-4 mb-4 text-white text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 "
                    placeholder={props.data.item.displayName}
                    defaultValue={props.currentValue}
                />
            </div>
        </>
    )
}
