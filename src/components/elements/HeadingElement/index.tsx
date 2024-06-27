import { useEffect, useReducer, useRef } from "react";
import withConfig from "../../hoc/withConfig";
import "./styles.css";
import { Element as ElementDetails } from "../../../contexts/apptypes";

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

// type ElementProps = {
//   elementProperties: ElementPropertiesByCategory;
//   // updateElement: () => void; or get it from formContext
// };

export enum Category {
  GENERAL = "general",
}

export enum States {
  HEADING_TEXT = "headingText",
  SUBHEADING_TEXT = "subheadingText",
  HEADING_SIZE = "headingSize",
}

type HeadingElementProps = {
  elementDetails: ElementDetails;
  isSelected: boolean;
};

const useHeadingElementValues = (details: ElementDetails) => {
  let headingText = "Heading";
  let subHeadingText = "";

  details.properties.forEach((property) => {
    if (property.name === "Heading Text" && property.type === "text") {
      // todo: make the strings Variables or Enums
      headingText = property.value;
    }

    if (property.name === "Subheading Text" && property.type === "text") {
      subHeadingText = property.value;
    }
  });

  return { headingText, subHeadingText };
};

const HeadingElement = ({
  elementDetails,
  isSelected,
}: HeadingElementProps) => {
  // todo: make it rich text editable

  const contentEditableDivRef = useRef(null);
  const headingTextRef = useRef(null);
  const subHeadingTextRef = useRef(null);
  // dummy: const updateElement = useContext(formContext)

  const initialState: State = {
    [IS_HEADING_EMPTY]: false,
    [IS_SUBHEADING_EMPTY]: true,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { isHeadingEmpty, isSubHeadingEmpty } = state;
  const { headingText, subHeadingText } =
    useHeadingElementValues(elementDetails);

  // elementProperties[GENERAL].states[HEADING_TEXT]
  // elementProperties[GENERAL].states[SUBHEADING_TEXT]
  // elementProperties[GENERAL].states[HEADING_SIZE]
  /* {elementProperties[GENERAL].states[HEADING_TEXT]} */
  // const { HEADING_TEXT, SUBHEADING_TEXT } = States;

  // let defaultHeadingText = "Heading";
  // let defaultSubHeadingText = "Subheading";

  // elementDetails.properties.forEach((property) => {
  //   if (property.name === "Heading Text" && property.type === "text") {
  //     defaultHeadingText = property.value;
  //   }

  //   if (property.name === "Subheading Text" && property.type === "text") {
  //     defaultSubHeadingText = property.value;
  //   }
  // });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (headingTextRef.current !== event.target) {
        console.log("You clicked outside");
      }
    }

    if (isSelected) {
      document.addEventListener("click", handleClickOutside);
    }

    () => {
      document.removeEventListener("click", handleClickOutside);

      // Update the element in the form context
      // send innertext of heading and subheading to the form context by calling updateElement
    };
  }, [isSelected]);

  return (
    <div ref={contentEditableDivRef} className='heading-element element'>
      <h2
        spellCheck='false'
        ref={headingTextRef}
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
        {headingText}
      </h2>
      <div
        spellCheck='false'
        ref={subHeadingTextRef}
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
        {subHeadingText}
      </div>
    </div>
  );
};

export default withConfig(HeadingElement);
