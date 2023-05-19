/**
 * Componenet criado pelo proprio framework;
 */
import React, { useCallback, useState } from 'react'
import shortid from 'shortid'
import { AntDesign } from '@expo/vector-icons'
import { Icon, VStack, useColorModeValue, Fab } from 'native-base'

/**
 * Componenet criado pelo proprio desenvolvedor;
 */
import NavBar from '../components/navbar'
import Masthead from '../components/masthead'
import TaskList from '../components/task-list'
import AnimatedColorBox from '../components/animated-color-box'

/**
 * Interface, Type e Variaveis do componente;
 */
const initialData = [
  {
    id: shortid.generate(),
    subject: 'Compre ingressos cinema',
    done: false
  },
  {
    id: shortid.generate(),
    subject: 'Final da Libertadores dia 28',
    done: false
  }
]

export default function MainScreen() {
  const [data, setData] = useState(initialData)
  const [editingItemId, setEditingItemId] = useState<string | null>(null)

  const handleToggleTaskItem = useCallback(item => {
    setData(prevData => {
      const newData = [...prevData]
      const index = prevData.indexOf(item)
      newData[index] = {
        ...item,
        done: !item.done
      }
      return newData
    })
  }, [])
  const handleChangeTaskItemSubject = useCallback((item, newSubject) => {
    setData(prevData => {
      const newData = [...prevData]
      const index = prevData.indexOf(item)
      newData[index] = {
        ...item,
        subject: newSubject
      }
      return newData
    })
  }, [])
  const handleFinishEditingTaskItem = useCallback(_item => {
    setEditingItemId(null)
  }, [])
  const handlePressTaskItemLabel = useCallback(item => {
    setEditingItemId(item.id)
  }, [])
  const handleRemoveItem = useCallback(item => {
    setData(prevData => {
      const newData = prevData.filter(i => i !== item)
      return newData
    })
  }, [])

  return (
    <AnimatedColorBox
      flex={1}
      bg={useColorModeValue('warmGray.50', 'primary.900')}
      w="full"
    >
      <Masthead
        title="Bem vindo, Silvanei!"
        image={require('../assets/masthead.png')}
      >
        <NavBar />
      </Masthead>
      <VStack
        flex={1}
        space={1}
        bg={useColorModeValue('warmGray.50', 'primary.900')}
        mt="-15px"
        borderTopLeftRadius="20px"
        borderTopRightRadius="20px"
        pt="15px"
      >
        <TaskList
          data={data}
          onToggleItem={handleToggleTaskItem}
          onChangeSubject={handleChangeTaskItemSubject}
          onFinishEditing={handleFinishEditingTaskItem}
          onPressLabel={handlePressTaskItemLabel}
          onRemoveItem={handleRemoveItem}
          editingItemId={editingItemId}
        />
      </VStack>
      <Fab
        size="sm"
        position="absolute"
        renderInPortal={false}
        bg={useColorModeValue('blue.500', 'blue.400')}
        colorScheme={useColorModeValue('blue', 'darkBlue')}
        icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
        onPress={() => {
          const id = shortid.generate()
          setData([
            {
              id,
              subject: '',
              done: false
            },
            ...data
          ])
          setEditingItemId(id)
        }}
      />
    </AnimatedColorBox>
  )
}
