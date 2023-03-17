import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { writeFile } from 'fs/promises';
import fetch from 'node-fetch';

// Resume information
const name = 'Tomo';
const summary =
  'An experienced full-stack developer with expertise in blockchain technologies, including Ethereum(Solidity), cryptography, and Zero Knowledge Proof. Experienced in developing and maintaining high-traffic web applications.';
const workExperience = [
  {
    company: 'XXX',
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

export const generateResume = async () => {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();

  // Set the font for the document
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Add a new page to the document
  const page = pdfDoc.addPage([500, 700]);

  // Set the font size and color for the document
  page.setFont(font);
  page.setFontSize(12);
  page.setFontColor(rgb(46 / 255, 54 / 255, 72 / 255));

  // Add content to the PDF document
  page.drawText(name, {
    x: 50,
    y: 630,
    size: 24,
    color: rgb(46 / 255, 54 / 255, 72 / 255),
    font: font,
  });
  page.moveDown(20);
  page.drawText(summary, {
    x: 50,
    y: 580,
    size: 12,
    color: rgb(46 / 255, 54 / 255, 72 / 255),
    font: font,
    lineHeight: 16,
  });
  page.moveDown(20);
  page.drawText('Work Experience:', {
    x: 50,
    y: 520,
    size: 16,
    color: rgb(46 / 255, 54 / 255, 72 / 255),
    font: font,
  });
  workExperience.forEach((job, index) => {
    page.moveDown(20);
    page.drawText(`${job.company} - ${job.title}`, {
      x: 50,
      y: 480 - index * 120,
      size: 14,
      color: rgb(46 / 255, 54 / 255, 72 / 255),
      font: font,
    });
    page.drawText(job.dateRange, {
      x: 50,
      y: 460 - index * 120,
      size: 12,
      color: rgb(46 / 255, 54 / 255, 72 / 255),
      font: font,
    });
  });
  page.moveDown(20);
  page.drawText('Education:', {
    x: 50,
    y: 220,
    size: 16,
    color: rgb(46 / 255, 54 / 255, 72 / 255),
    font: font,
  });
  page.moveDown(20);
  page.drawText(education, {
    x: 50,
    y: 200,
    size: 12,
    color: rgb(46 / 255, 54 / 255, 72 / 255),
    font: font,
  });
  page.moveDown(20);
  page.drawText('Technical Skills:', {
    x: 50,
    y: 140,
    size: 16,
    color: rgb(46 / 255, 54 / 255, 72 / 255),
    font: font,
  });
  technicalSkills.forEach((skill, index) => {
    page.moveDown(20);
    page.drawText(`- ${skill}`, {
      x: 50,
      y: 100 - index * 20,
      size: 12,
      color: rgb(46 / 255, 54 / 255, 72 / 255),
      font: font,
    });
  });

  // Add a logo to the PDF document
  const logoUrl = 'https://i.imgur.com/lT0zQJd.png';
  const logoImage = await pdfDoc.embedPng(
    await fetch(logoUrl).then(res => res.arrayBuffer()),
  );
  const logoWidth = 50;
  const logoHeight = (logoWidth * logoImage.height) / logoImage.width;
  page.drawImage(logoImage, {
    x: 400,
    y: 630,
    width: logoWidth,
    height: logoHeight,
  });

  // Save the PDF document to a file
  const pdfBytes = await pdfDoc.save();
  await writeFile('resume.pdf', pdfBytes);
};
