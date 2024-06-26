import { ElementPropertiesByCategory } from "../../contexts/formContext";

type ElementProps = {
  elementProperties: ElementPropertiesByCategory;
};

function configMachine(state: any, event: any) {
  switch (state) {
    case "focus": {
      if (event.type === "SHOW_PROPERTIES") {
      }

      if (event.type === "REMOVE") {
      }

      if (event.type === "DRAG") {
      }

      if (event.type === "BLUR") {
      }
    }
    case "blur": {
    }
  }
}

const withConfig = <P extends object>(
  Component: React.FC<P & ElementProps>
) => {
  const WrappedComponent = (props: P & ElementProps) => {
    return (
      <div>
        <Component
          {...(props as P)}
          elementProperties={props.elementProperties}
        />
      </div>
    );
  };

  return WrappedComponent;
};

export default withConfig;
