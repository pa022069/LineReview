import React, { useContext } from 'react';
import context from '../Context';

export const CarouselItem = (props) => {
    const { clickAction } = useContext(context);

    return (
        <div className="carousel__item">
            <div className="item__img"></div>
            <div className="item__info">
                <h2>{props.title}</h2>
                <p>{props.desc}</p>
            </div>
            <div className="item__btn">
                {props.buttons.map((item, idx) =>
                    <div key={idx}>
                        <p onClick={() => clickAction(item.action, item.content)}>{item.title}</p>
                    </div>
                )}
            </div>
        </div>
    );
}