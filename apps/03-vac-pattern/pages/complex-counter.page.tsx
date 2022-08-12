import { useId, useState } from 'react';
import Layout from '../src/layout';

const calculateColor = (count: number) => {
  if (count === 0 || (count % 2 === 0 && count % 5 === 0)) {
    return 'unset';
  }
  if (count % 2 === 0) {
    return 'red';
  }
  if (count % 5 === 0) {
    return 'blue';
  }
  return 'unset';
};
const isShowCount = (count: number) => count === 0 || count % 2 !== 0 || count % 5 !== 0;
const ComplexCounterPage = () => {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  const id = useId();
  return (
    <Layout>
      <main
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        <div>
          <h1>카운터</h1>
          <p>버튼 ui를 타원으로 만든다. (ui만 변경)</p>
          <p>카운트는 0보다 작을 수 없다. (ui 로직만 변경)</p>
          <br />
          <p>둘 다 변경</p>
          <p>
            2의 배수는 <span style={{ color: 'red' }}>빨간색</span>
          </p>
          <p>
            5의 배수는 <span style={{ color: 'blue' }}>파란색</span>
          </p>
          <p>2와 5의 공배수는 숫자 대신 😂 모양을 보여주고 </p>
          <p>그 외는 흰색</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <label htmlFor={id}>스텝</label>
          <input
            itemID={id}
            value={step}
            onChange={e => {
              const value = e.target.value;
              if (value === undefined) return;
              if (value === null) return;
              if (Number.isNaN(Number(value))) return;
              setStep(Number(value));
            }}
          />
          <button type={'button'} onClick={() => setStep(1)}>
            스텝 초기화
          </button>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
            fontSize: '20px',
          }}
        >
          <button
            type={'button'}
            onClick={() => setCount(p => p + step)}
            style={{
              backgroundColor: 'gray',
              width: 100,
              height: 30,
              borderRadius: 15,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <span>{step}만큼 증가</span>
          </button>
          <span>
            {isShowCount(count) && <span>카운트:</span>}
            <span style={{ color: calculateColor(count) }}>
              {isShowCount(count) ? count : '😂'}
            </span>
          </span>
          <button
            style={{
              backgroundColor: 'gray',
              width: 100,
              height: 30,
              borderRadius: 15,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            type={'button'}
            onClick={() => {
              if (count - step < 0) return;
              setCount(p => p - step);
            }}
          >
            <span>{step}만큼 감소</span>
          </button>
        </div>
      </main>
    </Layout>
  );
};

export default ComplexCounterPage;
