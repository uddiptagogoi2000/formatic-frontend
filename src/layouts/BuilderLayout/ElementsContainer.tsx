const ElementsContainer = () => {
  return (
    <div className='builder-layout__elem-container'>
      <div className='builder-layout__elem-container__header'></div>
      <div className='builder-layout-elem-container__body'>
        <ul className='builder-layout-elem-container__body__elem-list'>
          <li className='builder-layout-elem-container__body__elem-list__item'>
            <ElementName name='Heading' />
          </li>
          <li className='builder-layout-elem-container__body__elem-list__item'>
            <ElementName name='Full Name' />
          </li>
          <li className='builder-layout-elem-container__body__elem-list__item'>
            <ElementName name='Email' />
          </li>
          <li className='builder-layout-elem-container__body__elem-list__item'>
            <ElementName name='Address' />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ElementsContainer;

type Icon = "default" | "heading" | "fullname";

type ElementNameProps = {
  name: string;
  icon?: Icon;
};

const ElementName = ({ name, icon = "default" }: ElementNameProps) => {
  return (
    <div className='element-name'>
      <div className='element-name__icon'>
        {/* todo */}
        {icon === "default" ? "D" : "NA"}
      </div>
      <div className='element-name__label'>{name}</div>
    </div>
  );
};
