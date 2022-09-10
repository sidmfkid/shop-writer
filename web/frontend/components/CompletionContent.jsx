import { useState, useCallback, useMemo } from "react";
import { Button, TextContainer, TextField } from "@shopify/polaris";

export function CompletionContent(props) {
  const { data } = props;
  console.log(data);

  return (
    <TextContainer>
      <div>Input Prompt:</div>
      <div>{data.prompt}</div>
      <div>Output:</div>
      <div>{data.completion.content}</div>
    </TextContainer>
  );
}
