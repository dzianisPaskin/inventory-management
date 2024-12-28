"use client";

import { ChangeEventHandler, useState } from "react";
import { Header } from "../(components)/Header";
import clsx from "clsx";

type UserSettingsType = {
  label: string;
  value: string | boolean;
  type: "text" | "toggle";
};

const mockUserSettings: UserSettingsType[] = [
  { label: "Username", value: "john_doe", type: "text" },
  { label: "Email", value: "john.doe@example.com", type: "text" },
  { label: "Notification", value: true, type: "toggle" },
  { label: "Dark Mode", value: false, type: "toggle" },
  { label: "Language", value: "English", type: "text" },
];

export default function Settings() {
  const [userSettings, setUserSettings] =
    useState<UserSettingsType[]>(mockUserSettings);

  const onToggleChange = (idx: number) => () => {
    const settingsCopy = [...userSettings];
    settingsCopy[idx].value = !settingsCopy[idx].value as boolean;
    setUserSettings(settingsCopy);
  };

  const onTextChange =
    (idx: number): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      const settingsCopy = [...userSettings];
      settingsCopy[idx].value = e.target.value;
      setUserSettings(settingsCopy);
    };

  return (
    <div className="w-full">
      <Header name="User Settings" />
      <div className="overflow-x-auto mt-5 shadow-md">
        <table className="min-w-full bg-white rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Setting
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {userSettings.map((setting, idx) => (
              <tr className="hover:bg-blue-50" key={setting.label}>
                <td className="py-2 px-4">{setting.label}</td>
                <td className="py-2 px-4">
                  {setting.type === "toggle" ? (
                    <label className="inline-flex relative items-center cursor-pointer">
                      <input
                        className="sr-only peer"
                        type="checkbox"
                        checked={setting.value as boolean}
                        onChange={onToggleChange(idx)}
                      />
                      <div
                        className={clsx(
                          "w-11 h-6 bg-gray-200 rounded-full",
                          "peer peer-focus:ring-4 peer-focus:ring-blue-400",
                          "transition peer-checked:after:translate-x-full peer-checked:after:border-white",
                          "after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white",
                          "after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5",
                          "after:transition-all peer-checked:bg-blue-600"
                        )}
                      ></div>
                    </label>
                  ) : (
                    <input
                      className="px-4 py-2 border rounded-lg text-gray-500 focus:outline-none focus:border-blue-500"
                      type="text"
                      value={setting.value as string}
                      onChange={onTextChange(idx)}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
