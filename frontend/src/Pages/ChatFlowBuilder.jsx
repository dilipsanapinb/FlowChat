import { Box, Button, Flex, Input, InputGroup, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFocusScope, ModalFooter, ModalHeader, ModalOverlay ,Text} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import axios from 'axios'
import { useParams } from 'react-router-dom';
const ChatFlowBuilder = () => {
  // const { chatFlowId } = useParams();
  const chatFlowId="64d7664937cea2422e334e11"
  const [nodes, setNodes] = useState([]);
  // console.log(nodes);

  const [isNodeModalOpen, setNodeModalOpen] = useState(false);
  const [newNodeContent, setNewNodeContent] = useState('');
  const [editedNodeContent, setEditedNodeContent] = useState('');
const [isEditModalOpen, setEditModalOpen] = useState(false);
const [editingNodeId, setEditingNodeId] = useState(null);
const [isLoading, setIsLoading] = useState(true);
const [selectedNodeContent, setSelectedNodeContent] = useState('');

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedNodes = Array.from(nodes);
    const [moveNode] = reorderedNodes.splice(result.source.index, 1);
    reorderedNodes.splice(result.destination.index, 0, moveNode);

    setNodes(reorderedNodes);
  }

  // useEffect

  useEffect(() => {
    const fetchChatNodes = async () => {
      try {
        const response = await axios.get(`https://chatflowbackend.onrender.com/chatNode/api/chat-flows/64d7664937cea2422e334e11/chat-nodes`);
        console.log(response.data.chatNodes);
        setNodes(response.data.chatNodes);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }
    fetchChatNodes()
  },[chatFlowId]);

  const handleAddNode = async () => {
    if (newNodeContent.trim() === '') return;

    try {

      const token = JSON.parse(localStorage.getItem('userInfo'));
      const response = await axios.post(`https://chatflowbackend.onrender.com/chatNode/api/chat-nodes`, {
      type: 'text', // Set the type based on your requirements
      content: newNodeContent,
      options: ["add text"], // Options array
      position: nodes.length + 1, // Position based on current nodes count
      chatFlow: chatFlowId, // ID of the current chat flow
      }, {
         headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      });

      const newNode = response.data.node;
      setNodes([...nodes, newNode]);
      setNewNodeContent('');
      setNodeModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  }

  // delete node

  const handleDeleteNode = async (nodeId) => {
    try {
    const token = JSON.parse(localStorage.getItem('userInfo'));
    await axios.delete(`https://chatflowbackend.onrender.com/chatNode/api/chat-nodes/${nodeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Remove the deleted node from the local state
    setNodes(nodes.filter((node) => node._id !== nodeId));
  } catch (error) {
    console.error(error);
  }
  };
  // edit the modal
  const handleEditNodeContent = async (nodeId, content) => {
  try {
    const token = JSON.parse(localStorage.getItem('userInfo'));
    await axios.put(
      `https://chatflowbackend.onrender.com/chatNode/api/chat-nodes/${nodeId}`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Update the edited node's content in the local state
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node._id === nodeId ? { ...node, content } : node
      )
    );
  } catch (error) {
    console.error(error);
  }
};

 
  return (
    <div>
      
      <Navbar />
      <div>
        <Flex
          justifyContent={'center'}
          alignItems={'center'}
          height={'100vh'}
        >
          {/* DragDropContent */}
          <DragDropContext
          onDragEnd={handleDragEnd}
          
        >
          {console.log(nodes)} 
          {isLoading ? (<p>Loading...</p>) : (<Droppable
            droppableId='chat-nodes'
            >{
                (provided) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                  >
                    {
                      nodes.map((node,index)=>(
                        
                    <Draggable
                      key={node._id}
                      draggableId={node._id}
                      index={index}
                        >
                          
                          {
                            (provided) => (
                              <Box
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                bg={'gray.200'}
                                p={4}
                                m={2}
                                borderRadius={'md'}
                                boxShadow={'md'}
                                mb={2}
    
                              >
                                <Flex
                                  justifyContent={'space-between'}
                                  align={'center'}
                                >
                                  <Text
                                  fontSize={'lg'}
                                  >
                                    {node.content}
                                  </Text>
                                  <Button
            colorScheme='blue'
            size='sm'
            onClick={(e) => {
              e.stopPropagation();
              setEditingNodeId(node._id);
              setEditedNodeContent(node.content);
              setEditModalOpen(true);
            }}
          >
            Edit
          </Button>
                                  {/* Add a delete button */}
                            <Button
                              colorScheme='red'
                              size='sm'
                              onClick={() => handleDeleteNode(node._id)}
                            >
                              Delete
                            </Button>
                                </Flex>
                              </Box>
                            )}
                    </Draggable>
                      ))}
                    {provided.placeholder}
                  </Box>
                )}
              

              {/* Dropable */}
            </Droppable>)}
            
          </DragDropContext>
          <Button
            mt={4}
            onClick={()=>setNodeModalOpen(true)}
          >
            Add Node
          </Button>

          {/* Node creation Modal */}

          <Modal
            isOpen={isNodeModalOpen}
            onClose={()=>setNodeModalOpen(false)}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add New Node</ModalHeader>
              <ModalCloseButton />
              
              <ModalBody>
                <Input
                  placeholder='Enter node content'
                  value={newNodeContent}
                  onChange={(e)=>setNewNodeContent(e.target.value)}
                >
                </Input>
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme='blue'
                  mr={3}
                  onClick={handleAddNode}
                >
                  Add
                </Button>
                <Button
                onClick={()=>setNodeModalOpen(false)}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
      {/* Node creation modal end */}
      
      {/* Edit modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Edit Node Content</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      <Input
        placeholder='Edit node content'
        value={editedNodeContent}
        onChange={(e) => setEditedNodeContent(e.target.value)}
      />
    </ModalBody>
    <ModalFooter>
      <Button
        colorScheme='blue'
        mr={3}
        onClick={() => {
          // Update the content of the node
          // You need to implement this function
          handleEditNodeContent(editingNodeId, editedNodeContent);
          setEditModalOpen(false);
        }}
      >
        Save
      </Button>
      <Button onClick={() => setEditModalOpen(false)}>Cancel</Button>
    </ModalFooter>
  </ModalContent>
</Modal>

          {/* edit modal end */}
          
        </Flex>
        <Box
          border={'1px solid black'}
          height={'200px'}
        >
          <InputGroup>
          <Input
          border={'1px solid gray'}
          >
            </Input>
            <Button
            colorScheme='blue'
            >
              Send
            </Button>
          </InputGroup>
        </Box>
      </div>
      <Footer/>
      </div>
  )
}

export default ChatFlowBuilder