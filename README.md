Test Chat-GPT to generate a resume in pdf

# Prompt

- First, create a base information

```
Can you rewrite this sentence without showing exact company or product names?


Tomo has 10+ years of experience in full-stack development. Expertise in blockchain technologies, including Ethereum(Solidity), cryptography, and Zero Knowledge Proof. He was one of the first devs at Mercari US, a $2.5B value second-hand marketplace app. He was a mentor at ZK University and received a prize from ZK-focused L1 blockchain Mina Protocol at ETH San Francisco hackathon in 2022.
```

- Then ask in PDF format

```
 I want create a resume in PDF using this text. Can you create a prompt to generate that?
```

- Then generate a script to create a PDF

```
Using the information below, create a script in TypeScript to generate a resume in pdf using pdf-lib

Name: Tomo
Professional Summary: An experienced full-stack developer with expertise in blockchain technologies, including Ethereum(Solidity), cryptography, and Zero Knowledge Proof. Experienced in developing and maintaining high-traffic web applications.
Work Experience:
Early member of a popular second-hand marketplace app valued at $2.5B.
Mentored students at ZK University.
Education: Bachelor's degree in Computer Science from XYZ University.
Technical Skills: Proficient in various programming languages such as Python, JavaScript, and C++, as well as various blockchain technologies such as Ethereum(Solidity) and Zero Knowledge Proof.
```

This generates `gen-resume-4.ts`. However, the text is not wrapped. So I gave

```
Update the code above so that texts fit inside the pdf
```

When all the code is not rendered

```
Share the rest of the code above
```
