import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import PeopleCard from './PeopleCard';
import { peopleInfo } from '../types/peopleInfo';
import { peoplesState } from '../states/peoplesState';

type ItemProps = {
  person: string;
  voiceColor: string;
};

const Item = (props: ItemProps) => (
  <div
    id={props.person}
    // css={itemStyle}
    style={{
      width: '100%',
      height: '100%',
      display: 'inline-block',
      position: 'relative',
      margin: '20px',
    }}
  >
    <PeopleCard person={props.person} voiceColor={props.voiceColor} />
  </div>
);

type NewPeopleAdderProps = {
  onClick: () => void;
};

const NewPeopleAdder = (props: NewPeopleAdderProps) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'inline-block',
        position: 'relative',
        margin: '20px',
        verticalAlign: 'top',
      }}
      onClick={props.onClick}
    >
      <div
        style={{
          position: 'relative',
          backgroundColor: '#cccccc',
          borderRadius: '10px',
          height: '264.33px',
          color: 'white',
          fontSize: '50px',
          textAlign: 'center',
          lineHeight: '264.33px',
          boxShadow: '0 0 4px gray',
        }}
      >
        <label>＋</label>
      </div>
    </div>
  );
};

type Props = {
  peoples: peopleInfo[];
};

const PeopleSelector = (props: Props) => {
  const [isTransition, setIsTransition] = useState(false);
  const [currentItem, setCurrentItem] = useState(0);
  const [peoples, setPeoples] = useRecoilState(peoplesState);

  const NewPeopleAddHandler = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    if (alphabet.length <= peoples.length - 1) {
      return;
    }
    setPeoples([
      ...peoples,
      {
        id: alphabet[peoples.length - 1],
        voiceColor: '#ffffff',
      },
    ]);
    if (!isTransition) {
      if (currentItem > 0) {
        setIsTransition(true);
        setCurrentItem(allItems.length - 1);
      }
    }
  };

  let allItems = props.peoples.map((people) => {
    return <Item person={people.id} voiceColor={people.voiceColor} />;
  });

  allItems.push(<NewPeopleAdder onClick={NewPeopleAddHandler} />);

  const handlePrev = () => {
    if (!isTransition) {
      if (currentItem > 0) {
        setIsTransition(true);
        setCurrentItem((n) => n - 1);
      }
    }
  };

  const handleNext = () => {
    if (!isTransition) {
      if (currentItem < allItems.length - 1) {
        setIsTransition(true);
        setCurrentItem((n) => n + 1);
      }
    }
  };

  const handleTransitionEnd = () => {
    setIsTransition(false);
  };

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
      }}
    >
      <div
        style={{
          width: '2.5%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <button
          onClick={handlePrev}
          style={{
            borderStyle: 'solid',
            borderWidth: '10px 10px 10px 0',
            borderColor: 'transparent gray transparent transparent',
            display: 'inline-block',
            width: 0,
            height: 0,
          }}
        />
      </div>
      <div
        style={{
          width: '95%',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: 200,
            whiteSpace: 'nowrap',
            margin: 'auto',
            transform: `translate3d(${-100 * (currentItem + 1)}%, 0, 0)`,
            ...(isTransition ? { transition: 'transform 1s' } : {}),
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {allItems}
        </div>
      </div>
      <div
        style={{
          width: '2.5%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <button
          onClick={handleNext}
          style={{
            borderStyle: 'solid',
            borderWidth: '10px 0 10px 10px',
            borderColor: 'transparent transparent transparent gray',
            display: 'inline-block',
            width: 0,
            height: 0,
          }}
        />
      </div>
    </div>
  );
};

export default PeopleSelector;
