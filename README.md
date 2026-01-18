# code-review-agent

A code review automation tool powered by the [Claude Agent SDK](https://platform.claude.com/docs/en/agent-sdk/typescript).

Based on the following tutorial by Nader Dabit: [The Complete Guide to Building Agents with the Claude Agent SDK](https://x.com/dabit3/status/2009131298250428923)

## Features

- Automated code review for bugs, security, performance, and style issues
- Uses Claude's AI models via the Claude Agent SDK
- Outputs structured review results with severity and suggestions

## Installation

Note: this tool requires:

- Node.js 18+ installed
- An Anthropic API key: [create one in the Claude Console](https://console.anthropic.com/)

To install dependencies, run:

```sh
npm install
```

## Usage

Run a code review on the current directory:

```sh
npx tsx review-agent.ts .
```

Or specify a directory:

```sh
npx tsx review-agent.ts path/to/your/code
```
