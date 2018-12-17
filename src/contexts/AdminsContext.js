import React from 'react';

const AdminsContext = React.createContext([]);

export const AdminsProvider = AdminsContext.Provider
export const AdminsConsumer = AdminsContext.Consumer