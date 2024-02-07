import React from "react";
import { useReducer, useRef, useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deepCopyObject } from "../../Helper/helper";
import { useNavigate } from "react-router-dom";
import Addproperty from "./Addproperty";
import Button from "./Button";
import LoadingSpinner from "./LoadingSpinner";

const ADD_PROPS_TYPE = "Add_Property";
const REMOVE_PROPS_TYPE = "Remove_Property";

const reducer = (state, action) => {
  var currentState = deepCopyObject(state);

  switch (action.type) {
    case ADD_PROPS_TYPE:
      currentState[action.payload.name] = action.payload.value;
      break;
    case REMOVE_PROPS_TYPE:
      delete currentState[action.payload];
      break;
    default:
  }

  return currentState;
};

export default function ChangeEndpoints({
  isUpdateForm,
  formName,
  currentData,
  querryFunction,
  propertyList,
  queryKeyValue,
  navigateTo,
  setSelectedItem
}) {
  const queryClient = useQueryClient();
  const [state, dispatch] = useReducer(reducer, currentData);
  const [verify, setVerify] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef();

  const { data, isLoading, error, mutate } = useMutation(
    async () => await querryFunction(state),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey.includes(queryKeyValue),
        });
      },
    }
  );

  const handleDelete = (data) => {
    formRef.current.reset();
    dispatch({ type: REMOVE_PROPS_TYPE, payload: data });
  }

  const Onchange = (e) => {
    dispatch({ type: ADD_PROPS_TYPE, payload: e });
  }

  const GetCurrentValue = (data) => {
    return state[data.item.name]
  }

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === true) {
      setVerify(true);
    }
  };


  const handleRedirect = () => {
    navigate(navigateTo);
  };

  var singleProps = [];

  propertyList.forEach((data) => {
    singleProps.push(data);
  });

  if (isLoading) {
    return (
      <div className="flex w-full h-full justify-center items-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (error && error !== "") {
    return (
      <div className="flex flex-col gap-2 w-full p-2">
        <div className="p-4 mb-4 text-sm text-white text-center rounded-lg bg-gray-700" role="alert">
          {error || error.message}
        </div>
        <div className="w-full">
          <button onClick={() => handleRedirect()}>
            Ok
          </button>
        </div>
      </div>

    );
  }

  if (data) {
    return (
      <div className="flex flex-col p-2">
        <div className="p-4 mb-4 text-sm text-white text-center rounded-lg bg-gray-700" role="alert">
          SuccessFully Added !!
        </div>
        <div className="flex w-full justify-center">
          <Button
            autofocus
            type="button"
            onPress={handleRedirect}
            buttonName={"Ok"}
          />
        </div>
      </div>
    )
  }

  if (verify) {
    return (
      <>
        <div className="flex h-full w-full items-center justify-center">
          <div className="relative p-4">
            <div className="relative rounded-lg shadow bg-gray-700">
              <div className="p-6">
                <h3 className="mb-5 mt-3 text-center text-md font-normal text-white">Are You Sure ?</h3>
                <div className="flex w-full mt-4">
                  <button autoFocus onClick={() => {
                    setVerify(false)
                    mutate()
                  }}
                    data-modal-hide="popup-modal"
                    type="button"
                    className="w-1/2 text-white bg-primary-800 hover:bg-primary-700 focus:ring-primary-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => handleRedirect()}
                    data-modal-hide="popup-modal"
                    type="button"
                    className="w-1/2 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 "
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="m-2">
      <form
        onSubmit={handleSubmit}
        ref={formRef}
        data-te-validation-init
        className="flex flex-col gap-4"
      >
        <div className="w-full flex justify-center items-center">
          <p>{formName}</p>
        </div>
        {singleProps.map((data, index) => {
          return (
            <Addproperty
              isUpdateForm={isUpdateForm}
              deleteField={(element) => {
                handleDelete(element, data);
              }}
              key={index}
              data={data}
              currentValue={GetCurrentValue(data)}
              onChange={(e) => {
                Onchange(e, data)
              }}
            />
          );
        })}
        <div className="flex w-full gap-2">
          {
            setSelectedItem &&
            <button onClick={() => setSelectedItem(undefined)}
              className="w-1/2 items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
              Back
            </button>
          }
          <button type="submit" className={`${!setSelectedItem ? 'w-full' : 'w-1/2'} items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300`}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
