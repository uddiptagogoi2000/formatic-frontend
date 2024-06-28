// Data modeling

// let form1 = {
//   id: 1,
//   name: "form1",
//   createdAt: "2021-09-01",
//   updatedAt: "2021-09-01",
// };

// // user clicks on form1
// // task: get all pages of form1
// // task: get all elements of page1

// // user clicks on element1
// // task: get all properties of element1

// let page1 = {
//   id: 1,
//   name: "page1",
//   formId: 1,
//   createdAt: "2021-09-01",
//   updatedAt: "2021-09-01",
// };

// let Element1 = {
//   id: 1,
//   name: "Element1",
//   pageId: 1,
//   createdAt: "2021-09-01",
//   updatedAt: "2021-09-01",
//   order: 1,
//   properties: [
//     {
//       propertyId: 1,
//       value: "value1",
//     },
//     {
//       propertyId: 2,
//       value: "value2",
//     },
//     {
//       propertyId: 3,
//       value: "value3",
//     },
//   ],
// };

// let Property1 = {
//   id: 1,
//   name: "Property1",
//   type: "text",
//   valueTypes: "text",
// };

// let Property2 = {
//   id: 2,
//   name: "Property2",
//   type: "radio-group",
//   valueTypes: "text",
// };

// let Property4 = {
//   id: 4,
//   name: "Property4",
//   type: "switch",
//   valueTypes: true,
//   subProperties: [
//     {
//       id: 1,
//       name: "subProperty1",
//       type: "checkbox",
//       valueTypes: true,
//     },
//     {
//       id: 2,
//       name: "subProperty2",
//       type: "checkbox",
//       valueTypes: true,
//     },
//   ],
// };

// let Property3 = {
//   id: 3,
//   name: "Property3",
//   type: "checkbox",
//   valueTypes: [
//     {
//       id: 1,
//       name: "value1",
//       checked: false,
//     },
//     {
//       id: 2,
//       name: "value2",
//       checked: false,
//     },
//     {
//       id: 3,
//       name: "value3",
//       checked: false,
//     },
//   ],
// };

// in formContextProvider
// state of a form = {
//   form: form1,
//   pages: [page1, page2, page3],
//   elements: [Element1, Element2, Element3],
// }

// that means if I update an element or element property, that will trigger a re-render of the form

// let's write the types for the above data model
// first let's try to write the types for the properties
// try to make it discriminative union type use interface and extends

interface BaseProperty {
  id: number;
  name: string;
  type: string;
  category: string;
}

export interface TextProperty extends BaseProperty {
  type: "text";
  value: string;
}

interface RadioGroupProperty extends BaseProperty {
  type: "radio-group";
  value: string;
  options: string[];
}

interface CheckboxProperty extends BaseProperty {
  type: "checkbox";
  value: boolean;
}

interface SwitchProperty extends BaseProperty {
  type: "switch";
  value: boolean;
  subProperties?: CheckboxProperty[];
}

interface TextGroupProperty extends BaseProperty {
  type: "text-group";
  fields: {
    id: number;
    name: string;
    value: string;
  }[];
}

export type Property =
  | TextProperty
  | RadioGroupProperty
  | CheckboxProperty
  | SwitchProperty
  | TextGroupProperty;

// now let's write the types for the elements

export interface Element {
  id: number;
  name: string;
  pageId: number;
  createdAt: string;
  updatedAt: string;
  order: number;
  properties: Property[];
}

// now let's write the types for the pages

interface Page {
  id: number;
  name: string;
  formId: number;
  createdAt: string;
  updatedAt: string;
  elements: Element[];
}

// now let's write the types for the forms

export interface Form {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  pages: Page[];
}

// now create a context for the form with a dummy initial state

// now let's create a context provider for the form

// now give me dummy state for the form that includes all the properties and elements and pages

let form: Form = {
  id: 1,
  name: "form1",
  createdAt: "2021-09-01",
  updatedAt: "2021-09-01",
  pages: [
    {
      id: 1,
      name: "page1",
      formId: 1,
      createdAt: "2021-09-01",
      updatedAt: "2021-09-01",
      elements: [
        {
          id: 1,
          name: "Element1",
          pageId: 1,
          createdAt: "2021-09-01",
          updatedAt: "2021-09-01",
          order: 1,
          properties: [
            {
              id: 1,
              name: "Property1",
              type: "text",
              category: "general",
              value: "value1",
            },
            {
              id: 2,
              name: "Property2",
              type: "radio-group",
              category: "general",
              value: "value2",
              options: ["option1", "option2", "option3"],
            },
            {
              id: 3,
              name: "Property3",
              type: "checkbox",
              category: "general",
              value: false,
            },
            {
              id: 4,
              name: "Property4",
              type: "switch",
              category: "general",
              value: false,
              subProperties: [
                {
                  id: 1,
                  name: "subProperty1",
                  type: "checkbox",
                  category: "general",
                  value: false,
                },
                {
                  id: 2,
                  name: "subProperty2",
                  type: "checkbox",
                  category: "general",
                  value: false,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
