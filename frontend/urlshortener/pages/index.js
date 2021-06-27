import {Box, Button, Flex, Heading, Input, InputGroup, InputLeftAddon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useDisclosure, useToast} from "@chakra-ui/react";
import { useRef, useState } from "react";
import {LinkIcon} from "@chakra-ui/icons";
import validator from "validator";
import axios from "axios";

export default function Home() {

  const url = useRef()
  const URL = "http://localhost:8080/"
  const [result, setResult] = useState("")
  const [button, setButton] = useState(<Button  onClick={getShortenedUrl} width="20%"colorScheme="blue">Shorten</Button>)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  async function getShortenedUrl () {
    try {
      setButton(
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      )
      if (validator.isURL(url.current.value)) {
        console.log("valid")
        const request = {long_url: url.current.value}
        const response = await axios.post(URL+"url", request)

        if (response.status == 200) {
          console.log(response)
          const resultUrl = URL+response.data.code
          console.log(url)
          setResult(
              <InputGroup size="md">
                <InputLeftAddon children={<LinkIcon/>}/>
                <Input _placeholder={{ color: 'black' }} fontWeight="500" color="black" placeholder={resultUrl} borderTopEndRadius={0} borderBottomEndRadius={0} disabled={true}/>
                <Button borderTopStartRadius={0} borderBottomStartRadius={0} colorScheme="green" onClick={() => {navigator.clipboard.writeText(resultUrl)}}>Copy Link</Button>
              </InputGroup>)
          onOpen()
        } else {
          toast({
            title: "Failed",
            description: "Failed to shorten URL.",
            status: "error",
            duration: 5000,
            isClosable: true,
          })
        }
      } else {
        toast({
          title: "Invalid",
          description: "Please enter a valid URL!",
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      }
    } catch (error) {
      console.log(error)
      toast({
        title: "Failed",
        description: "Failed to shorten URL.",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setButton(
        <Button onClick={getShortenedUrl} width="20%"colorScheme="blue">Shorten</Button>
      )
    }

  }

  return (
    <Flex position="relative" flexDirection="column" width="100vw" height="100vh" alignItems="center" justifyContent="center" backgroundColor="gray.100">
      <Box position="absolute" top="0" left="0" height={20} width="100%" textAlign="center" backgroundColor="blue.100">
          <Heading color="black" mt={15} size="lg">URL Shortener</Heading>
      </Box>
      <Flex flexDirection="column" width="50%" height="25%" alignItems="center" justifyContent="space-between" padding={8} borderRadius={20} backgroundColor="white">
          <Input ref={url} mt={10} width="70%" placeholder="Input your URL!" size="md"/>
          {button}
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
