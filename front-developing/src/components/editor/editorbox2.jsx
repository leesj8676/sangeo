import React from "react";
import ImageFileInput from "../image_file_input/image_file_input";
import styles from "./editorbox2.module.css";

const EditorBox2 = () => {


    const onPost = ()=> {};

    return (

        <form>
            <textarea className={styles.textarea} />
            <ImageFileInput className = {styles.imageinput}/>
            <br/><br/><br/>
            <button onClick={onPost} className= {styles.postbtn}> 글 등록하기</button>
        </form>

    )

}

export default EditorBox2;