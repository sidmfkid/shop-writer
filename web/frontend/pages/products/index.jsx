import {
  Card,
  Page,
  Layout,
  TextContainer,
  Heading,
  Subheading,
  FormLayout,
  TextField,
  TextStyle,
  Stack,
  Tag,
  Listbox,
  EmptySearchResult,
  Combobox,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { MultiSelect } from "../../components";

export default function EditProducts() {
  return (
    <Page>
      <TitleBar
        title="Edit Products"
        // primaryAction={{
        //   content: "Primary action",
        //   onAction: () => console.log("Primary action"),
        // }}
        // secondaryActions={[
        //   {
        //     content: "Secondary action",
        //     onAction: () => console.log("Secondary action"),
        //   },
        // ]}
      />
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Heading>Prompt Parameters bucl</Heading>
            <Subheading>Tags</Subheading>
            {/* <MultiSelect /> */}
          </Card>
          <Card sectioned>
            <Heading>Heading</Heading>
            <TextContainer>
              <p>Body</p>
            </TextContainer>
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
