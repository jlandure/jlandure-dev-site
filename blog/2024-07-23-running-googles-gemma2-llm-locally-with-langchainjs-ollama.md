Published in [Google Cloud](https://medium.com/google-cloud/running-googles-gemma2-llm-locally-with-langchainjs-ollama-ea4b0bc8747b)

Jul 23, 2024

5 min read

[Linkedin](https://www.linkedin.com/posts/jlandure_running-googles-gemma2-llm-locally-with-activity-7221513823210409984-bziP)

# Running Google’s Gemma2 LLM locally with LangchainJS & Ollama

This article explores running Google’s powerful Gemma2 Large Language Model (LLM) locally using JavaScript. Gemma2 offers cutting-edge performance and efficiency, making it a valuable tool for various tasks.

In the next section, we’ll explore how to write Javascript code to interact with Gemma2.

## Introducing Gemma2

Gemma2 is available in two sizes: 9 billion (9B) and 27 billion (27B) parameters. This new architecture delivers exceptional performance and makes Gemma2 a leader in the open LLM landscape.

![](https://miro.medium.com/v2/resize:fit:1400/1*hI-lH9bgFk8RsXlljDlbzA.png)

More information on Gemma can be found here:

*   [The GitHub project](https://github.com/google-gemini/gemma-cookbook)
*   [The page of the project](https://ai.google.dev/gemma/) & [Announcement](https://blog.google/technology/developers/google-gemma-2/)
*   [Available on HuggingFace](https://huggingface.co/collections/google/gemma-2-release-667d6600fd5220e7b967f315) & [Blog on HuggingFace](https://huggingface.co/blog/gemma2)
*   [Available on Ollama](https://ollama.com/library/gemma2)

Note : a future model of Gemma will be available soon in a 2B size.

## 💬 Running Gemma2 with Ollama locally

![](https://miro.medium.com/v2/resize:fit:1400/0*sIv5lwqqcr86gCpY)

To run Gemma2 locally, we use Ollama in Docker. Launch the following command to start Ollama:

<pre class="vs vt vu vv vw ata atb app bo apn ba bj">docker run -d -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama</pre>

This command starts Ollama in a Docker container, mapping the necessary volumes and ports. You can test the LLM directly using the following command:

<pre class="vs vt vu vv vw ata atb app bo apn ba bj">docker exec -it ollama ollama run gemma2</pre>

You can post your first question to the LLM:

<pre class="vs vt vu vv vw ata atb app bo apn ba bj">>>> Hello! who are you?  
Hello! I am Gemma, a large language model trained by Google DeepMind.    

I can generate text, translate languages, write different kinds of   
creative content, and answer your questions in an informative way.  

What can I do for you today? 😊</pre>

This allows you to interact with Gemma2 and explore its functionalities. Similarly, you can test older Gemma versions like `gemma:2b`.

## ⚡️ Setting Up the Local Environment with LangchainJS

To interact with Gemma2 (in Ollama) we will use the [Langchain framework](https://js.langchain.com/v0.2/docs/introduction/).

LangChainJS is a Node.js library that empowers developers with powerful natural language processing capabilities. It leverages advanced AI algorithms and models to perform tasks like text tokenization, part-of-speech tagging, named entity recognition, language translation, and sentiment analysis.

To install langchain in your JS project, use the following command:

<pre class="vs vt vu vv vw ata atb app bo apn ba bj">npm i langchain @langchain/community</pre>

Then, you can write your first JS file to interact with Gemma2.

## 🌐 First JS Example: Translation

To test a first call to the Gemma2, we will setup [a simple translation app](https://github.com/jlandure/simple-gemma2-ollama-langchainjs-app/blob/main/translate.js) in Javascript.

<pre class="vs vt vu vv vw ata atb app bo apn ba bj">import { OllamaFunctions } from "@langchain/community/experimental/chat_models/ollama_functions";  
import { HumanMessage, SystemMessage } from "@langchain/core/messages";  
import { StringOutputParser } from "@langchain/core/output_parsers";  

const model = new OllamaFunctions({  
    temperature: 0.1,  
    model: "gemma2",  
});  

const messages = [  
    new SystemMessage("Translate the following from English into French"),  
    new HumanMessage("hi!"),  
];  

const parser = new StringOutputParser();  
const result = await model.invoke(messages);  

const humanReadableResult = await parser.invoke(result);  
console.log(humanReadableResult);  
// Bonjour !</pre>

## ⚙️ Second JS Example: Extraction of Data

Let’s try something more relevant. We will send a text and we will ask the Gemma2 to extract entities into a JSON document.

To try this, we will use a classic tale: “The Crow and the Fox”, a children’s story by Jean de la Fontaine. We will try to extract the following information:

*   name: The name of a character
*   animal: The type of animal
*   cheese: a boolean to indicate if the character owns the cheese at the end of the story.

Let’s write a [small JS app](https://github.com/jlandure/simple-gemma2-ollama-langchainjs-app/blob/main/extract.js) to do that:

<pre class="vs vt vu vv vw ata atb app bo apn ba bj">import { z } from "zod";  
import { zodToJsonSchema } from "zod-to-json-schema";  
import { OllamaFunctions } from "@langchain/community/experimental/chat_models/ollama_functions";  
import { PromptTemplate } from "@langchain/core/prompts";  
import { JsonOutputFunctionsParser } from "@langchain/core/output_parsers/openai_functions";  

const EXTRACTION_TEMPLATE = `Extract relevant information mentioned in the following passage with their properties.  

Passage:  
{input}  
`;  

const prompt = PromptTemplate.fromTemplate(EXTRACTION_TEMPLATE);  

// Use Zod for easier schema declaration  
const schema = z.object({  
    characters: z.array(  
        z.object({  
            name: z.string().describe("The name of a character"),  
            animal: z.string().describe("The type of animal"),  
            cheese: z.optional(z.boolean()).describe("Please indicate if the character owns the cheese at the end of the story."),  
        })  
    ),  
});  

const model = new OllamaFunctions({  
    temperature: 0.1,  
    model: "gemma2",  
}).bind({  
    functions: [  
        {  
            name: "information_extraction",  
            description: "Extracts the relevant information from the passage.",  
            parameters: {  
                type: "object",  
                properties: zodToJsonSchema(schema),  
            },  
        },  
    ],  
    function_call: {  
        name: "information_extraction",  
    },  
});  

// Use a JsonOutputFunctionsParser to get the parsed JSON response directly.  
const chain = await prompt.pipe(model).pipe(new JsonOutputFunctionsParser());  

const response = await chain.invoke({  
    input:  
        `  
Maître Corbeau, sur un arbre perché,  
Tenait en son bec un fromage.  
Maître Renard, par l'odeur alléché,  
Lui tint à peu près ce langage :  
Et bonjour, Monsieur du Corbeau,  
Que vous êtes joli ! que vous me semblez beau !  
Sans mentir, si votre ramage  
Se rapporte à votre plumage,  
Vous êtes le Phénix des hôtes de ces bois.  
À ces mots le Corbeau ne se sent pas de joie,  
Et pour montrer sa belle voix,  
Il ouvre un large bec, laisse tomber sa proie.  
Le Renard s'en saisit, et dit : Mon bon Monsieur,  
Apprenez que tout flatteur  
Vit aux dépens de celui qui l'écoute.  
Cette leçon vaut bien un fromage sans doute.  
Le Corbeau honteux et confus  
Jura, mais un peu tard, qu'on ne l'y prendrait plus.  
        `  
});  

console.log(response);</pre>

Launching the JS file, we got the following JSON result:

<pre class="vs vt vu vv vw ata atb app bo apn ba bj">{  
    characters: [  
        { name: 'Maître Corbeau', animal: 'Corbeau', cheese: true },  
        { name: 'Maître Renard', animal: 'Renard', cheese: false }  
    ]  
}</pre>

## 🎓 Conclusion

This article provides a foundational guide for running Google’s Gemma2 LLM locally with Javascript, LangChainJS using Ollama. Remember to experiment with different model sizes and explore the various functionalities Gemma2 offers for your projects.

You can find all the information and code shared in this GitHub project:
https://github.com/jlandure/simple-gemma2-ollama-langchainjs-app/

_Note : on my M1 MacBookPro, it takes 3minutes to get the result of the examples._

## **🚀 Bonus: Boosting Performance with GPUs**

For significant performance gains, consider using a GPU. However, this functionality is currently unavailable with Docker on Mac due to limitations in GPU visibility.

For leveraging GPUs, you’ll need to install Ollama natively, bypassing Docker. Refer to the provided resources for details on native Ollama installation, particularly on Apple Silicon systems.