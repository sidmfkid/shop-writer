import {
  Card,
  Page,
  Layout,
  TextContainer,
  Heading,
  Subheading,
  FormLayout,
  Form,
  TextField,
  TextStyle,
  Stack,
  Tag,
  Listbox,
  EmptySearchResult,
  Button,
  Combobox,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { CompletionContent, MultiSelect } from "../../components";
import { useAppQuery, useAuthenticatedFetch } from "../../hooks";
import { useState, useCallback, useMemo } from "react";

function serialize(data) {
  let obj = {};
  for (let [key, value] of data) {
    if (obj[key] !== undefined) {
      if (!Array.isArray(obj[key])) {
        obj[key] = [obj[key]];
      }
      obj[key].push(value);
    } else {
      obj[key] = value;
    }
  }
  return obj;
}

export default function EditProduct() {
  const path = window.location.pathname;
  const id = path.slice(path.indexOf("/", 1), path.length);
  const [isFetched, setIsFetched] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagValue, setTagValue] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [isDescription, setIsDescription] = useState(false);
  const [promptValue, setPromptValue] = useState("");
  const [isPrompt, setIsPrompt] = useState(false);

  const [isTitle, setIsTitle] = useState(false);

  const fetch = useAuthenticatedFetch();
  const {
    data,
    refetch: refetchProduct,
    isLoading: isLoadingProduct,
    isRefetching: isRefetchingProduct,
  } = useAppQuery({
    url: "/api/products/edit" + id,
    reactQueryOptions: {
      onError: () => {
        console.log("error");
      },
      onSuccess: () => {
        console.log("query fired!");
        console.log(data);

        setIsFetched(true);
      },
    },
  });

  const getTitleValue = useCallback(() => {
    if (isFetched ?? !isLoadingProduct) {
      if (!isTitle) {
        setTitleValue(data.body.title);
      }
      setIsTitle(true);

      return data.body.title;
    }
  }, [isLoadingProduct, isTitle]);

  const getDescriptionValue = useCallback(() => {
    if (isFetched ?? !isLoadingProduct) {
      if (!isDescription) {
        setDescriptionValue(data.body.currentDescription);
      }
      setIsDescription(true);

      return data.body.currentDescription;
    }
  }, [isLoadingProduct, isDescription]);

  // const getPromptValue = useCallback(() => {
  //   if (isFetched ?? !isLoadingProduct) {
  //     if (!isPrompt) {
  //       setPromptValue(data.body.currentDescription);
  //     }
  //     setIsPrompt(true);

  //     return data.body.currentDescription;
  //   }
  // }, [isLoadingProduct, isPrompt]);

  const title = useMemo(() => {
    let title;
    if (isFetched ?? !isLoadingProduct) {
      title = getTitleValue();
    }
    return title;
  }, [titleValue, getTitleValue]);

  const description = useMemo(() => {
    let description;
    if (isFetched ?? !isLoadingProduct) {
      description = getDescriptionValue();
    }
    return description;
  }, [descriptionValue, getDescriptionValue]);

  const handleTitleChange = useCallback(
    (newValue) => setTitleValue(newValue),
    []
  );
  const handleDescriptionChange = useCallback((newValue) => {
    setDescriptionValue(newValue);
  }, []);

  const handlePromptChange = useCallback((newValue) => {
    setPromptValue(newValue);
    // console.log(newValue);
  }, []);

  const completions =
    isFetched ?? !isLoadingProduct ?? data !== undefined ? (
      data.body.generatedContent.map((data) => {
        return (
          <Card.Section>
            <CompletionContent
              refetchProduct={refetchProduct}
              key={data._id}
              completionId={data._id}
              data={data}
            />
          </Card.Section>
        );
      })
    ) : (
      <div> Loading..</div>
    );

  const titleField =
    isFetched ?? !isLoadingProduct ?? data !== undefined ? (
      <TextField
        name="title"
        onChange={handleTitleChange}
        label="Product Title"
        value={titleValue}
      ></TextField>
    ) : (
      <TextField label="Product Title" value={"loading..."}></TextField>
    );

  const DescriptionField =
    isFetched ?? !isLoadingProduct ?? data !== undefined ? (
      <TextField
        name="description"
        label="Prompt"
        onChange={handlePromptChange}
        multiline={4}
        value={promptValue}
      ></TextField>
    ) : (
      <TextField label="CurrentDescription" value={"loading..."}></TextField>
    );

  const handleSubmit = useCallback(async (_event) => {
    console.log(_event.target);
    const formData = new FormData(_event.target);
    // console.log(
    //   formData.get("title"),
    //   formData.get("tags"),
    //   formData.get("description")
    // );
    // formData.set("id", id.toString());
    const formSerialized = serialize(formData);
    const params = new URLSearchParams(formSerialized).toString();
    console.log(params);
    const response = await fetch(
      "/api/products/edit/" + id.toString() + "/?" + params,
      {
        method: "post",
      }
    ).then((res) => res.json());

    if (response.success) {
      refetchProduct();
    }
    console.log(response);
    console.log(response.body);
  });

  console.log(id);
  return (
    <Page
      title="Generate Product Description"
      subtitle={"Product: " + titleValue}
      fullWidth
    >
      <TitleBar title="Generate Text" />
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Heading>Prompt Parameters ID</Heading>
            <Subheading>Tags</Subheading>
            <Form onSubmit={handleSubmit}>
              <FormLayout>
                {/* <MultiSelect
                  setSelectedTags={setSelectedTags}
                  selectedTags={selectedTags}
                  data={data}
                  isLoadingProduct={isLoadingProduct}
                  isFetched={isFetched}
                /> */}
                {DescriptionField}
                <Button submit>Generate</Button>
              </FormLayout>
            </Form>
          </Card>
          <Card sectioned>
            <Heading>Completions</Heading>

            {completions}
          </Card>
        </Layout.Section>
        <Layout.Section secondary>
          <Card sectioned>
            <Heading>Heading</Heading>
            <TextContainer>
              <p>Body</p>
            </TextContainer>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
