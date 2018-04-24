import * as React from "react";

interface LoaderProps {
  spinning: boolean;
  fullScreen?: boolean;
}

const Loader = ({ spinning, fullScreen }: LoaderProps) => {
  return (
    <div>
      Loading
    </div>)
}

export default Loader
