import React, { useContext } from 'react'
import CreatableSelect from 'react-select/creatable';
import { PEOPLE, endpoints } from '../../FirebaseHelpers/ApiInterface';
import { AuthContext } from '../../Auth';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from './LoadingSpinner';
import { getCapacity } from '../../Helper/helper';

export default function GenericDropDown({ props, controlProps, isUpdateForm }) {
    const currentAuthContext = useContext(AuthContext);

    const queryKey = [currentAuthContext.currentUserObject.uid, props.data.item.queryKey, PEOPLE]

    const getPeopleCount = async (key, value) => await endpoints.people.getCount(key, "==", value.toString());

    const queryFunction = async () => {
        var data = await endpoints[props.data.item.queryKey].getAllDocument();

        var key = props.data.item.DatabaseKey

        const filterData = []

        for (const item of data) {
            item.count = await getPeopleCount(key, item[key])
            if (parseInt(item.count) < parseInt(getCapacity(item))) filterData.push(item);
        }

        return filterData;
    };

    const handleRedirect = () => {
        navigator('/');
    };

    const { data, isLoading, error } = useQuery(queryKey, queryFunction)

    if (isLoading) {
        return (
            <div className="flex w-full h-full justify-center items-center">
                <LoadingSpinner />
            </div>
        )
    };

    if (error && error !== "") {
        return (
            <div className='flex flex-col w-full p-2'>
                <div className="p-4 mb-4 text-sm text-white text-center rounded-lg bg-gray-700" role="alert">
                    {error}
                </div>
                <div className='w-full'>
                    <button onClick={() => handleRedirect()}>
                        Ok
                    </button>
                </div>
            </div>
        );
    }

    var Data = data.map(element => {
        var labelValue = element[props.data.item.DatabaseKey]
            ? element[props.data.item.DatabaseKey]
            : 0;

        var available = parseInt(getCapacity(element)) - element.count;

        return {
            label: labelValue + ` Remaining: ` + available,
            value: element[props.data.item.DatabaseKey]
        }
    })

    let defaultValue = props.currentValue && { label: props.currentValue, value: props.currentValue }

    const selectStyles = {
        control: (base, state) => ({
            ...base,
            background: "#374151",
            color: "#FFFFFF",
            borderColor: "#FFFFFF",
            "&:hover": {
                borderColor: "#FFFFFF",
            },
        }),
        input: (base, state) => ({
            ...base,
            color: "#FFFFFF",
        }),
        menu: (base, state) => ({
            ...base,
            background: "#374151",
            color: "#FFFFFF",
        }),
        option: (base, state) => ({
            ...base,
            color: "#FFFFFF",
            background: state.isSelected ? "#4A5568" : state.isFocused ? "#4A5568" : "#374151",
            "&:hover": {
                background: "#4A5568",
            },
        }),
        singleValue: (base, state) => ({
            ...base,
            color: "#FFFFFF",
        }),
    };



    return (
        <div className="mt-4 mb-4">
            <label
                htmlFor={props.data.item.displayName}
                className="form-label h-100 max-Width-110"
            >
                {props.data.item.displayName}
            </label>
            <div className="">
                <CreatableSelect
                    styles={selectStyles}
                    placeholder="select/write"
                    createOptionPosition={props.data.addNewOption}
                    formatCreateLabel={(e) =>
                        `${e} Add new ${props.data.item.displayName}`
                    }
                    isClearable={true}
                    isValidNewOption={(inputValue, selectValue, selectOptions) => {
                        if (props.data.addNewOption) {
                            return !selectOptions.some(
                                (option) => option.label === inputValue
                            );
                        }
                    }} //that validate by addNewOption have Access to Add Option else return false by isValidNewOption
                    onChange={(selectedOption, actionType) => {
                        if (actionType.action !== "clear") {
                            controlProps.onChange({ target: selectedOption });
                        } else if (actionType.action === "clear") {
                            controlProps.onChange({ target: "" });
                        }
                    }}
                    options={Data}
                    defaultValue={[defaultValue]}
                    required={props.data.item.required}
                />
            </div>
        </div>
    );
}
