import React from 'react';

const GalleryPic = ({pic}) => (
  <div className="col-xs-4 col-lg-3 gallery-pic">
    <img className="pic-part" src={pic.head.path} />
    <img className="pic-part" src={pic.torso.path} />
    <img className="pic-part" src={pic.legs.path} />
    <p>{pic.head.artist}</p>
    <p>{pic.torso.artist}</p>
    <p>{pic.legs.artist}</p>
  </div>
);

export default GalleryPic;
