from prompts import Prompt
import openai
from openai import OpenAI

class ChatGPT:
    def __init__(self):
        self.client = OpenAI(api_key='YOUR KEY HERE')


    def handle_prompt(self, prompt: Prompt):
        message = [{"role": "user", "content": prompt.process()}]
        response = self.client.chat.completions.create(
                model="gpt-3.5-turbo",  # The name of the OpenAI chatbot model to use
                messages=message,   # The conversation history up to this point, as a list of dictionaries
                max_tokens=4000,        # The maximum number of tokens (words or subwords) in the generated response
                stop=None,              # The stopping sequence for the generated response, if any (not used here)
                temperature=0.3,        # The "creativity" of the generated response (higher temperature = more creative)
            )
        for choice in response.choices:
            if "text" in choice:
                return choice.message.content.replace('\n', '')
        
        return response.choices[0].message.content.replace('\n', '')