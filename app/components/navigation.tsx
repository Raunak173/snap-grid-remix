import { Link } from "@remix-run/react";

const Navigation = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 w-full fixed">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="hover:underline">
            Admin
          </Link>
        </li>
        <li>
          <Link to="/user" className="hover:underline">
            User
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
