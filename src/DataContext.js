import React, { createContext, useState } from 'react';

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [dataId, setData] = useState({ id: null, version: null });
  const [dirId, setDirId] = useState(null);
  const [subDirId, setSubDirId] = useState(null);

  return (
    <DataContext.Provider value={{ dataId, setData ,dirId, setDirId,subDirId,setSubDirId}}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };