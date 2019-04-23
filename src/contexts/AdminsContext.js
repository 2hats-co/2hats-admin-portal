import React from 'react';
import useCollection from '../hooks/useCollection';

export const AdminsContext = React.createContext([]);

export const AdminsProvider = props => {
  const [admins] = useCollection({ path: 'admins' });
  const getAdmin = id => {
    if (!admins.documents || admins.documents.length === 0) return {};
    const admin = admins.documents.filter(x => x.id === id);
    return admin[0];
  };
  return (
    <AdminsContext.Provider
      value={{ admins: admins.documents, getAdmin: getAdmin }}
    >
      {props.children}
    </AdminsContext.Provider>
  );
};
export const AdminsConsumer = AdminsContext.Consumer;
