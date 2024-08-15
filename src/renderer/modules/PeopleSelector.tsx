import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import PeopleCard from './PeopleCard';
import { peopleInfo } from '../types/peopleInfo';

const itemCount = 5;
const copyCount = 2;

const itemNumbers = [...Array(itemCount)].map((_, i) => i + 1);
const copiedItemsBefore = itemNumbers.slice(itemCount - copyCount).map((n) => {
  return { n: n, isCopy: true };
});
const copiedItemsAfter = itemNumbers.slice(0, copyCount).map((n) => {
  return { n, isCopy: true };
});
const items = itemNumbers.map((n) => {
  return { n, isCopy: false };
});

type ItemProps = {
  person: string;
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
    <PeopleCard person={props.person} />
    {/* <span
      // css={itemTextStyle(isCopy)}
      style={{
        width: '80%',
        height: '80%',
        backgroundColor: isCopy ? '#7fffd4' : '#ffb6c1',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
      }}
    >
      {n}
    </span> */}
  </div>
);

type Props = {
  peoples: peopleInfo[];
};

const PeopleSelector = (props: Props) => {
  const [hasColor, setHasColor] = useState(true);
  const toggleColor = () => setHasColor(!hasColor);
  // const [peoples, setPeoples] = useState(['me', 'A']);

  const allItems = copiedItemsBefore
    .concat(items, copiedItemsAfter)
    .map(({ n, isCopy }, i) => (
      // <Item id={i.toString()} n={n} isCopy={isCopy && hasColor} />
      <Item person={i.toString()} />
    ));

  const [isTransition, setIsTransition] = useState(false);
  const [currentItem, setCurrentItem] = useState(0);

  const handlePrev = () => {
    if (!isTransition) {
      setIsTransition(true);
      setCurrentItem((n) => n - 1);
    }
  };

  const handleNext = () => {
    if (!isTransition) {
      setIsTransition(true);
      setCurrentItem((n) => n + 1);
    }
  };

  const handleTransitionEnd = () => {
    setIsTransition(false);
    setCurrentItem((n) => (itemCount + n) % itemCount);
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
            // height: 100,
            whiteSpace: 'nowrap',
            margin: 'auto',
            transform: `translate3d(${-100 * (currentItem + copyCount)}%, 0, 0)`,
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

const screenStyle = css({
  width: 200,
  overflow: 'hidden',
});

const itemContainerStyle = (n: number, isTransition: boolean) =>
  css({
    width: 100,
    height: 100,
    whiteSpace: 'nowrap',
    margin: 'auto',
    transform: `translate3d(${-100 * (n + copyCount)}%, 0, 0)`,
    ...(isTransition ? { transition: 'transform 1s' } : {}),
  });

const itemStyle = css({
  width: '100%',
  height: '100%',
  display: 'inline-block',
  position: 'relative',
});

const itemTextStyle = (isCopy: boolean) =>
  css({
    width: '80%',
    height: '80%',
    backgroundColor: isCopy ? '#7fffd4' : '#ffb6c1',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
  });
