import React, {useState, useEffect} from "react";

const AlertNotice = ({ message, isNotError, isError, classStyle }) => {
  // let stylus = "className="+"'" + classStyle+"'";
  const [stylus, setStylus] = useState("");
  useEffect(() => {
    // effect
    // return () => {
    //   cleanup
    // }
    if (classStyle !== null || classStyle !== "" || classStyle !== undefined) {
      setStylus(classStyle);
    }
  }, [classStyle]);
  return (
    <div className={stylus}>
      {isNotError && (
        <div
          className="alert alert-primary alert-dismissible fade show rounded mb-0 pb-1"
          role="alert"
        >
          <strong>Success !&nbsp;&nbsp;</strong> {message}
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
      {isError && (
        <div
          className="alert alert-danger alert-dismissible fade show rounded mb-0"
          role="alert"
        >
          <strong>Error !&nbsp;&nbsp;</strong> {message}
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default AlertNotice;
