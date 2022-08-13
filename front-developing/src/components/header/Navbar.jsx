import React, {useState} from "react";
import styles from './Navbar.module.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import setAuthorizationToken from "../../utils/setAuthorizationToken";


function NavigationBar({authService}) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(state => state.user.user);
  const isLogin = useSelector(state => state.user.isLogin);

  const [searchWord, setSearchWord] = useState("");

  const onSearchWordHandler = (event) => {
    setSearchWord(event.currentTarget.value);
  };

  const onClickSearch = () => {
    navigate({
      pathname: '/counselorlist',
      search: `?searchWord=${searchWord}`
    });
  }

  const onClickRegister = () => {
    navigate('sign_up');
  }

  // 사이트 내 로그아웃
  const onClickLogout= () => {
    localStorage.removeItem("Authorization");
    setAuthorizationToken(null);
    dispatch({type:'LOG_OUT'});
    alert("로그아웃합니다.");
    navigate('/');
  }

  // 구글, 깃헙 로그아웃
  const onLogout = () => {
     authService.logout();
 }


  return (
    <Navbar key="lg" expand="lg" className={styles.color}>
    <Container fluid>
      <Navbar.Brand className="col-4 ps-3" href="/">
      <img src="http://localhost:3000/sangeo_logo.png" width="250" height="100" alt="logo"></img>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
      <Navbar.Offcanvas
        id={`offcanvasNavbar-expand-lg`}
        aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className={styles.point_color} id={`offcanvasNavbarLabel-expand-lg`}>
            SangEo - 상담 어때요
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <Form className="align-self-center d-flex col-xl-6">
          <Form.Control
            type="search"
            placeholder="상담사 이름으로 검색하세요!"
            className="me-2"
            aria-label="Search"
            onChange={onSearchWordHandler}
          />
          <FaSearch className="align-self-center" onClick={onClickSearch}/>
        </Form>
          <Nav className="justify-content-end flex-grow-1 pe-3">
          <Nav.Link className="me-1 text-center align-self-center" href="/counselorlist">상담사 찾기</Nav.Link>
          { isLogin ?
            (
              <Nav.Link className="me-1 text-center align-self-center" onClick={onClickLogout}>로그아웃</Nav.Link>
            )
            :
            (
              <Nav.Link className="me-1 text-center align-self-center" href="/sign_in">로그인</Nav.Link>
            )
          }
           { isLogin ? 
            (
              <div className="text-center">
                <img src={process.env.REACT_APP_DB_HOST+"/"+user.profile} className={styles.profileImg+" me-1"} width="50" height="50" alt="profile"></img>
                { user.isUser ?  (<a href={"/mypage"}>{user.name}님</a>) : (<>상담사 <a href={"/counmypage"}>{user.name}님</a></>)}
              </div>
              )
            :(
              <Button className={styles.point_bgcolor} onClick={onClickRegister}>회원가입</Button>
            ) 
          }
         
          </Nav>
        </Offcanvas.Body>
      </Navbar.Offcanvas>
    </Container>
  </Navbar>
  );
}

export default NavigationBar;
