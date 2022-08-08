import React, { useState } from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import styles from '../reviewcontent/reviewcontent.module.css';

function ReviewContent( {onSetData}) {

    const [data, setData] = useState(); 
    
    const onafterCounsel = (event) => {
      setData(event.currentTarget.value);   
    }


    const onSubmit = () => {
      onSetData(data);
    }
    return (
    <div>
        <textarea 
        className={styles.container} 
        placeholder ="상담 후기를 작성해주세요"
        onChange = {onafterCounsel}
        value = {data} /> 
        <button onClick = {onSubmit}> 작성완료 </button>

    </div>
  );
}

export default ReviewContent;

