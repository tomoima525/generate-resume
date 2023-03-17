import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { writeFile } from 'fs/promises';

// Resume information
const name = 'Tomo';
const summary =
  'An experienced full-stack developer with expertise in blockchain technologies, including Ethereum(Solidity), cryptography, and Zero Knowledge Proof. Experienced in developing and maintaining high-traffic web applications.';
const workExperience = [
  {
    company: 'Mercari US',
    title: 'Early Member',
    dateRange: '2015 - 2020',
    responsibilities: [
      "Contributed to the development of the platform's architecture and implementation of blockchain-based features.",
      'Worked closely with cross-functional teams to ensure optimal performance and scalability of the platform.',
    ],
  },
  {
    company: 'ZK University',
    title: 'Mentor',
    dateRange: '2020 - Present',
    responsibilities: [
      'Provided guidance and support to students in learning blockchain technologies and building decentralized applications.',
      'Collaborated with other mentors to design and deliver engaging course materials and projects.',
    ],
  },
];
const education = "Bachelor's degree in Computer Science from XYZ University.";
const technicalSkills = [
  'Proficient in various programming languages such as Python, JavaScript, and C++.',
  'Experienced in developing and deploying web applications using React, Node.js, and other web frameworks.',
  'Knowledgeable in various blockchain technologies such as Ethereum(Solidity) and Zero Knowledge Proof, and experienced in building and deploying smart contracts.',
  'Familiar with DevOps tools and practices, including Docker, Kubernetes, and AWS.',
];
// Generate a resume from a JSON file using pdf-lib
export const generateResume = async () => {
  // Create a new PDFDocument
  const pdfDoc = await PDFDocument.create();
  // Embed the Helvetica font
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  // Add a blank page to the document
  const page = pdfDoc.addPage();
  // Get the width and height of the page
  const { width, height } = page.getSize();
  // Draw the name string
  page.drawText(name, {
    x: 50,
    y: height - 4 * 72,
    size: 50,
    font: helveticaFont,
    color: rgb(0.95, 0.1, 0.1),
  });
  // Draw the summary string
  page.drawText(summary, {
    x: 50,
    y: height - 5 * 72,
    size: 10,
    font: helveticaFont,
    color: rgb(0.2, 0.5, 0.95),
  });
  // Draw the work experience section title
  page.drawText('Work Experience', {
    x: 50,
    y: height - 7 * 72,
    size: 20,
    font: helveticaFont,
    color: rgb(0.95, 0.1, 0.1),
  });
  // Draw the work experience
  let lastY = height - 7 * 72;
  for (const exp of workExperience) {
    lastY -= 30;
    // Draw the company name string
    page.drawText(exp.company, {
      x: 70,
      y: lastY,
      size: 15,
      font: helveticaFont,
      color: rgb(0.2, 0.5, 0.95),
    });
    // Draw the title string
    page.drawText(exp.title, {
      x: 70,
      y: lastY - 15,
      size: 10,
      font: helveticaFont,
      color: rgb(0.2, 0.5, 0.95),
    });
    // Draw the date range string
    page.drawText(exp.dateRange, {
      x: 70,
      y: lastY - 30,
      size: 10,
      font: helveticaFont,
      color: rgb(0.2, 0.5, 0.95),
    });
    // Draw the responsibilities
    for (const responsibility of exp.responsibilities) {
      lastY -= 15;
      page.drawText(responsibility, {
        x: 70,
        y: lastY,
        size: 10,
        font: helveticaFont,
        color: rgb(0.2, 0.5, 0.95),
      });
    }
  }
  // Draw the education section title
  page.drawText('Education', {
    x: 50,
    y: lastY - 50,
    size: 20,
    font: helveticaFont,
    color: rgb(0.95, 0.1, 0.1),
  });
  // Draw the education string
  page.drawText(education, {
    x: 70,
    y: lastY - 70,
    size: 10,
    font: helveticaFont,
    color: rgb(0.2, 0.5, 0.95),
  });
  // Draw the technical skills section title
  page.drawText('Technical Skills', {
    x: 50,
    y: lastY - 100,
    size: 20,
    font: helveticaFont,
    color: rgb(0.95, 0.1, 0.1),
  });
  // Draw the technical skills
  for (const skill of technicalSkills) {
    lastY -= 15;
    page.drawText(skill, {
      x: 70,
      y: lastY - 100,
      size: 10,
      font: helveticaFont,
      color: rgb(0.2, 0.5, 0.95),
    });
  }
  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();
  // Write the PDF bytes to a file
  await writeFile('resume.pdf', pdfBytes);
};
