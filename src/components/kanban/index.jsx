import './kanban.scss'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import mockData from '../../mockData'
import { apiData } from '../../getData'
import { useState, useEffect } from 'react'
import Card from '../card'
import React from 'react'

const Kanban = () => {
    const [data, setData] = useState(mockData)
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);  

useEffect(() => { 
  apiData()
    .then((res) => {
        console.log(res);
        for (let element of res) {
            let dummyData = {}
            dummyData.id = element.task_id;
            dummyData.title = element.title;
            if (element.task_status === 'todo')
                mockData[0].tasks.push(dummyData)
            else if (element.task_status === 'inprogress')
                mockData[1].tasks.push(dummyData)
            else if (element.task_status === 'testing')
                mockData[2].tasks.push(dummyData)
            else if (element.task_status === 'completed')
                mockData[3].tasks.push(dummyData)
            else {}
            
    }
        // let req_check = res[3].title
        // mockData[0].tasks[0].title = req_check
        // console.log(mockData[0].tasks[0].title)
        // setData(mockData)
        forceUpdate()
    })
    .catch(error => {
      // handle any error state, rejected promises, etc..
     });
}, []);
    
    if(data){
    const onDragEnd = result => {
        if (!result.destination) return
        const { source, destination } = result

        if (source.droppableId !== destination.droppableId) {
            const sourceColIndex = data.findIndex(e => e.id === source.droppableId)
            const destinationColIndex = data.findIndex(e => e.id === destination.droppableId)

            const sourceCol = data[sourceColIndex]
            const destinationCol = data[destinationColIndex]

            const sourceTask = [...sourceCol.tasks]
            const destinationTask = [...destinationCol.tasks]

            const [removed] = sourceTask.splice(source.index, 1)
            destinationTask.splice(destination.index, 0, removed)

            data[sourceColIndex].tasks = sourceTask
            data[destinationColIndex].tasks = destinationTask

            setData(data)
        }
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="kanban">
                {
                    data.map(section => (
                        <Droppable
                            key={section.id}
                            droppableId={section.id}
                        >
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    className='kanban__section'
                                    ref={provided.innerRef}
                                >
                                    <div className="kanban__section__title">
                                        {section.title}
                                    </div>
                                    <div className="kanban__section__content">
                                        {
                                            section.tasks.map((task, index) => (
                                                <Draggable
                                                    key={task.id}
                                                    draggableId={task.id}
                                                    index={index}
                                                >
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={{
                                                                ...provided.draggableProps.style,
                                                                opacity: snapshot.isDragging ? '0.5' : '1'
                                                            }}
                                                        >
                                                            <Card>
                                                                {task.title}
                                                            </Card>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))
                                        }
                                        {provided.placeholder}
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    ))
                }
            </div>
        </DragDropContext>
    )
}}

export default Kanban