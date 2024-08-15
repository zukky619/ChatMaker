import React from 'react';
import ImageRegister from './ImageRegister';

type Props = {
  person: string;
};

const PeopleCard = (props: Props) => {
  return (
    <div
      style={{
        border: 'gray 1px solid',
        borderRadius: '10px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <label>{props.person}</label>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ImageRegister person={props.person} />
      </div>
      <input type="color"></input>
    </div>
  );
};

export default PeopleCard;
