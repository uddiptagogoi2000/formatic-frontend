import HeadingElement from "../../components/elements/HeadingElement";
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
  const { state } = useFormContext();

  function findElementById(elementId: number) {
    return state.form.pages
      .flatMap((page) => page.elements)
      .find((element) => element.id === elementId);
  }

  let properties = null;
  let element = null;
  if (state.selectedElementId !== null) {
    element = findElementById(state.selectedElementId);
    properties = element?.properties;
  }

  const noPropertiesDisplay: JSX.Element = <div></div>;

  return (
    <div className='builder-layout__prop-container'>
      <div>
        {properties == null
          ? "No properties to display"
          : `${element?.name} Properties`}
      </div>
      <div>
        {properties == null
          ? noPropertiesDisplay
          : properties.map((property) => {
              switch (property.type) {
                case "text":
                  return (
                    <div key={property.id}>
                      <div>{property.name}</div>
                      <div>{property.value}</div>
                    </div>
                  );

                case "text-group": {
                  return (
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
                }

                default: {
                  throw new Error("Unknown property type");
                }
              }
            })}
      </div>
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
