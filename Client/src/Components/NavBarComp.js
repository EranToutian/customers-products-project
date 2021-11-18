import "../App.css";

const NavBarComp = (props) => {
  return (
    <div className="topnav">
      {
        // eslint-disable-next-line
      }<a className="active">Hello</a>
      <nav>
        <a href="/customers">Customers</a>
        <a href="/products">Products</a>
        <a href="/purchased">Purchased</a>
      </nav>
    </div>
  );
};

export default NavBarComp;
