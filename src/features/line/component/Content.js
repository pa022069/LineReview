import React from 'react';
import { Carousel, Text, Image, Video, ImageMap, QuickReply } from './Component';

export const Content = (props) => {
  const { type } = props;
  return (
    <>
      {type === 'quickReply' ? <QuickReply {...props} /> :
        <div className={`group__content ${type === "input" && 'group--reverse'}`}>
          <div className="group__avatar" style={{ backgroundImage: `url(${props.botSender && props.botSender.botSenderIconUrl})` }}>
          </div>
          {type === 'text' && <Text {...props} />}
          {type === 'input' && <Text {...props} />}
          {type === 'carousel' && <Carousel {...props} />}
          {type === 'image' && <Image {...props} />}
          {type === 'video' && <Video {...props} />}
          {type === 'imagemap' && <ImageMap {...props} />}
        </div>
      }
    </>
  );
}