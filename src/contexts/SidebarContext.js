import React, { createContext, useState } from 'react';
// create context 
export const SideBarContext = createContext()

const SidebarProvider = ({children}) => {
// sidebar state 
const[isOpen ,setIsOpen] = useState(false);

const handleClose = () => {
  setIsOpen(false);
}


  return (
    // <SideBarContext.Provider value={{isOpen, setIsOpen ,handleClose}}>{children}</SideBarContext.Provider>;
    <SideBarContext.Provider value={{ isOpen, setIsOpen , handleClose}}>{children}</SideBarContext.Provider>
  );
};

export default SidebarProvider;
