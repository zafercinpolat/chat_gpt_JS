const OPENAI_API_KEY ='API KEY';
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const charactersLength = characters.length;



const submitButton = document.querySelector('#submit');
const outPutElement = document.querySelector('#output');
const inputElement =  document.querySelector('input');
const historyElement = document.querySelector('.history');
const btnClear =  document.querySelector('#clear');

function makeRandomText(length) {
    let result = '';
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}


function clearhistory(){
    historyElement.textContent ='';
}

async function getmessage(){
    const options ={
        method :'POST',
        headers : {
            'Authorization' : `Bearer ${OPENAI_API_KEY}`,
            'Content-Type' : 'application/json'
        },
        body:JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: inputElement.value}],
            max_tokens:100
          })
    }
    
    try {

        const response =  await fetch('https://api.openai.com/v1/chat/completions', options)
        const data =  await response.json()
        console.log(data);
        outPutElement.textContent = data.choices[0].message.content;

    } catch (error) {

        const responseData = { 'id': 'chatcmpl-6p9XYPYSTTRi0xEviKjjilqrWU2Ve',
        'object': 'chat.completion',
        'created': 1677649420,
        'model': 'gpt-3.5-turbo',
        'usage': {'prompt_tokens': 56, 'completion_tokens': 31, 'total_tokens': 87},
        'choices': [
          {
           'message': {
             'role': 'assistant',
             'content': makeRandomText(50) },
           'finish_reason': 'stop',
           'index': 0
          }
         ]}
         console.log(responseData.choices[0].message.content);
         outPutElement.textContent = responseData.choices[0].message.content;
         const pElement =  document.createElement('p');
         pElement.textContent = inputElement.value;
         historyElement.append(pElement)

    }
}



submitButton.addEventListener('click', getmessage);
btnClear.addEventListener('click', clearhistory);