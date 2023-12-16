import Brand from "../Brand";
import NavbarLink from "../NavbarLink";

import { MdLogin, MdLockPerson } from "react-icons/md";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-screen bg-red-600 py-2 h-[60px]">
      <div className="custom-container flex-row-between">
        <Brand />
        <div className="flex-row-center gap-12 text-white">
          <NavbarLink icon={MdLockPerson} text="Register" path="register" />
          <NavbarLink icon={MdLogin} text="Login" path="/login" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
