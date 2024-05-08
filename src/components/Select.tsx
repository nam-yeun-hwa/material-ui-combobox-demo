import { useEffect } from "react";
import { selectOptionType } from "type/data";
import "./select.css";

type SelectProps = {
  value?: string | null;
  options: selectOptionType | undefined | (() => Promise<selectOptionType>);
  onChange?: (value: string) => void;
};

export default function Select(props: SelectProps) {
  const { value, options, onChange } = props;

  useEffect(() => {
    console.log("components options", options);
  }, [options]);
  return (
    <>
      <div className="MuiAutocomplete-root">
        <div className="MuiFormControl-root">
          {/* <label className="MuiFormLabel-root">Movie</label> */}
          <div className="MuiInputBase-root">
            <input className="MuiInputBase-input" />
            <div className="MuiAutocomplete-endAdornment">
              <button className="MuiButtonBase-root">
                <svg>
                  <path d="M7 10l5 5 5-5z"></path>
                </svg>
              </button>
            </div>
            <fieldset>
              <legend>
                <span>Movie</span>
              </legend>
            </fieldset>
          </div>
        </div>
      </div>
      <div className="base-popper-root"></div>
    </>
  );
}
