import time
import os
import typer
from openai import OpenAI

client= os.getenv("OPENAI_KEY")


from dotenv import load_dotenv
from typing import Optional

load_dotenv()


app = typer.Typer()


@app.command()
def interactive_chat(
    text: Optional[str] = typer.Option(None, "--text", "-t", help="Start with text"),
    temperature: float = typer.Option(0.7, help="Control Randomness. Defaults to 0.7"),
    max_tokens: int = typer.Option(
        150, help="Control length of response. Defaults to 150"
    ),
    model: str = typer.Option(
        "gpt-3.5-turbo", help="Control the model to use. Defaults to gpt-3.5-turbo"
    ),
):
    """Interactive CLI tool to chat with ChatGPT."""
    typer.echo(
        "Starting interactive chat with ChatGPT. Type 'exit' to end the session."
    )

    messages = []

    while True:
        if text:
            prompt = text
            text = None
        else:
            prompt = typer.prompt("You")

        messages.append({"role": "user", "content": prompt})
        if prompt == "exit":
            typer.echo("ChatGPT: Goodbye!")
            break

        response = client.chat.completions.create(
            model=model,
            messages=messages,
            max_tokens=max_tokens,
            temperature=temperature
        )

        chat_text = response.choices[0].message.content
        typing_delay = 0.05  # Adjust this value for typing speed
        for char in chat_text:
            typer.echo(f'ChatGPT: {prompt + char}', nl=False)
            time.sleep(typing_delay)
        typer.echo()  # Add a new line after completion of typing
        messages.append(response.choices[0].message)


if __name__ == "__main__":
    app()
