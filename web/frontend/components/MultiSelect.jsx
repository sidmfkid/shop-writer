import {
  TextStyle,
  Stack,
  Tag,
  Listbox,
  EmptySearchResult,
  Combobox,
} from "@shopify/polaris";
import { useState, useCallback, useMemo } from "react";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";

export function MultiSelect(props) {
  const {
    productId,
    data,
    isLoadingProduct,
    isFetched,
    selectedTags,
    setSelectedTags,
  } = props;

  //   const [selectedTags, setSelectedTags] = useState([]);
  const [value, setValue] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [isTags, setIsTags] = useState(false);

  const handleActiveOptionChange = useCallback(
    (activeOption) => {
      const activeOptionIsAction = activeOption === value;

      if (!activeOptionIsAction && !selectedTags.includes(activeOption)) {
        setSuggestion(activeOption);
      } else {
        setSuggestion("");
      }
    },
    [value, selectedTags]
  );
  const updateSelection = useCallback(
    (selected) => {
      console.log(selectedTags);
      const nextSelectedTags = new Set([...selectedTags]);

      if (nextSelectedTags.has(selected)) {
        nextSelectedTags.delete(selected);
      } else {
        nextSelectedTags.add(selected);
      }
      setSelectedTags([...nextSelectedTags]);
      setValue("");
      setSuggestion("");
    },
    [selectedTags]
  );
  const removeTag = useCallback(
    (tag) => () => {
      updateSelection(tag);
    },
    [updateSelection]
  );

  const getAllTags = useCallback(() => {
    let arr;
    if (isFetched && !isLoadingProduct) {
      arr = data.body.tags[0].split(",");
      if (!isTags) {
        setSelectedTags(arr);
      }
      setIsTags(true);
    } else {
      arr = [""];
    }

    const savedTags = arr;
    console.log(savedTags);
    return [...new Set([...savedTags, ...selectedTags].sort())];
  }, [isLoadingProduct, isTags]);

  const formatOptionText = useCallback(
    (option) => {
      const trimValue = value.trim().toLocaleLowerCase();
      const matchIndex = option.toLocaleLowerCase().indexOf(trimValue);

      if (!value || matchIndex === -1) return option;

      const start = option.slice(0, matchIndex);
      const highlight = option.slice(matchIndex, matchIndex + trimValue.length);
      const end = option.slice(matchIndex + trimValue.length, option.length);

      return (
        <p>
          {start}
          <TextStyle variation="strong">{highlight}</TextStyle>
          {end}
        </p>
      );
    },
    [value]
  );

  const options = useMemo(() => {
    let list;
    const allTags = getAllTags();
    const filterRegex = new RegExp(value, "i");

    if (value) {
      list = allTags.filter((tag) => tag.match(filterRegex));
    } else {
      list = allTags;
    }

    return [...list];
  }, [value, getAllTags]);

  if (isLoadingProduct) {
    return <div>Loading...</div>;
  }
  if (!isLoadingProduct && isFetched && data !== undefined) {
    console.log(data, "inside if");
    const verticalContentMarkup =
      selectedTags.length > 0 &&
      isFetched &&
      !isLoadingProduct &&
      data !== undefined ? (
        <Stack spacing="extraTight" alignment="center">
          {selectedTags.map((tag) => (
            <Tag key={`option-${tag}`} onRemove={removeTag(tag)}>
              {tag}
            </Tag>
          ))}
        </Stack>
      ) : null;

    const optionMarkup =
      options.length > 0 && isFetched && !isLoadingProduct && data !== undefined
        ? options.map((option) => {
            return (
              <Listbox.Option
                key={option}
                value={option}
                name="tags"
                selected={selectedTags.includes(option)}
                accessibilityLabel={option}
              >
                <Listbox.TextOption selected={selectedTags.includes(option)}>
                  {formatOptionText(option)}
                </Listbox.TextOption>
              </Listbox.Option>
            );
          })
        : null;

    const noResults = value && !getAllTags().includes(value);

    const actionMarkup = noResults ? (
      <Listbox.Action value={value}>{`Add "${value}"`}</Listbox.Action>
    ) : null;

    const emptyStateMarkup = optionMarkup ? null : (
      <EmptySearchResult
        title=""
        description={`No tags found matching "${value}"`}
      />
    );

    const listboxMarkup =
      optionMarkup || actionMarkup || emptyStateMarkup ? (
        <Listbox
          autoSelection="FIRST"
          onSelect={updateSelection}
          name="tags"
          onActiveOptionChange={handleActiveOptionChange}
        >
          {actionMarkup}
          {optionMarkup}
        </Listbox>
      ) : null;

    return (
      isFetched &&
      !isLoadingProduct &&
      data !== undefined && (
        <div style={{ height: "auto" }}>
          <Combobox
            allowMultiple
            name="tags"
            activator={
              <Combobox.TextField
                autoComplete="off"
                label="Search tags"
                name="tags"
                labelHidden
                value={value}
                suggestion={suggestion}
                placeholder="Search tags"
                verticalContent={verticalContentMarkup}
                onChange={setValue}
              />
            }
          >
            {listboxMarkup}
          </Combobox>
        </div>
      )
    );
  }
  //   const optionsFetched = () => {
  //     if (isFetched && isLoadingProduct) {
  //       return arr;
  //     }
  //   };
}
