import { useState } from "react";

const useInput = (init) => {
  const [value, setValue] = useState(init);

  const onChange = (e) => {
    setValue(e.target.value);

    console.log("e.target.value ", e.target.value);
  };

  return { value, onChange };
};

export default useInput;
