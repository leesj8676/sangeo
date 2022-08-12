import Stack from 'react-bootstrap/Stack';
import React from 'react';
import styles from './HomePage.module.css';



function HomePage() {
  return (
    <>
     <div  className={styles.back} >

<section>
{/* <img src = "light3.png" alt ="main_back"/> */}
<div className={styles.neon}>
  <p>미술심리상담 <br/>상어로 시작하세요</p>
  
</div>
</section>
 
{/* <Stack gap={2} className="col-md-8 mx-auto">

<img src="sangeo_banner.png" alt="main_logo"></img>

</Stack> */}

</div>

     
    </>
   
  );
}

export default HomePage;
