// Complete the Index page component for a basic Todo application
import { useState } from "react";
import { Box, Input, Button, List, ListItem, IconButton, Text, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash, FaCheck } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();

  const handleAddTask = () => {
    if (inputValue.trim() === "") {
      toast({
        title: "No task entered.",
        description: "Please enter a task before adding.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const newTask = {
      id: Date.now(),
      text: inputValue,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
    setInputValue("");
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleCompleteTask = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <Box p={5}>
      <Box mb={4}>
        <Input placeholder="Add a new task..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} size="lg" />
        <Button leftIcon={<FaPlus />} colorScheme="blue" ml={2} onClick={handleAddTask}>
          Add Task
        </Button>
      </Box>
      <List spacing={3}>
        {tasks.map((task) => (
          <ListItem key={task.id} p={2} bg={task.isCompleted ? "green.100" : "gray.100"} borderRadius="md">
            <Text as={task.isCompleted ? "s" : "span"}>{task.text}</Text>
            <IconButton icon={<FaCheck />} aria-label="Complete Task" colorScheme="green" size="sm" ml={2} onClick={() => handleCompleteTask(task.id)} isDisabled={task.isCompleted} />
            <IconButton icon={<FaTrash />} aria-label="Delete Task" colorScheme="red" size="sm" ml={2} onClick={() => handleDeleteTask(task.id)} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Index;
