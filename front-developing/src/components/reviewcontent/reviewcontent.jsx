import React, { useState } from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import styles from '../reviewcontent/reviewcontent.module.css';

function ReviewContent( {onSetData}) {

    const [data, setData] = useState(); 
    
    const onafterCounsel = (event) => {
      onSetData(event.currentTarget.value);   
    }

    return (
    <div>
        <textarea 
        className={styles.container} 
        placeholder ="상담 후기를 작성해주세요"
        onChange = {onafterCounsel}
        value = {data} /> 

    </div>
  );
}

export default ReviewContent;

