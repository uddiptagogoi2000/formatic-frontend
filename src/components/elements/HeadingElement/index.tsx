import { useEffect, useReducer, useRef, useState } from "react";
import withConfig from "../../hoc/withConfig";
import "./styles.css";
import {
  Element as ElementDetails,
  Property,
  TextProperty,
} from "../../../contexts/apptypes";
import { useFormContext } from "../../../contexts/formContext";

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

const useHeadingElementValues = (
  details: ElementDetails
): {
  headingTextProperty: TextProperty;
  subHeadingTextProperty: TextProperty;
} => {
  let headingTextProperty: TextProperty | undefined = undefined;
  let subHeadingTextProperty: TextProperty | undefined = undefined;

  details.properties.forEach((property) => {
    if (property.name === "Heading Text" && property.type === "text") {
      // todo: make the strings Variables or Enums
      headingTextProperty = property;
    }

    if (property.name === "Subheading Text" && property.type === "text") {
      subHeadingTextProperty = property;
    }
  });

  if (!headingTextProperty) {
    throw new Error("Heading Text property not found");
  }

  if (!subHeadingTextProperty) {
    throw new Error("Subheading Text property not found");
  }

  return { headingTextProperty, subHeadingTextProperty };
};

// function setCaretPosition(element, position) {
//   const range = document.createRange();
//   const selection = window.getSelection();
//   range.setStart(element.childNodes[0], position);
//   range.collapse(true);
//   selection.removeAllRanges();
//   selection.addRange(range);
// }

// let's write it in typescript

const HeadingElement = ({
  elementDetails,
  isSelected,
}: HeadingElementProps) => {
  // todo: make it rich text editable

  const contentEditableDivRef = useRef(null);
  const headingTextRef = useRef(null);
  const subHeadingTextRef = useRef(null);
  const { onUpdateElement, state } = useFormContext();
  // dummy: const updateElement = useContext(formContext)
  const { headingTextProperty, subHeadingTextProperty } =
    useHeadingElementValues(elementDetails);

  // console.log("headingText", headingText);
  // console.log("subHeadingText", subHeadingText);

  const [headingTextState, setHeadingTextState] = useState(
    headingTextProperty.value
  );
  const [subHeadingTextState, setSubHeadingTextState] = useState(
    subHeadingTextProperty.value
  );

  const headingTextValueRef = useRef("");
  const subHeadingTextValueRef = useRef("");

  // console.log("headingTextState", headingTextState);
  // console.log("subHeadingTextState", subHeadingTextState);

  // const isHeadingEmpty = len(headingTextState) === 0;
  // const isSubHeadingEmpty = len(subHeadingTextState) === 0;

  // const initialState: State = {
  //   [IS_HEADING_EMPTY]: headingText.length === 0,
  //   [IS_SUBHEADING_EMPTY]: subHeadingText.length === 0,
  // };

  // const [state, dispatch] = useReducer(reducer, initialState);
  // const { isHeadingEmpty, isSubHeadingEmpty } = state;

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

  // console.log("iscurrentlySelected", elementDetails.id, isSelected);
  // console.log("isPreviouslySelected", elementDetails.id, isPreviouslySelected);

  function handleClickOutside(event: MouseEvent) {
    // if (headingTextRef.current !== event.target) {
    //   console.log("You clicked outside");
    //   onUpdateElement(elementDetails.pageId, elementDetails.id, {
    //     ...headingTextProperty,
    //     value: headingTextState,
    //   });
    // }
    if (headingTextRef.current !== event.target && isSelected) {
      console.log(
        "You clicked outside, here we are",
        "heading of element",
        elementDetails.id
      );
      onUpdateElement(elementDetails.pageId, elementDetails.id, {
        ...headingTextProperty,
        value: headingTextState,
      });
    }
    if (subHeadingTextRef.current !== event.target && isSelected) {
      console.log(
        "You clicked outside, here we are",
        "subheading of element",
        elementDetails.id
      );
      onUpdateElement(elementDetails.pageId, elementDetails.id, {
        ...subHeadingTextProperty,
        value: subHeadingTextState,
      });
    }
  }

  useEffect(() => {
    headingTextValueRef.current = headingTextState;
  }, [headingTextState]);

  useEffect(() => {
    subHeadingTextValueRef.current = subHeadingTextState;
  }, [subHeadingTextState]);

  useEffect(() => {
    if (isSelected) {
      console.log("adding event listener of ", elementDetails.id);
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      console.log("removing event listener of ", elementDetails.id);
      document.removeEventListener("click", handleClickOutside);

      const elementId = elementDetails.id;
      const pageId = elementDetails.pageId;

      if (isSelected) {
        onUpdateElement(pageId, elementId, {
          ...headingTextProperty,
          value: headingTextValueRef.current,
        });
        onUpdateElement(pageId, elementId, {
          ...subHeadingTextProperty,
          value: subHeadingTextValueRef.current,
        });
      }
    };
  }, [isSelected]);

  useEffect(() => {
    if (isSelected) {
      console.log("adding event listener for when typing", elementDetails.id);
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      console.log("removing event listener for when typing", elementDetails.id);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isSelected, headingTextState, subHeadingTextState]);

  useEffect(() => {
    setHeadingTextState(headingTextProperty.value);
    setSubHeadingTextState(subHeadingTextProperty.value);
  }, [subHeadingTextProperty.value, headingTextProperty.value]);

  // useEffect(() => {
  //   dispatch({
  //     type: "input_changed",
  //     payload: {
  //       innerText: headingText,
  //       prop: IS_HEADING_EMPTY,
  //     },
  //   });
  // }, [headingText]);

  // useEffect(() => {
  //   dispatch({
  //     type: "input_changed",
  //     payload: {
  //       innerText: subHeadingText,
  //       prop: IS_SUBHEADING_EMPTY,
  //     },
  //   });
  // }, [subHeadingText]);

  // useEffect(() => {
  //   if (subHeadingTextRef.current !== null) {
  //     const subHeadingTextElement = subHeadingTextRef.current as HTMLElement;

  //     subHeadingTextElement.innerText = subHeadingText;
  //   }
  // }, [subHeadingText]);

  // console.log("rendering", elementDetails.properties);

  return (
    <div ref={contentEditableDivRef} className='heading-element element'>
      <h2
        spellCheck='false'
        // ref={headingTextRef}
        // contentEditable='plaintext-only'
        suppressContentEditableWarning
        className={`heading-element__heading editable`}
        data-placeholder='Type a header'
        // onInput={(e) => {
        //   const target = e.target as HTMLElement;
        //   dispatch({
        //     type: "input_changed",
        //     payload: {
        //       innerText: target.innerText,
        //       prop: IS_HEADING_EMPTY,
        //     },
        //   });
        // }}

        // onInput={(e) => {
        //   setHeadingTextState(e.currentTarget.innerText);
        //   setCaretPosition(e.currentTarget, len(e.currentTarget.innerText));
        // }}
      >
        {/* {headingTextState} */}
        <input
          type='text'
          value={headingTextState}
          ref={headingTextRef}
          placeholder='Type a header'
          onChange={(e) => {
            setHeadingTextState(e.target.value);
          }}
        />
      </h2>
      <div
        // style={{
        //   border: "1px solid black",
        // }}
        spellCheck='false'
        // ref={subHeadingTextRef}
        // contentEditable='plaintext-only'
        suppressContentEditableWarning
        className={`heading-element__subheading editable`}
        data-placeholder='Type a subheader'
        // data-value={subHeadingText}
        // onInput={(e) => {
        //   const target = e.target as HTMLElement;
        //   dispatch({
        //     type: "input_changed",
        //     payload: {
        //       innerText: target.innerText,
        //       prop: IS_SUBHEADING_EMPTY,
        //     },
        //   });
        // }}

        // onInput={(e) => {
        //   setSubHeadingTextState(e.currentTarget.innerText);
        //   setCaretPosition(e.currentTarget, len(e.currentTarget.innerText));
        // }}
      >
        {/* {subHeadingTextState} */}
        <input
          type='text'
          value={subHeadingTextState}
          ref={subHeadingTextRef}
          placeholder='Type a subheader'
          onChange={(e) => {
            setSubHeadingTextState(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default withConfig(HeadingElement);
