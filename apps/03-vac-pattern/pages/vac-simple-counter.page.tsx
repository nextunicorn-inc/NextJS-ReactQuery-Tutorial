import React, { useState } from 'react';
import Layout from '../src/layout';

type CounterProps = {
  count: number;
  onClickIncrease: () => void;
  onClickDecrease: () => void;
};
const CounterUI = ({ count, onClickDecrease, onClickIncrease }: CounterProps) => (
  <section
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      gap: 10,
    }}
  >
    <h1>카운터</h1>
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
        fontSize: '20px',
      }}
    >
      <button type={'button'} onClick={onClickIncrease}>
        <span>증가</span>
      </button>
      <span>
        <span>카운트:</span>
        <span>{count}</span>
      </span>
      <button type={'button'} onClick={onClickDecrease}>
        <span>감소</span>
      </button>
    </div>
  </section>
);

const Counter = () => {
  const [count, setCount] = useState(0);
  const onClickIncrease = () => setCount(p => p + 1);
  const onClickDecrease = () => setCount(p => p - 1);

  const counterProps = { count, onClickIncrease, onClickDecrease };

  return <CounterUI {...counterProps} />;
};

const VacSimpleCounterPage = () => {
  return (
    <Layout>
      <Counter />
    </Layout>
  );
};

export default VacSimpleCounterPage;
