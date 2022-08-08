import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import EditorBox from '../components/editor/editorbox';
import EditorViewer from '../components/editor/editorviewer';
import EditorBox2 from '../components/editor/editorbox2';
// 상담사가 완료된 상담에 메세지를 남기고 이미지 업로드 하는 페이지
function ManageDoneCounselPage() {


    // 작성된 글이 없다면 작성하러 가기 버튼 활성화 -> toast UI 보여주기
    // 작성된 글이 있다면 작성완료된 view 화면 보여주기
    // true 일 때는 editor 화면, false일 때는 viewor화면
    const [ post, setPost] = useState(true);

    const onPost = () => {
        setPost(false);
    }
    
    return (
        <div>
            관리 페이지
            <div>
                <EditorBox2 />
                {/* { post ? <EditorBox onPost = {onPost} /> : <EditorViewer />} */}
            </div>
     

        </div>
    );
}

export default ManageDoneCounselPage;
