import React, { useContext, useEffect } from 'react';
import context from '../Context';
import { CarouselItem } from './CarouselItem';

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
    let { items } = props.content;
    const { setReply } = useContext(context);

    useEffect(() => {
        setReply(items)
    },[items])

    return (
       ''
    );
}