import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  CalloutCard,
  Heading,
  Modal,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useState, useCallback, useRef } from "react";
import { trophyImage } from "../assets";
import typeWriter from "../assets/typeWriter.svg";

import { ProductsCard, ProductsModal } from "../components";

export default function HomePage() {
  const [active, setActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpen = useCallback(() => {
    setActive(true);
  }, []);

  const handleClose = useCallback(() => {
    setActive(false);
    requestAnimationFrame(() => button.current.querySelector("button").focus());
  }, []);

  const button = useRef();

  return (
    <Page narrowWidth>
      <TitleBar title="Shop Writer" primaryAction={null} />
      <Layout>
        <Layout.Section>
          <div ref={button}>
            <CalloutCard
              title="Start more selling and less writing"
              illustration={typeWriter}
              primaryAction={{
                content: "Import Products",
                onAction: handleOpen,
                loading: isLoading,
              }}
            >
              <p>
                Start importing products you want top quality descriptions
                generated for using our AI Model.
              </p>
            </CalloutCard>
          </div>

          {/* <Card sectioned>
            <TextContainer>
              <Heading>This Is My Header</Heading>
            </TextContainer>
          </Card> */}
        </Layout.Section>
        {/* <Layout.Section>

          <Card sectioned>
            <TextContainer>
              <Heading>This Is My Header</Heading>
            </TextContainer>
          </Card>
        </Layout.Section> */}
      </Layout>

      <ProductsModal
        active={active}
        handleClose={handleClose}
        handleOpen={handleOpen}
      />
    </Page>
  );
}
