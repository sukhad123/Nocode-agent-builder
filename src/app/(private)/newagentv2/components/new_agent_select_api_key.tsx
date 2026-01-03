import { Input } from "@heroui/react";
import createNewAPIKEY from "@/services/api_key/create";
import { Select, SelectItem } from "@heroui/react";
import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import { useAgent } from "../../contexts/nodeContext";
import fetchALLAPIKEYS from "@/services/api_key/fetch_all";
export default function APIInput() {
  const { setOpenaiAPIKey, openaiAPIKey } = useAgent();
  const [loading, setLoading] = useState(false);
  console.log("OPEANI API KEY", openaiAPIKey);
  //Fetch stored from db
  const [apiKeys, setApiKeys] = useState([
    { key: "cat", label: "Cat" },
    { key: "dog", label: "Dog" },
    { key: "custom", label: "Create New One" },
  ]);
  useEffect(() => {
    async function fetchKeys() {
      try {
        setLoading(true);
        const res = await fetchALLAPIKEYS();
        //If that's an array
        if (Array.isArray(res)) {
          setApiKeys([
            ...res.map((item) => ({
              key: item.api_key,
              label: item.api_key_name,
            })),
            { key: "custom", label: "Create New One" },
          ]);
        }
      } catch (error) {
        console.error("Error fetching API keys:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchKeys();
  }, []);

  const [value, setValue] = useState(openaiAPIKey);

  const handleSelectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selected = event.target.value;
    setValue(selected);
    if (selected != "custom") setOpenaiAPIKey(selected);
  };

  //api and nickname
  const [credentialName, setCredentialName] = useState<string>("");
  const [credential, setCredential] = useState<string>("");
  //on new openai key submitted
  const onHandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (apiKeys.some((item) => item.key === credentialName)) {
      return alert("Key already exists!");
    }
    setApiKeys((prev) => [...prev, { key: credential, label: credentialName }]);
    setValue(credential);
    setOpenaiAPIKey(credential);
    console.log("hi");
    //save data to database
    try {
      //Store the data in our db
      await createNewAPIKEY({
        api_key_name: credentialName,
        api_key: credential,
      });
    } catch (error) {
      console.log(error);
    }

    //Set everything to default
    setCredential("");
    setCredentialName("");
    setLoading(false);
  };
  const [btnStatus, setStatus] = useState<boolean>(false);
  //update the status if any of those change
  useEffect(() => {
    if (credentialName && credential) {
      // set the btn status to true
      setStatus(true);
    } else {
      setStatus(false);
    }
  }, [credential, credentialName]);

  //TODO: LOGIC TO SAVE API KEY GOES HERE
  return (
    <>
      <Select
        aria-label="OpenAI API Key"
        className="w-full"
        items={apiKeys}
        placeholder="OpenAI API KEY"
        variant="bordered"
        value={value}
        onChange={handleSelectionChange}
      >
        {apiKeys.map((item) => (
          <SelectItem key={item.key}>{item.label}</SelectItem>
        ))}
      </Select>

      {/**Open Input Field when the custom is selected */}
      {value === "custom" && (
        <div>
          <form onSubmit={onHandleSubmit} className="flex flex-col gap-4 p-4">
            <Input
              required
              placeholder="Credential Name"
              type="text"
              variant="bordered"
              value={credentialName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setCredentialName(e.target.value);
              }}
            />
            <Input
              required
              placeholder="OpenAI Api Key"
              type="text"
              variant="bordered"
              value={credential}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setCredential(e.target.value);
              }}
            />
            <Button
              type="submit"
              isLoading={loading}
              isDisabled={!btnStatus}
              color="primary"
            >
              {" "}
              Add
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
