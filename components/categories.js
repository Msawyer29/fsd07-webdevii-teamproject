"use client";
const Categories = () => {
  return (
    <div className="mt-5">
      <hr className="green" />
      <ul id="categories" className="nav justify-content-center">
        <li className="nav-item">
          <a className="nav-link green" href="/project/film">
            film
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link green" href="/project/literature">
            literature
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link green" href="/project/photography">
            photography
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link green" href="/project/music">
            music
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link green" href="/project/art">
            art
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link green" href="/project/games">
            games
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link green" href="/project/technology">
            technology
          </a>
        </li>
      </ul>
      <hr className="green" />
    </div>
  );
};

export default Categories;
