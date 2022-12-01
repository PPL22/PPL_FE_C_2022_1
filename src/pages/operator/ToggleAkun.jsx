import React from "react";

import Toggle from "react-toggle";
import "react-toggle/style.css";

function ToggleAkun({ item, onChange, value }) {
  const [checked, setChecked] = React.useState(value);
  const [title, setTitle] = React.useState(item);

  React.useEffect(() => {
    setChecked(value);
    setTitle(item);
  }, [item, value]);

  const handleChange = async () => {
    const result = await onChange();
    if (result) {
      console.log(result);
      setChecked(!checked);
      if (checked) {
        setTitle("Non-Aktif");
      } else {
        setTitle("Aktif");
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-y-2">
      <span>{title}</span>
      <Toggle checked={checked} icons={false} onChange={handleChange} />
    </div>
  );
}

export default ToggleAkun;
