import { Button, Spin } from "antd";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";

import {
  useAddDesclaimerMutation,
  useGetPrivecyPolicyQuery,
} from "../../../redux/apiSlices/cmsSlice";
import toast from "react-hot-toast";

const PrivacyPolicy = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  // Fetch privacy policy
  const {
    data: policyData,
    isLoading: isFetching,
    isError,
    refetch,
  } = useGetPrivecyPolicyQuery(undefined);

  // Mutation
  const [addDisclaimer, { isLoading: isSubmitting }] =
    useAddDesclaimerMutation();

  // Prefill editor with API data
  useEffect(() => {
    if (policyData?.data) {
      setContent(policyData.data); // ✅ API returns HTML in "data"
    }
  }, [policyData]);

  const config = {
    readonly: false,
    placeholder: "Start typing...",
    style: {
      height: "60vh",
      background: "white",
    },
  };

  const handleSubmit = async () => {
    // Strip HTML and check plain text
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;
    const plainText = tempDiv.innerText.trim();

    if (!plainText) {
      toast.error("Content cannot be empty");
      return;
    }

    try {
      await addDisclaimer({
        privacyPolicy: content, // ✅ send HTML
      }).unwrap();

      toast.success("Saved successfully");
      refetch();
    } catch (err) {
      console.error("Error saving:", err);
      toast.error("Failed to save content");
    }
  };

  return (
    <div className="px-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">
        Privacy Policy
      </h3>

      {isFetching ? (
        <div className="flex justify-center py-10">
          <Spin size="large" />
        </div>
      ) : isError ? (
        <p className="text-red-500">Failed to load Privacy Policy</p>
      ) : (
        <>
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            tabIndex={1}
            onBlur={newContent => setContent(newContent)} 
            // onChange={(newContent) => setContent(newContent)} // ✅ use onChange
          />

          <div className="flex items-center justify-end mt-6">
            <Button
              size="large"
              type="primary"
              onClick={handleSubmit}
              className="px-6 py-2"
              loading={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save & Update"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default PrivacyPolicy;
