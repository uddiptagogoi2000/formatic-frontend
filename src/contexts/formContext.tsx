import { createContext, useReducer } from "react";

const formContext = createContext<any>(null);

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

interface Form {
  sections: FormSection[];
}

interface FormSection {
  id: number;
  elements: ElementDetails[];
}

export interface ElementDetails {
  id: number;
  properties: ElementPropertiesByCategory;
}

export interface ElementPropertiesByCategory {
  [key: string]: ElementProperties;
}

export interface ElementProperties {
  fields: Field[];
  states: {
    [key: string]: string;
  };
}

type Field = TextField | RadioGroupField;

interface BaseField {
  label: string;
  description?: string;
}

interface TextField extends BaseField {
  type: "text";
  value?: string;
}

interface RadioGroupField extends BaseField {
  type: "radio-group";
  defaultValue: string;
  options: string[];
}

// let headingElement:HeadingElement = {
//   properties: []
// }

// let formSection: FormSection = {
//   elements: [
//     headingElement
//   ]
// }

type FormState = {
  form: Form;
};

type Event =
  | "UPDATE_PROPERTY_STATE"
  | "REMOVE_ELEMENT"
  | "REMOVE_PAGE"
  | "ADD_PAGE";

type FormAction = {
  type: Event;
  payload: {
    sectionId: number;
    elementId: number;
  };
};

function formReducer(state: FormState, action: FormAction) {
  return state;
}

interface FormContextProviderProps {
  children: React.ReactNode;
}

const FormContextProvider = ({ children }: FormContextProviderProps) => {
  const [state, dispatch] = useReducer(formReducer, {
    form: {
      sections: [
        {
          id: 1,
          elements: [
            {
              id: 1,
              // sectionId: 1,
              // elementId: 1,
              properties: {
                general: {
                  fields: [
                    {
                      label: "Heading Text",
                      type: "text",
                      value: "Heading2",
                    },
                    {
                      label: "Subheading Text",
                      description: "Add smaller text below the heading",
                      type: "text",
                    },
                    {
                      label: "Heading Size",
                      type: "radio-group",
                      defaultValue: "default",
                      options: ["default", "large", "small"],
                    },
                  ],
                  states: {
                    headingText: "Heading",
                    subheadingText: "",
                    headingSize: "default",
                  },
                },
              },
            },
          ],
        },
      ],
    },
  });

  return <formContext.Provider value={null}>{children}</formContext.Provider>;
};
