import React from 'react';
import Link from 'next/link';

const Layout = ({ children }: { children: React.ReactNode }) => {
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {children}
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <Link href={'/'}>
            <a>
              <span style={{ fontSize: 20 }}>홈으로</span>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Layout;
