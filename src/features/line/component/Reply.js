import React, { useContext } from 'react';
import context from '../Context';

const Reply = () => {
    const { clickAction, state } = useContext(context);
    const { quickReply } = state;
    return (
        <div className="quick">
            <div className="type__quickreply">
                <div className="quickreply__content">
                    {quickReply.map((item, idx) =>
                        <div key={idx} onClick={() => clickAction(item.action.type, item.action.content)}>
                            {item.imageUrl !== '' && <span style={{
                                backgroundImage: `url(${item.imageUrl})`
                            }}></span>}
                            <p>{item.action.title}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Reply;