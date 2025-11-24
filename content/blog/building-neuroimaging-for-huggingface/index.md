---
title: Building neuroimaging support for huggingface
date: 2025-11-24 00:00:00
author: Tobias Pitters
tags: ["open-source", "neuroscience", "huggingface"]
---

## What is possible now?
Now you can upload and download NifTI (Neuroimaging Informatics Technology Initiative) files to the hub directly via huggingface datasets, this is available from version 4.4.0 onwards. Check the huggingface datasets documentation for more: https://huggingface.co/docs/datasets/v4.4.1/en/nifti_dataset#usage-of-nifti1image
On the main branch it's even possible to visualize this data in jupyter:
```python
from datasets import load_dataset

ds = load_dataset("TobiasPitters/nifti-papaya-testdata",
              split="train")
# this line visualizes in jupyter
ds[1]['nifti']
```
Check this video:

<video width="100%" controls>
  <source src="/2025-11-22-09-49-56.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

## Why medical imaging datasets matter?
Medical imaging, especially imaging of the brain is high-dimensional, noisy and has lots of individual variety, so it is a natural fit for ML. There is a flurry of research studying various aspects:
 - [predicting hearing loss](https://arxiv.org/html/2405.00142v2)
 - [understand how people learn](https://www.nature.com/articles/nature17637)
 - [studying depression](https://www.nature.com/articles/nm.4246)
 - [diagnosis and prognosis of cognitive impairment and dementia](https://alzres.biomedcentral.com/articles/10.1186/s13195-025-01815-6)
and many more. Making it easier to read and write these datasets to huggingface is an important step to help more researchers get into the field and ease development of models that could benefit all of us.

## What did I build and how did I do it?
I stumbled upon an [open issue](https://github.com/huggingface/datasets/issues/7804) on datasets and since I had some expertise from prior contributions I took on implementing NifTI. Even without expertise in this specific format, it is quite easy since there is the fantastic [nibabel Python library](https://nipy.org/nibabel/) that we leveraged. Adding a new format is relatively simple, I basically had to follow the PR that built support for PDF and adjust some small things and write custom tests.
The datasets maintainer quickly merged the changes, but soon after a first user reported an issue when downloading NifTI datasets. The bug was subtle, even though I checked everything locally for me and it worked I had missed building an `embed_storage` function that is responsible to convert the loaded images to bytes from where they'll be converted to arrow format and then to parquet. It worked for me locally since in this case the stored data contains a link to the relative files, so if they are on your system everything looks smooth even though for everyone else the code is unusable. This was quickly merged as well and made it into the `4.4.0` release. 
The next step was building a visualization for NifTI, so that people can directly visualize the data without relying on external tools. After a quick search we decided to go for [Papaya](https://github.com/rii-mango/Papaya). I first tried to let claude vibe code the visualization but it failed miserably. A couple days later I gave it a try myself and got it done in around 1.5 hours (I probably spent at least 45 mins telling claude what to do). This PR was even merged faster, got shared on X.com and soon [Chris Rorden](https://sc.edu/study/colleges_schools/artsandsciences/psychology/our_people/directory/rorden_chris.php), neuroimaging professor and creator of various tools to visualize brain scans reached out to me.
I missed his tool completely in my "research". While Papaya is a great tool, it is no longer actively developed and does not support WebGL2, which is needed to display 3D smoothly. So I built another PR to replace Papaya with Rodron's NiiVue and we are currently in the review process, check [here](https://github.com/huggingface/datasets/pull/7878#issuecomment-3566686861).

## What's left
Quite a lot. Integration of more formats (e.g. DICOM) is the natural next step and then supporting file structures like BIDS to ease development with images even further. After a solid foundation of formats is supported, we could aim to move major datasets to those and then see where we go from there.
I'd also like to get feedback from practitioners in the field to understand their needs. So if you are one, please feel free to reach out.