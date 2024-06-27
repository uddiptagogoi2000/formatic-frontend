import { useEffect } from "react";
import { Element as ElementDetails } from "../../contexts/apptypes";
import { useFormContext } from "../../contexts/formContext";
import "./styles.css";

export type ElementProps = {
  elementDetails: ElementDetails; // temporarily optional
  // removeElement: () => void;
  // showProperties: () => void;
  // dragElement: () => void;
  // blurElement: () => void;
  // updateElement: () => void;
};

// function configMachine(state: any, event: any) {
//   switch (state) {
//     case "focus": {
//       if (event.type === "SHOW_PROPERTIES") {
//       }

//       if (event.type === "REMOVE") {
//       }

//       if (event.type === "DRAG") {
//       }

//       if (event.type === "BLUR") {
//       }
//     }
//     case "blur": {
//     }
//   }
// }

const withConfig = <P extends object>(
  Component: React.FC<P & ElementProps>
) => {
  const WrappedComponent = (props: ElementProps) => {
    // has access to elementProperties
    // so we can pass it down to the component
    // also we can properties to components that are in upper hierarchy using callbacks

    const { state, onSelectElement } = useFormContext();

    const isSelected = state.selectedElementId === props.elementDetails?.id;

    function handleSelect(elementId: number) {
      onSelectElement(elementId);
    }

    function handleOpenSettingsPanel() {}

    return (
      <div
        className={`element-wrapper ${
          isSelected ? "element-wrapper--selected" : ""
        }`}
        onClick={() => handleSelect(props.elementDetails.id)}
      >
        <div className='element-wrapper__config-button-group'>
          <button onClick={handleOpenSettingsPanel}>Settings</button>
          <button>Remove</button>
        </div>
        <Component
          {...(props as P)}
          elementDetails={props.elementDetails}
          isSelected={isSelected}
        />
      </div>
    );
  };

  return WrappedComponent;
};

export default withConfig;
