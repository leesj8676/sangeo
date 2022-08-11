import React, {useState, useEffect,  useRef} from 'react';


import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

// 글자 색 지정 기능
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
// 기본 언어 한국어로 설정
import '@toast-ui/editor/dist/i18n/ko-kr';


import imageCompression from 'browser-image-compression';

//  메소드 흐름 : addImage -> compressImg -> onUploadImage
function EditorBox ({onPost, onContent, imageUploader, onFileChange}){

    const editorRef = useRef(null);

    const schduleId = 2208101;

    const [ image, setImage] = useState(
        {
            fileName : '',
            fileUrl: '',
        }
    );

    useEffect(()=> { 
    	const editorIns = editorRef.current.getInstance(); 
        editorIns.removeHook("addImageBlobHook"); 
        editorIns.addHook('addImageBlobHook', addImage); 
    }, []);

    // 선택한 이미지 에디터에 출력
    const addImage = async(blob, dropImage) => { 
    	const img = await compressImg(blob); //이미지 압축 
        const url = await onUploadImage(img);
        dropImage(url, 'alt_text');
    }

    // 이미지 압축
    const compressImg = async(blob) => { 
    	try{ 
        	const options = { 
            	maxSize: 1, 
                initialQuality: 0.55 //initial 0.7 
            } 
            return await imageCompression(blob, options); 
        } catch(e){ console.log(e); } } 



    const onUploadImage = async (blob) => {

        try {
            const uploaded = await imageUploader.upload(blob);

            setImage({
                fileName: uploaded.original_filename,
                fileUrl: uploaded.url,
            })

            // console.log("ggggg ", uploaded.fileUrl);
            return await uploaded.url;    
        }catch (err){ 

        	 console.log(err);
             return false;
         } 
        } 

   
    async function handleEditor(e) {
       
        const editorBody = editorRef.current.getInstance().getHTML();

        await onFileChange({
            schduleId: schduleId,
            fileName: image.fileName,
            fileURL: image.fileUrl,
            content: editorBody,
        });

        
      
    }

   

    return (

        <div className='edit_wrap'>
            <Editor
                initialValue= '글을 작석해주세요.'
                height = '400px'
                useCommandShortcut = {false}
                hideModeSwitch = {true}
                plugins = {[colorSyntax]}
                language = "ko-KR"
                ref={editorRef}
                // hooks = {{
                //      addImageBlobHook : onUploadImage
                //  }}
            />


            <button onClick={handleEditor}> 작성하기 </button>

            


        </div>
    );
}

export default EditorBox;
