import React from 'react';
import Header from '../../components/header/Header';
import UserPanel from '../../components/userPanel/UserPanel';
import UserListSection from '../../components/userListSection/UserListSection';
import UserList from '../../components/userList/UserList';
import Footer from '../../components/footer/Footter';

const Home: React.FC = () => {
  return (
    <div>
      <Header />
      <UserPanel />
      <UserListSection />
      <UserList />
      <Footer />
    </div>
  );
};

export default Home;
