import React from 'react';
import ImageRegister from './ImageRegister';
import { useRecoilState } from 'recoil';
import { peoplesState } from '../states/peoplesState';

type Props = {
  person: string;
  voiceColor: string;
};

const PeopleCard = (props: Props) => {
  const [peoples, setPeoples] = useRecoilState(peoplesState);

  const handlerChangeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newPeoples = peoples.map((people) => {
      if (people.id === props.person) {
        return { ...people, voiceColor: e.target.value };
      } else {
        return people;
      }
    });
    setPeoples(newPeoples);
  };

  return (
    <div
      style={{
        border: 'gray 1px solid',
        borderRadius: '10px',
        boxShadow: '0 0 4px gray',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <label>{props.person}</label>
      </div>
      <br />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ImageRegister person={props.person} />
      </div>
      <br />
      <div
        style={{
          display: 'flex',
          gap: '10px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <label>BG Color </label>
        <input
          type="color"
          value={props.voiceColor}
          onChange={handlerChangeColor}
        ></input>
      </div>
    </div>
  );
};

export default PeopleCard;
