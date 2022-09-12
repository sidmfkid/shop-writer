import { useState, useCallback, useMemo } from "react";
import { useAuthenticatedFetch } from "../hooks";
import {
  Button,
  TextContainer,
  TextField,
  ButtonGroup,
} from "@shopify/polaris";

export function CompletionContent(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isDescription, setIsDescription] = useState(false);
  const [descriptionValue, setDescriptionValue] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const { data, refetchProduct, completionId } = props;
  // console.log(data);
  const fetch = useAuthenticatedFetch();

  const handleSave = useCallback(async () => {
    console.log(descriptionValue);
    const formData = new FormData();
    formData.set("content", descriptionValue);
    const formSerialized = await import("../utils").then((util) =>
      util.serialize(formData)
    );
    const params = new URLSearchParams(formSerialized).toString();
    console.log(params);
    const response = await fetch(
      "/api/completions/edit/" + completionId + "/?" + params,
      { method: "post" }
    ).then((res) => res.json());
    console.log(response);
    refetchProduct();
    setIsEditMode((prevVal) => !prevVal);
  });

  const handleDelete = useCallback(async () => {
    const response = await fetch("/api/completions/delete/" + completionId, {
      method: "post",
    }).then((res) => res.json());
    console.log(response);
    refetchProduct();
  });

  const handleLike = useCallback(() => {});

  const handleDisLike = useCallback(() => {});
  const handleEditMode = useCallback(() => {
    setIsEditMode((prevVal) => !prevVal);
  }, [isEditMode]);

  const handleCompletionChange = useCallback(() => {
    if (!isDescription) {
      setDescriptionValue(data.completion?.content || "");
    }
    setIsDescription(true);

    return data.completion?.content || "";
  }, [isDescription]);

  const handleDescriptionChange = useCallback(
    (newValue) => {
      console.log(newValue);
      setDescriptionValue(newValue);
    },
    [descriptionValue]
  );

  const description = useMemo(() => {
    let description;

    description = handleCompletionChange();

    return description;
  }, [descriptionValue, handleCompletionChange]);

  if (data && !isLoading && isEditMode) {
    return (
      <div>
        <TextContainer>
          <div>Input Prompt:</div>
          <div>
            {data.prompt
              .replace("//n", " ")
              .replace("/n", " ")
              .replace(":/n", " ")}
          </div>
          <div>Output:</div>

          <EditField
            descriptionValue={descriptionValue}
            handleDescriptionChange={handleDescriptionChange}
            isLoading={isLoading}
            handleEditMode={handleEditMode}
            data={data}
          />
          <div style={{ marginTop: "var(--p-space-4)" }}>
            <ButtonGroup>
              <Button onClick={handleSave} primary>
                Save
              </Button>

              <Button onClick={handleDelete} loading={isLoading} destructive>
                Delete
              </Button>

              <Button onClick={handleEditMode}>Undo</Button>
            </ButtonGroup>
          </div>
        </TextContainer>
      </div>
    );
  }
  if (data && !isLoading && !isEditMode) {
    return (
      <div>
        <TextContainer>
          <div>Input Prompt:</div>
          <div>
            {data.prompt
              .replace("//n", " ")
              .replace("/n", " ")
              .replace(":/n", " ")}
          </div>
          <div>Output:</div>
          <div>{data.completion?.content || ""}</div>
          <ButtonGroup>
            {/* <Button primary>Save</Button>
            <div style={{ color: "#bf0711" }}>
              <Button loading={isLoading} monochrome outline>
                Delete
              </Button>
            </div> */}

            <Button onClick={handleEditMode}>Edit</Button>

            <Button destructive onClick={handleDelete} loading={isLoading}>
              Delete
            </Button>
          </ButtonGroup>
        </TextContainer>
      </div>
    );
  }
  if (!data && isLoading) {
    return <div>Loading...</div>;
  }
}

function EditField(props) {
  const {
    isEditMode,
    handleDescriptionChange,
    descriptionValue,
    isLoading,
    handleEditMode,
    data,
  } = props;

  const val = descriptionValue;

  return (
    <div>
      <TextField
        multiline={3}
        onChange={handleDescriptionChange}
        value={val}
        name="completion"
      ></TextField>
    </div>
  );
}
