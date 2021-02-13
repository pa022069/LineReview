import React, { useContext } from 'react';
import context from '../Context';
import { CarouselItem } from './CarouselItem';
import { createPortal } from 'react-dom';

export const Carousel = (props) => {
    // console.log(setInput)

    return (
        <div className="type__carousel">
            <div className="carousel">
                {props.content.slides.map((item, idx) => <CarouselItem key={idx} {...item} />)}
            </div>
        </div>
    );
}

export const Text = (props) => {
    return (
        <div className="type__text">
            <p>{props.content}</p>
        </div>
    );
}

export const Image = (props) => {
    return (
        <div className="type__img">
            <img src={props.content} alt="" />
        </div>
    );
}

export const Video = (props) => {
    return (
        <div className="type__video">
            <div className="play">
                <span></span>
            </div>
            <img src={props.content.videoimg} alt="" />
        </div>
    );
}

export const ImageMap = (props) => {
    return (
        <div className="type__imgmap">
            <img src={props.content.imageurl} alt="" />
        </div>
    );
}

export const QuickReply = (props) => {
    const { clickAction } = useContext(context);
    return createPortal(
        <div className="type__quickreply">
            <div className="quickreply__content">
                {props.content.items.map((item, idx) =>
                    <div key={idx} onClick={() => clickAction(item.action.type, item.action.content)}>
                        {item.imageUrl !== '' && <span style={{
                            backgroundImage: `url(${item.imageUrl})`
                        }}></span>}
                        <p>{item.action.title}</p>
                    </div>
                )}
            </div>
        </div>
        ,document.getElementById("quick")
    );
}