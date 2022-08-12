import { useState } from 'react';
import Layout from '../src/layout';

const SimpleCounterPage = () => {
  const [count, setCount] = useState(0);
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
          <button type={'button'} onClick={() => setCount(p => p + 1)}>
            <span>증가</span>
          </button>
          <span>
            <span>카운트:</span>
            <span>{count}</span>
          </span>
          <button type={'button'} onClick={() => setCount(p => p - 1)}>
            <span>감소</span>
          </button>
        </div>
      </main>
    </Layout>
  );
};

export default SimpleCounterPage;
