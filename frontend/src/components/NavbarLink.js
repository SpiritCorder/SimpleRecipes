import { Link } from "react-router-dom";

const NavbarLink = ({ icon, text, path }) => {
  const Icon = icon;
  return (
    <Link to={path} className="flex-row-center gap-2">
      <Icon />
      {text}
    </Link>
  );
};

export default NavbarLink;
