import {Box, Button, Flex, Heading, Input} from "@chakra-ui/react";
import { useRef } from "react";
import validator from "validator";
import axios from "axios";

export default function Home() {

  const url = useRef()
  const URL = "http://localhost:8080"

  async function getShortenedUrl () {
    if (validator.isURL(url.current.value)) {
      console.log("valid")
      const request = {long_url: url.current.value}
      const response = await axios.post(URL+"/url", request)

      if (response.status == 200) {
        const url = URL+response.data.long_url
        console.log(url)
        //show success message
      } else {
        // error message

      }
    } else {
      console.log("invalid")
      //error message
    }
  }

  return (
    <Flex flexDirection="column" width="100vw" height="100vh" alignItems="center" backgroundColor="gray.100">
      <Box height={20} width="100%" textAlign="center" backgroundColor="blue.100">
          <Heading color="black" mt={15} size="lg">URL Shortener</Heading>
      </Box>
      <Flex flexDirection="column" width="50%" height="50%" alignItems="center" padding={8} borderRadius={20} mt="20vh" backgroundColor="white">
          <Input ref={url} mt={20} width="70%" placeholder="Input your URL!" size="md"/>
          <Button onClick={getShortenedUrl} width="20%" mt={10} colorScheme="blue">Shorten</Button>
      </Flex>
    </Flex>
  )
}
