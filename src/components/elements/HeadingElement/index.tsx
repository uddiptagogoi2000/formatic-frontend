import { useReducer, useRef } from "react";

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

const HeadingElement = () => {
  // todo: make it rich text editable

  const contentEditableDivRef = useRef(null);

  const initialState: State = {
    [IS_HEADING_EMPTY]: false,
    [IS_SUBHEADING_EMPTY]: true,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { isHeadingEmpty, isSubHeadingEmpty } = state;

  const defaultHeadingText = "Heading";

  return (
    <div ref={contentEditableDivRef}>
      <h2
        contentEditable='plaintext-only'
        suppressContentEditableWarning
        className={`editable ${isHeadingEmpty ? "inlineEditEmpty" : ""}`}
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
        {defaultHeadingText}
      </h2>
      <div
        contentEditable='plaintext-only'
        suppressContentEditableWarning
        className={`editable ${isSubHeadingEmpty ? "inlineEditEmpty" : ""}`}
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
      ></div>
    </div>
  );
};

export { HeadingElement };
