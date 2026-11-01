---
title: "OSS Contributions: From Intellectual Work to Token Donations?"
date: 2026-11-01 20:00
author: Tobias Pitters
tags: ["open-source", "genai", "llm", "community building"]
---


Recently I prepared issues for a hackathon on a popular project I maintain. This hackathon is held in person
and the issues should be beginner to intermediate level and be done over the course of two days.
Within hours after I tagged those with the newly created hackathon tag, people filed pull requests to solve them.
It wasn't clearly stated anywhere, but these were supposed to be solved without the help of AI. The PRs though looked
very much like LLM output. So I got pissed and told the user to stop feeding the hackathon-tagged issues to LLMs.

Was that justified? Probably, but that is not my point. What I want to write about is how my perception of pull requests
changed from valuing the hard work people contribute to the project to merely regarding PRs as token donations. Donations where I don't control the prompt. Can be nice, but is ultimately a burden on me to decide if this is AI slop or actually valuable.
I find myself often in the position to simply believe that instead of reviewing an LLM-generated PR I could have fed the problem to my LLM. No more interaction
needed, no more contributors who push me to merge their changes, simply an LLM and me solving a problem, merging the PR and
forgetting that ever existed minutes after I clicked the merge button.

But how to build an open-source community under these circumstances? I just see 4 options:
1. Treat open-source as a job. Not that you get paid, just limited seats, maintainers decide who gets one. Treat this as a commitment from maintainer and contributor side. Maintainers invest in hand-selected contributors. They proof themselves to get up the ranks or get fired if not meeting the expected standards. 
2. Forbid LLM usage for new contributors and certain issues. Close any PR that looks like it's LLM generated. Probably one needs to close more than just the purely LLM written ones, but is the price one needs to pay. Just pretend the world was still moving like in 2024. You could use https://github.com/mitchellh/vouch to manage contributors and especially people who generated slop.
3. Create a community by regular meetings. Anyone is welcome, but it is expected that new contributors who want to be part of the project appear regularly and take part in discussions about PRs and future directions, file issues, etc. This helps maintainers to get an understanding who is truly involved and who just handed off thinking to an LLM.
4. Just merge PRs, wherever they come from if they are beneficial for the project. The maintainers take the burden of additional reviews. The direct opposite of 2. Can one win vibe coders for their projects long term? And are they valuable for projects? If a contribution to any project just seems one prompt away, won't they decide to switch projects if they get a chance to contributing to a more prestigious one?

All of these have their drawbacks. I always liked the egalitarian nature of open-source development: it did not matter where you came from, and who you are, it is just about the work you deliver. If one drowns in pull requests, and one can't tell apart one-shotted PRs from hard intellectual work, building a project around just looking at the code seems like the wrong choice.
