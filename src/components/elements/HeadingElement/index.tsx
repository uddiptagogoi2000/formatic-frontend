import { useReducer, useRef } from "react";
import withConfig from "../../hoc/withConfig";
import { ElementPropertiesByCategory } from "../../../contexts/formContext";
import "./styles.css";

function len(text: string) {
  return text.length;
}

const IS_HEADING_EMPTY = "isHeadingEmpty";
const IS_SUBHEADING_EMPTY = "isSubHeadingEmpty";

type State = {
  [IS_HEADING_EMPTY]: boolean;
  [IS_SUBHEADING_EMPTY]: boolean;
};

type Payload = {
  innerText: string;
  prop: typeof IS_HEADING_EMPTY | typeof IS_SUBHEADING_EMPTY;
};

type Action = {
  type: "input_changed";
  payload: Payload;
};

function reducer(state: State, action: Action): State {
  if (action.type === "input_changed") {
    const innerText = action.payload.innerText;
    const prop = action.payload.prop;

    if (len(innerText) === 0) {
      return {
        ...state,
        [prop]: true,
      };
    } else {
      return {
        ...state,
        [prop]: false,
      };
    }
  }

  return state;
}

type ElementProps = {
  elementProperties: ElementPropertiesByCategory;
};

export enum Category {
  GENERAL = "general",
}

export enum States {
  HEADING_TEXT = "headingText",
  SUBHEADING_TEXT = "subheadingText",
  HEADING_SIZE = "headingSize",
}

const HeadingElement = ({ elementProperties }: ElementProps) => {
  // todo: make it rich text editable

  const contentEditableDivRef = useRef(null);

  const initialState: State = {
    [IS_HEADING_EMPTY]: false,
    [IS_SUBHEADING_EMPTY]: true,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { isHeadingEmpty, isSubHeadingEmpty } = state;

  // elementProperties[GENERAL].states[HEADING_TEXT]
  // elementProperties[GENERAL].states[SUBHEADING_TEXT]
  // elementProperties[GENERAL].states[HEADING_SIZE]

  const { GENERAL } = Category;
  const { HEADING_TEXT, SUBHEADING_TEXT } = States;

  return (
    <div ref={contentEditableDivRef} className='heading-element'>
      <h2
        contentEditable='plaintext-only'
        suppressContentEditableWarning
        className={`heading-element__heading editable ${
          isHeadingEmpty ? "inlineEditEmpty" : ""
        }`}
        data-placeholder='Type a header'
        onInput={(e) => {
          const target = e.target as HTMLElement;
          dispatch({
            type: "input_changed",
            payload: {
              innerText: target.innerText,
              prop: IS_HEADING_EMPTY,
            },
          });
        }}
      >
        {elementProperties[GENERAL].states[HEADING_TEXT]}
      </h2>
      <div
        contentEditable='plaintext-only'
        suppressContentEditableWarning
        className={`heading-element__subheading editable ${
          isSubHeadingEmpty ? "inlineEditEmpty" : ""
        }`}
        data-placeholder='Type a subheader'
        onInput={(e) => {
          const target = e.target as HTMLElement;
          dispatch({
            type: "input_changed",
            payload: {
              innerText: target.innerText,
              prop: IS_SUBHEADING_EMPTY,
            },
          });
        }}
      >
        {elementProperties[GENERAL].states[SUBHEADING_TEXT]}
      </div>
    </div>
  );
};

export default withConfig(HeadingElement);
