"use client";
const Categories = () => {
  return (
    <div className="mt-5">
      <hr className="green" />
      <ul id="categories" className="nav justify-content-center">
        <li className="nav-item">
          <a className="nav-link green" href="#">
            film
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link green" href="#">
            literature
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link green" href="#">
            photography
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link green" href="#">
            music
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link green" href="#">
            art
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link green" href="#">
            games
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link green" href="#">
            technology
          </a>
        </li>
      </ul>
      <hr className="green" />
    </div>
  );
};

export default Categories;
