import React, { useState, useContext } from 'react';
import context from '../Context';

export const Input = () => {
    const [text , setText] = useState("");
    const changeText = (e) => {
        setText(e.target.value);
    }
    const { setInput } = useContext(context);
    const submit = () => {
        setInput(text);
        setText('');
    }
    return (
        <div className="line__input">
            <div className="input">
                <input placeholder="輸入訊息..." type="text" name="" id="" onChange={changeText} value={text} />
            </div>
            <div className="submit">
                <div onClick={submit}></div>
            </div>
        </div>
    );
}