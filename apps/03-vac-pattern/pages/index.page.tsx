import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh',
      }}
    >
      <ul style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <li style={{ display: 'flex', flexDirection: 'column' }}>
          <h3>simple counter</h3>
          <ul style={{ display: 'flex', flexDirection: 'column' }}>
            <Link href={'simple-counter'} passHref>
              <a>simple-counter로 가기</a>
            </Link>
            <Link href={'vac-simple-counter'} passHref>
              <a>vac-simple-counter로 가기</a>
            </Link>
          </ul>
        </li>

        <li style={{ display: 'flex', flexDirection: 'column' }}>
          <h3>complex counter</h3>

          <ul style={{ display: 'flex', flexDirection: 'column' }}>
            <Link href={'complex-counter'} passHref>
              <a>complex-counter로 가기</a>
            </Link>
            <Link href={'vac-complex-counter'} passHref>
              <a>vac-complex-counter로 가기</a>
            </Link>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Home;
