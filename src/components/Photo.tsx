import React from "react";

type imgProps = {
  url: string;
  width: number;
  height: number;
  alt: string;
  key: string;
};

const Photo = ({ url, alt, width, height, key }: imgProps): JSX.Element => {
  return (
    <div key={key}>
      <img
        src={url}
        alt={alt}
        width={width}
        height={height}
        className="rounded-2xl"
      />
    </div>
  );
};

export default Photo;
