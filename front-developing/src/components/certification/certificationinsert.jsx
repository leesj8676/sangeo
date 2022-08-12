import React, {useState} from 'react';

function CertificationInsert({onInsert}) {
    const [value, setValue] = useState('');

    const onChange = (e) => {
        setValue(e.target.value);
    }

    const onSubmit= (e) => {
        onInsert(value);
        setValue('');
        e.preventDefault();
    }
   
    return (
        <form className="TodoInsert" onSubmit={onSubmit}>
            <input 
            onChange={onChange}
            value={value} placeholder="할 일을 입력하세요" />
            <button type="submit" onSubmit={onSubmit}>등록</button>
        </form>
    )
}

export default CertificationInsert;
