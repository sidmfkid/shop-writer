import {
  Modal,
  TextContainer,
  Card,
  ResourceList,
  Avatar,
  ResourceItem,
  TextStyle,
} from "@shopify/polaris";
import axios from "axios";
// import useAxiosFetch from "../hooks/useAxiosFetch";
import { useState, useEffect, useCallback } from "react";
import { useMutation, useQuery } from "react-query";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";
import { authenticatedFetch } from "@shopify/app-bridge-utils";
import { useAppBridge } from "@shopify/app-bridge-react";
function renderItem(item) {
  const { id, title, active, created_at } = item;

  return (
    <ResourceItem
      id={id}
      active={active}
      accessibilityLabel={`View details for ${title}`}
    >
      <h3>
        <TextStyle variation="strong">{title}</TextStyle>
      </h3>
      {/* <div>{created_at}</div> */}
    </ResourceItem>
  );
}

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

function ProductsModal(props) {
  const emptyProductProps = {
    id: null,
    created_at: null,
    title: null,
    active: null,
  };
  const [selectedItems, setSelectedItems] = useState([]);
  const [productProps, setProductProps] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const [isFetched, setIsFetched] = useState(false);

  const { active, handleClose, handleOpen } = props;

  const useFetch = useAuthenticatedFetch();

  const {
    data,
    refetch: refetchProduct,
    isLoading: isLoadingList,
    isRefetching: isRefetchingList,
  } = useAppQuery({
    url: "/api/products/import",
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

  const resourceName = {
    singular: "product",
    plural: "products",
  };

  const handleImportClick = useCallback(async () => {
    // console.log();
    const formData = new FormData();
    formData.set("products", selectedItems);
    const finalData = serialize(formData);
    const params = new URLSearchParams(finalData).toString();
    console.log(params);
    const data = await useFetch("/api/products/import/?" + params, {
      method: "post",
    }).then((response) => response.json());

    console.log(data);
  }, []);

  const list = () => {
    if (isFetched && !isLoadingList) {
      const items = data?.map((v) => {
        return {
          id: v.id,
          created_at: v.created_at,
          title: v.title,
          active: v.active,
        };
      });

      return (
        <ResourceList
          resourceName={resourceName}
          items={items}
          renderItem={renderItem}
          selectedItems={selectedItems}
          onSelectionChange={setSelectedItems}
          selectable
        />
      );
    }
    if (!isFetched) {
      return <span>Loading...</span>;
    }
  };
  console.log(isLoadingList, "LOADING LIST");

  console.log(data);

  return (
    <Modal
      open={active}
      onClose={handleClose}
      title="Select Products To Import Below"
      primaryAction={{
        content: "Import (" + selectedItems.length + ") Products",
        onAction: handleImportClick,
      }}
      secondaryActions={[
        {
          content: "Learn more",
          onAction: handleClose,
        },
      ]}
    >
      <Modal.Section>{list()}</Modal.Section>
    </Modal>
  );
}

export { ProductsModal };
