import React, { useContext, useEffect } from 'react';
import context from '../Context';
import { CarouselItem } from './CarouselItem';

export const Carousel = (props) => (
  <div className="type__carousel">
    <div className="carousel">
      {props.content.slides.map((item, idx) => <CarouselItem key={idx} {...item} />)}
    </div>
  </div>
);

export const Text = (props) => (
  <div className="type__text">
    <p>{props.content}</p>
  </div>
);

export const Image = (props) => (
  <div className="type__img">
    <img src={props.content} alt="" />
  </div>
);

export const Video = (props) => (
  <div className="type__video">
    <div className="play">
      <span></span>
    </div>
    <img src={props.content.videoimg} alt="" />
  </div>
);

export const ImageMap = (props) => {
  const { clickAction } = useContext(context);
  const mapData = JSON.parse(props.content.ImagemapContent);
  const mapButton = mapData.actions;
  let defaultWidth = 1040 / 100;

  const getInfo = (_info) => ({
    width: `${_info.width / defaultWidth}%`,
    height: `${_info.height / defaultWidth}%`,
    top: `${_info.y / defaultWidth}%`,
    left: `${_info.x / defaultWidth}%`
  });

  const getAction = (_item) => {
    if (_item.type !== "message") return;
    clickAction(_item.type, _item.text);
  };

  console.log(mapButton);

  return (
    <div className="type__imgmap">
      {
        mapButton.map((item, idx) =>
          <div key={idx} style={getInfo(item.area)} onClick={() => getAction(item)} />
        )
      }
      <img src={props.content.imageurl} alt="" />
    </div>
  );
}

export const QuickReply = (props) => {
  let { items } = props.content;
  const { setReply } = useContext(context);

  useEffect(() => {
    setReply(items)
  }, [items])

  return (
    ''
  );
}