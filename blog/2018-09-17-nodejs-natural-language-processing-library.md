---
slug: nodejs-natural-language-processing-library
title: 自然语言处理的一个库 nlp.js
tags: [nlp ,javascript]
---

https://github.com/axa-group/nlp.js

NLP.js
=======


"NLP.js" is a general natural language utilities for nodejs. Currently supporting:
- Guess the language of a phrase
- Fast levenshtein distance of two strings
- Search the best substring of a string with less levenshtein distance to a given pattern.
- Get stemmers and tokenizers for several languages.
- Sentiment Analysis for phrases (with negation support).
- Named Entity Recognition and management, multilanguage, and accepting similar strings, so the introduced text does not need to be exact.
- Natural Language Processing Classifier, to classify utterance into intents.
- Natural Language Generation Manager, so from intents and conditions it can generate an answer.
- NLP Manager: a tool able to manage several languages, the Named Entities for each language, the utterance and intents for the training of the classifier, and for a given utterance return the entity extraction, the intent classification and the sentiment analysis. Also, it is able to maintain a Natural Language Generation Manager for the answers.

<div align="center">
<img src="https://github.com/axa-group/nlp.js/raw/master/screenshots/hybridbot.gif" width="auto" height="auto"/>
</div>
