import { createContext, useContext, useReducer } from "react";
import { Form, Property } from "./apptypes";

const formContext = createContext<{
  state: FormState;
  onUpdateElement: (
    pageId: number,
    elementId: number,
    property: Property
  ) => void;
  onSelectElement: (elementId: number) => void;
  onDeselectElement: () => void;
} | null>(null);

// interface HeadingElement extends Element {}

// interface HeadingProperty {}

// export interface TextInput extends Input {}
// export interface RadioButtonGroup extends Input {
//   options: string[];
//   defaultValue: string;
// }
// export interface TextInputGroup extends Input {}
// export interface Checkbox extends Input {}
// export interface TextArea extends Input {}
// export interface Switch extends Input {}

// interface Form {
//   sections: FormSection[];
// }

// interface FormSection {
//   id: number;
//   elements: ElementDetails[];
// }

// export interface ElementDetails {
//   id: number;
//   properties: ElementPropertiesByCategory;
// }

// export interface ElementPropertiesByCategory {
//   [key: string]: ElementProperties;
// }

// export interface ElementProperties {
//   fields: Field[];
//   states: {
//     [key: string]: string;
//   };
// }

// type Field = TextField | RadioGroupField;

// interface BaseField {
//   label: string;
//   description?: string;
// }

// interface TextField extends BaseField {
//   type: "text";
//   value?: string;
// }

// interface RadioGroupField extends BaseField {
//   type: "radio-group";
//   defaultValue: string;
//   options: string[];
// }

// let headingElement:HeadingElement = {
//   properties: []
// }

// let formSection: FormSection = {
//   elements: [
//     headingElement
//   ]
// }

type Event =
  | "UPDATE_ELEMENT"
  | "REMOVE_ELEMENT"
  | "REMOVE_PAGE"
  | "ADD_PAGE"
  | "ADD_ELEMENT"
  | "SELECT_ELEMENT"
  | "DESELECT_ELEMENT";

type FormAction = BaseAction | UpdateElementAction;

interface BaseAction {
  type: Event;
  payload: object | null;
}

interface UpdateElementAction extends BaseAction {
  type: "UPDATE_ELEMENT";
  payload: {
    pageId: number;
    elementId: number;
    property: Property;
  };
}

interface SelectElementAction extends BaseAction {
  type: "SELECT_ELEMENT";
  payload: {
    elementId: number;
  };
}

type FormState = {
  form: Form;
  selectedElementId: number | null;
};

function formReducer(state: FormState, action: FormAction) {
  switch (action.type) {
    case "UPDATE_ELEMENT": {
      const { pageId, elementId, property } =
        action.payload as UpdateElementAction["payload"];

      const updatedForm = { ...state.form };

      const page = updatedForm.pages.find((page) => page.id === pageId);
      if (!page) {
        return state;
      }

      const element = page.elements.find((element) => element.id === elementId);
      if (!element) {
        return state;
      }

      const updatedElement = { ...element };

      updatedElement.properties = updatedElement.properties.map((prop) => {
        if (prop.id === property.id) {
          return property;
        }
        return prop;
      });

      return state;
    }

    case "SELECT_ELEMENT": {
      const { elementId } = action.payload as SelectElementAction["payload"];
      console.log("called select element", elementId);

      return {
        ...state,
        selectedElementId: elementId,
      };
    }

    case "DESELECT_ELEMENT": {
      return {
        ...state,
        selectedElementId: null,
      };
    }

    default: {
      return state;
    }
  }
}

interface FormContextProviderProps {
  children: React.ReactNode;
}

const initialFormState: FormState = {
  form: {
    id: 1,
    name: "Form",
    createdAt: "",
    updatedAt: "",
    pages: [
      {
        id: 1,
        name: "Page",
        formId: 1,
        createdAt: "",
        updatedAt: "",
        elements: [
          {
            id: 1,
            name: "Element",
            pageId: 1,
            createdAt: "",
            updatedAt: "",
            order: 1,
            properties: [
              {
                category: "general",
                id: 1,
                name: "Heading Text",
                type: "text",
                value: "Heading2",
              },
              {
                category: "general",
                id: 2,
                name: "Subheading Text",
                type: "text",
                value: "",
              },
              // {
              //   category: "general",
              //   id: 3,
              //   name: "Heading Size",
              //   type: "radio-group",
              //   value: "default",
              //   options: ["default", "large", "small"],
              // }
            ],
          },
        ],
      },
    ],
  },
  selectedElementId: null,
};

export const FormContextProvider = ({ children }: FormContextProviderProps) => {
  const [state, dispatch] = useReducer(
    formReducer,
    initialFormState as FormState
  );

  function handleUpdateElement(
    pageId: number,
    elementId: number,
    property: Property
  ) {
    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        pageId,
        elementId,
        property,
      },
    });
  }

  function handleSelectElement(elementId: number) {
    dispatch({
      type: "SELECT_ELEMENT",
      payload: {
        elementId,
      },
    });
  }

  function handleDeselectElement() {
    dispatch({
      type: "DESELECT_ELEMENT",
      payload: null,
    });
  }

  return (
    <formContext.Provider
      value={{
        state,
        onUpdateElement: handleUpdateElement,
        onSelectElement: handleSelectElement,
        onDeselectElement: handleDeselectElement,
      }}
    >
      {children}
    </formContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(formContext);

  if (!context) {
    throw new Error("useFormContext must be used within a FormContextProvider");
  }

  return context;
};
