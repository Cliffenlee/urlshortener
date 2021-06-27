import {Box, Button, Flex, Heading, Input, InputGroup, InputLeftAddon, InputRightAddon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure} from "@chakra-ui/react";
import { useRef, useState } from "react";
import {LinkIcon} from "@chakra-ui/icons";
import validator from "validator";
import axios from "axios";

export default function Home() {

  const url = useRef()
  const URL = "http://localhost:8080/"
  const [result, setResult] = useState("")
  const { isOpen, onOpen, onClose } = useDisclosure()

  async function getShortenedUrl () {
    if (validator.isURL(url.current.value)) {
      console.log("valid")
      const request = {long_url: url.current.value}
      const response = await axios.post(URL+"url", request)

      if (response.status == 200) {
        console.log(response)
        const url = URL+response.data.code
        console.log(url)
        //show success message
        setResult(
            <InputGroup size="md">
              <InputLeftAddon children={<LinkIcon/>}/>
              <Input _placeholder={{ color: 'black' }} fontWeight="500" color="black" placeholder={url} borderTopEndRadius={0} borderBottomEndRadius={0} disabled={true}/>
              <Button borderTopStartRadius={0} borderBottomStartRadius={0} colorScheme="green" onClick={() => {navigator.clipboard.writeText(url)}}>Copy Link</Button>
            </InputGroup>)
        onOpen()
      } else {
        // error message

      }
    } else {
      console.log("invalid")
      //error message
    }
  }

  return (
    <Flex position="relative" flexDirection="column" width="100vw" height="100vh" alignItems="center" justifyContent="center" backgroundColor="gray.100">
      <Box position="absolute" top="0" left="0" height={20} width="100%" textAlign="center" backgroundColor="blue.100">
          <Heading color="black" mt={15} size="lg">URL Shortener</Heading>
      </Box>
      <Flex position="relative" flexDirection="column" width="50%" height="30%" alignItems="center" justifyContent="space-between" padding={8} borderRadius={20} backgroundColor="white">
          <Input ref={url} mt={10} width="70%" placeholder="Input your URL!" size="md"/>
          <Button position="absolute" bottom={10} onClick={getShortenedUrl} width="20%"colorScheme="blue">Shorten</Button>
      </Flex>
      <Modal size="xl" isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Your link has been generated!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {result}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  )
}
