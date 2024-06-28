import HeadingElement from "../../components/elements/HeadingElement";
import { Element, Property } from "../../contexts/apptypes";
import {
  FormContextProvider,
  useFormContext,
} from "../../contexts/formContext";
import ElementsContainer from "./ElementsContainer";
import "./styles.css";

const BuilderLayout = () => {
  return (
    <div className='builder-layout'>
      <ElementsContainer />
      <FormContextProvider>
        <FormContainer />
        <PropertiesContainer />
      </FormContextProvider>
    </div>
  );
};

const FormContainer = () => {
  return (
    <div className='builder-layout__form-container'>
      <Form />
    </div>
  );
};

const PropertiesContainer = () => {
  const { state, onUpdateElement } = useFormContext();

  function findElementById(elementId: number): Element | undefined {
    return state.form.pages
      .flatMap((page) => page.elements)
      .find((element) => element.id === elementId);
  }

  let properties: Property[] | undefined = undefined;
  let element: Element | undefined;

  if (state.selectedElementId !== null) {
    element = findElementById(state.selectedElementId);
    if (!element) {
      throw new Error("Element not found");
    }
    properties = element?.properties;
  }

  const noPropertiesDisplay: JSX.Element = <div></div>;

  return (
    <div className='builder-layout__prop-container'>
      <div className='builder-layout__prop-container__header'>
        {properties == null
          ? "No properties to display"
          : `${element?.name} Properties`}
      </div>
      <ul className='builder-layout__prop-container__list'>
        {element == null || properties == null
          ? noPropertiesDisplay
          : properties.map((property, index) => {
              let item: JSX.Element;

              switch (property.type) {
                case "text": {
                  item = (
                    <div
                      key={property.id}
                      className='property--text form-group'
                    >
                      <label htmlFor={`${property.id}`}>{property.name}</label>
                      <input
                        type='text'
                        id={`${property.id}`}
                        value={property.value}
                        onChange={(e) => {
                          const pageId = element.pageId;
                          const elementId = element.id;

                          onUpdateElement(pageId, elementId, {
                            ...property,
                            value: e.target.value,
                          });
                        }}
                      />
                    </div>
                  );
                  break;
                }

                case "text-group": {
                  item = (
                    <div key={property.id}>
                      <div>{property.name}</div>
                      {property.fields.map((field) => (
                        <div key={field.id}>
                          <div>{field.name}</div>
                          <div>{field.value}</div>
                        </div>
                      ))}
                    </div>
                  );
                  break;
                }

                default: {
                  throw new Error("Unknown property type");
                }
              }

              return (
                <li
                  className='builder-layout__prop-container__list__item'
                  key={index}
                >
                  {item}
                </li>
              );
            })}
      </ul>
    </div>
  );
};

const Form = () => {
  const { state } = useFormContext();

  return (
    <div className='builder-layout__form-container__form shadow-shorter'>
      {state.form.pages.map((page) => (
        <div key={page.id}>
          {page.elements.map((element) => (
            <HeadingElement key={element.id} elementDetails={element} />
          ))}
        </div>
      ))}
    </div>

    // <div>
    //   <HeadingElement
    //     elementDetails={{
    //       id: 1,
    //       name: "Heading",
    //       order: 1,
    //       pageId: 1,
    //       properties: [
    //         {
    //           category: "general",
    //           id: 1,
    //           name: "Heading Text",
    //           type: "text",
    //           value: "Heading2",
    //         },
    //         {
    //           category: "general",
    //           id: 2,
    //           name: "Subheading Text",
    //           type: "text",
    //           value: "",
    //         },
    //         // {
    //         //   category: "general",
    //         //   id: 3,
    //         //   name: "Heading Size",
    //         //   type: "radio-group",
    //         //   value: "default",
    //         //   options: ["default", "large", "small"],
    //         // }
    //       ],
    //       createdAt: "2021-09-01",
    //       updatedAt: "2021-09-01",
    //     }}
    //   />
    // </div>
  );
};

export default BuilderLayout;
