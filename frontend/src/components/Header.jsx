import { useState } from "react";
import "./header/header.css";
import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";
import Navbar from "./Navbar";




const Header = () => {

     const [toggle, setToggle ]  = useState(false);



    return (
         <header className="header">
      
         <HeaderLeft toggle={toggle} setToggle={setToggle} />


      
        {/* onClick={() => setToggle(false)}   ki n5tar home wala posts tetskr */} 
      
      
         <Navbar toggle={toggle} setToggle={setToggle} />
        
        <HeaderRight/>
        
        

    </header> );
}
 
export default Header;
