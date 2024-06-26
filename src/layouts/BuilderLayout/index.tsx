import HeadingElement, {
  Category,
  States,
} from "../../components/elements/HeadingElement";
import ElementsContainer from "./ElementsContainer";
import "./styles.css";

const BuilderLayout = () => {
  return (
    <div className='builder-layout'>
      <ElementsContainer />
      <FormContainer />
      <PropertiesContainer />
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
  return <div className='builder-layout__prop-container'></div>;
};

const Form = () => {
  return (
    <div>
      <HeadingElement
        elementProperties={{
          [Category.GENERAL]: {
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
              [States.HEADING_TEXT]: "Heading",
              [States.SUBHEADING_TEXT]: "",
              [States.HEADING_SIZE]: "default",
            },
          },
        }}
        // onPropertyChange={(property) => {
      />
    </div>
  );
};

export default BuilderLayout;
