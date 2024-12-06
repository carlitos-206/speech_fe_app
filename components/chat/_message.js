import { v4 as uuidv4 } from 'uuid';

export const init_messages = [
{
    id: uuidv4(),
    text: `Hey there! Welcome to BlueChatter—the app that'll help you boost your speech. Just pick a phrase, record yourself saying it, and our AI will give you some friendly feedback on how your accent lines up with the American standard. Ready to give it a try?`,
    sender: 'app',
    value: 0
},
{ 
    id: uuidv4(), 
    text: 'Tap an option:', 
    sender: 'app' ,
    value: 0
},
{
    id: uuidv4(),
    text: `"Let's meet at the coffee shop. We can catch up there."`,
    sender: 'option',
    value: 1
},
{
    id: uuidv4(),
    text: `"I recently started learning to play the guitar. It's challenging but incredibly rewarding."`,
    sender: 'option',
    value: 2
},
{
    id: uuidv4(),
    text: `"Converging technological innovations can disrupt traditional industries and redefine market paradigms."`,
    sender: 'option',
    value: 3
},
];
