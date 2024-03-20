import { useEffect, useState } from 'react';
import classes from '../../../styles/Navbar.module.css';
import { LinksGroup } from './NavbarLinksGroup';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks/reduxHooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { userLogout } from '../../../store/reducers/user';

const data = [
  { link: "/", label: "메인" },
  {
    label: "투자",
    links: [
      { link: "/stocks", label: "주식" },
      { link: "", label: "채권" },
      { link: "", label: "EFT" },
    ],
  },
  { link: "/quiz", label: "퀴즈" },
  { link: "", label: "포트폴리오" },
];

export default function Navbar() {
  const [active, setActive] = useState("Billing");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isUser = useAppSelector((state) => state.user.isUser);

  const links = data.map((item) => {
    if ("links" in item)
      return (
        <LinksGroup
          {...item}
          active={active}
          setActive={setActive}
          key={item.label}
        />
      );
    else {
      return (
        <a
          className={classes.link}
          data-active={item.label === active || undefined}
          href={item.link}
          key={item.label}
          onClick={(event) => {
            event.preventDefault();

            if (item.label === "퀴즈") {
              navigate(item.link, { state: { solve: false } });
            } else {
              navigate(item.link);
            }

            setActive(item.label);
          }}
        >
          <span>{item.label}</span>
        </a>
      );
    }
  });

  function onClickLogout(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) {
    event.preventDefault();
    setActive("");
    dispatch(userLogout()).then(() => {
      navigate("/");
    });
  }

  useEffect(()=>{
    if(location.pathname === "/quiz"){
      setActive('퀴즈');
    }
  },[])

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <div
          className={classes.header}
          onClick={() => {
            navigate("/");
          }}
        >
          TOTO
        </div>
        {links}
      </div>
      {!isUser ? (
        <div className={classes.footer}>
          <a
            href="#"
            className={classes.footerLink}
            onClick={(event) => {
              event.preventDefault();
              setActive("");
              navigate("/login");
            }}
          >
            <span>로그인</span>
          </a>
          <a
            href="#"
            className={classes.footerLink}
            onClick={(event) => {
              event.preventDefault();
              setActive("");
              navigate("/signup");
            }}
          >
            <span>회원가입</span>
          </a>
        </div>
      ) : (
        <div className={classes.footer}>
          <a
            href="#"
            className={classes.footerLink}
            onClick={(event) => {
              event.preventDefault();
              setActive("");
              navigate("/my")
            }}
          >
            <span>마이페이지</span>
          </a>
          <a
            href="#"
            className={classes.footerLink}
            onClick={(event) => {
              onClickLogout(event);
            }}
          >
            <span>로그아웃</span>
          </a>
        </div>
      )}
    </nav>
  );
}
