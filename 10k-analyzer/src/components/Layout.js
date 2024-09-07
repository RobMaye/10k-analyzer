import React from 'react';
import Header from './Header';

function Layout({ children }) {
  return (
    <div>
      <Header />
      <main style={{ padding: '2rem' }}>
        {children}
      </main>
    </div>
  );
}

export default Layout;