import { createWriteStream } from 'fs';
import PDFDocument from 'pdfkit';

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
export const generateResume = async () => {
  // Create a new PDF document
  const doc = new PDFDocument();

  // Pipe the PDF document to a writable stream
  const stream = createWriteStream('resume2.pdf');
  doc.pipe(stream);

  // Add content to the PDF document
  doc.fontSize(20).text(name, { align: 'center' });
  doc.moveDown();
  doc.fontSize(14).text(summary, { align: 'center' });
  doc.moveDown();
  doc.fontSize(16).text('Work Experience:');
  workExperience.forEach(job => {
    doc.moveDown();
    doc.fontSize(14).text(`${job.company} - ${job.title}`, { underline: true });
    doc.fontSize(12).text(job.dateRange);
    job.responsibilities.forEach(responsibility => {
      doc.moveDown();
      doc.fontSize(10).text(`- ${responsibility}`);
    });
  });
  doc.moveDown();
  doc.fontSize(16).text('Education:');
  doc.moveDown();
  doc.fontSize(12).text(education);
  doc.moveDown();
  doc.fontSize(16).text('Technical Skills:');
  technicalSkills.forEach(skill => {
    doc.moveDown();
    doc.fontSize(10).text(`- ${skill}`);
  });

  // Finalize the PDF document and save the stream
  doc.end();
  stream.on('finish', () => console.log('Resume generated successfully!'));
};
