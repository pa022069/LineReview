// Author: JeffreySM.Wu

// 1. DidMount -> getMessage(fetch API)
//      1-1. msgInfo to data
//      1-2. keywords to keyWords
//      1-3. push first message to interFace

// 2. Add Message
//      2-1. setMessage(type = string, content)
//      2-2. addMessage(type = string, content) => push message to interface
//      2-3. scrollBottom

// 3. Check Keywords
//      3-1. if interFace updated => checkKeyWords(content)
//      3-2. setGroup(content)
//      3-3. addGroup(content) => push message to interface
//      3-4. scrollBottom

import React, { useState, useEffect } from 'react';
import { Input } from './component/Input';
import { Content } from './component/Content';
import Reply from './component/Reply'
import { Provider } from './Context';

export const Layout = () => {
    // 宣告
    const [state, setState] = useState({
        data: [],
        interFace: [],
        keyWords: [],
        quickReply: []
    })

    const getMessage = () => {
        fetch('./dist/js/step_json.json', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (result) {
                setState({
                    ...state,
                    data: result,
                    interFace: result[0].msgInfo,
                    keyWords: result[0].keywords
                })
            })
    }

    // Input 輸入
    const setInput = (_value) => {
        if (_value === '') return;
        setMessage('input', _value);
    }


    const scrollBottom = () => { // 下滑置底
        const wrapper = document.querySelector('.group');
        return new Promise((resolve, reject) => {
            resolve(
                wrapper.scrollTo(0, wrapper.scrollHeight)
            )
        })
    }
    // 加入訊息
    const addMessage = (_type, _value) => { // 加入訊息
        return new Promise((resolve, reject) => {
            resolve(
                setState({
                    ...state, interFace: state.interFace.concat({
                        "type": _type,
                        "content": _value
                    })
                })
            )
        })
    }
    const setMessage = async (_type, _value) => {
        await addMessage(_type, _value);
        await scrollBottom();
    }

    // 檢查關鍵字
    const checkKeyWords = (_word) => {
        if (typeof _word !== 'string') return;

        let result = state.keyWords.find(item => item.keyword === _word)
        if (!result) return;

        let findGroup = state.data.find(item => item.msgFlag === result.msg)
        setGroup(findGroup);
    }

    const setGroup = async (_array) => {
        await addGroup(_array);
        await scrollBottom();
    }

    const addGroup = (_array) => {
        return new Promise((resolve, reject) => {
            resolve(
                setState({
                    ...state,
                    interFace: state.interFace.concat(_array.msgInfo),
                    keyWords: _array.keywords || []
                })
            )
        })
    }

    const setReply = (_content) => {
        setState({
            ...state,
            quickReply: _content
        })
    }

    const clickAction = (_action, _content) => {
        // if (_action !== "message") {
        //     alert(_content);
        //     return;
        // }
        try {
            setMessage("input", _content);
        } catch (err) {
            alert(err);
        }
    }

    // 綁定
    useEffect(() => {
        getMessage();
    }, [])

    // 新增訊息時刷新
    useEffect(() => {
        let { interFace } = state;
        let { length } = interFace;
        if (!interFace[length - 1] || interFace[length - 1] < 0) return;
        if (interFace[length - 1].type === 'text' || 'input') checkKeyWords(interFace[length - 1].content)
        // console.log(state.interFace);
    }, [state.interFace])

    const contextValue = {
        state,
        setInput,
        clickAction,
        setReply
    }

    return (
        <Provider value={contextValue}>
            <div className="line">
                <img className="line__model" src="images/frame.png" alt="" />
                <div className="line__content">
                    <div className="group">
                        {state.interFace.map((item, idx) =>
                            <Content key={idx} {...item} />
                        )}
                    </div>
                    <Reply />
                </div>
                <Input />
            </div>
        </Provider>
    );
}