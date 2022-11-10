import { v4 as uuidv4 } from 'uuid'

let mockData = [
    {
        id: uuidv4(),
        title: '📝 To Do',
        tasks: []
    },
    {
        id: uuidv4(),
        title: '⏳ In Progress',
        tasks: []
    },
    {
        id: uuidv4(),
        title: '🛠️ Testing',
        tasks: []
    },
    {
        id: uuidv4(),
        title: '✅ Completed',
        tasks: []
    }
];


export default mockData

