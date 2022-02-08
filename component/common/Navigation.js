const Navigation = ({ styles }) => {
  const menuList = [
    {
      index: 0,
      name: "menu1",
      url: "/",
      submenu: [
        { name: "menu1-1", url: "/" },
        { name: "menu1-2", url: "/" },
        { name: "menu1-3", url: "/" },
        { name: "menu1-4", url: "/" }
      ]
    },
    {
      index: 0,
      name: "menu2",
      url: "/",
      submenu: [
        { name: "menu2-1", url: "/" },
        { name: "menu2-2", url: "/" },
        { name: "menu2-3", url: "/" },
        { name: "menu2-4", url: "/" }
      ]
    },
    {
      index: 0,
      name: "menu3",
      url: "/",
      submenu: [
        { name: "menu3-1", url: "/" },
        { name: "menu3-2", url: "/" },
        { name: "menu3-3", url: "/" },
        { name: "menu3-4", url: "/" }
      ]
    },
    {
      index: 0,
      name: "menu4",
      url: "/",
      submenu: [
        { name: "menu4-1", url: "/" },
        { name: "menu4-2", url: "/" },
        { name: "menu4-3", url: "/" },
        { name: "menu4-4", url: "/" }
      ]
    }
  ];

  const Menu = () => {
    let tmp = [];
    for (let i = 0, len = menuList.length; i < len; i++) {
      const menu = menuList[i];
      tmp.push(
        <li key={`menu${i}`}>
          <a href={menu.url}>
            {menu.name}
          </a>
        </li>
      );
    }
    return tmp;
  };
  return (
    <div className={styles["navigation-warpper"]}>
      <div className={styles["navigation-container"]}>
        <ul>
          <Menu />
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
