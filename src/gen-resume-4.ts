import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export async function generateResume() {
  const resumeData = {
    name: 'Tomo',
    professionalSummary:
      'An experienced full-stack developer with expertise in blockchain technologies, including Ethereum(Solidity), cryptography, and Zero Knowledge Proof. Experienced in developing and maintaining high-traffic web applications.',
    workExperience: [
      'Early member of a popular second-hand marketplace app valued at $2.5B.',
      'Mentored students at ZK University.',
    ],
    education: "Bachelor's degree in Computer Science from XYZ University.",
    technicalSkills:
      'Proficient in various programming languages such as Python, JavaScript, and C++, as well as various blockchain technologies such as Ethereum(Solidity) and Zero Knowledge Proof.',
  };

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]);

  const { height } = page.getSize();

  const titleFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const contentFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  let y = height - 50;
  const addText = (text: string, font, size: number, yOffset = 0) => {
    page.drawText(text, {
      x: 50,
      y: y - yOffset,
      size,
      font,
    });
    y -= yOffset + size + 10;
  };

  addText(resumeData.name, titleFont, 24);

  addText('Professional Summary', titleFont, 18, 20);
  addText(resumeData.professionalSummary, contentFont, 12);

  addText('Work Experience', titleFont, 18, 20);
  resumeData.workExperience.forEach(experience =>
    addText(experience, contentFont, 12),
  );

  addText('Education', titleFont, 18, 20);
  addText(resumeData.education, contentFont, 12);

  addText('Technical Skills', titleFont, 18, 20);
  addText(resumeData.technicalSkills, contentFont, 12);

  const pdfBytes = await pdfDoc.save();

  // Save to file or send the PDF bytes as a response, depending on your use case
  require('fs').writeFileSync('resume4.pdf', pdfBytes);
}
