// ToggleSwitch.tsx

type ToggleSwitchProps = {
  isOn: boolean;
  onToggle: () => void;
};

const ToggleSwitch = ({ isOn, onToggle }: ToggleSwitchProps) => {
  return (
    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
      <input
        type="checkbox"
        name="toggle"
        id="toggle"
        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
        checked={isOn}
        onChange={onToggle}
      />
      <label
        htmlFor="toggle"
        className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
      ></label>
      <style jsx>{`
        .toggle-checkbox:checked {
          right: 0;
        }
        .toggle-checkbox:checked + .toggle-label {
          background-color: #4d4d4d;
        }
        .toggle-checkbox {
          right: 4px;
          top: 5px;
          z-index: 2;
          transition: right 0.2s;
        }
        .toggle-label {
          transition: background-color 0.2s;
        }
      `}</style>
    </div>
  );
};

export default ToggleSwitch;
