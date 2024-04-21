import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { URLVALUE } from "../../config";

const GlobalSearchBar = () => {
  const API_URL = `${URLVALUE}/api/v1/problems`;

  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const navigate = useNavigate();

  const getSuggestions = async inputValue => {
    setIsLoading(true);
    try {
      const response = await axios.get(API_URL + `/search?search=${inputValue}`);
      const { data } = response.data;

      const formattedResults = data.results.map(result => ({
        title: result.title,
        _id: result._id,
        type: result.type
      }));

      setSuggestions(formattedResults);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
    setIsLoading(false);
  };

  const getSuggestionValue = suggestion => suggestion.title;

  const renderSuggestion = (suggestion, { isHighlighted }) => (
    <div
      className={`cursor-pointer px-3 py-2 ${isHighlighted ? "bg-gray-100 font-bold" : "bg-gray-50"}`}
      onClick={() => {
        setValue("");
        navigate(`/${suggestion.type}/${suggestion._id}`);
      }}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}>
      {suggestion.title} ({suggestion.type})
    </div>
  );

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    getSuggestions(value);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: "Search problems...",
    value,
    onChange: onChange,
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false)
  };

  return (
    <div className="flex lg:mx-24">
      <div
        className={`absolute max-w-3xl z-10 w-full px-8 py-4 my-4 rounded-lg shadow-md ${
          isFocused ? "bg-gray-50" : "bg-gray-50"
        }`}>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={{
            ...inputProps,
            className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
          }}
        />
      </div>
    </div>
  );
};

export default GlobalSearchBar;
