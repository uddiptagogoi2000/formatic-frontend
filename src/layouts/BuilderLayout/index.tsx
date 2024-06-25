import { HeadingElement } from "../../components/elements/HeadingElement";
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
      <HeadingElement />
    </div>
  );
};

export default BuilderLayout;
