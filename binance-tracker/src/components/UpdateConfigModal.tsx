import axios from "axios";
import { useState } from "react";
import { Modal, ModalProps } from "./Modal";

export const UpdateConfigModal = (props: Omit<ModalProps, "children">) => {
  const [csrftoken, setCsrfToken] = useState("");
  const [pt20, setPT20] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateConfig = async () => {
    setIsUpdating(true);

    try {
      await axios.post(`/api/save-config`, { csrftoken, pt20 });
      props.setOpen(false);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Modal {...props}>
      <form className="space-y-4">
        <div>
          <label
            htmlFor="csrftoken"
            className="block text-sm font-medium text-gray-200"
          >
            CSRF Token
          </label>
          <div className="mt-1">
            <input
              type="csrftoken"
              name="csrftoken"
              id="csrftoken"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
              value={csrftoken}
              onChange={(e) => setCsrfToken(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="csrftoken"
            className="block text-sm font-medium text-gray-200"
          >
            PT20
          </label>
          <div className="mt-1">
            <input
              type="csrftoken"
              name="csrftoken"
              id="csrftoken"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
              value={pt20}
              onChange={(e) => setPT20(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={handleUpdateConfig}
            disabled={isUpdating || csrftoken === "" || pt20 === ""}
          >
            {isUpdating ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </Modal>
  );
};
