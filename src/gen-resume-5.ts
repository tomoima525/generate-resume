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
  const page = pdfDoc.addPage([600, 900]); // Increase the page height

  const { height } = page.getSize();

  const titleFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const contentFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  let y = height - 50;
  const marginLeft = 50;
  const marginRight = 50;
  const pageWidth = page.getWidth() - marginLeft - marginRight;

  const addText = (
    text: string,
    font,
    size: number,
    yOffset = 0,
    lineHeight = 1.2,
  ) => {
    const textWidth = font.widthOfTextAtSize(text, size);
    const lines =
      textWidth > pageWidth ? wrapText(text, font, size, pageWidth) : [text];

    lines.forEach((line, index) => {
      page.drawText(line, {
        x: marginLeft,
        y: y - yOffset - index * (size * lineHeight),
        size,
        font,
      });
    });

    y -= yOffset + lines.length * (size * lineHeight) + 10;
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
  require('fs').writeFileSync('resume5.pdf', pdfBytes);
}

function wrapText(
  text: string,
  font,
  fontSize: number,
  maxWidth: number,
): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let line = '';

  words.forEach(word => {
    const testLine = line + ' ' + word;
    const testLineWidth = font.widthOfTextAtSize(testLine, fontSize);

    if (testLineWidth > maxWidth) {
      lines.push(line.trim());
      line = word;
    } else {
      line = testLine;
    }
  });

  if (line) {
    lines.push(line.trim());
  }

  return lines;
}
