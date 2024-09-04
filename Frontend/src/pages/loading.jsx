import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

function Test() {
  let [loading, setLoading] = useState(true);

  return (

      <ClipLoader
        color= '#000000'
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 block"
      />

  );
}

export default Test;
